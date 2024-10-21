let video = document.getElementById('video');
let startButton = document.getElementById('startButton');
let statusText = document.getElementById('status');
let faceDetected = false;

// 웹캠 시작
async function startWebcam() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
    video.srcObject = stream;

    // 얼굴 인식 시작
    await startFaceDetection();
}

// 얼굴 인식 및 메시지 업데이트
async function startFaceDetection() {
    try {
        // face-api.js 모델 로드
      faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      faceapi.nets.faceLandmark68TinyNet.loadFromUri("/models");
        
        // 모델이 정상적으로 로드되면 alert 메시지 띄우기
        alert("얼굴 인식 모델이 성공적으로 로드되었습니다.");
        
        // 얼굴 감지 반복
        setInterval(async () => {
            const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks();
            
            if (detections.length > 0) {
                // 얼굴 감지 성공
                faceDetected = true;
                statusText.textContent = "얼굴이 인식되었습니다.";
                statusText.style.color = "green";
            } else {
                // 얼굴 감지 실패
                faceDetected = false;
                statusText.textContent = "얼굴을 인식할 수 없습니다.";
                statusText.style.color = "red";
            }
        }, 1000);  // 1초마다 얼굴 감지 시도
    } catch (error) {
        alert("모델 로드에 실패했습니다. 다시 시도해 주세요.");
        console.error(error);
    }
}

// 시작 버튼 클릭 시 웹캠 및 얼굴 인식 시작
startButton.addEventListener('click', async () => {
    statusText.textContent = "웹캠이 시작되었습니다. 얼굴을 비춰주세요...";
    await startWebcam();
});
