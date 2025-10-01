import { ICatalogRepository } from "../interface/catalog.repository.interface";
import { Product } from "../models/product.model";

export class CatalogService {
  private _repository: ICatalogRepository;
  constructor(respositoy: ICatalogRepository) {
    this._repository = respositoy;
  }

  async createProduct(product: Product): Promise<Product> {
    return await this._repository.create(product);
  }

  async getProduct(id: number): Promise<Product> {
    return await this._repository.findOne(id);
  }

  async getProducts(limit: number, offset: number):Promise<Product[]> {
    return await this._repository.find(limit, offset);
  }

  async updateProduct(product: Product): Promise<Product> {
    const data = await this._repository.update(product);
    return data;
    //emit event to update record in elastic search
  }
  async deleteProduct(id: number) {
    return await this._repository.delete(id);
  }
}
