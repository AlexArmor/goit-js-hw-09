import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const btnStart = document.querySelector('[data-start]');
btnStart.setAttribute('disabled', 'true');
const fieldDay = document.querySelector('[data-days]');
const fieldhours = document.querySelector('[data-hours]');
const fieldminutes = document.querySelector('[data-minutes]');
const fieldseconds = document.querySelector('[data-seconds]');
const calendar = document.querySelector('#datetime-picker');

const ELEMENT_MAPPER = {
    days: fieldDay,
    hours: fieldhours,
    minutes: fieldminutes,
    seconds: fieldseconds,
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return value.toString().padStart(2, 0);
}

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDate = Number(selectedDates[0].getTime());
        function calculateDeltaTime() {
            const deltaTime = selectedDate - Date.now();
            return deltaTime;
        }
        if (calculateDeltaTime() < 0) {
            Notify.failure("Please choose a date in the future");
            return;
        }

        btnStart.disabled = false;
        btnStart.addEventListener('click', () => {
            calendar.disabled = true;
            btnStart.disabled = true;
            const intervalId = setInterval(() => {
                const deltaTime = calculateDeltaTime();
                if (deltaTime <= 0) {
                    clearInterval(intervalId);
                    return;
                }
                const converted = convertMs(deltaTime);

                for (const key in ELEMENT_MAPPER) {
                    ELEMENT_MAPPER[key].textContent = addLeadingZero(converted[key])
                }
                // fieldDay.textContent = addLeadingZero(days);
                // fieldhours.textContent = addLeadingZero(hours);
                // fieldminutes.textContent = addLeadingZero(minutes);
                // fieldseconds.textContent = addLeadingZero(seconds);

            }, 1000);
        });
    },
};

flatpickr("#datetime-picker", options);