const questions = [
    { question: '(x + y)(x - y)', answer: 'x^2 - y^2' },
    { question: '(a + b)^2', answer: 'a^2 + 2ab + b^2' },
    { question: '(a - b)^2', answer: 'a^2 - 2ab + b^2' },
    { question: '(x + y)(x - y)', answer: 'x^2 - y^2' },
    { question: '(p + q)(p - q)', answer: 'p^2 - q^2' },
];

let currentQuestionIndex = 0;
let attempts = 0;  // 시도 횟수를 기록하는 변수
let isNextQuestion = false;  // 다음 문제로 넘어가는 플래그

// 초기화 함수: 첫 문제를 로드
function loadQuestion() {
    const questionText = document.getElementById('questionText');
    questionText.textContent = questions[currentQuestionIndex].question;
    document.getElementById('answerInput').value = ''; // 입력란 비우기
    document.getElementById('resultText').textContent = ''; // 결과 텍스트 비우기
    document.getElementById('submitAnswer').textContent = '확인'; // 버튼 텍스트를 '확인'으로 설정
    attempts = 0;  // 시도 횟수 초기화
    isNextQuestion = false;  // 다음 문제로 넘어가는 플래그 초기화
}

// 정답 체크 및 다음 문제로 넘어가는 함수
function checkAnswer() {
    if (isNextQuestion) {
        nextQuestion();  // 다음 문제로 넘어가는 함수 호출
        return;
    }

    const answerInput = document.getElementById('answerInput').value;
    const resultText = document.getElementById('resultText');
    
    // 정답일 경우
    if (answerInput.trim() === questions[currentQuestionIndex].answer) {
        resultText.textContent = "정답입니다!";
        resultText.style.color = "green";
        document.getElementById('submitAnswer').textContent = '다음 문제';  // 버튼 텍스트를 '다음 문제'로 변경
        isNextQuestion = true;  // 다음 문제로 넘어가게 설정
    } else {
        // 오답일 경우
        attempts++;
        if (attempts < 2) {  // 첫 번째 시도일 경우
            resultText.textContent = "오답입니다. 다시 시도해 보세요.";
            resultText.style.color = "red";
        } else {  // 두 번째 시도일 경우
            resultText.textContent = "오답입니다. 정답은 " + questions[currentQuestionIndex].answer + "입니다.";
            resultText.style.color = "red";
            document.getElementById('submitAnswer').textContent = '다음 문제';  // 버튼 텍스트를 '다음 문제'로 변경
            isNextQuestion = true;  // 다음 문제로 넘어가게 설정
        }
    }
}

// 다음 문제로 넘어가는 함수
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();  // 다음 문제 로드
    } else {
        // 문제가 끝났을 때
        const resultText = document.getElementById('resultText');
        resultText.textContent = "모든 문제를 완료했습니다!";
        resultText.style.color = "blue";
        document.getElementById('submitAnswer').disabled = true;  // 더 이상 클릭 불가하게 버튼 비활성화
    }
}

// 버튼 클릭 이벤트
document.getElementById('submitAnswer').addEventListener('click', checkAnswer);

// 첫 문제 로드
loadQuestion();
