import { state, initCamera } from './camera-init.js';

export function switchCamera() {
    state.currentFacingMode = state.currentFacingMode === 'environment' ? 'user' : 'environment';
    initCamera();
}
