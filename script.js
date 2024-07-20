let currentIndex=0
let wordsData = [];
let wordsKeys = [];

window.onload = async function(){
    await loading();
    displayWord();
}

async function loading() {
    try{
        const response = await fetch('words.json');
        const data = await response.json();
        wordsData = data.words;
        wordsKeys = Object,keys(wordsData);
        result.textContent='loading successfully'
    }catch(error){
        result.textContent='loading failed'
    }
}

function displayWord() {
    const wordDisplay = document.getElementById('wordDisplay');
    const currentWordKey = wordsKeys[currentIndex];
    wordDisplay.textContent=wordsData[currentWordKey];
}

function checkWord(){
    const wordInput = document.getElementById('wordInput').value.toLowerCase();
    const result = document.getElementById('result');
    const currentWordKey = wordsKeys[currentIndex];

    if(wordInput===currentWordKey){
        result.textContent = `${wordInput} 正确`;
        result.style.color='green';
    }
    else{
        result.textContent = `${wordInput} 错误`;
        result.style.color='red';
    }
}

function nextWord(){
    if(currentIndex < wordsKeys.length - 1){
        currentIndex++;
        displayWord();
    }
}

function prevWord(){
    if(currentIndex > 0){
        currentIndex--;
        displayWord();
    }
}
