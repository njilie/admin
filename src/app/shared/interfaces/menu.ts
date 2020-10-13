import { Meal } from './meal';

export interface Menu {
    id: number;
    label: string;
    priceDF: number;
    status: number;
    imageId: number;
    availableForWeeks: number[];
    meals: Meal[];
}
