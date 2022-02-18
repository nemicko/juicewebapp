import {IService} from "@juice/juice/core/service/IService";
import {Inject} from "@juice/juice/core/decorators/Inject";
import {Remotable} from "@juice/juice/core/gateway/Remotable";
import { Injectable } from "@juice/juice/core/decorators/Injectable";
import {Admin} from "./Admin";
import {Voting} from "../vote/Voting";

@Injectable({
    key: "validation",
    name: "Validation Service",
    schema: "service",
    options: {}
})

export class ValidationService implements IService{

    options: any;
/*    validCodes: any [] = [];*/
/*    usedCodes: any [] = [];
    isValidVoter: boolean;*/

    constructor() {}

    async onUpdate(options: any): Promise<boolean> {
        this.options =  options;
        return true;
    }

    @Remotable(["json"])
    public async createUser(data: any) {
        let t = new Admin();
        Object.assign(t,data);
        await t.save();
    }

    @Remotable([])
    public async fetchUsers() {
        return await Admin.find({}).toArray();
    }

/*    @Remotable(["json"])
    public async removeUser(code: any) {
        console.log('radim')
    }*/


    /*
        @Remotable([])
        public async getValidCodes() {
            return this.validCodes;
        }
    */

/*    @Remotable([])
    public async setFormInfo() {

    }*/

/*    @Remotable(["string"])
    public async setValidCodes(codes) {
        if(codes === "" || codes.trim() === "") {
            return false;
        } else {
            this.validCodes.push(codes);
            return true;
        }
    }

    @Remotable(["string"])
    public async removeValidCodes(code) {
        this.validCodes = this.validCodes.filter(e => e !== code);
        return true;
    }*/
}
