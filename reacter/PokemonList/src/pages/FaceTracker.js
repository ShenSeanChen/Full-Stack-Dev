import React, { useState, useEffect, useMemo, useRef, useReducer } from 'react';


export default function FaceTracker() {

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

    return {
        // <style>
        // body {
        //     margin: 500px;
        //     padding: 20px;
        //     width: 100vw;
        //     height: 100vh;
        //     display: flex;
        //     /* justify-content: center; */
        //     align-items: center;
        // }

        // canvas {
        //     position: absolute;
        //     /* position: relative; */
        // }

        // input.defaultCheckbox {
        //     width: 40px;
        //     height: 40px;
        // }
        
        // </style>

        // <video id="video" width="720" height="560" autoplay muted></video> <br/>
        // // <!-- <button onClick={}>Change FaceLandmark State</button>  -->
        // <input type="checkbox" class="defaultCheckbox" id="checkbox-facedetections" checked> <h3>FaceDetections</h3> 
        // <input type="checkbox" class="defaultCheckbox" id="checkbox-facelandmarks" checked> <h3>FaceLandMarks</h3>
        // <input type="checkbox" class="defaultCheckbox" id="checkbox-faceexpressions" checked> <h3>FaceExpressions</h3>
    }
}


