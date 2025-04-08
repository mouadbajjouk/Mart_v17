import { Enum } from "./enum";

export interface Product {
  id?: string;
  name?: string;
  categoryId?: number;
  price?: number;
  description?: string;
  imageFiles?: File[];
  quantity?: number;
  sku?: string;
  barcode?: string;
  inventoryStatus?: string;
}
