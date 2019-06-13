export class Product {
  public id: number;
  public category_id: number;
  public name: string;
  public image: string;
  public price: number;
  public description: string;
  public allergens: number[];


  constructor(id: number, category_id: number, name: string, image: string, price: number, description: string, allergens: string) {
    this.id = id;
    this.category_id = category_id;
    this.name = name;
    this.image = image;
    this.price = price;
    this.description = description;
    this.allergens = allergens.split(',').map(Number);
  }
}
