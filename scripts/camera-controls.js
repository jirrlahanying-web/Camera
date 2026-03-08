import { state, initCamera } from './camera-init.js';
import { takePhoto } from './camera-photo.js';
import { startRecording, stopRecording } from './camera-video.js';

export function handleShutterClick() {
    const shutterBtn = document.getElementById('btn-shutter');
    
    if (state.currentMode === 'PHOTO' || state.currentMode === 'PORTRAIT' || state.currentMode === 'PRO') {
        takePhoto();
    } else if (state.currentMode === 'VIDEO') {
        if (state.isRecording) {
            stopRecording();
            shutterBtn.classList.remove('shutter-recording');
            shutterBtn.classList.add('shutter-video');
        } else {
            startRecording();
            shutterBtn.classList.remove('shutter-video');
            shutterBtn.classList.add('shutter-recording');
        }
    }
}

export function setCameraMode(mode) {
    state.currentMode = mode;
    const shutterBtn = document.getElementById('btn-shutter');
    const proControls = document.getElementById('pro-controls');
    
    // Update UI
    document.querySelectorAll('.mode-item').forEach(el => {
        el.classList.toggle('active', el.dataset.mode === mode);
    });
    
    if (mode === 'VIDEO') {
        shutterBtn.className = 'shutter-video';
        proControls.classList.add('hidden');
    } else if (mode === 'PRO') {
        shutterBtn.className = 'shutter-photo';
        proControls.classList.remove('hidden');
    } else {
        shutterBtn.className = 'shutter-photo';
        proControls.classList.add('hidden');
    }
    
    // Re-init camera to apply audio constraints for video
    initCamera();
}
