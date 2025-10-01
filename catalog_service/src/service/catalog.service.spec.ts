import { ICatalogRepository } from "../interface/catalog.repository.interface";
import { Product } from "../models/product.model";
import { MockCatalogRepository } from "../repository/mock.catalog.repository";
import { CatalogService } from "./catalog.service";
import {Factory} from  'rosie'



const productFactory = new Factory()
.attr("id", 1)
.attr("name", "Sample Product")
.attr("description", "This is a sample product description.")
.attr("price", 100)
.attr("stock", 50);


const mockProduct = (data = {}) => ({
  price: 100,
  stock: 50,
  name: "Sample Product",
  description: "This is a sample product description.",
  ...data,
});

describe("catalogService", () => {
  let repository: ICatalogRepository;
  let service: CatalogService;
  beforeEach(() => {
    repository = new MockCatalogRepository();
    service = new CatalogService(repository);
  });

  describe("createProduct", () => {
    it("should create a product successfully", async () => {
      const body = mockProduct({});
      const product = await service.createProduct(body);
      expect(product).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        description: expect.any(String),
        price: expect.any(Number),
        stock: expect.any(Number),
      });
    });

    it("should fail to create a product & throw error 'product already exsit'", async () => {
      const body = mockProduct({});
      jest
        .spyOn(repository, "create")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("product already exsit"))
        );
      await expect(service.createProduct(body)).rejects.toThrow(
        "product already exsit"
      );
    });
  });

  describe("updateProduct", () => {
    it("should update product successfully", async () => {
      const body = mockProduct({ id: 1 });
      const product = await service.updateProduct(body);
      expect(product).toMatchObject(body);
    });

    it("should fail to create a product & throw error 'product does not exsit'", async () => {
      const body = mockProduct({ id: 1 });
      jest
        .spyOn(repository, "update")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("product does not exsit"))
        );
      await expect(service.updateProduct(body)).rejects.toThrow(
        "product does not exsit"
      );
    });
  });

  describe('getProducts',()=>{
    it('should return list of products',async()=>{
      const limit = 10;
      const returnProducts = productFactory.buildList(limit);
      jest.spyOn(repository,'find').mockImplementation(() => Promise.resolve(returnProducts));
      const products = await service.getProducts(limit,0);
      expect(products.length).toEqual(limit)
      expect(products).toMatchObject(returnProducts)
    })

    it("should fail to fetch products & throw error 'products does not exsit'", async () => {
      jest
        .spyOn(repository, "find")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("products does not exsit"))
        );
      await expect(service.getProducts(0,0)).rejects.toThrow(
        "products does not exsit"
      );
    });
  })

  describe('getProduct',()=>{
    it('should return product by id',async()=>{
      const returnProduct = productFactory.build();
      jest.spyOn(repository,'findOne').mockImplementation(() => Promise.resolve(returnProduct));
      const product = await service.getProduct(1);
      expect(product).toMatchObject(returnProduct)
    })
  })

  describe('deleteProduct',()=>{
    it('should delete a product by id',async()=>{
      const produtId = 1;
      jest.spyOn(repository,'delete').mockImplementation(() => Promise.resolve(produtId));
      const product = await service.deleteProduct(1);
      expect(product).toEqual(produtId)
    })
  })

  afterEach(() => {
    repository = {} as MockCatalogRepository;
    service = {} as CatalogService;
    jest.restoreAllMocks(); // resets spies/mocks
  });
});
