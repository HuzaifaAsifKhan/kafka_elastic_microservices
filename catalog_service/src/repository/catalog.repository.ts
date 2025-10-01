import { ICatalogRepository } from "../interface/catalog.repository.interface";
import { Product } from "../models/product.model";

export class CatalogRepository implements ICatalogRepository {
  constructor() {}
  async create(product: Product): Promise<Product> {
    throw new Error("Method not implemented.");
  }
  async findOne(id: number): Promise<Product> {
    throw new Error("Method not implemented.");
  }
  async find(limit: number, ofset: number): Promise<Product[]> {
    throw new Error("Method not implemented.");
  }
  async update(product: Product): Promise<Product> {
    throw new Error("Method not implemented.");
  }
  async delete(id: number): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
