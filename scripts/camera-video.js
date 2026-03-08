import { state } from './camera-init.js';
import { saveToGallery } from './download-manager.js';

let timerInterval;
let seconds = 0;

export function startRecording() {
    if (!state.stream) return;
    
    state.recordedChunks = [];
    const options = { mimeType: 'video/webm;codecs=vp9,opus' };
    
    try {
        state.mediaRecorder = new MediaRecorder(state.stream, options);
    } catch (e) {
        console.log('vp9 not supported, using default');
        state.mediaRecorder = new MediaRecorder(state.stream);
    }
    
    state.mediaRecorder.ondataavailable = handleDataAvailable;
    state.mediaRecorder.onstop = handleStop;
    
    state.mediaRecorder.start(100); // collect 100ms chunks
    state.isRecording = true;
    
    // UI Updates
    document.getElementById('recording-timer').classList.remove('hidden');
    document.getElementById('recording-timer').classList.add('recording-active');
    seconds = 0;
    updateTimerDisplay();
    timerInterval = setInterval(() => {
        seconds++;
        updateTimerDisplay();
    }, 1000);
}

export function stopRecording() {
    if (state.mediaRecorder && state.isRecording) {
        state.mediaRecorder.stop();
        state.isRecording = false;
        
        clearInterval(timerInterval);
        document.getElementById('recording-timer').classList.add('hidden');
        document.getElementById('recording-timer').classList.remove('recording-active');
    }
}

function handleDataAvailable(event) {
    if (event.data.size > 0) {
        state.recordedChunks.push(event.data);
    }
}

function handleStop() {
    const blob = new Blob(state.recordedChunks, {
        type: 'video/webm'
    });
    const url = URL.createObjectURL(blob);
    saveToGallery(url, 'video');
}

function updateTimerDisplay() {
    const hrs = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    document.getElementById('recording-timer').textContent = `${hrs}:${mins}:${secs}`;
}
