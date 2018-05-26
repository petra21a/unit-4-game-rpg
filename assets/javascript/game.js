$(document).ready(function(){
   

    
let swRPGame = {
    characters: [],
    gameSetup: {
        //build an array of characters
        buildCharacters: function(){
            // this.characters;
            let health = [];
            
            //create random number in given range
            let randomNumber = function(min,max){
                let random = Math.floor(Math.random() * (max-min)) + min;
                return random;
            }
            
            //'shuffle' for hp - code from w3resources
            let shuffle = function(array){
                let i = array.length;
                while (i>0){
                    let index = Math.floor(Math.random()*i);
                    i-=1;
                    let temp = array[i];
                    array[i]=array[index];
                    array[index]=temp;
                }
                return array;
            }
            
            //enter objects for each Character to array
            let newCharacter = function(name,status,hp,attack,defend,profile){
                swRPGame.characters.push({name,status,hp,attack,defend,profile});
            };

            //create new Characters - format lets pictures be swapped easier
            newCharacter("Anakin","initial",0,6,0,"./assets/images/anakin-evil.jfif");
            newCharacter("Solo","initial",0,6,0,"./assets/images/han-solo.jfif");
            newCharacter("Vader","initial",0,6,0,"./assets/images/vader.jfif");
            newCharacter("Rey","initial",0,6,0,"./assets/images/rey.jfif");

            // make HP profiles
        health=[randomNumber(80,156),randomNumber(108,210),randomNumber(144,270),randomNumber(60,354)];
        
            // randomize HP & defense for each game
            shuffle(health);
            for (let i =0; i<health.length;i++){
                swRPGame.characters[i].hp=health[i];
                swRPGame.characters[i].defend=randomNumber(10,25);
            }
        },

        startGame: function(){
            let startText =  $("<h3>");
            startText.addClass("font-italic text-dark text-center")
            startText.text("Destiny Awaits: may the force be with you...")
            $("#starting-lineup").append(startText);
            this.buildCharacters();
        },
        clearGame: function(){
            $("#starting-lineup")
            .empty();
            $("#arena-attack")
            .empty();
            $("opponent")
            .empty();
            $("#arena-attack")
            .empty();
            $("#arena-attack")
            .empty();
        },

    },
    buildCards: function(){
        swRPGame.clearGame;
    //make Cards for characters
    for (const n of this.characters){
        let card = $("<div>");
        card.addClass("card d-flex flex-row m-2")
        .attr("name", n.name)
        .attr("status", n.status);

        
        //get pictures for cards
        const profilePic = $("<img>");
        profilePic.addClass("card-img profile-image")
            .attr("src",n.profile)
            .attr("name", n.name)
            .attr("alt",n.name +" picture");
        
        //add words to the card like HP
        const cardContent = $("<div>");
        cardContent.addClass("card-img-overlay h-100 d-flex flex-column justify-content-end text-primary")
        .append($("<h4>")
            .addClass("card-title text-center")
            .attr("name", n.name)
            .text("Health: "+n.hp))
        
        //add selection button
        .append($("<a>")
            .addClass("btn btn-dark h-1 text-warning button-start")
            .attr("href","#")
            .attr("name", n.name)
            .text("Choose your Path"))
        
        //add enemy select button
        .append($("<a>")
            .addClass("btn btn-dark h-1 text-warning button-enemy")
            .attr("href","#")
            .attr("name", n.name)
            .text("Choose Opponent"))

        //add attack button
        .append($("<a>")
            .addClass("btn btn-danger text-dark button-attack")
            .attr("href","#")
            .attr("name", n.name)
            .text("Attack!!"));

        //append cards to html
        function appendTo(something){
            $(something).append(card);
            card.append(profilePic);
            card.append(cardContent);
        }
        //switch to change divs
        switch(card.attr("status")){

            case("initial"):
            appendTo("#starting-lineup");
            console.log("initial: "+ card.attr("name") +" "+ card.attr("status"));
            
            //hide buttons till needed
            $(".button-attack[name="+n.name+"]").hide();
            $(".button-start[name="+n.name+"]").show();
            $(".button-enemy[name="+n.name+"]").hide();
            console.log($(".button-attack,[name="+n.name+"]"));
            break;
            
            case("attack"):
            //hide buttons till needed
            appendTo("#attacker-area");
            $(".button-attack[name="+n.name+"]").show();
            $(".button-start[name="+n.name+"]").hide();
            $(".button-enemy[name="+n.name+"]").hide();
        
            console.log("attack: "+ card.attr("name") +" "+ card.attr("status"));
            break;

            case("opponent"):
            //hide buttons till needed
            
            appendTo("#defender-area");
            $(".button-attack[name="+n.name+"]").hide();
            $(".button-start[name="+n.name+"]").hide();
            $(".button-enemy[name="+n.name+"]").show();
            console.log("opponent: "+ card.attr("name") +" "+ card.attr("status"));
            break;

            case("enemy"):
            //hide buttons till needed
            appendTo("#arena-defend");
            $(".button-attack[name="+n.name+"]").hide();
            $(".button-start[name="+n.name+"]").hide();
            $(".button-enemy[name="+n.name+"]").hide();
            console.log("enemy: "+ card.attr("name") +" "+ card.attr("status"));
            break;
            
            case("dead"):
            //hide buttons till needed

            appendTo("#arena-attack");
            $(".button-attack[name="+n.name+"]").hide();
            $(".button-start[name="+n.name+"]").hide();
            $(".button-enemy[name="+n.name+"]").hide();
            console.log("dead: "+ card.attr("name") +" "+ card.attr("status"));
            break;
        
        }
    };
    }    
    }
console.log(swRPGame.characters)
    swRPGame.gameSetup.startGame();
    swRPGame.buildCards();

    $(".button-start").on("click",function(){
        let player = $(this).attr("name")
        for(const n of swRPGame.characters){
            if(player===n.name){
                n.status="attack";
            } else {
                n.status="opponent";
            }
        }
        swRPGame.gameSetup.clearGame();
        swRPGame.buildCards();
     
      
          
        
    });
     
        
        //Player picks a Character
        // $(".select-button").on("click",function(){
        // let selected =$(this).attr()
        // })




})







































