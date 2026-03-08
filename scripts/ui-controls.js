import { handleShutterClick, setCameraMode } from './camera-controls.js';
import { switchCamera } from './camera-switch.js';
import { setZoom } from './camera-zoom.js';
import { toggleLivePhoto } from './live-photo.js';
import { setupProMode } from './pro-mode.js';
import { state } from './camera-init.js';

export function setupUIControls() {
    // Shutter
    document.getElementById('btn-shutter').addEventListener('click', handleShutterClick);
    
    // Camera Switch
    document.getElementById('btn-switch-camera').addEventListener('click', switchCamera);
    
    // Modes
    document.querySelectorAll('.mode-item').forEach(item => {
        item.addEventListener('click', (e) => {
            setCameraMode(e.target.dataset.mode);
        });
    });
    
    // Zoom
    document.querySelectorAll('.zoom-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            setZoom(e.target.dataset.zoom);
        });
    });
    
    // Top Bar Icons
    document.getElementById('btn-livephoto').addEventListener('click', toggleLivePhoto);
    
    document.getElementById('btn-grid').addEventListener('click', () => {
        const grid = document.getElementById('grid-overlay');
        if (state.gridMode === 'off') {
            state.gridMode = '3x3';
            grid.className = 'grid-3x3';
            document.getElementById('btn-grid').style.color = '#ffd60a';
        } else if (state.gridMode === '3x3') {
            state.gridMode = '4x4';
            grid.className = 'grid-4x4';
        } else {
            state.gridMode = 'off';
            grid.className = 'grid-off';
            document.getElementById('btn-grid').style.color = '#fff';
        }
    });
    
    // Setup Pro Mode sliders
    setupProMode();
    
    // Battery simulation
    setInterval(() => {
        const bat = document.getElementById('battery-indicator');
        let val = parseInt(bat.textContent);
        if (val > 1) bat.textContent = `${val - 1}%`;
    }, 60000);
}
