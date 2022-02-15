import {IService} from "@juice/juice/core/service/IService";
import {Inject} from "@juice/juice/core/decorators/Inject";
import {Remotable} from "@juice/juice/core/gateway/Remotable";
import { Injectable } from "@juice/juice/core/decorators/Injectable";

@Injectable({
    key: "voting",
    name: "Voting Service",
    schema: "service",
    options: {}
})

export class VotingService implements IService{

    options: any;
    choices: any [] = [];

    constructor() {

    }

    async onUpdate(options: any): Promise<boolean> {
        this.options =  options;
        return true;
    }


    @Remotable(["string"])
    public async setChoices(votingChoices) {
        this.choices.push(votingChoices);
    }

    @Remotable([])
    public async getChoices() {
        return this.choices;
    }




}
