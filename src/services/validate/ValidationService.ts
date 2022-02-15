import {IService} from "@juice/juice/core/service/IService";
import {Inject} from "@juice/juice/core/decorators/Inject";
import {Remotable} from "@juice/juice/core/gateway/Remotable";
import { Injectable } from "@juice/juice/core/decorators/Injectable";

@Injectable({
    key: "validation",
    name: "Validation Service",
    schema: "service",
    options: {}
})

export class ValidationService implements IService{

    options: any;
    validCodes: any [] = [];
    usedCodes: any [] = [];
    isValidVoter: boolean;
    votingInfo: {};

    constructor() {

    }

    async onUpdate(options: any): Promise<boolean> {
        this.options =  options;
        return true;
    }


    @Remotable([])
    public async getValidCodes() {
        return this.validCodes;
    }

    @Remotable([])
    public async setFormInfo() {

    }

    @Remotable(["string"])
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
    }


    @Remotable(["string"])
    public async setUsedCodes(pwd)
    {
        if(this.validCodes.includes(pwd)) {

            //this.validCodes = this.validCodes.filter(e => e !== pwd)
            this.isValidVoter = true
            //somehow delete the instance of the code in validCodes
            this.usedCodes.push(pwd)
        }
        else
        {
            return 0;

        }
        return true;
    }


}
