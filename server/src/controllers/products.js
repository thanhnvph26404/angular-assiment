import Product from "../models/products";
import cloudinary from "../config/cloudinary";
import Category from "../models/categories";
import { productSchema } from "../schemas/product";
export const getAll = async (req, res) => {
  const {
    _page = 1,
    _limit = 100  ,
    _sort = "createAt",
    _order = "asc",
    _expand,
  } = req.query;
  const options = {
    page: _page,
    limit: _limit,
    sort: { [_sort]: _order === "desc" ? -1 : 1 },
  };
  const populateOptions = _expand
    ? [{ path: "categoryId", select: "name" }]
    : [];
  try {
    const result = await Product.paginate(
      {},
      { ...options, populate: populateOptions }
    );

    if (result.docs.length === 0) throw new Error("No product found");
    const response = {
      data: result.docs,
      pagination: {
        currentPage: result.page,
        totalPages: result.totalPages,
        totalItems: result.totalDocs,
      },
    };
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const get = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) throw new Error("Product not found");
    return res.status(200).json({ data: product });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const { error } = productSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((message) => ({ message }));
      return res.status(400).json({ errors });
    }

    // Thêm sản phẩm vào database
    const { name, image, price, flavor, description, categoryId } =
      req.body;
    const result = await cloudinary.uploader.upload(image);
    const product = new Product({
      name,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
      price,
      flavor,
      description,
      categoryId,
    });
    await product.save();

    await Category.findOneAndUpdate(product.categoryId, {
      $addToSet: {
        products: product._id,
      },
    });

    return res.status(200).json({
      product,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Thêm sản phẩm không thành công",
      error: error.message,
    });
  }
};

export const update = async (req, res) => {
  try {
    // const { error } = productSchema.validate(req.body, { abortEarly: false });
    // if (error) {
    //   return res.status(400).json({
    //     messages: error.details.map((message) => ({ message })),
    //   });
    // }
    const productId = req.params.id;
    const productOld = await Product.findById(productId);
    const oldPublicId = productOld.image.public_id;
    const { name, image, price, flavor, description, categoryId } =
      req.body;
    let product
    if (!image) {
      product = {
      name,
      image: productOld?.image,
      price,
      flavor,
      description,
      categoryId,
    }
    } else {
      const [uploadResult, deleteResult] = await Promise.all([
      cloudinary.uploader.upload(image),
      cloudinary.uploader.destroy(oldPublicId),
    ]);

     product = {
      name,
      image: {
        public_id: uploadResult.public_id,
        url: uploadResult.secure_url,
      },
      price,
      flavor,
      description,
      categoryId,
    }
    }
    
    

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productId },
      product,
      { new: true }
    );
    if (!updatedProduct) {
      return res.sendStatus(404);
    }

    // Xóa sản phẩm cũ khỏi danh sách products của category cũ
    const oldCategoryId = updatedProduct.categoryId;
    await Category.findByIdAndUpdate(oldCategoryId, {
      $pull: { products: productId },
    });

    // Thêm sản phẩm mới vào danh sách products của category mới
    const newCategoryId = req.body.categoryId;
    if (newCategoryId) {
      // Thêm sản phẩm mới vào danh sách products của category mới
      await Category.findByIdAndUpdate(newCategoryId, {
        $addToSet: { products: productId },
      });
    }
    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(500).json({
      message: "Cập nhật sản phẩm không thành công",
      error: error.message,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const id = req.params.id;
    const { isHardDelete } = req.body;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm",
      });
    }
    // xóa image trên cloudinary
    await cloudinary.uploader.destroy(product.image.public_id);
    // Nếu client gửi lên isHardDelete = true thì xóa sản phẩm vĩnh viễn
    // Ngoài ra xóa luôn id sản phẩm khỏi danh sách products ở category
    if (isHardDelete) {
      await product.forceDelete();
      // Xóa sản phẩm cũ khỏi danh sách products của category cũ
      await Category.findByIdAndUpdate(product.categoryId, {
        $pull: { products: product._id },
      });
    } else {
      await product.delete();
    }

    return res.status(200).json({
      message: "Xóa sản phẩm thành công",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      message: "Xóa sản phẩm thất bại",
      error: error.message,
    });
  }
};
