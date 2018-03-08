let deck = [];
let crib = [];
let inPlay = [];
let player1hand = [];
let player1used = [];
let player1Score = 0;
let player2hand = [];
let player2used = [];
let player2Score = 0;
let player1Turn = true;
let isEndOfTurn = false;
let passTurn = 0;
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
            $div.on('click', (event)=>{
                if(currentPlayer.length > 4){
                    let index = currentPlayer.indexOf(currentCard);// this is making it so you dont get unfiended when you choose the last card for the secound choice
                    $div.appendTo('#playArea');
                    crib.push(currentPlayer[index]);
                    currentPlayer.splice(index,1);
                }
                if(currentPlayer.length == 4){
                    showEndTurnButton();
                }
            });

    }
}

const displayHands = () =>{ // should take the player as a parameter maybut stage as well
    const currentPlayer = checkPlayerturn();
    if(phase == 'crib'){
        buildCardsForCrib(currentPlayer);
    }else if(phase == 'play') {
        if(currentPlayer.length == 0){
            endGame();
            endPlayTurn();
        } else{
        thePlay(currentPlayer);
        }
    }else if (phase == 'show') {
        $('#playArea').empty();
        alert("You have made it to the show");
    }
};

const theCutStage = () =>{
    const $div = $('<div>').attr('id','theCut');
    $div.append($('<h2>').text(deck[19].suit)); // 19 equals middle of deck
    $div.append($('<h2>').text(deck[19].title));
    $('#deck').append($div);
    if(deck[19].title == 'Jack'){
        currentPlayerScore(2);
    }
};

const showEndTurnButton = () =>{
    const $button = $('<button>').text('End Turn');
    $('#playArea').append($button);
    $button.on('click' , (event)=>{
        if(crib.length == 4){
            phase = 'play';
            theCutStage();
            endTurn();
        }else if(crib.length < 4){
            endTurn();
        }
    })
};

const endTurn = ()=>{
     $('#playArea').empty();
     $('#handArea').empty();
     player1Turn = !player1Turn;
     displayHands();
 };

const thePlay = (currentPlayer) =>{
    for(let i = 0; i<currentPlayer.length; i++){
        const $div = $('<div>').addClass('cardDisplay');
        $div.append($('<h2>').text(currentPlayer[i].suit));
        $div.append($('<h2>').text(currentPlayer[i].title));
        $('#handArea').append($div);
        let currentCard = currentPlayer[i];
            $div.on('click', (event)=>{
                let index = currentPlayer.indexOf(currentCard);// this is making it so you dont get unfiended when you choose the last card for the secound choice
                inPlay.push(currentPlayer[index]);
                if(check31() == false){
                    check15();
                    checkPair();
                    $div.appendTo('#playArea');
                    currentPlayerUsed(currentPlayer[index]);
                    currentPlayer.splice(index,1);
                    endPlayTurn();
                }
            });
        }
    };

const check31 = ()=>{
    let score = 0;
    for(let i = 0; i<inPlay.length; i++){
        score += inPlay[i].value;
    }
    if(score == 31){
        currentPlayerScore(2);
        inPlay = [];
        $('#playArea').empty();
        endPlayTurn();
    }else if(score > 31){
        inPlay.pop();
        alert("you cannot play that card! next persons turn");
        passTurn +=1;
        endPlayTurn();
    }else{
        return false;
    }
}

const endPlayTurn = () =>{
    if(passTurn == 2){
        $('#playArea').empty();
        $('#handArea').empty();
        inPlay = [];
        passTurn = 0;
        currentPlayerScore(1);
        player1Turn = !player1Turn;
        displayHands();
    }else{
        $('#handArea').empty();
        player1Turn = !player1Turn;
        displayHands();
    }
}

const checkPair = () =>{
    let inPlayLength = inPlay.length;
    if(inPlayLength > 1){
        if(inPlay[inPlayLength-1].title == inPlay[inPlayLength-2].title){
            console.log('its a pair!');
            currentPlayerScore(2);
        }
    }else if (inPlayLength == 0){
        return;
    }
}

const check15 = () =>{
    console.log('check 15');
    let score = 0;
    for(let i = 0; i<inPlay.length; i++){
        score += inPlay[i].value;
    }
    if(score == 15){
        currentPlayerScore(2);
        return;
    }else{
        return;
    }
}
// const $passButton = () =>{
//     const $button = $('<button>').text('Pass Turn').attr('id' , 'pass-button');
//     $('#playArea').append($button);
//     $button.on('click' , (event)=>{
//         if (pass == false){
//             console.log('pass false');
//             pass = true;
//             $('#handArea').empty();
//             $('#pass-button').remove();
//             // player1Turn = !player1Turn;
//             displayHands();
//         }else if(pass == true){
//             console.log('pass = true');
//             for(let i = 0; i < player1inPlay.length; i++){
//                 player1used.push(player1inPlay[0]);
//                 player1inPlay.splice(0,1);
//                 console.log(player1inPlay);
//             }
//             for(let i = 0; i < player2inPlay.length; i++){
//                 player2used.push(player2inPlay[0]);
//                 player2inPlay.splice(0,1);
//                 console.log(player2inPlay);
//             }
//         console.log(player1used);
//         console.log(player2used);
//         $('#playArea').empty();
//         $('#handArea').empty();
//         // player1Turn = !player1Turn;
//         pass = false;
//         displayHands();
//     }
//      });
// }
//
const endGame = ()=>{
    if(player1hand.length == 0 && player2hand.length ==0){
        phase = 'show';
        if (player1Score == player2Score){
            alert('The game was a tie and no one has won play again');
        }else if (player1Score > player2Score) {
            alert('Player 1 has won the game with ' + player1Score + ' points');
        }else{
            alert('Player 2 has won the game with ' + player2Score + ' points');
        }
    }else{
        return;
    }
}
const checkPlayerturn = () =>{
    if(player1Turn == true){
        return player1hand;
    }else {
        return player2hand;
    }
};
const currentPlayerScore = (num) =>{
    if(player1Turn == true){
        player1Score += num;
        console.log('Player 1 score = '+ player1Score);
    }else {
        player2Score += num;
        console.log('Player 2 score = '+ player2Score);
    }
};
const currentPlayerUsed = (cardObj)=>{
    if(player1Turn == true){
        player1used.push(cardObj);
    }else {
        player2used.push(cardObj);
    }
}


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
