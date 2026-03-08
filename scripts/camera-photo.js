import { state } from './camera-init.js';
import { saveToGallery } from './download-manager.js';

export function takePhoto() {
    const video = document.getElementById('viewfinder');
    const canvas = document.getElementById('photo-canvas');
    const flash = document.getElementById('screen-flash');
    
    // Play shutter sound
    const audio = new Audio('/assets/sounds/shutter.mp3');
    audio.play().catch(e => console.log('Audio play failed:', e));
    
    // Flash animation
    flash.classList.remove('flash-active');
    void flash.offsetWidth; // trigger reflow
    flash.classList.add('flash-active');
    
    // Capture frame
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    
    // Handle digital zoom crop if CSS transform is used
    if (state.zoom > 1 && !state.videoTrack.getCapabilities().zoom) {
        const sw = canvas.width / state.zoom;
        const sh = canvas.height / state.zoom;
        const sx = (canvas.width - sw) / 2;
        const sy = (canvas.height - sh) / 2;
        ctx.drawImage(video, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
    } else {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    }
    
    // Apply portrait mode blur effect simulation
    if (state.currentMode === 'PORTRAIT') {
        // Simple simulation: blur edges
        ctx.fillStyle = 'rgba(0,0,0,0.2)';
        ctx.filter = 'blur(10px)';
        ctx.drawImage(canvas, 0, 0);
        ctx.filter = 'none';
    }
    
    const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
    saveToGallery(dataUrl, 'photo');
}
