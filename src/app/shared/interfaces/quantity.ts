import { MealOUT } from './meal';
import { MenuOUT } from './menu';

export interface QuantityOUT {
    id?: number;
    quantity: number;
    meal?: MealOUT;
    menu?: MenuOUT;
}

export interface QuantityIN {
    quantity?: number;
    mealId?: number;
    menuId?: number;
}
