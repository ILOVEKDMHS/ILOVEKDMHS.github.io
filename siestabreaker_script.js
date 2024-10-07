let inactivityTimer;
let countdownInterval;
const statusText = document.getElementById('statusText');
const alarmSound = document.getElementById('alarmSound');
const timeoutInput = document.getElementById('timeout');
const startButton = document.getElementById('startButton');
let userTimeout = 0;
let remainingTime = 0;

// 타이머 리셋 및 카운트다운 업데이트
function resetTimer() {
    clearTimeout(inactivityTimer);  // 기존 타이머 초기화
    clearInterval(countdownInterval); // 기존 카운트다운 초기화
    remainingTime = userTimeout;  // 설정한 시간을 남은 시간에 복사

    statusText.textContent = `남은 시간: ${remainingTime}초`;

    countdownInterval = setInterval(() => {
        remainingTime--;
        statusText.textContent = `남은 시간: ${remainingTime}초`;
        if (remainingTime <= 0) {
            clearInterval(countdownInterval);
            triggerAlarm();
        }
    }, 1000);  // 1초마다 남은 시간 업데이트

    inactivityTimer = setTimeout(triggerAlarm, userTimeout * 1000);  // 최종 타이머
}

// 알람 재생 함수
function triggerAlarm() {
    statusText.textContent = "아무 활동이 감지되지 않았습니다. 알람이 울립니다!";
    alarmSound.play();
    alarmSound.play();
    alarmSound.play();
}

// 사용자 이벤트 감지 (마우스/키보드)
function startMonitoring() {
    document.addEventListener('mousemove', resetTimer);
    document.addEventListener('keydown', resetTimer);
}

// 시작 버튼 클릭 시 타이머 설정
startButton.addEventListener('click', () => {
    userTimeout = parseInt(timeoutInput.value);
    if (isNaN(userTimeout) || userTimeout <= 0) {
        statusText.textContent = "유효한 시간을 입력하세요.";
    } else {
        resetTimer();  // 타이머 초기화 및 시작
        startMonitoring();  // 사용자 활동 감지 시작
    }
});
