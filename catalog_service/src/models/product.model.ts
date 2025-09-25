export class Product {
  constructor(
    public readonly price: number,
    public readonly stock: number,
    public readonly name: string,
    public readonly description: string,
    public readonly id?: number
  ) {}
}
