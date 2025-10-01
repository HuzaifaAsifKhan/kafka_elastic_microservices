import { Factory } from "rosie";
import { Product } from "../../models/product.model";

export const ProductFactory = new Factory<Product>()
  .attr("id", 1)
  .attr("name", "Sample Product")
  .attr("description", "This is a sample product description.")
  .attr("price", 100)
  .attr("stock", 50);
