import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const btnStart = document.querySelector('[data-start]');
btnStart.setAttribute('disabled', 'true');
const timerDisplay = document.querySelectorAll('.value');

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

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        btnStart.removeAttribute('disabled');
        const selectedDate = Number(selectedDates[0].getTime());
        function calculateDeltaTime() {
            const deltaTime = selectedDate - new Date().getTime();
            return deltaTime;
        }
        if (calculateDeltaTime() < 0) {
            alert("Please choose a date in the future");
            return;
        }

        btnStart.addEventListener('click', () => {
            btnStart.setAttribute('disabled', 'true');
            timerId = setInterval(() => {
                const deltaTime = calculateDeltaTime();
                const convertedTime = Object.values(convertMs(deltaTime));
                timerDisplay.forEach((element, index) => {
                    element.textContent = convertedTime[index];
                })
            }, 1000);
        });
    },
};

const calendar = flatpickr("#datetime-picker", options);