module.exports = {
    data() {
        return {
            validCodes: [],
            votingChoices: [],
            votingTitle: "title",
            users: [],
            type: 'type',
            code: [],
        }
    },
    methods: {

        async addChoices() {
            var text = document.getElementById('choices').value;
            this.votingChoices = text.split(',').map(item=>item.trim());
        },
        async addCodes() {
            var text = document.getElementById('codes').value;
            this.validCodes = text.split(',').map(item=>item.trim());
        },
        async finishEntry(){
            var title = document.getElementById('title').value;
            this.votingTitle = title;

            if(this.validCodes.length == 0 || this.validCodes === undefined){
                alert("unadded code enries")
            }
            else if(this.votingChoices.length == 0 || this.validCodes === undefined){
                alert("unadded choices enries")
            }
            else if (this.votingTitle == ""){
                alert("missing title")
            }
            else {
                let arr = [];
                let usr = [];
                let vote = {
                    title: this.votingTitle,
                    choices: this.votingChoices,
                    codes: this.validCodes,
                }
                let users = {
                    type: 'voter',
                    code: this.validCodes
                }
                arr.push(vote);
                usr.push(users);

                await fetch("/gateway/voting/create-voting", {
                    method: "post",
                    body:   JSON.stringify([arr]),
                    headers: {
                        "content-type": "application/json"
                    }

                });

                await fetch("/gateway/validation/create-user", {
                    method: "post",
                    body:   JSON.stringify([usr]),
                    headers: {
                        "content-type": "application/json"
                    }

                });
                var form = document.getElementsByName('form')[0];
                form.reset();
                this.votingTitle = "";
                this.validCodes = [];
                this.votingChoices = [];
            }
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
        }

        },*/
    }
}
