import { state, applyZoom } from './camera-init.js';

export function setZoom(level) {
    state.zoom = parseFloat(level);
    applyZoom(state.zoom);
    
    // Update UI
    document.querySelectorAll('.zoom-btn').forEach(btn => {
        btn.classList.toggle('active', parseFloat(btn.dataset.zoom) === state.zoom);
    });
    
    // Show slider temporarily or update it
    const slider = document.getElementById('zoom-slider');
    slider.value = state.zoom;
}

export function handlePinchZoom(scaleChange) {
    let newZoom = state.zoom * scaleChange;
    newZoom = Math.max(0.5, Math.min(100, newZoom));
    setZoom(newZoom);
}
