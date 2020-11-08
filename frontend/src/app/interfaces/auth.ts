import { User } from './user';
export interface Auth {
    token: string;
    message: string;
    user?: User;
}
