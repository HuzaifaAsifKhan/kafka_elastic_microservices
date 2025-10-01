import { ICatalogRepository } from "../interface/catalog.repository.interface";
import { Product } from "../models/product.model";

export class CatalogService {
  private _repository: ICatalogRepository;
  constructor(respositoy: ICatalogRepository) {
    this._repository = respositoy;
  }

  async createProduct(product: Product): Promise<Product> {
    const data = await this._repository.create(product);
    if (!data.id) {
      throw new Error("unable to create product");
    }
    return data;
  }
  async getProduct(id: number): Promise<Product> {
    const data = await this._repository.findOne(id);
    if (!data.id) {
      throw new Error("unable to fetch a product");
    }
    return data;
  }
  async getProducts(limit: number, offset: number): Promise<Product[]> {
    const data = await this._repository.find(limit, offset);
    if (!data.length) {
      throw new Error("unable to fetch products");
    }
    return data;
  }
  async updateProduct(product: any): Promise<Product> {
    const data = await this._repository.update(product);
    if (!data.id) {
      throw new Error("unable to update product");
    }
    return data;
    //emit event to update record in elastic search
  }
  async deleteProduct(id: number) {
    const data = await this._repository.delete(id);
    if (!data.id) {
      throw new Error("unable to delete a product");
    }
    return data;
  }
}
