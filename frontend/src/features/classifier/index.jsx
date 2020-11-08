import React, { useEffect } from "react";
import useInterval from "../../hooks/useInterval";
import "./styles.css";

const Classifier = () => {
  const videoRef = React.useRef();
  const imageRef = React.useRef();

  const [result, setResult] = React.useState("");

  useEffect(() => {
    async function getCameraStream() {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false, video: { facingMode: 'environment' }
      }).catch(() => {
        setResult("Oh no! Something went wrong.");
      });

      videoRef.current.srcObject = stream;
    };

    getCameraStream();
  }, [])

  /* Starts the camera stream if available. */
  const playCameraStream = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  useInterval(async () => {
    await captureImageFromCamera();

    if (imageRef.current) {
      const formData = new FormData();
      formData.append('image', imageRef.current);

      const response = await fetch('/classify', {
        method: "POST",
        body: formData,
      });

      if (response.status === 200) {
        const text = await response.text();
        setResult(text);
      } else {
        setResult("Error from API.")
      }

    }
  }, 1000);

  const captureImageFromCamera = async () => {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    context.drawImage(videoRef.current, 0, 0, window.innerWidth, window.innerHeight);

    canvas.toBlob((blob) => {
      imageRef.current = blob;
    });
  };

  return (
    <>
      <header>
        <h1>Image classifier</h1>
      </header>
      <main>
        <p>This page takes a picture every second and runs it through ResNet50 to attempt classification.</p>
        <div className="video-container">
          <video
            id="video"
            ref={videoRef}
            onCanPlay={(event) => playCameraStream(event)}
          />
          <p className="result-text">Currently seeing: {result}</p>
          <canvas id="canvas"></canvas>
        </div>
      </main>
    </>
  )
};

export default Classifier;