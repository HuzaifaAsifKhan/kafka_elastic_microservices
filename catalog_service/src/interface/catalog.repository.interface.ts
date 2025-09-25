import { Product } from "../models/product.model";

export interface ICatalogRepository {
  create(product: Product): Promise<Product>;
  findOne(id: number): Promise<Product>;
  find(): Promise<Product[]>;
  update(id: number, product: Product): Promise<Product>;
  delete(id: number): Promise<any>;
}
