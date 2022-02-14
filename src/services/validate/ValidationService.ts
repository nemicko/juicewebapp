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
    public async removeValidCodes(code) {
        console.log('Not removed')
        console.log(this.validCodes)
        this.validCodes = this.validCodes.filter(e => e !== code);
        console.log('Removed')
        console.log(this.validCodes)
        return true;
    }
}
