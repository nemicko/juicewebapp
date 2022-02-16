module.exports = {
    data() {
        return {
            validCodes: [],
            votingChoices: [],
            votingTitle: "title",

        }
    },
    methods: {
        async addTitle(){
            var title = document.getElementById('title').value;
        },
        async addChoices() {
            var text = document.getElementById('choices').value;
            this.votingChoices = text.split(',').map(item=>item.trim());
            console.log(this.votingChoices);
        },
        async addCodes() {
            var text = document.getElementById('codes').value;
            this.validCodes = text.split(',').map(item=>item.trim());

            console.log(this.validCodes);
        },
        async routeVoting(){
            await this.$router.push({name: 'Voting'})
        },
        async routeLanding(){
            await this.$router.push({name: 'Landing'})
        }





        /*async enterVotings(id){
            if (id === 2){
                const choicesNumber = prompt("Enter number of voting choices")
                //save choices in array, send them to backend and then iterate tru the array
                // in voting.vue to add as many buttons as there are items in array
                for(var i = 0; i < choicesNumber; i++) {
                    const choices = prompt("Enter choices")
                    
                    await fetch("/gateway/voting/create-voting", {
                        method: "post",
                        body:   JSON.stringify([{choices:choices.toLowerCase()}]),
                        headers: {
                            "content-type": "application/json"
                        }

                    });
                        this.votingChoices = await ( await fetch("/gateway/voting/fetch-votings", {
                            method: "post"
                        })).json();

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
        },
        async routeLanding(){
            await this.$router.push({name: 'Landing'})
        }

        },*/
    }
}
