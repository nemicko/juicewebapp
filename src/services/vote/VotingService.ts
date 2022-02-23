import {IService} from "@juice/juice/core/service/IService";
import {Inject} from "@juice/juice/core/decorators/Inject";
import {Remotable} from "@juice/juice/core/gateway/Remotable";
import { Injectable } from "@juice/juice/core/decorators/Injectable";
import {Voting} from "./Voting";

@Injectable({
    key: "voting",
    name: "Voting Service",
    schema: "service",
    options: {}
})

export class VotingService implements IService {

    options: any;
    choices: any [] = [];
    votes: any [] = [];
    counter: {};

    constructor() {}

    async onUpdate(options: any): Promise<boolean> {
        this.options = options;
        return true;
    }

    @Remotable(["json"])
    public async createVoting(data: any) {
            let t = new Voting();
            Object.assign(t,data);
            await t.save();
    }

    @Remotable([])
    public async fetchVotings() {
        return await Voting.find({}).toArray();
    }

    @Remotable(["string"])
    public async setChoices(votingChoices) {
        this.choices.push(votingChoices);
    }

    @Remotable([])
    public async getChoices() {
        return this.choices;
    }

    @Remotable(["string"])
    public async setVotes(vote) {
        this.votes.push(vote);
    }


    @Remotable([])
    public async setCounter() {
        this.counter= null
        return this.counter;
    }
}
