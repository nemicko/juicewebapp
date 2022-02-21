import {Collection, Model} from "sunshine-dao/lib/Model";

@Collection("users")
export class User extends Model {
    type: string;
    address: [];
}
