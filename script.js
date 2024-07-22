let data=[]
let currentIndex=0
let wordsData = [];
//let wordsKeys = [];
let bookSelect = 0;
let listSelect = [];
let wordList = [];
let tryCount=0;

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
        data = await response.json();
        wordsData = data.list1;
        //wordsKeys = Object.keys(wordsData);
        result.textContent = 'Loading successful';
        result.style.color='black';
    } catch (error) {
        console.error('Error loading JSON file:', error);
        result.textContent = 'Loading failed';
        result.style.color='red';
    }
}

const wordDisplay = document.getElementById('wordDisplay');
function displayWord() {
    let currentWordKey=wordsData[currentIndex];
    //const currentWord=currentWordKey.word;
    const currentWordMeaning=currentWordKey.exp;
    wordDisplay.textContent =`中文: ${currentWordMeaning}`; 
    result.textContent="结果";
    result.style.color="black";
    wordInput.value="";
}

function checkWord(){
    const wordInput = document.getElementById('wordInput').value.toLowerCase();
    const result = document.getElementById('result');
    const currentWordKey = wordsData[currentIndex];
    const currentWord=currentWordKey.word;

    if(wordInput === currentWord.toLowerCase()){
        result.textContent = `${wordInput} 正确`;
        result.style.color='green';
        tryCount=0;
    }
    else{
        result.style.color='red';
        tryCount++;
        if(tryCount<3){
            result.textContent = `${wordInput} 错误`;
        }
        else{
            result.textContent = `错误!  答案是：${currentWord} `;
        }
    }
}

function nextWord(){
    if(currentIndex < wordsData.length - 1){
        currentIndex++;
        displayWord();
        tryCount=0;
    }
}

function prevWord(){
    if(currentIndex > 0){
        currentIndex--;
        displayWord();
        tryCount=0;
    }
}

const drawer = document.getElementById("drawer");
const settingsBtn = document.getElementById("settingsBtn")
const mainContent = document.getElementById("mainContent")
const overlay = document.getElementById('overlay');

function Settings() {
    drawer.classList.toggle("open");
    overlay.classList.toggle("show");
    mainContent.classList.toggle("blurred");
}

function closeDrawer() {
    drawer.classList.remove("open");
    overlay.classList.remove("show");
    mainContent.classList.remove("blurred");
}

async function applySettings() {
    const wordListLabel = document.getElementById("listLabel");
    let wordListBoxes = wordListLabel.querySelectorAll('input[type="checkbox"]');
    wordList = [];
    for(let i=0;i < wordListBoxes.length;i++){
        if(wordListBoxes[i].checked){
            wordList.push(wordListBoxes[i].name);
        }
    }
    console.log(wordList);

    document.getElementById("checkBtn").focus();
    closeDrawer();
    currentIndex=0;
    await updateWordsData();
    //await loading();
    displayWord();
}

async function updateWordsData() {
    wordsData = [];
    for(let i of wordList){
    //console.log(typeof i)
        for(let j of data[i]){
            wordsData.push(j); 
            console.log(j)
        }
    }
}

document.addEventListener('keydown', handleKeydown);

function handleKeydown(event) {
    switch (event.key) {
        case '/':
            event.preventDefault();

            const activeElement = document.activeElement;

            if (activeElement.tagName.toLowerCase() !== 'input') {
                const inputElements = document.querySelectorAll('input');
                if (inputElements.length > 0) {
                    inputElements[0].focus();
                }
            }
            break;

        case '?':
            alert("提示：左右键切换单词，/键快速定位输入框, ?键打开提示");
            break;

        case 'Enter':
            checkWord();
            break;

        case 'ArrowLeft':
            prevWord();
            break;

        case 'ArrowRight':
            nextWord();
            break;

        default:
            break;
    }
}
