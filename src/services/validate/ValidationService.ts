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
    validCodes: [] = [];
    usedCodes: [] = [];
    //votingEnab = false;

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
    public async getUsedCodes() {
        return this.usedCodes;
    }

    @Remotable(["string"])
    public async pushValidationCodes(valid_code)
    {
        /*if(this.votingEnab == true){
            this.validCodes.pop(valid_code)
        }
        else {
            this.validCodes.push(valid_code)
        }*/
        this.validCodes.push(valid_code)
        return true;
    }

    @Remotable(["string"])
    public async saveUsedCodes(entered_code)
    {
        this.usedCodes.push(entered_code)

        return true;
    }

    @Remotable(["string", "string"])
    public async vote(vote, entered_code) {
        this.votes.push({
            vote: vote,
            voter: entered_code,
        });
        return true;
    }


}
