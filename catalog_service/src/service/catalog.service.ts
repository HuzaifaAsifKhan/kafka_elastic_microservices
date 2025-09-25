import { ICatalogRepository } from "../interface/catalog.repository.interface";
import { Product } from "../models/product.model";

export class CatalogService {
  private _repository: ICatalogRepository;
  constructor(respositoy: ICatalogRepository) {
    this._repository = respositoy;
  }

  createProduct() {}
  getProduct(id: number) {}
  getProducts(limit: number, offset: number) {}
  updateProduct() {}
  deleteProduct(id: number) {}
}
