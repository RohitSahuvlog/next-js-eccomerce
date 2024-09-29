import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handler(req, res) {
    await mongooseConnect();

    if (req.method === 'GET') {
        if (req.query?.id) {
            res.status(200).send(await Product.findOne({ _id: req.query.id }));
        } else {
            const products = await Product.find({}, null, { sort: { '_id': -1 } });
            res.status(200).send(products);
        }
    }
}
