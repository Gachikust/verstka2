"use strict"
function saveLevel(name,level){
    localStorage.setItem(name, level);
}

function getAllusers(){
    let userArr=[];
    for (var i = 0; i < localStorage.length; i++){
        userArr.push({
            user:localStorage.key(i),
            level:localStorage.getItem(localStorage.key(i)),
        });
    }
}

function getUserObj(){
    let score = localStorage.getItem('score');
    var obj = JSON.parse(score);
    return obj;
}