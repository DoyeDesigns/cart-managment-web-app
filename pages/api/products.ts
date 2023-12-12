import type { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';

import products from '../../services/products-list-data.json'
import ProductsList from '@/components/productCard';

// type ResponseData = | {
//   product: {
//     id: number;
//     name: string;
//     price: number;
//     description: string;
//     image: string;
//   };
// } | { error: string };

// type ResponseData = | {
//   products: [{
//         id: number;
//         name: string;
//         price: number;
//         description: string;
//         image: string;
//       }];
//   } | { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const file = await fs.readFile(process.cwd() + '/app/data.json', 'utf8');
  const data = JSON.parse(file);
}

