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
  getProduct(id: number) {}
  getProducts(limit: number, offset: number) {}
  async updateProduct(product: Product): Promise<Product> {
    const data = await this._repository.update(product);
    return data;
    //emit event to update record in elastic search
  }
  deleteProduct(id: number) {}
}
