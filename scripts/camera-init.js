export const state = {
    stream: null,
    videoTrack: null,
    currentFacingMode: 'environment',
    currentMode: 'PHOTO', // PHOTO, VIDEO, PORTRAIT, PRO
    isRecording: false,
    mediaRecorder: null,
    recordedChunks: [],
    zoom: 1,
    flashMode: 'off', // off, on, auto
    gridMode: 'off', // off, 3x3, 4x4
    resolution: '1080p',
    fps: 60,
    livePhotoActive: false
};

export async function initCamera() {
    const video = document.getElementById('viewfinder');
    
    if (state.stream) {
        state.stream.getTracks().forEach(track => track.stop());
    }

    const constraints = {
        video: {
            facingMode: state.currentFacingMode,
            width: { ideal: 1920 },
            height: { ideal: 1080 },
            frameRate: { ideal: state.fps }
        },
        audio: state.currentMode === 'VIDEO'
    };

    try {
        state.stream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = state.stream;
        state.videoTrack = state.stream.getVideoTracks()[0];
        
        // Apply initial zoom if supported
        applyZoom(state.zoom);
        
        video.classList.add('camera-switch-anim');
        setTimeout(() => video.classList.remove('camera-switch-anim'), 400);
    } catch (err) {
        console.error('Error accessing camera:', err);
        alert('Could not access camera. Please ensure permissions are granted.');
    }
}

export function applyZoom(zoomLevel) {
    if (!state.videoTrack) return;
    
    const capabilities = state.videoTrack.getCapabilities();
    if (capabilities.zoom) {
        // Map our 0.5-100x zoom to device capabilities
        const min = capabilities.zoom.min;
        const max = capabilities.zoom.max;
        
        // Simple mapping: 1x = min, 100x = max
        // In a real device, 0.5x might switch to ultra-wide lens
        let deviceZoom = min + ((zoomLevel - 1) / 99) * (max - min);
        if (zoomLevel < 1) deviceZoom = min; // Fallback for < 1x if no ultrawide
        
        deviceZoom = Math.max(min, Math.min(max, deviceZoom));
        
        try {
            state.videoTrack.applyConstraints({
                advanced: [{ zoom: deviceZoom }]
            });
        } catch (e) {
            console.log('Zoom not supported on this device/browser');
        }
    } else {
        // Digital zoom fallback using CSS
        const video = document.getElementById('viewfinder');
        video.style.transform = `scale(${Math.max(1, zoomLevel)})`;
    }
}
