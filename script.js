const waves = [
    { text: "Summoner right side spawning in:", time: 50000 },
    { text: "Summoner left side spawning in:", time: 240000 },
    { text: "Summoner both sides spawning in:", time: 380000 }
];


let currentWaveIndex = 0; // Initialize the current wave index
let startTime = new Date().getTime(); // Save the reference to the start time

function calculateTimeRemaining(targetTime) {
    const currentTime = new Date().getTime();
    const timeRemaining = targetTime - currentTime;

    const minutes = Math.round(timeRemaining / 60000);
    const seconds = Math.ceil((timeRemaining % 60000) / 1000);

    return { minutes, seconds };
}

function updateCountdown() {
    const waveInfoTextElement = document.getElementById('waveInfoText');
    const nextWaveCountdownElement = document.getElementById('nextWaveCountdown');

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


let countdownInterval;

function startCountdown() {
    clearInterval(countdownInterval); // Clear the previous interval, if any
    currentWaveIndex = 0; // Reset to the first wave
    startTime = new Date().getTime(); // Update the start time only once
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
}

document.getElementById('startCountdownButton').addEventListener('click', startCountdown);
