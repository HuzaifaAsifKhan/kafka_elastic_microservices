import { Product } from "../models/product.model";

export interface ICatalogRepository {
  create(product: Product): Promise<Product>;
  findOne(id: number): Promise<Product>;
  find(limit: number, ofset: number): Promise<Product[]>;
  update(product: Product): Promise<Product>;
  delete(id: number): Promise<any>;
}
