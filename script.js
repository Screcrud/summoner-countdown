const waves = [
    { text: "Summoner wave 1, spawning on right side:", time: 50000 },
    { text: "Summoner wave 2, spawning on left side:", time: 240000 },
    { text: "Summoner wave 3, spawning on both sides:", time: 380000 },
    { text: "Summoner wave 4, spawning on both sides:", time: 475000 }
];


let currentWaveIndex = 0; // Initialize the current wave index
let startTime = new Date().getTime(); // Save the reference to the start time
let countdownInterval;

const waveInfoTextElement = document.getElementById('waveInfoText');
const nextWaveCountdownElement = document.getElementById('nextWaveCountdown');

function calculateTimeRemaining(targetTime) {
    const currentTime = new Date().getTime();
    const timeRemaining = targetTime - currentTime;

    let minutes = Math.floor(timeRemaining / 60000);
    let seconds = Math.round((timeRemaining % 60000) / 1000);

    minutes = Math.max(minutes, 0);
    seconds = Math.max(seconds, 0);

    return { minutes, seconds };
}

function updateCountdown() {
    const currentWaveTime = startTime + waves[currentWaveIndex].time;
    const { minutes, seconds } = calculateTimeRemaining(currentWaveTime);
    nextWaveCountdownElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    if (currentWaveTime <= new Date().getTime()) {
        const nextWaveIndex = (currentWaveIndex + 1) % waves.length;
        if (nextWaveIndex === 0) {
            // Last wave, stop the countdown
            clearInterval(countdownInterval);
        } else {
            currentWaveIndex = nextWaveIndex; // Move to the next wave
            waveInfoTextElement.textContent = waves[currentWaveIndex].text;
        }
    }
}

function startCountdown() {
    clearInterval(countdownInterval); // Clear the previous interval, if any
    currentWaveIndex = 0; // Reset to the first wave
    waveInfoTextElement.textContent = waves[currentWaveIndex].text;
    startTime = new Date().getTime(); // Update the start time only once
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 100);
}

document.getElementById('startCountdownButton').addEventListener('click', startCountdown);
