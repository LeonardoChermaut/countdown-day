"use strict";
class Countdown {
    constructor() {
        this.startTime = Date.now();
        this.elapsedTime = 0;
        const storedElapsedTime = localStorage.getItem('elapsedTime');
        if (storedElapsedTime !== null) {
            this.elapsedTime = parseInt(storedElapsedTime, 10);
            this.startTime -= this.elapsedTime;
        }
        this.intervalId = setInterval(this.updateCounter.bind(this), 1000);
    }
    updateCounter() {
        const currentTime = Date.now();
        this.elapsedTime = currentTime - this.startTime;
        localStorage.setItem('elapsedTime', this.elapsedTime.toString());
        const { days, hours, minutes, seconds } = this.getCounterValues();
        this.updateCounterDisplay(days, hours, minutes, seconds);
    }
    updateCounterDisplay(days, hours, minutes, seconds) {
        const daysElem = document.getElementById('days');
        const hoursElem = document.getElementById('hours');
        const minutesElem = document.getElementById('minutes');
        const secondsElem = document.getElementById('seconds');
        daysElem.innerText = this.formatNumber(days);
        hoursElem.innerText = this.formatNumber(hours);
        minutesElem.innerText = this.formatNumber(minutes);
        secondsElem.innerText = this.formatNumber(seconds);
    }
    getCounterValues() {
        const totalSeconds = Math.floor(this.elapsedTime / 1000);
        const days = Math.floor(totalSeconds / (24 * 60 * 60));
        const hours = Math.floor((totalSeconds / (60 * 60)) % 24);
        const minutes = Math.floor((totalSeconds / 60) % 60);
        const seconds = Math.floor(totalSeconds % 60);
        return { days, hours, minutes, seconds };
    }
    formatNumber(num) {
        return num.toString().padStart(2, '0');
    }
    resetCounter() {
        clearInterval(this.intervalId);
        this.startTime = Date.now();
        this.elapsedTime = 0;
        localStorage.removeItem('elapsedTime');
        this.intervalId = setInterval(this.updateCounter.bind(this), 1000);
        this.updateCounterDisplay(0, 0, 0, 0);
    }
}
const countdown = new Countdown();
function resetCountdown() {
    countdown.resetCounter();
}
//# sourceMappingURL=main.js.map