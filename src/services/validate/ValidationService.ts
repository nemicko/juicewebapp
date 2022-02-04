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
    public async removeCodes() {
        if(this.validCodes == this.usedCodes)
        return 0;
    }

    @Remotable(["string"])
    public async pushValidationCodes(valid_code) {
        this.validCodes.push(valid_code)
        return true;
    }

    @Remotable(["string"])
    public async saveUsedCodes(used_code)
    {
        this.usedCodes.push(used_code)
        return true;
    }
    @Remotable(["string"])
    public async setUsedCodes(set_code)
    {
        this.usedCodes.push(set_code)
        return true;
    }


}
