module.exports = {
    data() {
        return {
            validCodes: [],
        }
    },
    methods: {
        async enterVotings(id){
            if (id === 2){
                const votingChoices = prompt("Enter voting choices")
                //save choices in array, send them to backend and then iterate tru the array
                // in voting.vue to add as many buttons as there are items in array
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

    }
}
