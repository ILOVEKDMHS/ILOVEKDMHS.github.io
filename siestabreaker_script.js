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
            statusText.textContent = "얼굴이 인식되었습니다.";  // 얼굴이 인식되었을 때 표시
            statusText.style.color = "green";
        } else {
            faceDetected = false;
            statusText.textContent = "얼굴을 인식할 수 없습니다.";  // 얼굴이 인식되지 않았을 때
            statusText.style.color = "red";
        }
    }, 1000);  // 1초마다 얼굴 및 눈 깜빡임 체크
}

// 시작 버튼 클릭 이벤트
startButton.addEventListener('click', async () => {
    await startWebcam();
    startFaceDetection();
});
