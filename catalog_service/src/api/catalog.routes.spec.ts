import request from "supertest";
import express from "express";
import catalogRoutes, { catalogService } from "./catalog.routes";
import { ProductFactory } from "../utils/fixtures";

const app = express();

app.use(express.json());
app.use("/", catalogRoutes);

const mockProductRequest = (data = {}) => ({
  price: 100,
  stock: 50,
  name: "Sample Product",
  description: "This is a sample product description.",
  ...data,
});

describe("catalogRoutes", () => {
  describe("POST /products", () => {
    it("should create product successfully", async () => {
      const product = ProductFactory.build();
      jest
        .spyOn(catalogService, "createProduct")
        .mockImplementation(() => Promise.resolve(product));
      const response = await request(app)
        .post("/products")
        .send(mockProductRequest())
        .set("Accept", "application/json");
      expect(response.body).toMatchObject(product);
      expect(response.status).toBe(201);
    });

    it("should response with validation error 400 ", async () => {
      const requestBody = mockProductRequest();
      const response = await request(app)
        .post("/products")
        .send({ ...requestBody, name: "" })
        .set("Accept", "application/json");
      expect(response.status).toBe(400);
      expect(response.body).toEqual("name should not be empty");
    });

    it("should response with internal error 500 ", async () => {
      const product = ProductFactory.build();
      const requestBody = mockProductRequest();
      jest
        .spyOn(catalogService, "createProduct")
        .mockImplementation(() =>
          Promise.reject(new Error("unable to create product"))
        );
      const response = await request(app)
        .post("/products")
        .send(requestBody)
        .set("Accept", "application/json");
      expect(response.status).toBe(500);
      expect(response.body).toEqual("unable to create product");
    });
  });

  describe("PATCH /products/:id", () => {
    it("should update product successfully", async () => {
      const product = ProductFactory.build();
      const requestBody = {
        name: product.name,
      };
      jest
        .spyOn(catalogService, "updateProduct")
        .mockImplementation(() => Promise.resolve(product));
      const response = await request(app)
        .patch("/products/1")
        .send(requestBody)
        .set("Accept", "application/json");
      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject(product);
    });

    it("should response with validation error 400 ", async () => {
      const requestBody = mockProductRequest();
      const response = await request(app)
        .patch("/products/1")
        .send({ ...requestBody, price: 1 })
        .set("Accept", "application/json");
      expect(response.status).toBe(400);
      expect(response.body).toEqual("price must not be less than 10");
    });

    it("should response with internal error 500 ", async () => {
      const product = ProductFactory.build();
      const requestBody = mockProductRequest();
      jest
        .spyOn(catalogService, "updateProduct")
        .mockImplementation(() =>
          Promise.reject(new Error("unable to update product"))
        );
      const response = await request(app)
        .patch("/products/1")
        .send(requestBody)
        .set("Accept", "application/json");
      expect(response.status).toBe(500);
      expect(response.body).toEqual("unable to update product");
    });
  });

  describe("GET /products?limit=10&offset=0", () => {
    it("should return products based on limit & offset successfully", async () => {
      const limit = 10;
      const products = ProductFactory.buildList(limit);
      jest
        .spyOn(catalogService, "getProducts")
        .mockImplementation(() => Promise.resolve(products));
      const response = await request(app)
        .get(`/products?limit=${limit}&offset=0`)
        .set("Accept", "application/json");
      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject(products);
    });
  });

  describe("GET /products/:id", () => {
    it("should return a product by id successfully", async () => {
      const product = ProductFactory.build();
      jest
        .spyOn(catalogService, "getProduct")
        .mockImplementation(() => Promise.resolve(product));
      const response = await request(app)
        .get(`/products/1`)
        .set("Accept", "application/json");
      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject(product);
    });
  });

  describe("DELETE /products/:id", () => {
    it("should delete a product by id successfully", async () => {
      const product = ProductFactory.build();
      jest
        .spyOn(catalogService, "deleteProduct")
        .mockImplementation(() => Promise.resolve({ id: product.id }));
      const response = await request(app)
        .delete(`/products/1`)
        .set("Accept", "application/json");
      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject({ id: product.id });
    });
  });
});
