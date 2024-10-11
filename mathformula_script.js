const questions = [
    { question: '(x + y)(x - y)', answer: 'x^2 - y^2' },
    { question: '(a + b)^2', answer: 'a^2 + 2ab + b^2' },
    { question: '(a - b)^2', answer: 'a^2 - 2ab + b^2' },
    { question: '(x + y)(x - y)', answer: 'x^2 - y^2' },
    { question: '(p + q)(p - q)', answer: 'p^2 - q^2' },
    // 더 많은 공식을 추가할 수 있습니다.
];

let currentQuestionIndex = 0;
let attempts = 0;  // 시도 횟수를 기록하는 변수
let nextQuestionalert = 1;

// 초기화 함수: 첫 문제를 로드
function loadQuestion() {
    const questionText = document.getElementById('questionText');
    questionText.textContent = questions[currentQuestionIndex].question;
    document.getElementById('answerInput').value = ''; // 입력란 비우기
    document.getElementById('resultText').textContent = ''; // 결과 텍스트 비우기
    attempts = 0;  // 시도 횟수 초기화
}

// 정답 체크 및 다음 문제로 넘어가는 함수
function checkAnswer() {
    const answerInput = document.getElementById('answerInput').value;
    const resultText = document.getElementById('resultText');
    
    // 정답일 경우
    if (answerInput.trim() === questions[currentQuestionIndex].answer) {
        resultText.textContent = "정답입니다!";
        resultText.style.color = "green";
        nextQuestionalert = 0;
        document.getElementById('submitAnswer').textContent = '다음 문제';
    } else {
        // 오답일 경우
        attempts++;
        if (attempts < 2) {  // 첫 번째 시도일 경우
            resultText.textContent = "오답입니다. 다시 시도해 보세요.";
            resultText.style.color = "red"
            setTimeout(checkAnswer, 2000);
            
        } else {  // 두 번째 시도일 경우
            resultText.textContent = "오답입니다. 정답은 " + questions[currentQuestionIndex].answer + "입니다.";
            resultText.style.color = "red";
            nextQuestionalert = 0;
            document.getElementById('submitAnswer').textContent = '다음 문제';
        }
    }
}

// 다음 문제로 넘어가는 함수
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        setTimeout(loadQuestion, 2000);  // 다음 문제 로드
    } else {
        // 문제가 끝났을 때
        const resultText = document.getElementById('resultText');
        resultText.textContent = "모든 문제를 완료했습니다!";
        resultText.style.color = "blue";
    }
}

// 시작 버튼 또는 확인 버튼 클릭 이벤트
document.getElementById('submitAnswer')
if (nextQuestionalert=1) {
    document.addEventListener('click', checkAnswer);
} else {
    document.addEventListener('click', nextQuestion);
}

// 첫 문제 로드
loadQuestion();
