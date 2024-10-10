const questions = [
    { question: '2 x 3', answer: 6 },
    { question: '4 x 5', answer: 20 },
    { question: '6 x 7', answer: 42 },
    { question: '8 x 9', answer: 72 },
    { question: '3 x 3', answer: 9 },
    { question: '7 x 8', answer: 56 },
    { question: '5 x 5', answer: 25 },
    { question: '9 x 6', answer: 54 },
    { question: '10 x 10', answer: 100 },
    { question: '12 x 12', answer: 144 },
    // 복사해서 더 많은 문제를 추가할 수 있습니다.
];

let currentQuestionIndex = 0;

// 초기화 함수
function loadQuestion() {
    const questionText = document.getElementById('questionText');
    questionText.textContent = questions[currentQuestionIndex].question;
}

// 사용자가 입력한 답을 확인하는 함수
document.getElementById('submitAnswer').addEventListener('click', function() {
    const answerInput = document.getElementById('answerInput').value;
    const resultText = document.getElementById('resultText');
    
    // 정답 확인
    if (parseInt(answerInput) === questions[currentQuestionIndex].answer) {
        resultText.textContent = "정답입니다!";
        resultText.style.color = "green";
    } else {
        resultText.textContent = "오답입니다. 다시 시도하세요.";
        resultText.style.color = "red";
    }
});

// 첫 문제 로드
loadQuestion();
