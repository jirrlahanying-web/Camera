export function saveToGallery(url, type) {
    // Update gallery thumbnail
    const thumb = document.getElementById('gallery-thumb');
    thumb.src = url;
    thumb.style.display = 'block';
    
    // In a real app, we might store this in IndexedDB
    // For this demo, we'll trigger a download
    const a = document.createElement('a');
    a.href = url;
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    a.download = `UltraCam_${timestamp}.${type === 'photo' ? 'jpg' : 'webm'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
