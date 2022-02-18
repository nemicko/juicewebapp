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

            if (login === "" || login.trim() === "") {
                alert("No input");
                return 0;
            }

            let userFound = false;

            for (let i = 0; i < this.users.length; i++) {
                if(login == this.users[i][0].code && this.users[i][0].type == 'admin') {
                    userFound = true;
                    this.isAdmin = true;
                    await this.$router.push({name: 'Admin'})
                }

                for(let j=0; j<this.users[i][0].code.length; j++) {
                    if(login == this.users[i][0].code[j] && this.users[i][0].type == 'voter') {
                        userFound = true;
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

            if(!userFound) {
                alert('Please enter a valid login code.')
            }
        },
    }
}
