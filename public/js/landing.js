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
            if (!accounts) {
                alert("Please connect to metamask")
            }
            else {
                this.userWalletAddress = accounts

                this.users = await ( await fetch("/gateway/validation/fetch-users", {
                    method: "post"
                })).json();

                let userFound = false;

                for(let i=0; i<this.users.length; i++)
                {
                    if(this.userWalletAddress == this.users[i][0].address[0])
                    {
                        alert("Already stored address");
                        userFound = true;
                        await this.$router.push({name: 'Voting'})
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
                        voted: false
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
            let multipleIds = []
            let titles = []

            for (let i = 0; i < this.users.length; i++) {
                //if inputed code is admin reroute to admin page
                if(login == this.users[i][0].address && this.users[i][0].type == 'admin') {
                    userFound = true;
                    this.isAdmin = true;
                    await this.$router.push({name: 'Admin'})
                }
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
