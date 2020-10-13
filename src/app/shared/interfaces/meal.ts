import { Ingredient } from './ingredient';

export interface Meal {
    id: number;
    label: string;
    priceDF: number;
    status: number;
    imageId: number;
    availableForWeeks: number[];
    ingredients: Ingredient[];
}
