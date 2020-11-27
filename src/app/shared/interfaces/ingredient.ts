import { ImageIN } from './image';

export interface IngredientOUT {
    id: number;
    description: string;
    label: string;
    status: number;
    imageId: number;
}

export interface IngredientIN {
    description?: string;
    label: string;
    image: ImageIN;
}
