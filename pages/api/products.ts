import type { NextApiRequest, NextApiResponse } from 'next';

import products from '../../services/products-list-data.json'

type ResponseData = [
  {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
  },
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // 1. Fetch the actual product data using your chosen method (e.g., file reading, database access)
  const productData = await getProducts();

  // 2. Check if data retrieval was successful
  if (!productData) {
    res.status(500).json({ error: 'Unable to retrieve product data' });
    return;
  }

  // 4. Send the response with the fetched data
  res.status(200).json(productData);
}

async function getProducts(): Promise<ResponseData | null> {
    return products;
  }
