import { state } from './camera-init.js';

export function toggleLivePhoto() {
    state.livePhotoActive = !state.livePhotoActive;
    const btn = document.getElementById('btn-livephoto');
    
    if (state.livePhotoActive) {
        btn.style.color = '#ffd60a'; // Active color
    } else {
        btn.style.color = '#fff';
    }
    
    // In a real implementation, this would start buffering video frames
}
