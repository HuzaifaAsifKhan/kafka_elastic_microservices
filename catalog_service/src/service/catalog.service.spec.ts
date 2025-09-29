import { ICatalogRepository } from "../interface/catalog.repository.interface";
import { Product } from "../models/product.model";
import { MockCatalogRepository } from "../repository/mock.catalog.repository";
import { CatalogService } from "./catalog.service";

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

  afterEach(() => {
    repository = {} as MockCatalogRepository;
    service = {} as CatalogService;
    jest.restoreAllMocks(); // resets spies/mocks
  });
});
