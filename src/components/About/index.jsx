import React from "react";
import { Link } from "react-router-dom";
import { ContentWrapper, TextWrapper } from "./styled";

const About = () => {

  return (
    <main>
      <ContentWrapper>
        <h1>What is Flask?</h1>
        <TextWrapper>
          According to Wikpedia, "Flask is a micro web framework written in Python.
          It is classified as a microframework because it does not require particular tools or libraries."
        </TextWrapper>
        <TextWrapper>
          This page is built using React, and served by Flask.
        </TextWrapper>
      </ContentWrapper>
      <ContentWrapper>
        <h1>What is React?</h1>
        <TextWrapper>
          According to Wikipedia, "React is an open-source JavaScript library for building user interfaces or UI components.
          It is maintained by Facebook and a community of individual developers and companies.
          React can be used as a base in the development of single-page or mobile applications"
        </TextWrapper>
      </ContentWrapper>
      <Link to="/home">Go home</Link>
    </main>
  )
};

export default About;