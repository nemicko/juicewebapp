module.exports = {
    data() {
        return {
            votingChoices: [],
            votes: []
        }
    },
    mounted: function () {
        this.choices()
    },
    methods: {
        async choices() {
            this.votingChoices = await (await fetch("/gateway/voting/get-choices", {
                method: "post"
            })).json();

                this.votingChoices.forEach( function(v) {
                    var button= document.createElement('button');
                    button.type= 'button';
                    button.appendChild(document.createTextNode(v));
                    //button.setAttribute('onClick', v.press());
                    document.getElementById("buttons").appendChild(button);
                    button.id = v;
                    button.onclick = function() {
                        this.votes.push(v);
                        console.log(this.votes)
                    };

                } );
            },

        }
    }


