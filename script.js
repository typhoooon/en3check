async function checkWord(){
    const wordInput = document.getElementById('wordInput').value.toLowerCase();
    const result = document.getElementById('result');

    try{
        const response = await fetch('words.json');
        const data = await response.json();
        const words = data.words;

        if(words[wordInput]){
            result.textContent = `${wordInput}} 正确`;
            result.style.color='green';
        }
        else{
            result.textContent = `${wordInput}} 错误`;
            result.style.color='red';
        }
    }catch(error){
        result.textContent='loading failed'
    }
}
