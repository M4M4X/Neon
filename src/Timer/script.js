document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('start-timer');
    startButton.addEventListener('click', startCountdown);
  
    function startCountdown() {
      let days = parseInt(document.getElementById('clock-day').textContent) || 0;
      let hours = parseInt(document.getElementById('clock-hours').textContent) || 0;
      let minutes = parseInt(document.getElementById('clock-minutes').textContent) || 0;
      let seconds = parseInt(document.getElementById('clock-seconds').textContent) || 0;
  
      // Assurez-vous que les éléments ne sont plus éditables une fois le compte à rebours démarré
      setEditable(false);
  
      let countdownTime = (days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60) + seconds;
      
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
  
      let timerInterval = setInterval(() => {
        if (countdownTime > 0) {
          countdownTime--;
          updateTimerDisplay(countdownTime);
        } else {
          clearInterval(timerInterval);
          alert('Countdown finished!');
          setEditable(true);
        }
      }, 1000);
    }
  
    function setEditable(isEditable) {
      document.getElementById('clock-day').contentEditable = isEditable;
      document.getElementById('clock-hours').contentEditable = isEditable;
      document.getElementById('clock-minutes').contentEditable = isEditable;
      document.getElementById('clock-seconds').contentEditable = isEditable;
    }
  });
  