import { initCamera } from './camera-init.js';
import { setupUIControls } from './ui-controls.js';
import { setupGestureControls } from './gesture-controls.js';

document.addEventListener('DOMContentLoaded', async () => {
    // Initialize UI
    setupUIControls();
    
    // Initialize Gestures
    setupGestureControls();

    // Initialize Camera
    await initCamera();

    // Register Service Worker for PWA
    if ('serviceWorker' in navigator) {
        try {
            await navigator.serviceWorker.register('/service-worker.js');
            console.log('Service Worker registered');
        } catch (err) {
            console.log('Service Worker registration failed:', err);
        }
    }
});
