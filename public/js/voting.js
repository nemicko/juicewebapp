//const Accounts = require("web3-eth-accounts");
const {numberToHex} = require("web3-utils");
module.exports = {

    data() {
        return {
            users: [],
            title: '',
            votings: [{
                name: string,
                id: string,
            }]

        }
    },
    mounted:function(){
        this.choices()
    },
    methods: {
            async choices() {

                const abi = await (await fetch("/js/Voting.json")).json();

                const web3 = new Web3(window.ethereum);
                const votingContract = await new web3.eth.Contract(abi.abi, "0x3d8533e4ea8D1d6fA0b033c89Fc8240EcfE75bd3");

                let accounts = [];
                accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
                    .catch((e) => {
                        console.error(e.message)
                        return
                    })

                let response = await votingContract.methods
                    .availableVotings()  //function in contract
                    .call();
                console.log("response: ", response[0].name);

                for(let i = 0; i < response.length; i++){
                    this.votings.id = response[i].id
                }

                for(let i = 0; i < response.length; i++){
                    this.votings.name = response[i].name
                }


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


