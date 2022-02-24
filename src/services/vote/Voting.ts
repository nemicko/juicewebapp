import {Collection, Model} from "sunshine-dao/lib/Model";

@Collection("votings")
export class Voting extends Model {
    title: string;
    id: number;
    choices: [{
        name: string,
        address: string
    }];
}


