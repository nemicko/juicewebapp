module.exports = {
    data() {
        return {
            isAdmin: false,
            users: [],
            availableVotings: [],
            userWalletAddress: [],
        }
    },
    mounted:function(){
        this.checkMetamask()
    },
    methods: {
        async checkMetamask(){
            if (typeof window.ethereum === 'undefined'){
                document.getElementById("MMlogin").innerText = 'Metamask not installed'
                return false
            }
            else{
                document.getElementById("MMlogin").addEventListener('click', this.loginMetaMask)
            }
        },

        async loginMetaMask(){
            //gets metamask accounts
            let accounts = [];
            accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
                .catch((e) => {
                    console.error(e.message)
                    return
                })
            if (!accounts) { return }
            else {
                this.userWalletAddress = accounts //account on which we need to send one eth with which the voter will cast their vote
                //also mby store it in used address array so he cant vote twice?

                this.users = await ( await fetch("/gateway/validation/fetch-users", {
                    method: "post"
                })).json();

                let userFound = false;

                //pokusaj sprijecavanja upisivanja duplih adresa :
                for(let i=0; i<this.users.length; i++)
                {
                    if(this.userWalletAddress == this.users[i][0].address[0])
                    {
                        alert("Already stored address");
                        userFound = true;
                        break;
                    }

                }
                if(!userFound) {
                    alert("User stored")
                    //store them in arr, push to object, post to db
                    let usr = [];
                    let newUser = {
                        type: 'voter',
                        address: this.userWalletAddress,
                    }
                    usr.push(newUser);

                    await fetch("/gateway/validation/create-user", {
                        method: "post",
                        body: JSON.stringify([usr]),
                        headers: {
                            "content-type": "application/json"
                        }
                    });

                    //reroute to voting
                    await this.$router.push({name: 'Voting'})
                }

            }
        },

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

            //cheching if inputed code is in db, if it is send it to codesForLinks array - for each instance of code in multiple votings
/*            for(let i = 0; i < this.availableVotings.length; i++) {
                for(let j = 0; j < this.availableVotings[i][0].codes.length; j++) {
                    if(login == this.availableVotings[i][0].codes[j]) {
                        codesForLinks.push(this.availableVotings[i][0].codes)
                    }
                }
            }*/
            console.log(this.users.length)
            for (let i = 0; i < this.users.length; i++) {
                console.log(this.users[i])
                //if inputed code is admin reroute to admin page
                if(login == this.users[i][0].address && this.users[i][0].type == 'admin') {
                    userFound = true;
                    this.isAdmin = true;
                    await this.$router.push({name: 'Admin'})
                }

                //if login code is valid, type is voter and only one code for link, rerout to voting with that id
/*                for(let j=0; j<this.users[i][0].address.length; j++) {
                    if(this.users[i][0].type == 'voter' && codesForLinks.length == 1) {
/!*                        userFound = true;*!/
/!*                        let id = this.users[i][0].votingId*!/
                        await this.$router.push({name: 'Voting'}) /!*, params: {id: id}*!/
/!*                        await fetch("/gateway/validation/remove-user", {
                            method: "post",
                            body:   JSON.stringify(login),
                            headers: {
                                "content-type": "application/json"
                            }
                        });*!/

                    }
/!*                    else if (login == this.users[i][0].address[j] && this.users[i][0].type == 'voter' && codesForLinks.length > 1) {
                        userFound = true;
                        document.getElementById("loginPage").style.display = "none";
                        document.getElementById("links").style.display = "block";
                        //if one code for many votings get their ids and titles
                        for(let i = 0; i < this.availableVotings.length; i++) {
                            for(let j = 0; j < this.availableVotings[i][0].codes.length; j++) {
                                if(login == this.availableVotings[i][0].codes[j]) {
                                    multipleIds.push(this.availableVotings[i]._id)
                                    titles.push(this.availableVotings[i][0].title)
                                }
                            }
                        }
                    }*!/
                }*/
            }
            let uniqTitles = [...new Set(titles)];

            //for every title display link
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
