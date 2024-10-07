let inactivityTimer;
let isTimerActive = false;
let remainingTimeDisplay = document.getElementById('remainingTime'); // 남은 시간 표시 요소

function startTimer(minutes) {
    if (isTimerActive) return;

    isTimerActive = true;
    let duration = minutes * 60 * 1000; // 밀리초로 변환
    let endTime = Date.now() + duration;

    inactivityTimer = setTimeout(() => {
        document.getElementById('alertSound').play().catch(error => {
            console.error("오디오 재생 오류:", error);
        });
        resetTimer();
    }, duration);

    monitorActivity(endTime);
    updateRemainingTime(endTime); // 남은 시간 업데이트 함수 호출
}

function resetTimer() {
    clearTimeout(inactivityTimer);
    isTimerActive = false;
    remainingTimeDisplay.textContent = ''; // 남은 시간 초기화
}

function monitorActivity(endTime) {
    const resetTimerActivity = () => {
        resetTimer();
        const remainingTime = endTime - Date.now();
        if (remainingTime > 0) {
            setTimeout(() => startTimer(remainingTime / (1000 * 60)), 100);
        }
    };

    window.addEventListener('mousemove', resetTimerActivity);
    window.addEventListener('keypress', resetTimerActivity);
}

function updateRemainingTime(endTime) {
    const interval = setInterval(() => {
        const now = Date.now();
        const remainingTime = endTime - now;

        if (remainingTime <= 0) {
            clearInterval(interval);
            remainingTimeDisplay.textContent = ''; // 남은 시간이 0이 되면 초기화
        } else {
            const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
            remainingTimeDisplay.textContent = `남은 시간: ${minutes}분 ${seconds}초`;
        }
    }, 1000); // 1초마다 업데이트
}

// 버튼 클릭 시 타이머 시작
document.getElementById('startButton').addEventListener('click', () => {
    const minutes = parseInt(document.getElementById('timerInput').value);
    if (isNaN(minutes) || minutes <= 0) {
        alert("유효한 분 수를 입력해주세요.");
    } else {
        startTimer(minutes);
    }
});

// 눈 깜빡임 감지용 자리 표시자
function initBlinkDetection() {
    // clmtrackr 또는 face-api.js와 같은 라이브러리를 사용하여 눈 깜빡임 감지를 구현하세요.
}

// 필요에 따라 init 함수를 호출하세요.
// initBlinkDetection();
