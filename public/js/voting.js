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

                let choices = []
                let title = ''
                let address = []
                let type = ''

                for(let i = 0; i < this.voting.length; i++) {
                        for(let j = 0; j < this.voting[i][0].choices.length; j++)
                        {
                            title = this.voting[i][0].title
                            choices.push(this.voting[i][0].choices[j])
                        }
                }
                for(let i = 0; i < this.users.length; i++) {
                    for(let j = 0; j < this.users[i][1].address.length; j++)
                    {
                        type = this.users[i][0].type
                        address.push(this.users[i][0].address[j])
                    }
                }

/*                for(let i = 0; i < this.users.length; i++) {
                    if(this.users[i][0].type == 'voter') {
                        console.log(this.users[i])
                    }
                }*/

/*                let Accounts = require('web3-eth-accounts');
                let accounts = new Accounts('ws://localhost:8546');
                web3.eth.accounts.create();
                console.log(accounts)*/

                choices.forEach(function(v) {
                    let button = document.createElement('button');
                    //let choiceAdr = window.ethereum.accounts.create();
                    let counter = 0;
                    button.type= 'button';
                    button.className = 'buttons'
                    button.id = v;
                    button.appendChild(document.createTextNode(v));
                    button.onclick = async function() {
                        await fetch("/gateway/voting/set-votes", {
                            method: "post",
                            body:   JSON.stringify([v]),
                            headers: {
                                "content-type": "application/json"
                            }
                        });
                    };
                    document.getElementById("buttons").appendChild(button);
                    document.getElementById("title").innerHTML = title;

                    button.addEventListener('click', () => {
                        ethereum.request({
                            method: 'eth_sendTransaction',
                            params: [
                                {
                                    from: address[0], //needs to be th CURRENT users address
                                    to: v,
                                },
                            ],
                        });
                    })
                    /*button.onclick = function() {
                        counter++
                        alert(v + ' clicked')
                        for (let btn of document.querySelectorAll('.buttons')) {
                            btn.disabled = true;
                        }
                    }*/
                } );
            }
        }
    }


