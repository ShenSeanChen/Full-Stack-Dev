
const video = document.getElementById('video')

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('../../models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('../../models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('../../models'),
    faceapi.nets.faceExpressionNet.loadFromUri('../../models'),
]).then(startVideo)

function startVideo() {
    navigator.getUserMedia(
        {video: {}},
        stream => video.srcObject = stream,
        err => console.error(err)
    )
}

// startVideo()
video.addEventListener('play', () => {
    const canvas = faceapi.createCanvasFromMedia(video)
    document.body.append(canvas)
    const displaySize = {width:video.width, height:video.height}
    
    // fit our matchdimensions to our display size
    faceapi.matchDimensions(canvas, displaySize)
    // console.log('sdfsdff')

    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, new 
            faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
        // console.log(detections)

        const resizedDetections = faceapi.resizeResults(detections, displaySize)

        // clear the canvas after we draw
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        
        if (document.getElementById("checkbox-facedetections").checked)
        {faceapi.draw.drawDetections(canvas, resizedDetections)}

        if (document.getElementById("checkbox-facelandmarks").checked)
        {faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)}

        if (document.getElementById("checkbox-faceexpressions").checked)
        {faceapi.draw.drawFaceExpressions(canvas, resizedDetections)}

    }, 100)
})

  

