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

            document.getElementById("loginPage").style.display = "block";
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
            let codesForLinks = []
            let multipleIds = []
            let titles = []

            for(let i = 0; i < this.availableVotings.length; i++) {
                for(let j = 0; j < this.availableVotings[i][0].codes.length; j++) {
                    if(login == this.availableVotings[i][0].codes[j]) {
                        codesForLinks.push(this.availableVotings[i][0].codes)
                    }
                }
            }

            for (let i = 0; i < this.users.length; i++) {
                if(login == this.users[i][0].code && this.users[i][0].type == 'admin') {
                    userFound = true;
                    this.isAdmin = true;
                    await this.$router.push({name: 'Admin'})
                }

                for(let j=0; j<this.users[i][0].code.length; j++) {
                    if(login == this.users[i][0].code[j] && this.users[i][0].type == 'voter' && codesForLinks.length == 1) {
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
                    } else if (login == this.users[i][0].code[j] && this.users[i][0].type == 'voter' && codesForLinks.length > 1) {
                        userFound = true;
                        document.getElementById("loginPage").style.display = "none";
                        document.getElementById("links").style.display = "block";

                        for(let i = 0; i < this.availableVotings.length; i++) {
                            for(let j = 0; j < this.availableVotings[i][0].codes.length; j++) {
                                if(login == this.availableVotings[i][0].codes[j]) {
                                    multipleIds.push(this.availableVotings[i]._id)
                                    titles.push(this.availableVotings[i][0].title)
                                }
                            }
                        }
                    }
                }
            }
            let uniqTitles = [...new Set(titles)];

            for(let i = 0; i < uniqTitles.length; i++) {
                let links = document.createElement('a');
                links.appendChild(document.createTextNode(uniqTitles[i]));
                links.href = '/#/voting/' + multipleIds[i];
                links.style = 'display: block';
                document.getElementById("links").appendChild(links);
            }



            if(!userFound) {
                alert('Please enter a valid login code.')
            }
        },
    }
}
