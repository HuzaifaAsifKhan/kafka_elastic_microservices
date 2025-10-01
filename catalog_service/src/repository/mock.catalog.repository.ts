import { ICatalogRepository } from "../interface/catalog.repository.interface";
import { Product } from "../models/product.model";

export class MockCatalogRepository implements ICatalogRepository {
  constructor() {}
  create(product: Product): Promise<Product> {
    const mockProduct: Product = { ...product, id: 1 };
    return Promise.resolve(mockProduct);
  }
  async findOne(id: number): Promise<Product> {
    return await Promise.resolve({} as Product);
  }
  async find(limit:number, offset:number): Promise<Product[]> {
    return await Promise.resolve([]);
  }
  update(product: Product): Promise<Product> {
    const mockProduct: Product = { ...product };
    return Promise.resolve(mockProduct);
  }
  delete(id: number): Promise<any> {
    return Promise.resolve(id)
  }
}
