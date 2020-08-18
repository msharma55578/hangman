const wordE1=document.getElementById("word");
const wrongLettersE1=document.getElementById("wrong-letters");
const playAgainBtn=document.getElementById("play-button");
const popup=document.getElementById("popup-container");
const notification=document.getElementById("notification-container");
const finalMessage=document.getElementById("final-message");
const finalMessageRevealWord=document.getElementById("final-message-reveal-word");

const figureParts=document.querySelectorAll(".figure-part");
const words=["application","programming","interface","wizard","development"];

let selectedWord=words[Math.floor(Math.random()*words.length)];

let playable=true;

const correctLetters=[];
const wrongLetters=[];

function displayWord() {
  wordE1.innerHTML=`
   ${selectedWord.split('').map(letter=> {
     return `<span class="letter">
     ${correctLetters.includes(letter)?letter:''}
     </span>`
   }).join('')}
  `;

  const innerWord=wordE1.innerText.replace(/[\n]/g,'');
  if(innerWord===selectedWord)
  {
    finalMessage.innerText="Congratulation ! you Won! ";
    popup.style.display="flex";
    playable=false;


  }
  

}
//.....show notification.......
function shownotification()
{
  notification.classList.add("show");
  setTimeout(function(){
    notification.classList.remove("show")
  },2000);
}

function updateWrongLettersE1()
{
  wrongLettersE1.innerHTML=`${
    wrongLetters.length>0?`<p>wrong</p>`:''}
    ${wrongLetters.map(letter=>`<span>${letter}</span>`)}
  `
  figureParts.forEach((parts,index)=>{
    const errors=wrongLetters.length;
  if(index<errors){
    parts.style.display="block";
  }
  else
  {
    parts.style.display="none";
  }
  })
if(wrongLetters.length===figureParts.length){
  finalMessage.innerText="unfortunately you lost!";
  popup.style.display="flex";
  playable=false;
}
}

// add event Listener for key press
window.addEventListener('keydown',e=>{
  if(playable){
    if(e.keyCode>=65 && e.keyCode<=90)
    {
      const letter=e.key.toLowerCase();
      if(selectedWord.includes(letter))
      {
        if(!correctLetters.includes(letter))
        {
          correctLetters.push(letter);
          displayWord();
        }
        else{
          showNotification();
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