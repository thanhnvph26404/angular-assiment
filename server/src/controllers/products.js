import Product from '../models/products'
import cloudinary from '../config/cloudinary'
import Category from '../models/categories'
import { productSchema } from '../schemas/product'
export const getAll = async (req, res) => {
    
}

export const get = async (req, res) => { 
    
}

export const create = async (req, res) => {

    try {
        
        const { error } = productSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((message) => ({ message }));
            return res.status(400).json({ errors });
        }
         
        // Thêm sản phẩm vào database
        const { name,image, price, flavor, description, note, categoryId } = req.body 
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
            note,
            categoryId
        })
        await product.save()

        await Category.findOneAndUpdate(product.categoryId, {
            $addToSet: {
                products: product._id
            }
        })
        
        return res.status(200).json({
            product,
            
            
        });
    } catch (error) {
        return res.status(400).json({
            message: "Thêm sản phẩm không thành công",
            error: error.message
        });
    }
};

export const update = async (req, res) => {
    
};

export const remove = async (req, res) => {
    
};