//const Accounts = require("web3-eth-accounts");
module.exports = {

    data() {
        return {
            voting: [],
            users: [],
            title: '',
            votings: [],
        }
    },
    mounted:function(){
        this.choices()
    },
    methods: {
            async choices() {

                const abi = await (await fetch("/js/Voting.json")).json();

                const web3 = new Web3(window.ethereum);
                const votingContract = await new web3.eth.Contract(abi.abi, "0x6905915e0a77E78d94b3d71a9B718e272F1f7fcC");

                let accounts = [];
                accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
                    .catch((e) => {
                        console.error(e.message)
                        return
                    })

                let response = await votingContract.methods
                    .availableVotings()  //function in contract
                    .call();
                console.log("response: ", response);

                //this.votings = response.args // args iz kojeg izvuces votings nekako??


                /*for(let i = 0; i < this.voting.length; i++) {

                    if(this.voting[i][0].address){
                        choiceAddress.push(this.voting[i][0].address)
                    }
                    else {
                        console.log('Nema adresu')
                    }

                }
                //console.log(choiceAddress)
                for(let i = 0; i < this.users.length; i++) {
                    for(let j = 0; j < this.users[i][0].address.length; j++)
                    {
                        type = this.users[i][0].type
                        userAddress.push(this.users[i][0].address[j])
                    }
                }*/

/*                for(let i = 0; i < this.users.length; i++) {
                    if(this.users[i][0].type == 'voter') {
                        console.log(this.users[i])
                    }
                }*/

                /*for (let i = 0; i < choices.length; i++){
                    let button = document.createElement('button');
                    let counter = 0;
                    button.type= 'button';
                    button.className = 'buttons btn btn-lg voting-button'
                    button.id = choiceAddress[i];
                    button.appendChild(document.createTextNode(choices[i]));
                    button.onclick = async function() {
                        await window.ethereum.request({
                            method: 'eth_sendTransaction',
                            params: [
                                {
                                    from: currentAddr[0], //needs to be the CURRENT users address
                                    to: choiceAddress[i], //choice address, get it from button id?
                                    value: web3.utils.toWei('0.0000001', 'ether')

                                },
                            ],
                        });
                    };
                    document.getElementById("buttons").appendChild(button);
                    document.getElementById("title").innerHTML = title;
                }*/




                /*
                console.log(choices)
                console.log(choiceAddress)

                choices.forEach(function(v) {
                    let button = document.createElement('button');
                    let counter = 0;
                    button.type= 'button';
                    button.className = 'buttons btn btn-lg voting-button'

                    for (let i = 0; i < choiceAddress.length; i++){
                        button.id = choiceAddress[i];
                    }

                    button.appendChild(document.createTextNode(v));
                    button.onclick = async function() {
                        await window.ethereum.request({
                            method: 'eth_sendTransaction',
                            params: [
                                {
                                    from: currentAddr[0], //needs to be the CURRENT users address
                                    to: button.id, //choice address, get it from button id?
                                    value: web3.utils.toWei('0.0000001', 'ether')

                                },
                            ],
                        });
                    };
                    document.getElementById("buttons").appendChild(button);
                    document.getElementById("title").innerHTML = title;

                    /*button.onclick = function() {
                        counter++
                        alert(v + ' clicked')
                        for (let btn of document.querySelectorAll('.buttons')) {
                            btn.disabled = true;
                        }
                    }
                } );*/

            }
        }
    }


