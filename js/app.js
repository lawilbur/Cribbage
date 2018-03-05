


$(()=>{
    let deck = [];
    class Card {
        constructor(suit, value, title) {
            this.suit = suit;
            this.value = value;
            this.title = title;
        }
    }

    let crib = [];
    let handA = [];
    let computerhand = [];
    let turn = true;
    const suits = ['Spades', 'Diamonds', 'Hearts', 'Clubs'];

    const theCut = () =>{
        console.log(deck[19].title);
    }

    const handToCrib = () =>{
        crib.push(computerhand[0]);
        crib.push(computerhand[1]);
        computerhand.splice(0, 2);
        crib.push(handA[0]);
        crib.push(handA[1]);
        handA.splice(0, 2);
        // $('.cardInHand').on('click', ()=>{
        //     $(event.currentTarget).attr('class', 'inCrib');
        //     //move to crib array
        // });
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
            handA.push(deck[i]);
            }else {
            computerhand.push(deck[i]);
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

    createDeck();
    console.log(deck);
    createHands();
    console.log(handA);
    handToCrib();
    console.log(computerhand);
    console.log(deck);
    console.log(crib);
    theCut();
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
