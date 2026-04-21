import type { Request, Response } from 'express';
import Product from '../Models/Product.js';
import type { IProductResponse } from '@shared/sharedTypes.js';

export const getProducts = async (
  req: Request<{ shopId: string; }, IProductResponse | { message: string }, never, { page?: string; limit?: string }>,
  res: Response<IProductResponse | { message: string }>
) => {
  try {
    const { shopId } = req.params;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;
    console.log('getProducts start', page, limit);

    const filter = shopId === '69d8ecc5baada07fc20b0789' ? {} : { shopId };

    const [products, totalCount, categories] = await Promise.all([
      page && limit
        ? Product.find(filter)
          .skip((page - 1) * limit)
          .limit(limit)
        : Product.find(filter),
      Product.countDocuments(filter),
      Product.distinct('category', shopId === '69d8ecc5baada07fc20b0789' ? {} : { shopId })
    ]);

    res.json({ products, totalCount, categories });

    console.log('getProducts end');
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
};


