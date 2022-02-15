module.exports = {
    data() {
        return {
            validCodes: [],
            votingChoices: []
        }
    },
    methods: {
        async enterVotings(id){
            if (id === 2){
                const choicesNumber = prompt("Enter number of voting choices")
                //save choices in array, send them to backend and then iterate tru the array
                // in voting.vue to add as many buttons as there are items in array
                for(var i = 0; i < choicesNumber; i++) {
                    const choices = prompt("Enter choices")

                    this.votingChoices = await ( await fetch("/gateway/voting/get-choices", {
                        method: "post"
                    })).json();

                    if(this.votingChoices.includes(choices.toLowerCase())){
                        alert("Can't input same choice twice");
                        return 0;
                    }
                    else {
                    await fetch("/gateway/voting/set-choices", {
                        method: "post",
                        body:   JSON.stringify([choices.toLowerCase()]),
                        headers: {
                            "content-type": "application/json"
                        }
                    });
                        this.votingChoices = await ( await fetch("/gateway/voting/get-choices", {
                            method: "post"
                        })).json();
                    }
                }
            }

            else if (id === 3){
                const votingCodes = prompt("Enter valid codes")

                await fetch("/gateway/validation/set-valid-codes", {
                    method: "post",
                    body:   JSON.stringify([votingCodes]),
                    headers: {
                        "content-type": "application/json"
                    }
                });

                this.validCodes = await ( await fetch("/gateway/validation/get-valid-codes", {
                    method: "post"
                })).json();

            }

        },
        async routeVoting(){
            await this.$router.push({name: 'Voting'})
        }

        },
}