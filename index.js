const winningMsg=document.querySelector('.winning-message');
const win=document.querySelector('.winner');
const restartDiv=document.querySelector('.restart');

// Datastructures
var score;
var cellStatus = [];
var bombcells = new Set();

//functions

function startGame() {
    score = 0;
    bombcells.clear();
    cellStatus = [];

    document.getElementById("mainSection").innerHTML = "";
    let scoreEle = document.createElement("h2");
    scoreEle.id = "score";
    scoreEle.innerText = "Score:" + score;
    scoreEle.style.textAlign = "center";
    document.getElementById("mainSection").appendChild(scoreEle);

    for (let i = 0; i < 81; i++)
        cellStatus.push(0);

    generateRandom();

    let id = 0;

    document.getElementById("mainSection").style.marginTop = "5em";
    for (let i = 0; i < 9; i++) {
        let row = document.createElement("div");
        row.className = "row";
        for (let j = 0; j < 9; j++) {
            let col = document.createElement("div");
            //css prop
            col.className = "col";
            col.style.backgroundColor = "#93b5b3";
            col.style.border = "2px solid #63707e"
            col.style.height = "5em";

            //give ids
            col.id = id;
            id++;
            col.onclick = () => { updateScore(col.id) }

            row.appendChild(col);
        }
        document.getElementById("mainSection").appendChild(row);
    }


}

function updateScore(id) {
    console.log("Clicked at cell no ", id)
    if (cellStatus[id] == 1) {
        return;
    }
    else if (cellStatus[id] == 0) {
        document.getElementById(id).style.backgroundColor = "#79d70f";
        score += 5;
        document.getElementById("score").innerText = "Score:" + score;
        cellStatus[id] = 1;
    }
    else {
        bombcells.forEach(idx => {
            document.getElementById(idx).style.backgroundColor = "#d92027";
        })
        if(score<=50){
            winningMsg.innerHTML="Your score is:" + score + " ,which is very low";
        }else if(score>50 && score <=100){
            winningMsg.innerHTML="Your score is:" + score + " ,which is low";
        } else if(score>100 && score <=150){
            winningMsg.innerHTML="Your score is:" + score + " ,which is good";
        } else if(score>150 && score <=200){
            winningMsg.innerHTML="Your score is:" + score + " ,which is very good";
        } else if(score>200 && score<=250){
            winningMsg.innerHTML="Your score is:" + score + " ,which is impressive";
        } else if(score>250 && score<=300){
            winningMsg.innerHTML="Your score is:" + score + " ,Tremendous Score";
        }else{
            winningMsg.innerHTML="Your score is:" + score + " ,Hurray! You own this game. ";
        }
        win.classList.add('show');
        return;
    }
}

function generateRandom() {
    while (bombcells.size < 10) {
        let index = Math.floor(Math.random() * (80) + 0);
        bombcells.add(index);
    }
    console.log(bombcells);
    bombcells.forEach(idx => {
        cellStatus[idx] = -1;
    })
}

function handleRestart(){
    win.classList.remove('show');
    startGame();
}

restartDiv.addEventListener('click', handleRestart);

startGame();