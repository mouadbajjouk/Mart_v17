import { AppFile } from '../../../../domain/appFile';

export interface Cart {
  id: string;
  name: string;
  price: number;
  quantity: number;
  images: AppFile[];
}
