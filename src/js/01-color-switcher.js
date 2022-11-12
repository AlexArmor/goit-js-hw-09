function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
btnStop.setAttribute("disabled", "true");

btnStart.addEventListener('click', onStartClick);

function onStartClick() {
    btnStart.setAttribute("disabled", "true");
    btnStop.removeAttribute("disabled");
    const timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    btnStop.addEventListener('click', () => {
        clearInterval(timerId);
        btnStop.setAttribute("disabled", "true");
        btnStart.removeAttribute("disabled");
    });
}