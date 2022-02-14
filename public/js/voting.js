module.exports = {
    data() {
        return {
            votingChoices: [],
        }
    },
    mounted:function(){
        this.choices()
    },
    //mounted: this.choices(),
    methods: {
            async choices() {
                this.votingChoices = await ( await fetch("/gateway/voting/get-choices", {
                    method: "post"
                })).json();

                this.votingChoices.forEach( function(v) {
                    var button= document.createElement('button');
                    button.type= 'button';
                    button.appendChild(document.createTextNode("Vote"));
                    //button.setAttribute('onClick',v.press);
                    document.getElementById("buttons").appendChild(button);
                } );


                /*for(let i = 0; i < this.votingChoices.length; i++) {
                    let button = document.createElement("button");
                    button.appendChild(document.createTextNode(v.tooltip));
                    button.setAttribute('onClick',v.press);
                    document.getElementById("buttons").appendChild(button);
                }*/
            }
        }

    }

