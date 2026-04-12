import type { Request, Response } from 'express';
import Product from '../Models/Product.js';

export const getProducts = async (
  req: Request<{ shopId: string; page?: number; total?: number }>,
  res: Response
) => {
  try {
    const { shopId } = req.params;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;

    const query = shopId === '69d8ecc5baada07fc20b0789' ? {} : { shopId };

    const [products, totalCount] = await Promise.all([
      Product.find(query)
        .skip((page - 1) * limit)
        .limit(limit),
      Product.countDocuments(query)
    ]);

    res.json({ products, totalCount });

    console.log('getProducts end');

  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
};
