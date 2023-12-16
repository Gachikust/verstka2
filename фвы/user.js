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