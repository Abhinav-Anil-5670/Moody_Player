import React, { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";
import './FaceDetection.css'
import axios from 'axios'

export default function FaceDetection({setSongs}) {
  const videoRef = useRef(null);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models"; // place models in /public/models
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]);
      startVideo();
    };

    const startVideo = () => {
      navigator.mediaDevices
        .getUserMedia({ video: {} })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => console.error("Error accessing webcam:", err));
    };

    loadModels();
  }, []);

  const detectFace = async () => {
    const video = videoRef.current;
    if (!video) return;

    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();

    if (detections.length > 0) {
      const expressions = detections[0].expressions;
      const sorted = Object.entries(expressions).sort((a, b) => b[1] - a[1]);
      const topExpression = sorted[0][0];
      console.log("Detected expression:", topExpression);
      axios.get(`http://localhost:3000/songs?mood=${topExpression}`).then(response=>{
        console.log(response.data)
        setSongs(response.data.song)
        
      })
    } else {
      console.log("No face detected.");
    }
  };

  return (
    <div className=" mood-element">
      <video
        ref={videoRef}
        autoPlay
        muted
        width="720"
        height="560"
        className="rounded-xl shadow-lg video"
      />
      <button
        onClick={detectFace}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
      >
        Detect Face
      </button>
    </div>
  );
}
