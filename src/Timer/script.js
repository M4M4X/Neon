let timerInterval; // Variable pour l'intervalle du compte à rebours
let longPressTimer; // Timer pour détecter un appui long
let isLongPress = false; // Flag pour identifier un appui long

document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('start-timer');
    const stopButton = document.getElementById('stop-timer');

    startButton.addEventListener('click', startCountdown);

    stopButton.addEventListener('mousedown', function() {
        isLongPress = false;
        longPressTimer = setTimeout(function() {
            isLongPress = true;
            resetTimerDisplay();
            stopCountdown();
            document.getElementById('stop-timer').style.display = 'none';
        }, 1000); // Durée d'appui long (1 seconde)
    });

    stopButton.addEventListener('mouseup', function() {
        clearTimeout(longPressTimer);
        if (!isLongPress) {
            stopCountdown();
        }
    });

    stopButton.addEventListener('mouseleave', function() {
        clearTimeout(longPressTimer);
    });

    function startCountdown() {
        let days = parseInt(document.getElementById('clock-day').textContent) || 0;
        let hours = parseInt(document.getElementById('clock-hours').textContent) || 0;
        let minutes = parseInt(document.getElementById('clock-minutes').textContent) || 0;
        let seconds = parseInt(document.getElementById('clock-seconds').textContent) || 0;

        setEditable(false);

        let countdownTime = (days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60) + seconds;

        updateTimerDisplay(countdownTime);
        timerInterval = setInterval(() => {
            if (countdownTime > 0) {
                countdownTime--;
                updateTimerDisplay(countdownTime);
            } else {
                finishCountdown();
            }
        }, 1000);

        document.getElementById('stop-timer').style.display = 'inline-block';
    }

    function stopCountdown() {
        clearInterval(timerInterval);
        setEditable(true);
        /*document.getElementById('stop-timer').style.display = 'none';*/
    }

    function resetTimerDisplay() {
        document.getElementById('clock-day').textContent = '00';
        document.getElementById('clock-hours').textContent = '00';
        document.getElementById('clock-minutes').textContent = '00';
        document.getElementById('clock-seconds').textContent = '00';

        document.documentElement.style.setProperty('--timer-day', "00");
        document.documentElement.style.setProperty('--timer-hours', "00");
        document.documentElement.style.setProperty('--timer-minutes', "00");
        document.documentElement.style.setProperty('--timer-seconds', "00");
    }

    function setEditable(isEditable) {
        document.getElementById('clock-day').contentEditable = isEditable;
        document.getElementById('clock-hours').contentEditable = isEditable;
        document.getElementById('clock-minutes').contentEditable = isEditable;
        document.getElementById('clock-seconds').contentEditable = isEditable;
    }

    function updateTimerDisplay(time) {
        let d = Math.floor(time / (24 * 60 * 60));
        let h = Math.floor((time % (24 * 60 * 60)) / (60 * 60));
        let m = Math.floor((time % (60 * 60)) / 60);
        let s = time % 60;

        document.getElementById('clock-day').textContent = d < 10 ? '0' + d : d;
        document.getElementById('clock-hours').textContent = h < 10 ? '0' + h : h;
        document.getElementById('clock-minutes').textContent = m < 10 ? '0' + m : m;
        document.getElementById('clock-seconds').textContent = s < 10 ? '0' + s : s;
    }

    function finishCountdown() {
        clearInterval(timerInterval);
        alert('Countdown finished!');
        setEditable(true);
        document.getElementById('stop-timer').style.display = 'none';
    }
});
