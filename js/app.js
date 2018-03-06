let deck = [];
let crib = [];
let player1hand = [];
let player1inPlay = [];
let player1Score = 0;
let player2hand = [];
let player2inPlay = [];
let player2Score = 0;
let player1Turn = true;
let isEndOfTurn = false;
let phase = 'crib';
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
        buildCardsForCrib(currentPlayer);
    }else if(phase == 'play') {
        // console.log('made it to the play stage');
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

const thePlay = (currentPlayer) =>{
    for(let i = 0; i<currentPlayer.length; i++){
        const $div = $('<div>').addClass('cardDisplay');
        $div.append($('<h2>').text(currentPlayer[i].suit));
        $div.append($('<h2>').text(currentPlayer[i].title));
        $('#handArea').append($div);
        let currentCard = currentPlayer[i];
        if(player1Turn == true){ // might not be needed
            $div.on('click', (event)=>{
                console.log('player 1')
            console.log('Player 1 varify');
                if(currentPlayer.length > 0){
                    let index = currentPlayer.indexOf(currentCard);// this is making it so you dont get unfiended when you choose the last card for the secound choice
                    $div.appendTo('#playArea');
                    player1inPlay.push(currentPlayer[index]);
                    currentPlayer.splice(index,1);
                    // $('#playArea').empty();
                    checkPlayScore(currentPlayer);
                    $('#handArea').empty();
                    displayHands()

                }
                if(currentPlayer.length == 0){
                    // showEndTurnButton();
                }
            });
        }else if (player1Turn == false) {
            $div.on('click', (event)=>{
                console.log('player 2');
                if(currentPlayer.length > 0){
                    let index = currentPlayer.indexOf(currentCard);// this is making it so you dont get unfiended when you choose the last card for the secound choice
                    $div.appendTo('#playArea');
                    player2inPlay.push(currentPlayer[index]);
                    currentPlayer.splice(index,1);
                    $('#handArea').empty();
                    displayHands()
                }
                if(currentPlayer.length == 0){
                    showEndTurnButton();
                }
            });
        }
    }
};
const checkPlayScore = (currentPlayer) =>{
    console.log(player1inPlay[0].value);
}
const checkPlayerturn = () =>{
    if(player1Turn === true){
        return player1hand;
    }else {
        return player2hand;
    }
};

$(()=>{
    createBoard();
    createDeck();
    createHands();
    // console.table(deck);
    displayHands();


});
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
