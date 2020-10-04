import styled from "styled-components";

export const CameraWrapper = styled.div`
align-content: center;
height: auto;
margin: 0;
padding: 0;
  video {
    border: 1px solid black;
    margin: 0;
    max-width: 90%;
  }
  p {
    font-size: 1.5rem;
    font-weight: bold;
  }

  canvas {
    display: none;
  }
`;