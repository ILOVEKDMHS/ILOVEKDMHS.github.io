let video = document.getElementById('video');
let startButton = document.getElementById('startButton');
let statusText = document.getElementById('status');
let faceDetected = false;
let drowsy = false;

// 웹캠 시작
async function startWebcam() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
    video.srcObject = stream;
}

// 얼굴 인식 및 눈 깜빡임 감지
async function startFaceDetection() {
    await faceapi.nets.tinyFaceDetector.loadFromUri('https://cdn.jsdelivr.net/npm/face-api.js/weights/');
    await faceapi.nets.faceLandmark68Net.loadFromUri('https://cdn.jsdelivr.net/npm/face-api.js/weights/');
    
    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks();
        if (detections.length > 0) {
            faceDetected = true;
            const landmarks = detections[0].landmarks;
            const leftEye = landmarks.getLeftEye();
            const rightEye = landmarks.getRightEye();
            const ear = calculateEAR(leftEye, rightEye);

            if (ear < 0.2) {  // EAR 임계값 이하이면 졸음 상태로 판단
                statusText.textContent = "졸음 상태가 감지되었습니다!";
                statusText.style.color = "red";
                if (!drowsy) {
                    alert("졸음이 감지되었습니다!");  // 알림 발생
                    drowsy = true;
                }
            } else {
                statusText.textContent = "정상 상태입니다.";
                statusText.style.color = "green";
                drowsy = false;
            }
        } else {
            faceDetected = false;
            statusText.textContent = "얼굴을 인식할 수 없습니다.";
            statusText.style.color = "red";
        }
    }, 1000);  // 1초마다 얼굴 및 눈 깜빡임 체크
}

// EAR(Eye Aspect Ratio) 계산
function calculateEAR(leftEye, rightEye) {
    function distance(p1, p2) {
        return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    }

    // 양쪽 눈의 가로/세로 거리 계산
    const leftEAR = (distance(leftEye[1], leftEye[5]) + distance(leftEye[2], leftEye[4])) / (2.0 * distance(leftEye[0], leftEye[3]));
    const rightEAR = (distance(rightEye[1], rightEye[5]) + distance(rightEye[2], rightEye[4])) / (2.0 * distance(rightEye[0], rightEye[3]));

    return (leftEAR + rightEAR) / 2.0;
}

// 시작 버튼 클릭 이벤트
startButton.addEventListener('click', async () => {
    await startWebcam();
    startFaceDetection();
});
