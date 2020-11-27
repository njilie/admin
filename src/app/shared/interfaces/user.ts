import { ImageIN } from './image';

export interface User {
  id?: number;
  address?: string;
  wallet: number;
  postalCode?: string;
  registrationDate?: Date | number[];
  email: string;
  isLunchLady?: boolean;
  password?: string;
  name: string;
  firstname: string;
  phone?: string;
  town?: string;
  sex: number;
  status?: number;
  imageId?: number;
  image?: ImageIN;
}

// export interface UserOUT {
//   id: number;
//   address: string;
//   wallet: number;
//   postalCode: string;
//   registrationDate: Date | number[];
//   email: string;
//   isLunchLady: boolean;
//   name: string;
//   firstname: string;
//   phone: string;
//   town: string;
//   sex: number;
//   status: number;
//   imageId: number;
// }

// export interface UserIN {
//   address?: string;
//   wallet: number;
//   postalCode?: string;
//   email: string;
//   isLunchLady?: boolean;
//   password: string;
//   name: string;
//   firstname: string;
//   phone?: string;
//   town?: string;
//   sex?: number;
//   image?: ImageIN;
// }
