const setPointer = (second:number, querySelector:string) => {
  const pointer: HTMLElement = document.querySelector(querySelector);
  const degree:number = second * 6;

  pointer.style.transform = `translate(-50%, -100%) rotate(${degree}deg)`;
}

let intervalId:number;

const startClock = (startSeconds:number, startMinutes:number, startHours:number) => {
  let second:number = startSeconds;
  let minute:number = startMinutes;
  let hour:number = startHours;

  if (intervalId) {
    clearInterval(intervalId);
  }

  setPointer(second, '.pointer__seconds');
  setPointer(minute, '.pointer__minutes');
  setPointer(hour, '.pointer__hours');

  intervalId = setInterval(() => {
    if (second === 59) {
      second = 0;
      if (minute === 59) {
        minute = 0;
        if (hour === 12) {
          hour = 1;
        } else {
          hour += 1;
        }
        setPointer(hour, '.pointer__hours');
      } else {
        minute += 1;
      }
      setPointer(minute, '.pointer__minutes');
    } else {
      second += 1;
    }
    setPointer(second, '.pointer__seconds');
  }, 1000)
}

(() => {
  window.addEventListener('load', () => {
    document.querySelector('form#hour-form').addEventListener('submit', e => {
      e.preventDefault();
      const secondsInput:HTMLInputElement = document.querySelector('input#seconds-input');
      const minutesInput:HTMLInputElement = document.querySelector('input#minutes-input');
      const hoursInput:HTMLInputElement = document.querySelector('input#hours-input');
      const startSeconds:number = Number(secondsInput.value || 0);
      const startMinutes:number = Number(minutesInput.value || 0);
      const startHours:number = Number(hoursInput.value || 0);

      if (
        startSeconds < 0 || startSeconds > 60 ||
        startMinutes < 0 || startMinutes > 60 ||
        startHours < 0 || startHours > 24
      ) {
        alert('What the fuck dude?');
        return;
      }

      startClock(startSeconds, startMinutes, startHours);
    });

    document.querySelector('button#start-local-time').addEventListener('click', () => {
      const date:Date = new Date();
      const startSeconds:number = date.getSeconds();
      const startMinutes:number = date.getMinutes();
      const startHours:number = date.getHours();

      startClock(startSeconds, startMinutes, startHours);
    })
  });
})();
