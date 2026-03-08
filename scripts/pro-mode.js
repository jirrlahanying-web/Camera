import { state } from './camera-init.js';

export function setupProMode() {
    const isoSlider = document.getElementById('iso-slider');
    const evSlider = document.getElementById('ev-slider');
    const wbSlider = document.getElementById('wb-slider');
    
    const isoVal = document.getElementById('iso-val');
    const evVal = document.getElementById('ev-val');
    const wbVal = document.getElementById('wb-val');
    
    isoSlider.addEventListener('input', (e) => {
        isoVal.textContent = e.target.value;
        applyProSettings('iso', e.target.value);
    });
    
    evSlider.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value).toFixed(1);
        evVal.textContent = val > 0 ? `+${val}` : val;
        applyProSettings('exposureCompensation', val);
    });
    
    wbSlider.addEventListener('input', (e) => {
        wbVal.textContent = `${e.target.value}K`;
        applyProSettings('colorTemperature', e.target.value);
    });
}

function applyProSettings(setting, value) {
    if (!state.videoTrack) return;
    
    try {
        const constraints = { advanced: [{}] };
        constraints.advanced[0][setting] = parseFloat(value);
        state.videoTrack.applyConstraints(constraints);
    } catch (e) {
        console.log(`Setting ${setting} not supported`);
    }
}
