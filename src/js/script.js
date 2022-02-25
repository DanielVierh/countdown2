const hr_Container = document.getElementById('hrCont');
const min_Container = document.getElementById('minCont');
const sec_Container = document.getElementById('secCont');
const timerLabel = document.getElementById('timer');
const startButton = document.getElementById('btnStart');
const body = document.querySelector('body');
const timeUnitContainer = document.getElementById('timeUnitContainer');
const alarmSound = new Audio('src/assets/alarm.mp3');
let isRunning = false;
let isAlarmColor = false;
let timerArray = [];
let timer = {
    hour: '00',
    minute: '00',
    second: '00',
    int_hours: 0,
    int_minutes: 0,
    int_Seconds: 0,
};

window.onload = init;

// Anweisung zum rendern der Stunden, Minuten und Sekunden von 0 - 59
function init() {
    createTimeUnits(hr_Container);
    createTimeUnits(min_Container);
    createTimeUnits(sec_Container);
    load_last_Countdown();
}

// Lade Daten aus dem LocalStorage
function load_last_Countdown() {
    if(localStorage.getItem('storedTimer') !== null) {
        timerArray = JSON.parse(localStorage.getItem('storedTimer'));
        timer.hour = timerArray[0];
        timer.minute = timerArray[1];
        timer.second = timerArray[2];
        changeTimer();
        timerArray = [];
    }
}

// Funktion zum rendern der Stunden, Minuten und Sekunden von 0 - 59
function createTimeUnits(container) {
    for (let i = 0; i <= 59; i++) {
        let item = document.createElement('div');
        item.appendChild(document.createTextNode(addZero(i)));
        item.classList.add('timePeace');
        container.appendChild(item);
    }
}

// Kleine Hilfsfunktion, um eine 0 hinzuzufügen
function addZero(val) {
    if (val < 10) {
        val = '0' + val;
    }
    return val;
}

// Event Listener der drei Zeiteinheiten Stunde, Minute und Sekunde
hr_Container.addEventListener('click', (event) => {
        timer.hour = event.target.innerHTML;
        changeTimer();
});

min_Container.addEventListener('click', (event) => {
        timer.minute = event.target.innerHTML;
        changeTimer();
});

sec_Container.addEventListener('click', (event) => {
        timer.second = event.target.innerHTML;
        changeTimer();
});

// Refresh der eingestellten Zeit und Convertierung in Integer
function changeTimer() {
    timerLabel.innerHTML = `${timer.hour}:${timer.minute}:${timer.second}`;
    timer.int_hours = parseInt(timer.hour);
    timer.int_minutes = parseInt(timer.minute);
    timer.int_Seconds = parseInt(timer.second);
}

// Event Listener vom Start Button
startButton.addEventListener('click', startStopCountDown);

// Starte Countdown
function startStopCountDown() {
    if (isRunning === false) {
        timerArray.push(timer.hour)
        timerArray.push(timer.minute)
        timerArray.push(timer.second)
        console.log(timerArray);
        // Speichere letzten Countdown ab
        localStorage.setItem('storedTimer', JSON.stringify(timerArray))

        alarmSound.pause();
        isRunning = true;
        startButton.innerText = 'Stopp';
        startButton.style.backgroundColor = 'red';
        setInterval(countDown, 1000);
        timeUnitContainer.style.display = 'none';
        timerLabel.style.position = 'fixed';
        timerLabel.style.top = '40%';
        timerLabel.style.left = '50%';
        timerLabel.style.transform = 'translate(-50%, -50%)';
    } else {
        location.reload();
    }
}

// Eigentliche Countdown Funktion
function countDown() {
    // Hier wird runtergezählt
    if (timer.int_Seconds > 0) {
        timer.int_Seconds--;
    } else {
        if (timer.int_minutes > 0) {
            timer.int_minutes--;
            timer.int_Seconds = 59;
        } else {
            if (timer.int_hours > 0) {
                timer.int_hours--;
                timer.int_minutes = 59;
                timer.int_Seconds = 59;
            }
        }
    }
    // Aktuellen Stand anzeigen
    timerLabel.innerHTML = `${addZero(timer.int_hours)}:${addZero(timer.int_minutes,)}:${addZero(timer.int_Seconds)}`;
    // Timer ist abgelaufen
    if (
        timer.int_hours === 0 &&
        timer.int_minutes === 0 &&
        timer.int_Seconds === 0
    ) {
        timerLabel.innerHTML = '--:--:--';
        startButton.innerText = 'Ende';
        startButton.style.backgroundColor = 'orange';
        if (isAlarmColor === false) {
            isAlarmColor = true;
            body.style.background = 'rgb(119, 0, 0)';
            alarmSound.play();
        } else {
            isAlarmColor = false;
            body.style.background = 'rgba(0, 0, 0, 0.863)';
        }
    }
}
