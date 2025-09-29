import { ICatalogRepository } from "../interface/catalog.repository.interface";
import { Product } from "../models/product.model";

export class MockCatalogRepository implements ICatalogRepository {
  constructor() {}
  create(product: Product): Promise<Product> {
    const mockProduct: Product = { ...product, id: 1 };
    return Promise.resolve(mockProduct);
  }
  findOne(id: number): Promise<Product> {
    throw new Error("Method not implemented.");
  }
  find(): Promise<Product[]> {
    throw new Error("Method not implemented.");
  }
  update(product: Product): Promise<Product> {
    const mockProduct: Product = { ...product };
    return Promise.resolve(mockProduct);
  }
  delete(id: number): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
