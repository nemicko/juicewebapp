import {Collection, Model} from "sunshine-dao/lib/Model";

@Collection("users")
export class Admin extends Model {
    type: string;
    code: [];
}
