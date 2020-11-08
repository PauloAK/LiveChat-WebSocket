import { Message } from './message';

export interface Chat {
    id: number;
    name : string;
    user_id : number;
    messages : Array<Message>;
}
