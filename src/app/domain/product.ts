import { AppFile } from "./appFile";

export interface Product {
  id?: string;
  name?: string;
  categoryId?: number;
  price?: number;
  description?: string;
  imageFiles?: AppFile[];
  quantity?: number;
  sku?: string;
  barCode?: string;
  inventoryStatus?: string;
}
