import {IService} from "@juice/juice/core/service/IService";
import {Inject} from "@juice/juice/core/decorators/Inject";
import {Remotable} from "@juice/juice/core/gateway/Remotable";
import { Injectable } from "@juice/juice/core/decorators/Injectable";
import {User} from "./User";
import {Voting} from "../vote/Voting";

@Injectable({
    key: "validation",
    name: "Validation Service",
    schema: "service",
    options: {}
})

export class ValidationService implements IService{

    options: any;

    constructor() {}

    async onUpdate(options: any): Promise<boolean> {
        this.options =  options;
        return true;
    }

    @Remotable(["json"])
    public async createUser(data: any) {
        let t = new User();
        Object.assign(t,data);
        await t.save();
    }

    @Remotable([])
    public async fetchUsers() {
        return await User.find({}).toArray();
    }
}
