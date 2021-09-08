
let deckId
let computerScore=0
let myScore=0
const newCard=document.getElementById('new-card')
const imageCard=document.getElementById('cards')
const headerText=document.getElementById('header')
const remainingText=document.getElementById('remaining')
const computerScoreEl=document.getElementById('computer-score')
const myScoreEl=document.getElementById('my-score')

async function handleClick() {
    const response= await fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    const data=await response.json()
        remainingText.textContent=`Remaining Cards: ${data.remaining}` 
        deckId = data.deck_id
}

document.getElementById("new-deck").addEventListener("click", handleClick)

newCard.addEventListener('click',async function(){
    const res=await fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    const data=await res.json()
        
            remainingText.textContent=`Remaining Cards: ${data.remaining}`
            imageCard.children[0].innerHTML=`
            <img class="card" src="${data.cards[0].image}"/>
            `
            imageCard.children[1].innerHTML=`
            <img class="card" src="${data.cards[1].image}"/>
            `
            const winnerText=determineCardWinner(data.cards[0], data.cards[1])
            headerText.textContent=winnerText
            if(data.remaining===0){
                newCard.disabled=true
                if (computerScore > myScore) {
                    // display "The computer won the game!"
                    header.textContent = "The computer won the game!"
                } else if (myScore > computerScore) {
                    // display "You won the game!"
                    header.textContent = "You won the game!"
                } else {
                    // display "It's a tie game!"
                    header.textContent = "It's a tie game!"
                }
            }
    
})

function determineCardWinner(card1,card2){
    const valueOptions=["2", "3", "4", "5", "6", "7", "8","9", "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1ValueIndex=valueOptions.indexOf(card1.value)
    const card2ValueIndex=valueOptions.indexOf(card2.value)
    if(card1ValueIndex>card2ValueIndex){
        computerScore++
        computerScoreEl.textContent=`Computer Score is : ${computerScore}`
        return 'Computer wins';
    }else if(card1ValueIndex<card2ValueIndex){
        myScore++
        myScoreEl.textContent=`Computer Score is : ${myScore}`
        return 'You wins';
    }else{
        return 'War';
    }
}