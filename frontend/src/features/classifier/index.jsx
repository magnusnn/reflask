import React, { useEffect } from "react";
import useInterval from "../../hooks/useInterval";
import LoadingDots from "../../components/LoadingDots";
import "./styles.css";

const Classifier = () => {
  const [result, setResult] = React.useState("");

  const cameraFeedRef = React.useRef();
  const imageRef = React.useRef();

  useEffect(() => {
    async function getCameraStream() {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false, video: { facingMode: 'environment' }
      }).catch(() => {
        setResult("Nothing! Something went wrong!");
      });
      cameraFeedRef.current.srcObject = stream;
      return stream;
    };
    getCameraStream();
  }, [])

  // Starts the camera stream if available.
  const handlePlayCameraStream = () => {
    if (cameraFeedRef.current) {
      cameraFeedRef.current.play();
    }
  }

  // Runs every second to capture image and call API for classification.
  useInterval(async () => {
    captureImageFromCamera();

    if (imageRef.current) {
      const formData = new FormData();
      formData.append('image', imageRef.current);

      const response = await fetch('/classify', {
        method: "POST",
        body: formData,
      });

      // Get status code.
      const { status } = response;

      // Set result if response is OK.s
      if (status === 200) {
        const text = await response.text();
        setResult(text);
      } else {
        setResult("Error from API.")
      }

    }
  }, 1000)

  /*  Captures an image by reading it from video stream,
   *  and then drawing it to the canvas where we can extract
   *  it and convert it to a blob.
   */
  const captureImageFromCamera = async () => {
    const canvas = document.getElementById("canvas");
    const video = document.getElementById("video");
    const context = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    context.drawImage(video, 0, 0, window.innerWidth, window.innerHeight);

    var data = canvas.toBlob((blob) => {
      imageRef.current = blob;
    });

    return data;
  }
  return (
    <>
      <h1>Image classifier</h1>
      <p>This page takes a picture every second and runs it through ResNet50 to attempt classification.</p>
      <p className="compat-notice">Note: Works best on Chrome.</p>
      <div className="camera-wrapper">
        <video
          id="video"
          ref={cameraFeedRef}
          onCanPlay={(event) => handlePlayCameraStream(event)}
        />
        {result ?
          <p className="result-text">Currently seeing: {result}</p> :
          <p className="result-text">Scanning environment <LoadingDots /></p>
        }
        <canvas id="canvas"></canvas>
      </div>
    </>
  )
};

export default Classifier;