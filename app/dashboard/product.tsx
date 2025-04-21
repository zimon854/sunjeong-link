'use client';

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import type { Product } from '@/lib/db';
import { deleteProduct } from './actions';

interface ProductProps {
  product: Product;
}

export function Product({ product }: ProductProps) {
  return (
    <div className="flex items-center space-x-4">
      <img
        src={product.imageUrl || '/placeholder.png'}
        alt={product.name}
        className="h-12 w-12 rounded-full"
      />
      <div>
        <h3 className="text-sm font-medium">{product.name}</h3>
        <p className="text-sm text-gray-500">
          {product.stock} in stock
          {product.availableAt && (
            <span className="ml-2">
              Available from {new Date(product.availableAt).toLocaleDateString()}
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
