let currentIndex=0
let wordsData = [];
let wordsKeys = [];

window.onload = async function(){
    await loading();
    displayWord();
}

async function loading() {
    try {
        const response = await fetch('words.json');
        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }
        const data = await response.json();
        wordsData = data.words;
        wordsKeys = Object.keys(wordsData);
        result.textContent = 'Loading successful';
        result.style.color='black';
    } catch (error) {
        console.error('Error loading JSON file:', error);
        result.textContent = 'Loading failed';
        result.style.color='red';
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

    if(wordInput === currentWordKey.toLowerCase()){
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
        wordInput.value="";
        result.textContent="结果";
        result.style.color="black";
    }
}

function prevWord(){
    if(currentIndex > 0){
        currentIndex--;
        displayWord();
        wordInput.value="";
        result.textContent="结果";
        result.style.color="black";
    }
}
