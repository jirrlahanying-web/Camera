import { state } from './camera-init.js';

export function handleTapFocus(x, y) {
    const ring = document.getElementById('focus-ring');
    
    // Position ring
    ring.style.left = `${x}px`;
    ring.style.top = `${y}px`;
    
    // Animate
    ring.classList.remove('focus-active');
    void ring.offsetWidth;
    ring.classList.add('focus-active');
    
    // Apply focus constraint if supported
    if (state.videoTrack) {
        const capabilities = state.videoTrack.getCapabilities();
        if (capabilities.focusMode) {
            try {
                // Normalize coordinates (0.0 to 1.0)
                const video = document.getElementById('viewfinder');
                const rect = video.getBoundingClientRect();
                const normX = (x - rect.left) / rect.width;
                const normY = (y - rect.top) / rect.height;
                
                state.videoTrack.applyConstraints({
                    advanced: [{
                        focusMode: 'manual',
                        pointsOfInterest: [{ x: normX, y: normY }]
                    }]
                });
                
                // Reset to continuous auto focus after a delay
                setTimeout(() => {
                    state.videoTrack.applyConstraints({
                        advanced: [{ focusMode: 'continuous' }]
                    }).catch(e => {});
                }, 3000);
            } catch (e) {
                console.log('Manual focus not supported');
            }
        }
    }
}
