import React from "react";
import { Link } from "react-router-dom";
import useInterval from "../../hooks/useInterval";
import LoadingDots from "../../components/LoadingDots";
import { LoadingTextWrapper, TimeWrapper } from "./styled";

const Home = () => {

  const [time, setTime] = React.useState();

  useInterval(() => {
    fetch('/time').then(res => {
      return res.text()
    }).then(text => {
      const time = new Date(text);
      setTime(time);
    });
  }, 1000);

  return (
    <>
      <h1>Home</h1>
      <p>This page fetches the current time from our api every second.</p>
      {time ?
        <TimeWrapper>
          Current time is {time.toLocaleTimeString()}.
        </TimeWrapper> :
        <LoadingTextWrapper>
          Fetching time<LoadingDots />
        </LoadingTextWrapper>
      }
      <p>For something more exciting, try the <Link to="/classifier">image classifier</Link>!</p>
    </>
  )
};

export default Home;