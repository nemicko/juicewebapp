module.exports = {

    data() {
        return {
            voting: [],
            users: [],
            votes: {},
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

                let id = this.$route.params.id
                let choices = []

                for(let i = 0; i < this.voting.length; i++) {
                    if(this.voting[i]._id == id)
                    {
                        for(let j = 0; j < this.voting[i][0].choices.length; j++)
                        {
                            choices.push(this.voting[i][0].choices[j])
                        }
                    }
                }

                choices.forEach(function(v) {
                    let button = document.createElement('button');
                    button.type= 'button';
                    button.appendChild(document.createTextNode(v));
                    button.id = v;
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

                } );


/*                console.log('Users')
                for (let i = 0; i < this.users.length; i++) {
                            console.log(this.users[i][0].votingId)
                }

                console.log('Votings')
                for(let i = 0; i < this.votingChoices.length; i++) {
                    console.log(this.votingChoices[i])
                }*/

/*                this.votingChoices.forEach(function(v) {
                    let button = document.createElement('button');
                    button.type= 'button';
                    button.appendChild(document.createTextNode(v));
                    button.id = v;
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

                } );*/



            }
        }
    }

