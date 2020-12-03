export interface ConstraintOUT {
    id: number;
    orderTimeLimit: Date | string; // string
    maximumOrderPerDay: number;
    rateVAT: number;
}

export interface ConstraintIN {
    orderTimeLimit: string;
    maximumOrderPerDay: number;
    rateVAT: number;
}
