import express, { NextFunction, Request, Response } from "express";
import { CatalogService } from "../service/catalog.service";
import { CatalogRepository } from "../repository/catalog.repository";
import { RequestValidator } from "../utils/requestValidator";
import { createProductRequest, UpdateProductRequest } from "../dto/product.dto";
const router = express.Router();

const repository = new CatalogRepository();
export const catalogService = new CatalogService(repository); //we are using that in testing thats why we are exporting that

// router.get("/health", (req: Request, res: Response, next: NextFunction) => {
//   return res.status(200).json({ message: "Catalog Service is healthy" });
// });

router.post(
  "/products",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { errors, input } = await RequestValidator(
        createProductRequest,
        req.body
      );
      if (errors) return res.status(400).json(errors);
      const data = await catalogService.createProduct(input);
      return res.status(201).json(data);
    } catch (error) {
      return res.status(500).json((error as Error).message);
    }
  }
);

router.patch(
  "/products/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { errors, input } = await RequestValidator(
        UpdateProductRequest,
        req.body
      );

      const id = parseInt(req.params.id);
      if (errors) return res.status(400).json(errors);
      const data = await catalogService.updateProduct({ ...input, id });
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json((error as Error).message);
    }
  }
);

router.get(
  "/products",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const limit = Number(req.query.limit) || 10;
      const offset = Number(req.query.offset) || 0;
      const data = await catalogService.getProducts(limit, offset);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json((error as Error).message);
    }
  }
);

router.get(
  "/products/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const data = await catalogService.getProduct(id);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json((error as Error).message);
    }
  }
);

router.delete(
  "/products/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const data = await catalogService.deleteProduct(id);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json((error as Error).message);
    }
  }
);

export default router;
