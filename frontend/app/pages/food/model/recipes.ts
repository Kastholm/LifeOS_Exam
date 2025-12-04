export class RecipeModel {
    _id!: string;
    title!: string;
    image!: string;
    description!: any;
    ingredients!: string[];
    tags!: string[];
    category!: string;
    timeEstimate!: number;
    url!: string;
    rating!: number;
}