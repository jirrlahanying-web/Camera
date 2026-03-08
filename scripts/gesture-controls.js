import { handleTapFocus } from './camera-focus.js';
import { handlePinchZoom } from './camera-zoom.js';
import { setCameraMode } from './camera-controls.js';
import { state } from './camera-init.js';

export function setupGestureControls() {
    const container = document.getElementById('app-container');
    
    // Tap to focus
    container.addEventListener('click', (e) => {
        // Ignore clicks on UI elements
        if (e.target.closest('#top-bar') || e.target.closest('#bottom-bar') || e.target.closest('#zoom-controls') || e.target.closest('#pro-controls') || e.target.closest('#mode-selector')) {
            return;
        }
        handleTapFocus(e.clientX, e.clientY);
    });
    
    // Pinch to zoom
    let initialDistance = null;
    
    container.addEventListener('touchstart', (e) => {
        if (e.touches.length === 2) {
            initialDistance = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
        }
    });
    
    container.addEventListener('touchmove', (e) => {
        if (e.touches.length === 2 && initialDistance) {
            const currentDistance = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
            
            const scale = currentDistance / initialDistance;
            // Dampen the scale for smoother zoom
            const dampenedScale = 1 + (scale - 1) * 0.1;
            handlePinchZoom(dampenedScale);
            
            initialDistance = currentDistance;
        }
    });
    
    container.addEventListener('touchend', () => {
        initialDistance = null;
    });
    
    // Swipe to change mode
    let touchStartX = 0;
    container.addEventListener('touchstart', e => {
        if (e.touches.length === 1) touchStartX = e.touches[0].clientX;
    });
    
    container.addEventListener('touchend', e => {
        if (e.changedTouches.length === 1) {
            const touchEndX = e.changedTouches[0].clientX;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > 100) { // Swipe threshold
                const modes = ['PORTRAIT', 'PHOTO', 'VIDEO', 'PRO'];
                const currentIndex = modes.indexOf(state.currentMode);
                
                if (diff > 0 && currentIndex < modes.length - 1) {
                    // Swipe left -> next mode
                    setCameraMode(modes[currentIndex + 1]);
                } else if (diff < 0 && currentIndex > 0) {
                    // Swipe right -> prev mode
                    setCameraMode(modes[currentIndex - 1]);
                }
            }
        }
    });
}
