"use strict";
let scoreElement = document.querySelector('.score-content');
let isScoreOpen=false;
let nameInput = document.querySelector('.name-input');
let scoreContent = document.querySelector('.score-content');
document.querySelector('#open-score').addEventListener('click',()=>{
    if(isScoreOpen){
        isScoreOpen=false;
        scoreElement.classList.remove('score-animation');
        scoreElement.classList.add('score-animation-reverse');
    }else{
        isScoreOpen=true;
        scoreElement.classList.add('score-animation');
        scoreElement.classList.remove('score-animation-reverse');
    }
})

addModalContent(`
<div class="menu">
<button id="level1" class="menu-button level-button">Уровень 1</button>
<button id="level2" class="menu-button level-button">Уровень 2</button>
<button id="level3" class="menu-button level-button">Уровень 3</button>
<button class="menu-button level-button modal-close">Назад</button>
</div>
`)

addCloseListener();
addOpenListener();

document.querySelector('#level1').addEventListener('click',()=>{
    window.location.href='level1/level1.html?name='+nameInput.value;
});
document.querySelector('#level2').addEventListener('click',()=>{
    window.location.href='level2/level2.html?name='+nameInput.value;
});
document.querySelector('#level3').addEventListener('click',()=>{
    window.location.href='level3/level3.html?name='+nameInput.value;
});


for(let i=0;i<localStorage.length;i++){
    let userElement = document.createElement('p');
    userElement.textContent = `${localStorage.key(i)}:${localStorage.getItem(localStorage.key(i))}`;
    scoreContent.append(userElement);
}