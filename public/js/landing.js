module.exports = {
    data() {
        return {
            isAdmin: false,
            users: [],
            availableVotings: [],
        }
    },
    methods: {
        async login() {

            let login = document.getElementById('login').value;

            this.users = await (await fetch("/gateway/validation/fetch-users", {
                method: "post"
            })).json();

            this.availableVotings = await ( await fetch("/gateway/voting/fetch-votings", {
                method: "post"
            })).json();

/*            for (let v = 0; v < this.availableVotings.length; v++) {
                console.log(this.availableVotings[v])
            }*/

/*            let votingIds = []

           for (let v = 0; v < this.availableVotings.length; v++) {
               votingIds.push(this.availableVotings[v]._id)
            }

           for (let u = 0; u < this.validCodes.length; u++)
           {
               for (let id = 0; id < u.length; id++) {
                   this.validCodes.votingId = votingIds[id]
               }
           }*/



            if (login === "" || login.trim() === "") {
                alert("No input");
                return 0;
            }

            for (let i = 0; i < this.users.length; i++) {
                if(login == this.users[i][0].code && this.users[i][0].type == 'admin') {
                    this.isAdmin = true;
                    await this.$router.push({name: 'Admin'})
                }

                for(let j=0; j<this.users[i][0].code.length; j++) {
                    if(login == this.users[i][0].code[j] && this.users[i][0].type == 'voter') {
                        let id = this.users[i][0].votingId
                        await this.$router.push({name: 'Voting', params: {id: id}})
/*                        await fetch("/gateway/validation/remove-user", {
                            method: "post",
                            body:   JSON.stringify(login),
                            headers: {
                                "content-type": "application/json"
                            }
                        });*/
                    }
                }
            }
        },
    }
}
