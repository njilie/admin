import { Quantity } from './quantity';
import { User } from './user';

export interface Order {
    id: number;
    creationDate: Date; // string
    creationTime: number;
    user: User;
    quantity: Quantity[];
    constraintId?: number;
}
