import { QuantityIN, QuantityOUT } from './quantity';
import { User /*UserOUT*/ } from './user';

export interface OrderOUT {
    id: number;
    creationDate: Date; // string
    creationTime: number;
    status: number;
    user: User /*UserOUT*/;
    userId: number;
    quantity: QuantityOUT[];
    constraintId: number;
}

export interface OrderIN {
    userId: number;
    constraintId: number;
    quantity: QuantityIN[];
}
