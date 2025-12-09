export class CategoryModel {
    _id!: string;
    name!: string;
}

export class LocationModel {
    _id!: string;
    name!: string;
}

export class ItemModel {
    _id!: string;
    name!: string;
    quantity!: number;
    category!: CategoryModel;
    location!: LocationModel;
    description!: string;
    value!: number;
    forSale!: boolean;
    image!: string;
    purchaseDate!: string;
    purchasePrice!: number;
}