let data=[]
let currentIndex=0
let wordsData = [];
let tagWordsData = [];
//let wordsKeys = [];
let bookSelect = 0;
let listSelect = [];
let wordList = [];
let tryCount=0;
let modeSelect=0;

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
    let tempIndex=tagWordsData.indexOf(wordsData[currentIndex])
    if(tempIndex===-1){
        star.textContent="未收藏"
    }
    else{
        star.textContent="已收藏"
    }
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

function openDrawer() {
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
    //modeSelect = document.getElementById("modeSelect").value;

    let modeSelectElements = document.querySelectorAll('input[name="mode"]');
    modeSelectElements.forEach((element) => {
        if (element.checked) {
            modeSelect = element.value;
        }
    });

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
    //console.log(modeSelect)
    if(modeSelect === "1"){
        wordsData = Array.from(wordsData).sort(() => Math.random() - 0.5);
    }
}

function tag() {
    let tempIndex=tagWordsData.indexOf(wordsData[currentIndex])
    if(tempIndex===-1){
        tagWordsData.push(wordsData[currentIndex]);
        console.log(tagWordsData);
        star.textContent="已收藏"
    }
}

function untag() {
    let tempIndex=tagWordsData.indexOf(wordsData[currentIndex])
    if(tempIndex!==-1){
        console.log(tagWordsData);
        tagWordsData.splice(tempIndex, 1);
        star.textContent="已取消收藏"
    }
}

const star=document.getElementById('star');
star.addEventListener('click', function() {
    let tempIndex=tagWordsData.indexOf(wordsData[currentIndex])
    if(tempIndex===-1){
        tag();
        console.log('已收藏');
    } 
    else {
        untag();
        console.log('已取消收藏');
    }
});

const saveJSON =(data, fileName) => {
    const jsonString = JSON.stringify(data,null,2);
    const blob = new Blob([jsonString], {type:"application/json"});
    const url = URL.createObjectURL(blob);

    const a=document.createElement("a");
    a.href=url;
    a.download=fileName;
    a.click();
    URL.revokeObjectURL(url);
}
    
function save() {
    saveJSON(tagWordsData, "save.json");
    closeDrawer();
}

document.getElementById("uploadFile").addEventListener("change", read)

function readJSON(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const text = event.target.result;
        const jsonData = JSON.parse(text);
        console.log(jsonData);
        wordsData=jsonData;
        currentIndex=0;
    }
    reader.readAsText(file);
}

function read(event){
    readJSON(event);
    closeDrawer();
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

        case 'ArrowUp':
            tag();
            break;

        case 'ArrowDown':
            untag();
            break;

        default:
            break;
    }
}
