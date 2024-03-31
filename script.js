let timer;
let isRunning = false;
let startTime;
let lapTime;
let elapsedTime = 0;

const timeDisplay = document.querySelector('.time');
const millisecondsDisplay = document.querySelector('.milliseconds');
const lapList = document.getElementById('laps');

function formatTime(ms) {
     const date = new Date(ms);
     const hours = date.getUTCHours().toString().padStart(2, '0');
     const minutes = date.getUTCMinutes().toString().padStart(2, '0');
     const seconds = date.getUTCSeconds().toString().padStart(2, '0');
     const milliseconds = date.getUTCMilliseconds().toString().padStart(3, '0');
     return [`${hours}:${minutes}:${seconds}`, `${milliseconds}`];
}

function updateTime() {
     const currentTime = Date.now();
     elapsedTime = currentTime - startTime;
     time = formatTime(elapsedTime);
     timeDisplay.textContent = time[0];
     millisecondsDisplay.textContent = time[1];
}

function startStop() {
     if (isRunning) {
          clearInterval(timer);
          isRunning = false;
          document.getElementById('startStop').textContent = 'Start';
     } else {
          startTime = Date.now() - (elapsedTime || 0);
          timer = setInterval(updateTime, 10);
          isRunning = true;
          document.getElementById('startStop').textContent = 'Stop';
     }
}

function lap() {
     if (isRunning) {
          const lapItem = document.createElement('li');
          let lapT = formatTime(Date.now() - startTime);
          lapItem.textContent = `${lapT[0]}:${lapT[1]}`;
          lapList.appendChild(lapItem);
          lapTime = Date.now() - startTime;
     }
}

function reset() {
     clearInterval(timer);
     isRunning = false;
     document.getElementById('startStop').textContent = 'Start';
     timeDisplay.textContent = '00:00:00';
     millisecondsDisplay.textContent = '000';
     lapList.innerHTML = '';
     lapTime = 0;
     elapsedTime = 0
}

document.getElementById('startStop').addEventListener('click', startStop);
document.getElementById('lap').addEventListener('click', lap);
document.getElementById('reset').addEventListener('click', reset);
