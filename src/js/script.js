
const hr = document.getElementById("hrCont");
const min = document.getElementById("minCont");
const sec = document.getElementById("secCont");
const timerLabel = document.getElementById("timer");
const startButton = document.getElementById("btnStart");
let hours = 0;
let minutes = 0;
let seconds = 0;
let isRunning = false;
let timer = {
    hour: '00',
    minute: '00',
    second: '00'
}

window.onload = init;

function init() {
    createTimer(hr, "h");
    createTimer(min, "m");
    createTimer(sec, "s");
}

function createTimer(cont, timeUnit) {
    for(let i = 0; i <= 59; i++) {
        let item = document.createElement("div");
        item.appendChild(document.createTextNode(addZero(i)));
        item.classList.add('timePeace');
        cont.appendChild(item);
    }
}

function addZero(val) {
    if(val < 10) {
        val = "0" + val;
    }
    return val;
}

hr.addEventListener("click", event =>{
        timer.hour = event.target.innerHTML;
        changeTimer(event.target, hr);      
})

min.addEventListener("click", event =>{
    timer.minute = event.target.innerHTML;
    changeTimer(event.target);
})

sec.addEventListener("click", event =>{
    timer.second = event.target.innerHTML;
    changeTimer(event.target);
})


function changeTimer(targt) {
    timerLabel.innerHTML = `${timer.hour}:${timer.minute}:${timer.second}`;
    hours = parseInt(timer.hour);
    minutes = parseInt(timer.minute);
    seconds = parseInt(timer.second);
}


startButton.addEventListener("click", startStopCountDown);

function startStopCountDown() {
    if(isRunning === false) {
        isRunning = true;
        startButton.innerText = 'Stopp';
        startButton.style.backgroundColor = 'red';
        setInterval(countDown, 1000);
    }else{
       location.reload();
    }
}

function countDown() {
    if(seconds > 0){
        seconds--;
    }else{
        if(minutes > 0){
            minutes--;
            seconds = 59;
        }else{
            if(hours > 0){
                hours --;
                minutes = 59;
                seconds = 59;
            }
        }
    }
    timerLabel.innerHTML = `${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;
   // Timer ist abgelaufen
    if(hours === 0 && minutes === 0 && seconds === 0) {
        timerLabel.innerHTML = "Ende"
        startButton.classList.add('shake')
        startButton.innerText = 'Start';
        startButton.style.backgroundColor = 'green';
    }
}