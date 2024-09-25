import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handler(req, res) {
    const { id } = req.query;
    await mongooseConnect();
    const product = await Product.findById(id);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
}
