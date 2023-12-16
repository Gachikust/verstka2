"use strict"

document.querySelector('#to-menu').addEventListener('click',()=>{
    window.location.href='../index.html';
})

let texts=[
    'Дядя Семён ехал из города домой. С ним была <?> собака Жучка, Вдруг из леса <?> выскочили волки. Жучка испугалась <?> и прыгнула в сани. У дяди Семёна была <?> хорошая лошадь. Она тоже испугалась и быстро помчалась по <?> дороге. Деревня была близко. Показались огни в окнах. Волки отстали.',
    'оля и Лёня ехали в лифте. Внезапно свет погас и лифт <?> остановился. Кабина застыла на месте. Дети оказались <?> в полной темноте, одни в маленькой тесной <?> кабине. Коля и Лёня испугались. Они стали звать <?> соседей. Тут свет вспыхнул, и кабина поехала. Но несколько <?> минут в тёмном лифте показались детям удивительно длинными.'
]
let words=[
    'юридический',
    'создание',
    'американец',
    'прокурор',
    'тайна',
    'обстоятельство',
    'сумка',
    'стоимость',
    'кофе',
    'масштаб',
]
let rightAnswer = 0;
let wrongAnswer = 0;
let timerWork=false;
let difficult =0;
let isWin =false;
let username='';
shuffle(words);
let text =document.querySelector('.text');
let counter = document.querySelector('.count');
let timerElemnet = document.querySelector('.timer');
let difficultSelect = document.querySelector('#difficult-select');
let correctWords =[];
setText();
function setText(){
    let i =0;
    let textArr = texts[getRandomNumber(0,1)].split(' ');
    textArr.forEach((item,index)=>{
        if(item=='<?>'){
            console.log(1)
            textArr[index] = words[i++];
            correctWords.push(index);
        }
        let str = document.createElement('span');
        str.addEventListener('click',clickOnWord);
        str.num =index;
        str.textContent=textArr[index]+' ';

        text.append(str);
    })
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
  }

  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  function clickOnWord(e){
    if(correctWords.indexOf(e.target.num)!=-1){
        e.target.classList.add('correct-word');
        rightAnswer++;
        counter.textContent=`Найдено слов: ${rightAnswer}`
        setTimeout(()=>{
            e.target.style.display='none';
        },1000)
        if(rightAnswer>=5){
            if(localStorage.getItem(username)<3 && username!=''){
                saveLevel(username,`3`);
            }
            isWin=true;
            endGame();
        }
    }else{
        e.target.classList.add('wrong-word');
        wrongAnswer++;
        if(wrongAnswer>=3){
            isWin=false;
            endGame();
        }
    }
  }

  openModal();
//addOpenListener();
 addModalContent(`
<p class="modal-text">Собирайте слова из слогов</p>
            <div class="ui-modal">
                <select id="difficult-select" class="ui-modal-element">
                    <option value = "35">легкий</option>
                    <option value = "25">средний</option>
                    <option value = "15">сложный</option>
                </select>
                <button id="start-game" class="modal-close ui-modal-element">начать игру</button>
            </div>
 `);
addCloseListener();

document.querySelector('#start-game').addEventListener('click',()=>{
    StartGame();
});

function StartGame(){
    timerWork=true;
    isWin=false;
    text.innerHTML='';
    setText();
    difficultSelect = document.querySelector('#difficult-select');
    difficult = difficultSelect.options[difficultSelect.selectedIndex].value;
    timer(difficult,()=>{endGame()});
    rightAnswer=0;
    wrongAnswer=0;
}

function endGame(){
    timerWork=false;
    if(isWin){
        if(localStorage.getItem(username)<2 && username!=''){
            saveLevel(username,`2`);
        }
        
        
            addModalContent(`
        <p class="modal-text">Вы выиграли</p>
            <div class="ui-modal">
                <select id="difficult-select" class="ui-modal-element">
                    <option value = "35">легкий</option>
                    <option value = "25">средний</option>
                    <option value = "15">сложный</option>
                </select>
                <button id="start-game" class="modal-close ui-modal-element">начать игру</button>
                <button id="next-level" class="modal-close ui-modal-element">В меню</button>
            </div>
        `);
        document.querySelector('#next-level').addEventListener('click',()=>{
            window.location.href='../index.html';
        });
        
  
    }else{
        addModalContent(`
        <p class="modal-text">Вы проиграли, попробуйте снова</p>
            <div class="ui-modal">
                <select id="difficult-select" class="ui-modal-element">
                    <option value = "35">легкий</option>
                    <option value = "25">средний</option>
                    <option value = "15">сложный</option>
                </select>
                <button id="start-game" class="modal-close ui-modal-element">начать игру</button>
            </div>
        `);
        
    }
    openModal();
        document.querySelector('#start-game').addEventListener('click',()=>{
            StartGame();
        });
        addCloseListener();
}

  function timer(seconds,callback){
    let time = seconds;
    let timerId = setTimeout(function tick() {
        if(time<=0 || !timerWork){
            timerElemnet.textContent='Оставшееся время:'+time;
            callback();
        }else{
            timerElemnet.textContent='Оставшееся время:'+time;
            time--;
            timerId = setTimeout(tick, 1000, seconds,time,callback);
        }
         
      }, 1000,seconds,time,callback);
}

getUsername();
function getUsername(){
    let myUrl = window.location.search
    myUrl = myUrl.substring(1);
    let arr = myUrl.split("&");
    let userArr = arr[0].split('=');
    if(userArr[0]='name'){
        username = userArr[1];
    }
}