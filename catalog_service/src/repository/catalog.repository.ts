import { ICatalogRepository } from "../interface/catalog.repository.interface";
import { Product } from "../models/product.model";

export class CatalogRepository implements ICatalogRepository {
  constructor() {}
  create(product: Product): Promise<Product> {
    throw new Error("Method not implemented.");
  }
  findOne(id: number): Promise<Product> {
    throw new Error("Method not implemented.");
  }
  find(): Promise<Product[]> {
    throw new Error("Method not implemented.");
  }
  update(id: number, product: Product): Promise<Product> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
