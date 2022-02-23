//const Accounts = require("web3-eth-accounts");
module.exports = {

    data() {
        return {
            voting: [],
            users: [],
            title: ''
        }
    },
    mounted:function(){
        this.choices()
    },
    methods: {
            async choices() {

                this.users = await (await fetch("/gateway/validation/fetch-users", {
                    method: "post"
                })).json();

                this.voting = await ( await fetch("/gateway/voting/fetch-votings", {
                    method: "post"
                })).json();

                let choices = [];
                let title = '';
                let address = [];

                for(let i = 0; i < this.voting.length; i++) {
                    for(let j = 0; j < this.voting[i][0].choices.length; j++)
                    {
                        title = this.voting[i][0].title
                        choices.push(this.voting[i][0].choices[j])
                    }
                }
                for(let i = 0; i < this.users.length; i++) {
                    for(let j = 0; j < this.users[i][0].address.length; j++)
                    {
                        type = this.users[i][0].type
                        address.push(this.users[i][0].address[j])
                    }
                }

                const currentAddr = await window.ethereum.request({ method: 'eth_requestAccounts' })
                    .catch((e) => {
                        console.error(e.message)
                        return
                    })

                choices.forEach(function(v) {
                    let button = document.createElement('button');
                    button.type= 'button';
                    button.className = 'buttons btn btn-lg voting-button'
                    button.id = v;
                    button.appendChild(document.createTextNode(v));
                    button.onclick = async function() {
                        await window.ethereum.request({
                            method: 'eth_sendTransaction',
                            params: [
                                {
                                    from: currentAddr[0], //needs to be the CURRENT users address
                                    to: v, //choice address, get it from button id?
                                    value: web3.utils.toWei('0.0000001', 'ether')

                                },
                            ],
                        });
                    };
                    document.getElementById("buttons").appendChild(button);
                    document.getElementById("title").innerHTML = title;
                });
            }
        }
    }


