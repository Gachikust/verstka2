"use strict";
let modalWindow = document.querySelector('.modal-window');


function addModalContent(content){
    modalWindow.querySelector('.modal-content').innerHTML=content;
}

function addCloseListener(){
    document.querySelector('.modal-close').addEventListener('click',()=>{
        modalWindow.style.display='none';
    });
}

function addOpenListener(){
    document.querySelector('.modal-open').addEventListener('click',()=>{
        modalWindow.style.display='flex';
    });
}

function openModal(){
    modalWindow.style.display='flex';
}