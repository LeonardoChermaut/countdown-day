class CounterTimeDays {
  private startTime: number;
  private intervalId: number;
  private elapsedTime: number;

  constructor() {
    this.startTime = Date.now();
    this.elapsedTime = 0;
    const storedElapsedTime = localStorage.getItem('elapsedTime');

    if (storedElapsedTime !== null) {
      this.elapsedTime = parseInt(storedElapsedTime, 10);
      this.startTime -= this.elapsedTime;
    }

    this.intervalId = setInterval(() => {
      this.updateCounter();
    }, 1000);
  }

  private updateCounter() {
    const currentTime = Date.now();
    this.elapsedTime = currentTime - this.startTime;
    localStorage.setItem('elapsedTime', this.elapsedTime.toString());

    const { days, hours, minutes, seconds } = this.getCounterValues();

    this.updateCounterDisplay(days, hours, minutes, seconds);
  }

  private updateCounterDisplay(
    days: number,
    hours: number,
    minutes: number,
    seconds: number
  ) {
    const daysElem = document.getElementById('days');
    const hoursElem = document.getElementById('hours');
    const minutesElem = document.getElementById('minutes');
    const secondsElem = document.getElementById('seconds');

    daysElem!.innerText = this.formatNumber(days);
    hoursElem!.innerText = this.formatNumber(hours);
    minutesElem!.innerText = this.formatNumber(minutes);
    secondsElem!.innerText = this.formatNumber(seconds);
  }

  private getCounterValues() {
    const totalSeconds = Math.floor(this.elapsedTime / 1000);
    const days = Math.floor(totalSeconds / (24 * 60 * 60));
    const hours = Math.floor((totalSeconds / (60 * 60)) % 24);
    const minutes = Math.floor((totalSeconds / 60) % 60);
    const seconds = Math.floor(totalSeconds % 60);
    return { days, hours, minutes, seconds };
  }

  private formatNumber(number: number): string {
    let formattedNumber = number.toString().padStart(2, '0');
    return formattedNumber;
  }

  resetCounter() {
    clearInterval(this.intervalId);
    this.startTime = Date.now();
    this.elapsedTime = 0;
    localStorage.removeItem('elapsedTime');

    this.intervalId = setInterval(() => {
      this.updateCounter();
    }, 1000);

    this.updateCounterDisplay(0, 0, 0, 0);
  }
}

const count = new CounterTimeDays();

const resetCountdown = () => count.resetCounter();
