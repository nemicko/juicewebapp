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
    votings: [] = [];
    votingEnab: boolean;

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

    @Remotable(["string"])
    public async validateCode(code)
    {
        for (int i in this.votings){
            if (this.votings[i].code != code){
                this.votingEnab = true;
            }
        }
    }

    @Remotable([])
    public async getUsedCodes() {
        return this.usedCodes;
    }


    @Remotable(["string"])
    public async pushVotings(votingName, votingId,votingChoice, validCodes) {
        this.votings.push({
            name: votingName,
            id: votingId,
            choice: votingChoice,
            code: validCodes
        });
        return true;
    }

    @Remotable([])
    public async getVotings() {
        return this.votings.name;
    }


    @Remotable(["string"])
    public async setUsedCodes(set_code)
    {
        this.usedCodes.push(set_code)
        return true;
    }


}
