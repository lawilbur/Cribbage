let deck = [];
let crib = [];
let player1hand = [];
let player1inPlay = [];
let player1used = [];
let player1Score = 0;
let player2hand = [];
let player2inPlay = [];
let player2used = [];
let player2Score = 0;
let player1Turn = true;
let isEndOfTurn = false;
let phase = 'crib';
let pass = false;
const suits = ['Spades', 'Diamonds', 'Hearts', 'Clubs'];
class Card {
    constructor(suit, value, title) {
        this.suit = suit;
        this.value = value;
        this.title = title;
    }
};


const createBoard = ()=>{
    for(let i = 1; i<122; i++){
        const $div = $('<div>').addClass('circle');
        const $scoreMarker = $('<div>').addClass('scoreMarker').text('-'+i+'-');
        if(i % 5 === 0){
            $('#scoringSection').append($div);
            $('#scoringSection').append($scoreMarker);
        }else {
            $('#scoringSection').append($div);
        }
    }
};

const createDeck = () =>{
    for(let i = 0; i<4; i++){
        for(let j = 1; j < 14; j++){
            if(j <= 10){
            deck.push(new Card(suits[i], j , j));
            }else if (j == 11){
                deck.push(new Card(suits[i], 10, 'Jack'));
            }else if (j == 12){
                deck.push(new Card(suits[i], 10, 'Queen'));
            }else if (j == 13){
                deck.push(new Card(suits[i], 10, 'King'));
            }
        }
    }
}

const createHands = () =>{
    deck.sort((a, b)=>{
        return 0.5 - Math.random(); //randomizes the deck
    });
    deck.sort((a, b)=>{
        return 0.5 - Math.random(); //randomizes the deck
    });
    for(i = 0; i < 12; i++){
        if( i % 2 === 0){
        player1hand.push(deck[i]);
        }else {
        player2hand.push(deck[i]);
        }
    }
    deck.splice(0, 12); // removes cards delt

}

const buildCardsForCrib = (currentPlayer) =>{
    for(let i = 0; i<currentPlayer.length; i++){
        const $div = $('<div>').addClass('cardDisplay');
        $div.append($('<h2>').text(currentPlayer[i].suit));
        $div.append($('<h2>').text(currentPlayer[i].title));
        $('#handArea').append($div);
        let currentCard = currentPlayer[i];
        if(phase == 'crib'){ // might not be needed
            $div.on('click', (event)=>{
                if(currentPlayer.length > 4){
                    let index = currentPlayer.indexOf(currentCard);// this is making it so you dont get unfiended when you choose the last card for the secound choice
                    $div.appendTo('#playArea');
                    crib.push(currentPlayer[index]);
                    currentPlayer.splice(index,1);
                    // console.log(currentPlayer);
                    // console.log(crib);
                }
                if(currentPlayer.length == 4){
                    showEndTurnButton();
                }
            });
        }
    }
}

const displayHands = () =>{ // should take the player as a parameter maybut stage as well
    const currentPlayer = checkPlayerturn();
    if(phase == 'crib'){
        // console.log(player1Turn);
        buildCardsForCrib(currentPlayer);
    }else if(phase == 'play') {
        // console.log(player1Turn);
        if( player1hand.length == 0 && player2hand.length ==0){
            if(player1Score === player2Score){
                alert('The game was a tie! Play another round.');
            }else if (player1Score > player2Score) {
                alert('Player 1 has won the game with a score of ' + player1Score);
            }else {
                alert('Player 2 has won the game with a score of ' + player2Score);
            }
        }// console.log('made it to the play stage');
        thePlay(currentPlayer);
        player1Turn = !player1Turn;
    }
};

const theCutStage = () =>{
    const $div = $('<div>').attr('id','theCut');
    $div.append($('<h2>').text(deck[19].suit)); // 19 equals middle of deck
    $div.append($('<h2>').text(deck[19].title));
    $('#deck').append($div);
    if(deck[19].title == 'Jack'){
        if(checkPlayerturn() == player1hand) {
            player1Score += 2;
        }else if (checkPlayerturn() == player2hand) {
            player2Score += 2;
        }
        //update score?
    }
};

const showEndTurnButton = () =>{
     if(isEndOfTurn == false){
        const $button = $('<button>').text('End Turn');
        $('#playArea').append($button);
        $button.on('click' , (event)=>{
             if(crib.length == 4){
                 phase = 'play';
                 theCutStage();
                 endCribTurn();
             }else if(crib.length < 4){
                 endCribTurn();
             }
         });
         console.log('is end of turn = true');
         isEndOfTurn = true;
     };
 };

const endCribTurn = ()=>{
     $('#playArea').empty();
     $('#handArea').empty();
     isEndOfTurn = false;
     player1Turn = !player1Turn;
     displayHands();
 };

const $passButton = () =>{
    const $button = $('<button>').text('Pass Turn').attr('id' , 'pass-button');
    $('#playArea').append($button);
    $button.on('click' , (event)=>{
        if (pass == false){
            console.log('pass false');
            pass = true;
            $('#handArea').empty();
            $('#pass-button').remove();
            // player1Turn = !player1Turn;
            displayHands();
        }else if(pass == true){
            console.log('pass = true');
            for(let i = 0; i < player1inPlay.length; i++){
                player1used.push(player1inPlay[0]);
                player1inPlay.splice(0,1);
                console.log(player1inPlay);
            }
            for(let i = 0; i < player2inPlay.length; i++){
                player2used.push(player2inPlay[0]);
                player2inPlay.splice(0,1);
                console.log(player2inPlay);
            }
        console.log(player1used);
        console.log(player2used);
        $('#playArea').empty();
        $('#handArea').empty();
        // player1Turn = !player1Turn;
        pass = false;
        displayHands();
    }
     });
}

const thePlay = (currentPlayer) =>{
    for(let i = 0; i<currentPlayer.length; i++){
        const $div = $('<div>').addClass('cardDisplay');
        $div.append($('<h2>').text(currentPlayer[i].suit));
        $div.append($('<h2>').text(currentPlayer[i].title));
        $('#handArea').append($div);
        let currentCard = currentPlayer[i];
        // console.log(currentCard);
        if(player1Turn == true){ // might not be needed
            $div.on('click', (event)=>{
                console.log('player 1');
                // console.log(currentCard.value);
                let checkScore = checkPlayScore(player1inPlay, player2inPlay, currentCard);
                if(checkScore == true){
                    // checkPlayScore(player1inPlay);
                    let index = currentPlayer.indexOf(currentCard);// this is making it so you dont get unfiended when you choose the last card for the secound choice
                    $div.appendTo('#playArea');
                    player1inPlay.push(currentPlayer[index]);
                    currentPlayer.splice(index,1);
                    // $('#playArea').empty();
                    // checkPlayScore(currentPlayer);
                    $('#handArea').empty();
                    displayHands();

                }else if(checkScore == false){

                    // showEndTurnButton(); this may still work
                }
            });
        }else if (player1Turn == false) {
            $div.on('click', (event)=>{
                console.log('player 2');
                // console.log(currentCard.value);
                let checkScore = checkPlayScore(player2inPlay, player1inPlay, currentCard);
                if(checkScore == true){
                    // checkPlayScore(player2inPlay);
                    let index = currentPlayer.indexOf(currentCard);// this is making it so you dont get unfiended when you choose the last card for the secound choice
                    // console.log(index);
                    $div.appendTo('#playArea');
                    player2inPlay.push(currentPlayer[index]);
                    currentPlayer.splice(index,1);
                    $('#handArea').empty();
                    displayHands();
                }
                else if(checkScore == false){
                    // showEndTurnButton();
                }
            });
        }
    }
};




const checkPlayScore = (currentInPlay , opponentInPlay, currentCard) =>{
    $('#pass-button').remove();
    console.log('got inside check play score');
    let score = 0;
    if(opponentInPlay.length == 0){
        return true;
    }
    if(currentInPlay.length == 0){
        console.log('inside 2 played');
        score = opponentInPlay[0].value + currentCard.value;
        if(score == 15){
            console.log('made 15 add score');
            returnPlayerScoreTest(2);
            return true;
        }if (opponentInPlay[0].title == currentCard.title){
            console.log('pair was made');
            returnPlayerScoreTest(2);
            return true;
        }
        else{
            return true;
        }
    }
    if(opponentInPlay.length == 1) {
        console.log('inside 3rd played');
        score = (currentInPlay[0].value + opponentInPlay[0].value + currentCard.value);
        if(pass == true){
            score = (currentInPlay[1].value + currentInPlay[0].value + opponentInPlay[0].value + currentCard.value);
            console.log('inside 3r pass is true');
            if(score > 31){
                alert('This card connot be played try another');
                $passButton();

                // return false; //to trigger end turn play
                // let player choose new card
            }
            if(score == 31){
                console.log('31 total');
                returnPlayerScoreTest(2);
                for(let i = 0; i <= player1inPlay.length; i++){
                    player1used.push(player1inPlay[0]);
                    player1inPlay.splice(0,1);
                    console.log(player1inPlay);
                }
                for(let i = 0; i <= player2inPlay.length; i++){
                    player2used.push(player2inPlay[0]);
                    player2inPlay.splice(0,1);
                    console.log(player2inPlay);
                }
                $('#playArea').empty();
                $('#handArea').empty();
                displayHands();
            }
            if(currentInPlay[0].title == opponentInPlay[0].title == currentCard.title){
                console.log('3 of a kind');
                returnPlayerScoreTest(6);
                return true;
            } else if (opponentInPlay[0].title == currentCard.title){
                console.log('pair was made');
                returnPlayerScoreTest(2);
                return true;
            }
            if(score == 15){
                console.log('made 15 add score');
                returnPlayerScoreTest(2);
                return true;
            }

            else {
                console.log('didnt hit an if ' + score);
                return true;
            }
        }else {
            if(currentInPlay[0].title == opponentInPlay[0].title == currentCard.title){
                console.log('3 of a kind');
                returnPlayerScoreTest(6);
                return true;
            } else if (opponentInPlay[0].title == currentCard.title){
                console.log('pair was made');
                returnPlayerScoreTest(2);
                return true;
            }
            if(score == 15){
                console.log('made 15 add score');
                returnPlayerScoreTest(2);
                return true;
            }
            else {
                console.log('no spoints scorred ' + score);
                return true;
            }
        }
    }

    if(currentInPlay.length == 1){
        console.log('inside 4th played');
        if(pass == true){
            score = (opponentInPlay[1].value + currentInPlay[0].value + opponentInPlay[0].value + currentCard.value);
            console.log('inside 4r pass is true');
            if(score > 31){
                alert('This card connot be played try another');
                $passButton();
                // return false; //to trigger end turn play
                // let player choose new card
            }
            if(score == 31){
                console.log('31 total');
                returnPlayerScoreTest(2);;
                for(let i = 0; i <= player1inPlay.length; i++){
                    player1used.push(player1inPlay[0]);
                    player1inPlay.splice(0,1);
                    console.log(player1inPlay);
                }
                for(let i = 0; i <= player2inPlay.length; i++){
                    player2used.push(player2inPlay[0]);
                    player2inPlay.splice(0,1);
                    console.log(player2inPlay);
                }
                $('#playArea').empty();
                $('#handArea').empty();
                displayHands();
            }
            if(currentInPlay[0].title == opponentInPlay[0].title == currentCard.title){
                console.log('3 of a kind');
                returnPlayerScoreTest(6);
                return true;
            } else if (opponentInPlay[0].title == currentCard.title){
                console.log('pair was made');
                returnPlayerScoreTest(2);
                return true;
            }
            if(score == 15){
                console.log('made 15 add score');
                returnPlayerScoreTest(2);
                return true;
            }
        }
        else {
            score += (opponentInPlay[1].value + currentInPlay[0].value + opponentInPlay[0].value + currentCard.value);
            console.log(score);
            if(score > 31){
                alert('This card connot be played try another');
                $passButton();

                // return false; //to trigger end turn play
                // let player choose new card
            }
            if(score == 31){
                console.log('31 total');
                returnPlayerScoreTest(2);
                for(let i = 0; i <= player1inPlay.length; i++){
                    player1used.push(player1inPlay[0]);
                    player1inPlay.splice(0,1);
                    console.log(player1inPlay);
                }
                for(let i = 0; i <= player2inPlay.length; i++){
                    player2used.push(player2inPlay[0]);
                    player2inPlay.splice(0,1);
                    console.log(player2inPlay);
                }
                $('#playArea').empty();
                $('#handArea').empty();
                // return true;
                displayHands();
            }
            if(opponentInPlay[1].title == currentInPlay[0].title == opponentInPlay[0].title == currentCard.title){
                    returnPlayerScoreTest(12);
                    console.log('4 of a kind');

                }else if(currentInPlay[0].title == opponentInPlay[0].title == currentCard.title){
                    returnPlayerScoreTest(6);
                    console.log('3 of a kind');

                }else if (opponentInPlay[1].title == currentCard.title){
                    console.log('pair was made');
                    returnPlayerScoreTest(2);
                    //add 2 points to current player

                }
            if(score == 15){
                    console.log('made 15 add score');
                    returnPlayerScoreTest(2);
                    return true;
            }


        }

    }
    else if(opponentInPlay.length == 2){
            console.log('inside 5th played');
            // if (pass == false){
            for(let i = 0; i < 2; i++){
                score += (opponentInPlay[i].value + currentInPlay[i].value);
            }
            score += currentCard.value;
            console.log(score);
            if(score > 31){
                alert('This card connot be played try another');
                $passButton();
                // return false; //to trigger end turn play
                // let player choose new card
            }
            if(score == 31){
                console.log('31 total');
                returnPlayerScoreTest(2);
                for(let i = 0; i <= player1inPlay.length; i++){
                    player1used.push(player1inPlay[0]);
                    player1inPlay.splice(0,1);
                    console.log(player1inPlay);
                }
                for(let i = 0; i <= player2inPlay.length; i++){
                    player2used.push(player2inPlay[0]);
                    player2inPlay.splice(0,1);
                    console.log(player2inPlay);
                }
                $('#playArea').empty();
                $('#handArea').empty();
                displayHands();
            }
            if(opponentInPlay[1].title == currentInPlay[1].title == opponentInPlay[0].title == currentCard.title){
                    returnPlayerScoreTest(12);;
                    console.log('4 of a kind');

                }else if(currentInPlay[1].title == opponentInPlay[1].title == currentCard.title){
                    returnPlayerScoreTest(2);
                    console.log('3 of a kind');

                }else if (opponentInPlay[1].title == currentCard.title){
                    returnPlayerScoreTest(2);
                    console.log('pair was made');
                    //add 2 points to current player

                }
            if(score == 15){
                    console.log('made 15 add score');
                    returnPlayerScoreTest(2);
                    return true;
            }


    }else {
        return true;
    }
}
    // return true;



const returnPlayerScore = () =>{
    if(player1Turn == true){
        return player1Score;
    }else {
        return player2Score;
    }
};
const returnPlayerScoreTest = (num) =>{
    if(player1Turn == true){
        player2Score += num;
    }else {
        player1Score += num;
    }
};

const checkPlayerturn = () =>{
    if(player1Turn == true){
        return player1hand;
    }else {
        return player2hand;
    }
};


$(()=>{
    createBoard();
    createDeck();
    createHands();

    displayHands();



});
// let inPlay = [];
//
// const checkPlays = () =>{
//         if(inPlay.length == 0){
//             return true;
//         }
//         if(inPlay.length == 1){
//             return true;
//         }
//         if(inPlay.length == 2){
//             check15();
//         }
//     }
// const check15 = () =>{
//     let score = 0;
//     for(let i = 0; i<inPlay.length; i++){
//         score += inPlay[i].value;
//     }
//     if(score == 15){
//         currentPlayerscore += 2;
//     }
// }
// const checkPair = (inPlayTest) =>{
//     for(let i = 0; i<inPlay.length-1; i++) {
//         if(inPlayTest[i].title == inPlayTest[i+1].title == inPlayTest[i+2].title == inPlayTest[i+3].title){
//             console.log(inPlayTest[i]);
//             console.log('pair');
//         }else{
//             console.log('not pair or not working');
//         }
//     }
// }
//
// inPlay.push(new Card('Diamond', 10 , 'King'));
// inPlay.push(new Card('Club', 10, 'King'));
// inPlay.push(new Card('Spade', 10, 'King'));
// inPlay.push(new Card('Heart', 10, 'King'));
// console.log(inPlay);
// checkPair(inPlay);

// const createDeck = () =>{
//     for(let key in deck){
//         for( j = 1; j < 14; j++){
//             if (j>9){
//                 deck[key].push(10);
//             }else{
//                 deck[key].push(j);
//             }
//
//         }
//     }
// }
// const handToCrib = () =>{
//     crib.push(player2hand[0]);
//     crib.push(player2hand[1]);
//     player2hand.splice(0, 2);
//     crib.push(player1hand[0]);
//     crib.push(player1hand[1]);
//     player1hand.splice(0, 2);
    // $('.cardInHand').on('click', ()=>{
    //     $(event.currentTarget).attr('class', 'inCrib');
    //     //move to crib array
    // });
