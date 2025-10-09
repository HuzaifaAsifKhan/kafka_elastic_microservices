import { ICatalogRepository } from "../interface/catalog.repository.interface";
import { Product } from "../models/product.model";
import { PrismaClient } from "../generated/prisma";

export class CatalogRepository implements ICatalogRepository {
  prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  async create(product: Product): Promise<Product> {
    return this.prisma.product.create({ data: product });
  }
  async findOne(id: number): Promise<Product> {
    const product = await this.prisma.product.findFirst({ where: { id } });
    if (product) {
      return Promise.resolve(product);
    }
    throw new Error("unable to fetch a product");
  }
  async find(limit: number, offset: number): Promise<Product[]> {
    return this.prisma.product.findMany({ skip: offset, take: limit });
  }
  async update(product: Product): Promise<Product> {
    return this.prisma.product.update({
      where: { id: product.id },
      data: product,
    });
  }
  async delete(id: number): Promise<any> {
    return this.prisma.product.delete({ where: { id } });
  }
}
