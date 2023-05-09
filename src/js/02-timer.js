import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const dataTimePickerUrl = document.querySelector('input#datetime-picker');
const counterStartBtnUrl = document.querySelector('button[data-start]');
const urls = {
  timerDaysSpan: document.querySelector('span[data-days]'),
  timerHoursSpan: document.querySelector('span[data-hours]'),
  timerMinutesSpan: document.querySelector('span[data-minutes]'),
  timerSecondsSpan: document.querySelector('span[data-seconds]'),
};
StartBtnBlock();
// *

let selectedDate = 0;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,


  onClose(selectedDates) {
    if (selectedDates[0] <= options.defaultDate) {
      Notify.failure('Please choose a date in the future!');
      StartBtnBlock();
      return;
    }
    counterStartBtnUrl.removeAttribute('disabled');
    selectedDate = selectedDates[0].getTime();
  },
};


flatpickr(dataTimePickerUrl, options);


counterStartBtnUrl.addEventListener('click', onCounterStart);
let isIntervalActive = false;
function onCounterStart() {
  if (isIntervalActive) {
    Notify.warning(
      'The countdown has already started! Please, reload the page.'
    );
    return;
  }
  Notify.success('The countdown has begun.');
  const intervalId = setInterval(() => {
    let preventTimerResult = selectedDate - new Date().getTime();
    let convertedTimerResult = convertMs(preventTimerResult);

    urls.timerDaysSpan.textContent = addLeadingZero(
      String(convertedTimerResult.days)
    );
    urls.timerHoursSpan.textContent = addLeadingZero(
      String(convertedTimerResult.hours)
    );
    urls.timerMinutesSpan.textContent = addLeadingZero(
      String(convertedTimerResult.minutes)
    );
    urls.timerSecondsSpan.textContent = addLeadingZero(
      String(convertedTimerResult.seconds)
    );

    if (preventTimerResult < 1000) {
      clearInterval(intervalId);
    }
  }, 1000);
  isIntervalActive = true;
}


function addLeadingZero(value) {
  return value.padStart(2, 0);
}

function StartBtnBlock() {
  counterStartBtnUrl.setAttribute('disabled', 'true');
}


function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}