import express, { NextFunction, Request, Response } from "express";
const router = express.Router();

router.get("/health", (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ message: "Catalog Service is healthy" });
});

export default router;
