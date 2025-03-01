const video = document.getElementById("webcam");
const canvas = document.getElementById("canvas");
const screenshotImg = document.getElementById("screenshot");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const captureBtn = document.getElementById("captureBtn");
const startRecordBtn = document.getElementById("startRecordBtn");
const stopRecordBtn = document.getElementById("stopRecordBtn");
const downloadLink = document.getElementById("downloadLink");

let stream = null;
let mediaRecorder = null;
let recordedChunks = [];

// Start Webcam
startBtn.addEventListener("click", async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;

    // Enable buttons
    startBtn.disabled = true;
    stopBtn.disabled = false;
    captureBtn.disabled = false;
    startRecordBtn.disabled = false;
  } catch (error) {
    console.error("Error accessing webcam:", error);
    alert("Could not access webcam. Please check browser settings.");
  }
});

// Stop Webcam
stopBtn.addEventListener("click", () => {
  if (stream) {
    let tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
    video.srcObject = null;

    // Disable buttons
    startBtn.disabled = false;
    stopBtn.disabled = true;
    captureBtn.disabled = true;
    startRecordBtn.disabled = true;
    stopRecordBtn.disabled = true;
  }
});

// Capture Screenshot
captureBtn.addEventListener("click", () => {
  const context = canvas.getContext("2d");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Show captured image
  screenshotImg.src = canvas.toDataURL("image/png");
  screenshotImg.style.display = "block";

  // Auto-download the image
  const link = document.createElement("a");
  link.href = screenshotImg.src;
  link.download = "screenshot.png"; // Sets the file name for download
  link.click();
});

// Start Recording Video
startRecordBtn.addEventListener("click", () => {
  recordedChunks = [];
  mediaRecorder = new MediaRecorder(stream);

  mediaRecorder.ondataavailable = (event) => {
    if (event.data.size > 0) {
      recordedChunks.push(event.data);
    }
  };

  mediaRecorder.onstop = () => {
    const blob = new Blob(recordedChunks, { type: "video/webm" }); // Create a Blob from recorded chunks
    const videoURL = URL.createObjectURL(blob); // Generate a downloadable URL

    // Enable download link
    downloadLink.href = videoURL;
    downloadLink.style.display = "block";
    downloadLink.download = "recording.webm";
    downloadLink.textContent = "Download Video";
  };

  mediaRecorder.start(); // Starts recording a media stream (video/audio)
  
  startRecordBtn.disabled = true;
  stopRecordBtn.disabled = false;
});

// Stop Recording Video
stopRecordBtn.addEventListener("click", () => {
  if (mediaRecorder && mediaRecorder.state !== "inactive") {
    mediaRecorder.stop(); // Stops recording and triggers 'onstop'
    
    stopRecordBtn.disabled = true;
    startRecordBtn.disabled = false;
  }
});
