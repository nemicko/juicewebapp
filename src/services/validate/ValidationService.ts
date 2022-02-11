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
    public async setValidCodes(codes) {
        this.validCodes.push(codes)
        return true;
    }


    @Remotable(["string"])
    public async setPermissions(pwd)
    {
        if(this.validCodes.includes(pwd)) {
            this.usedCodes.push({
                pwd: pwd,
                perm: 'guest'
            })
        }
        else
        {
            return 0;

        }
        return true;
    }

    @Remotable([])
    public async getPermissions()
    {

        return this.usedCodes.map(per => per.perm);
    }



    /*@Remotable(["string"])
    public async validateCode(code)
    {
        for (int i in this.votings){
            if (this.votings[i].code != code){
                this.votingEnab = true;
            }
        }
    }*/




/*    @Remotable([])
    public async getVotings() {
        return this.votings.name;
    }*/




}
