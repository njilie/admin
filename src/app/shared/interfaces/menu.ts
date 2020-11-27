import { ImageIN } from './image';
import { MealOUT } from './meal';

export interface MenuOUT {
    id: number;
    description: string;
    label: string;
    priceDF: number;
    status: number;
    imageId: number;
    availableForWeeks: number[];
    meals: MealOUT[];
}

export interface MenuIN {
    description?: string;
    label: string;
    image?: ImageIN;
    priceDF: number;
    availableForWeeks?: number[];
    mealIds?: number[];
}
