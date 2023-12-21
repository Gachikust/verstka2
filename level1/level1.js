"use strict"
let difficult = 5;
let rightAnswer = 0;
let wrongAnswer = 0;
let curLevel = 1;
let chousen = false;
let firstSelected ;
let isLeftSelected = false;
let isWin =false;
let timerWork=false;
let username='';
let wordsArr=[[
    {num:0,word:'Граф'},
    {num:1,word:'Барон'},
    {num:2,word:'Коза'},
    {num:3,word:'Курица'},
    {num:4,word:'Корова'},
    {num:5,word:'Конь'},
    {num:6,word:'Кот'},
    {num:7,word:'Ворон'},
    {num:8,word:'Лев'},
    {num:9,word:'Мальчик'},
],[
    {num:0,word:'Графиня'},
    {num:1,word:'Баронесса'},
    {num:2,word:'Козел'},
    {num:3,word:'Петух'},
    {num:4,word:'Бык'},
    {num:5,word:'Лошадь'},
    {num:6,word:'Кошка'},
    {num:7,word:'Ворона'},
    {num:8,word:'Львица'},
    {num:9,word:'Девочка'},
]];
let wordsArr2=[[
    {num:0,word:'Собака'},
    {num:1,word:'Взрослый'},
    {num:2,word:'Лошадь'},
    {num:3,word:'Курица'},
    {num:4,word:'Корова'},
    {num:5,word:'Рыба'},
    {num:6,word:'Кот'},
    {num:7,word:'Коза'},
    {num:8,word:'Дерево'},
    {num:9,word:'Помидор'},
],[
    {num:0,word:'Щенок'},
    {num:1,word:'Ребенок'},
    {num:2,word:'Жеребенок'},
    {num:3,word:'Цыпленок'},
    {num:4,word:'Теленок'},
    {num:5,word:'Малек'},
    {num:6,word:'Котенок'},
    {num:7,word:'Козленок'},
    {num:8,word:'Саженец'},
    {num:9,word:'Семечко'},
]];
let wordsArr3=[[
    {num:0,word:'Улей'},
    {num:1,word:'Окно'},
    {num:2,word:'Стул'},
    {num:3,word:'Дерево'},
    {num:4,word:'Лошадь'},
    {num:5,word:'Компьютер'},
    {num:6,word:'Птица'},
    {num:7,word:'Стакан'},
    {num:8,word:'Шкаф'},
    {num:9,word:'Салат'},
],[
    {num:0,word:'Пчелы'},
    {num:1,word:'Рама'},
    {num:2,word:'Спинка'},
    {num:3,word:'Ветка'},
    {num:4,word:'Копыто'},
    {num:5,word:'Процессор'},
    {num:6,word:'Клюв'},
    {num:7,word:'Ручка'},
    {num:8,word:'Полка'},
    {num:9,word:'Помидор'},
]];
openModal();
//addOpenListener();
 addModalContent(`
<p class="modal-text">В этой игре вы должны соединять подходящие слова. Нажмите сначала на первое слово, потом на второе</p>
            <div class="ui-modal">
                <select id="difficult-select" class="ui-modal-element">
                    <option value = "5">легкий</option>
                    <option value = "7">средний</option>
                    <option value = "10">сложный</option>
                </select>
                <button id="start-game" class="modal-close ui-modal-element">начать игру</button>
            </div>
 `);
addCloseListener();

let timeCount = 0;
let timerElemnet = document.querySelector('.timer');



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

let difficultSelect = document.querySelector('#difficult-select');

document.querySelector('#start-game').addEventListener('click',()=>{
    StartGame();
});

function generateWordsBlock(blockCount, wordsArr){
    let leftBlock = document.querySelector('.left-words');
    leftBlock.innerHTML ='';
    let rightBlock = document.querySelector('.right-words');
    rightBlock.innerHTML='';
    shuffle(wordsArr);
    shuffleParralel(wordsArr[0],wordsArr[1]);
    let leftArr=shuffle( wordsArr[0].slice(0,blockCount));
    let rightArr=shuffle( wordsArr[1].slice(0,blockCount));
    let i=0;

    for(i=0;i<blockCount;i++){
        let block = document.createElement('p');
        block.classList.add('word-block');
        block.textContent = leftArr[i].word;
        addSelected(block);
        block.wordId = leftArr[i].num;
        
        block.left = true;
        leftBlock.append(block);
        
    }

    for(i=0;i<blockCount;i++){
        let block = document.createElement('p');
        block.classList.add('word-block');
        block.textContent =rightArr[i].word;
        addSelected(block);
        block.wordId = rightArr[i].num;
        block.left = false;
        rightBlock.append(block);
    }
}

function addSelected(block){
    block.addEventListener('click',(e)=>{
        if(chousen){
            if(isLeftSelected!=e.target.left){
        if(firstSelected.wordId === e.target.wordId){
            firstSelected.classList.add('word-block-right');
            e.target.classList.add('word-block-right');
            firstSelected.classList.remove('word-block-selected');
            firstSelected.classList.remove('word-block-wrong');
            e.target.classList.remove('word-block-wrong');
            rightAnswer++;
            counter.textContent = `соединено ${rightAnswer}/${difficult}`;
            if(rightAnswer==difficult){
                isWin=true;
                if(username!=''){
                    let obj = getUserObj();
                    obj[username] = `1.${curLevel}`;
                    localStorage.setItem('score',JSON.stringify(obj));
                }
                curLevel++;
                endGame();
            }
        }else{
            firstSelected.classList.remove('word-block-selected');
            firstSelected.classList.add('word-block-wrong');
            e.target.classList.add('word-block-wrong');
            wrongAnswer++;
            if(wrongAnswer>=3){
                endGame();
            }
        }
        chousen=false;
    }
        }else{
            isLeftSelected =e.target.left;
            firstSelected = e.target;
            e.target.classList.add('word-block-selected');
            chousen=true;
        }
    })
}


function shuffle(array, size) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  function shuffleParralel(array,array2) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
        [array2[currentIndex], array2[randomIndex]] = [
            array2[randomIndex], array2[currentIndex]];
    }
    return array;
  }

function endGame(){
    timerWork=false;
    if(isWin){
        
        if(curLevel<=3){
            
            addModalContent(`
        <p class="modal-text">Вы выиграли</p>
            <div class="ui-modal">
                <select id="difficult-select" class="ui-modal-element">
                    <option value = "5">легкий</option>
                    <option value = "7">средний</option>
                    <option value = "10">сложный</option>
                </select>
                <button id="start-game" class="modal-close ui-modal-element">Продолжить</button>
            </div>
        `);
        }else{
            addModalContent(`
        <p class="modal-text">Вы выиграли</p>
            <div class="ui-modal">
                <select id="difficult-select" class="ui-modal-element">
                    <option value = "5">легкий</option>
                    <option value = "7">средний</option>
                    <option value = "10">сложный</option>
                </select>
                <button id="start-game" class="modal-close ui-modal-element">начать игру</button>
                <button id="next-level" class="modal-close ui-modal-element">Следующий уровень</button>
            </div>
        `);
        document.querySelector('#next-level').addEventListener('click',()=>{
            window.location.href=`../level2/level2.html?name=${username}`;
        });
        }
  
    }else{
        addModalContent(`
        <p class="modal-text">Вы проиграли, попробуйте снова</p>
            <div class="ui-modal">
                <select id="difficult-select" class="ui-modal-element">
                    <option value = "5">легкий</option>
                    <option value = "7">средний</option>
                    <option value = "10">сложный</option>
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
let counter = document.querySelector('.count');
function StartGame(){
    timerWork=true;
    switch (curLevel){
        case 1:
            timer(20,()=>{endGame();});
            generateWordsBlock(difficult,wordsArr);
            break
        case 2:
            timer(15,()=>{endGame();});
            generateWordsBlock(difficult,wordsArr2);
            break
        case 3:
            timer(10,()=>{endGame();});
            generateWordsBlock(difficult,wordsArr3);
            break
        default:
            timer(10,()=>{endGame();});
            generateWordsBlock(difficult,wordsArr);
            break
    }
    difficult = 5;
    rightAnswer = 0;
    wrongAnswer = 0;
    chousen = false;
    firstSelected ;
    isLeftSelected = false;
    isWin =false;
    
    difficultSelect = document.querySelector('#difficult-select');
    difficult = difficultSelect.options[difficultSelect.selectedIndex].value;
    
    counter.textContent = `соединено 0/${difficult}`;
}
document.querySelector('#to-menu').addEventListener('click',()=>{
    window.location.href='../index.html';
})

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