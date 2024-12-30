let mediaStream = null;

async function startScreenShare() {
    try {
        const stream = await navigator.mediaDevices.getDisplayMedia({
            video: true,
            audio: false, // You can enable audio capture if needed
        });
        
        mediaStream = stream;
        const videoElement = document.getElementById('screen-preview');
        videoElement.srcObject = stream;
        
        // Toggle buttons
        document.getElementById('startBtn').style.display = 'none';
        document.getElementById('stopBtn').style.display = 'block';

        // Listen for stopped event to clean up
        stream.getVideoTracks()[0].addEventListener('ended', () => {
            stopScreenShare();
        });

    } catch (error) {
        console.error('Error accessing screen share:', error);
        document.getElementById('error-message').textContent = 'Could not access screen share. Please try again.';
    }
}

function stopScreenShare() {
    if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
        mediaStream = null;

        // Toggle buttons
        document.getElementById('startBtn').style.display = 'block';
        document.getElementById('stopBtn').style.display = 'none';
    }
}
