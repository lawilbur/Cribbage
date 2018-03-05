let deck = [];
let crib = [];
let player1hand = [];
let player1Score = 0;
let player2hand = [];
let player2Score = 0;
let inPlay = [];
let turn = true;
let isEndOfTurn = false;
const suits = ['Spades', 'Diamonds', 'Hearts', 'Clubs'];
class Card {
    constructor(suit, value, title) {
        this.suit = suit;
        this.value = value;
        this.title = title;
    }
};

const checkPlayerturn = () =>{
    if(turn === true){
        return player1hand;
    }else {
        return player2hand;
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

const theCutStage = () =>{
    const $div = $('<div>').attr('id','theCut');
    $div.append($('<h2>').text(deck[19].suit)); // 19 equals middle of deck
    $div.append($('<h2>').text(deck[19].title));
    $('#deck').append($div);
};

const theCribStage = () =>{
    displayHands();
    console.log('getting out of display hands');
    if(player1hand.length == 4){
        console.log("hand length");
    }
};
const endTurn = ()=>{
    $('#playArea').empty();
    $('#handArea').empty();
    isEndOfTurn = false;
    turn = !turn;
    displayHands();
};
 const showEndTurnButton = () =>{
     if(! isEndOfTurn){
         const $button = $('<button>').text('End Turn');
         $('#playArea').append($button);
         $button.on('click' , (event)=>{
             endTurn();
         });
         isEndOfTurn = true;
     };
 };

const displayHands = () =>{ // should take the player as a parameter maybut stage as well
    const currentPlayer = checkPlayerturn();
    for(let i = 0; i<currentPlayer.length; i++){
        const $div = $('<div>').addClass('cardDisplay');
        $div.append($('<h2>').text(currentPlayer[i].suit));
        $div.append($('<h2>').text(currentPlayer[i].title));
        $('#handArea').append($div);
        $div.on('click', (event)=>{
            if(currentPlayer.length > 4){
                $div.appendTo('#playArea');
                crib.push(currentPlayer[i]);
                currentPlayer.splice(i,1);
                console.log(currentPlayer);
                console.log(crib);

            }
            if(currentPlayer.length == 4){
                showEndTurnButton();
            }

        });
    }
};

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

$(()=>{

    createDeck();
    createHands();
    theCutStage();
    createBoard();
    theCribStage();
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
