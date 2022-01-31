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
    votes: [] = [];

    constructor() {

    }

    async onUpdate(options: any): Promise<boolean> {
        this.options =  options;
        return true;
    }

    @Remotable([])
    public async getVotes() {
        return this.votes;
    }

    @Remotable(["string", "string"])
    public async vote(vote, voter) {
        this.votes.push({
            vote: vote,
            voter: voter,
        });
        return true;
    }
}
