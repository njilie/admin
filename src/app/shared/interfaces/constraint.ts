export interface Constraint {
    id: number;
    orderTimeLimit: Date; // string
    maximumOrderPerDay: number;
    rateVAT: number;
}