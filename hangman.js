const wordE1=document.getElementById("word");
const wrongLettersE1=document.getElementById("wrong-letters");
const playAgainBtn=document.getElementById("play-button");
const popup=document.getElementById("popup-container");
const notification=document.getElementById("notification-container");
const finalMessage=document.getElementById("final-message");
const finalMessageRevealWord=document.getElementById("final-message-reveal-word");

const figureParts=document.querySelectorAll(".figure-part");
const words=["aplication","programming","wizard","interface"];

let selectedWord=words[Math.floor(Math.random()*words.length)];

let playable=true;

const correctLetters=[];
const wrongLetters=[];

///show hidden word
function displayWord(){
    //console.log(selectedWord,selectedWord.split(''));
    wordE1.innerHTML=`
    ${selectedWord.split('').map(letter=>{
        //console.log(letter,"inside display");
        return `<span class="letter">
        ${correctLetters.includes(letter)?letter:""}
        </span>`
    }).join('')}
    `;
    const innerWord=wordE1.innerText.replace(/[\n]/g,'');       ///ye line..................
    console.log(innerWord,selectedWord);
    if(innerWord===selectedWord)
    {
        finalMessage.innerText="Congratulation ! you Won! ";
        popup.style.display="flex";
        playable=false;
    }
}
//-------------show notification----------------------
function shownotification(){
    notification.classList.add("show");
    setTimeout(function(){
        notification.classList.remove("show");
    },2000);
}
//---------
function updateWrongLettersE1(){            ///wrong letter pahle se print h?..........blank k saath
                                            ///second wali ki need ku?or ye map wrong word repeat na ho isliye ho rha h?
    wrongLettersE1.innerHTML=`                 
    ${wrongLetters.length>0?`<p>wrong letters</p>`:''}
    ${wrongLetters.map(letter=>`<span>${letter}</span>`)}
    `
    figureParts.forEach((parts,index)=>{
        const errors=wrongLetters.length;
        if(index<errors){                       ///why index<errors  and why at first wrong input it show body part
            parts.style.display="block";
        }
        else{
            parts.style.display="none";
        }
    })
    if(wrongLetters.length===figureParts.length){
        finalMessage.innerText="Unfortunately you lost!";
        popup.style.display="flex";
        playable=false;
    }
}

//---------add event listener for key pass------------
window.addEventListener('keydown',e=>{
    console.log(e.key);
    if(playable){
        if(e.keyCode>=65 && e.keyCode<=90){
            const letter=e.key.toLowerCase();
            if(selectedWord.includes(letter)){
                if(!correctLetters.includes(letter)){
                    correctLetters.push(letter);
                    //console.log(correctLetters);
                    displayWord();
                }
                else{
                    shownotification();
                }
            }
            else{
                if(!wrongLetters.includes(letter)){
                    wrongLetters.push(letter);
                    updateWrongLettersE1();
                }
                else{
                    shownotification();
                }
            }
        }
    }
});
playAgainBtn.addEventListener('click',function(){
    playable=true;
    correctLetters.splice(0);
    wrongLetters.splice(0);
    selectedWord=words[Math.floor(Math.random()*words.length)];
    displayWord();
    updateWrongLettersE1();
    popup.style.display="none";
})