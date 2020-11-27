export interface ImageOUT {
    id: number;
    imagePath: string;
    image64: string;
    default: boolean;
}

export interface ImageIN {
    imagePath: string;
    image64: string;
}
