import {Collection, Model} from "sunshine-dao/lib/Model";

@Collection("votings")
export class Voting extends Model {

    title: string;
    choices: [];
    codes: [];

}


