import React, { useState } from "react";
import axios from "axios";
import "./App.css";

import avator10 from "./images/avatar9.jpeg";
import avator9 from "./images/avatar10.jpeg";
import avator8 from "./images/avatar8.jpeg";

const apiKey = process.env.REACT_APP_RAPIDAPI_KEY;
const LearningPlanGenerator = () => {
  const [studentInfo, setStudentInfo] = useState({
    grade: "",
    learningStyle: "",
    interests: "",
  });

  const [learningPlan, setLearningPlan] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentInfo({
      ...studentInfo,
      [name]: value,
    });
  };
  const clearLearningPlan = () => {
    setLearningPlan(null);
  };
  const generateLearningPlan = async () => {
    const options = {
      method: "POST",
      url: "https://open-ai25.p.rapidapi.com/ask",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "44d4f56d26614ecea47bcf5d71a43cc1",
        "X-RapidAPI-Host": "open-ai25.p.rapidapi.com",
      },
      data: {
        query: `Generate a learning plan for me with grade ${studentInfo.grade}, learning style ${studentInfo.learningStyle}, and interests ${studentInfo.interests}`,
      },
    };

    try {
      const response = await axios.request(options);

      // Check if the response includes the learning plan
      if (response.data && response.data.response) {
        const formattedLearningPlan = response.data.response.replace(
          /\b(?:Khan Academy|YouTube|DragonBox|Photomath|Prodigy)\b/g,
          (match) => {
            const lowerCaseMatch = match.toLowerCase();
            return `<a href="https://www.${lowerCaseMatch}.com/" target="_blank">${match}</a>`;
          }
        );

        const learningPlanWithFormatting = formattedLearningPlan.replace(
          /(\d+\.\s)(.*?)(?=(\d+\.\s|$))/gs,
          "<div> <strong strong > $1</strong > $2</div > "
        );

        setLearningPlan(learningPlanWithFormatting);
      } else {
        // Handle the case where the response doesn't contain a valid learning plan
        console.warn("Invalid response from the API:", response.data);
        // Optionally, you can display an error message to the user
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="avator1">
        <img src={avator9} alt="Avatar 2" />
      </div>
      <div className="avator2">
        <img src={avator10} alt="Avatar 2" />
      </div>
      <div className="avator3">
        <img src={avator8} alt="Avatar 2" />
      </div>
      <div className="mainpage">
        <div className="pageheader">
          {" "}
          <h1> WELCOME TO BRAIN BOX </h1>
          <h5>WE UNLOCK YOUR FULL POTENTIAL USING AI</h5>
        </div>

        <div className="header">
          {" "}
          <h1>Brain Box</h1>
        </div>
        <div className="mainpage_input">
          <label>
            <div className=" header2"> Your Grade:</div>
            <input
              type="text"
              placeholder="Enter your Grade.Example: A,B,75,87"
              name="grade"
              value={studentInfo.grade}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            <div className=" header2"> Learning Style:</div>

            <input
              type="text"
              placeholder="Enter your Learning Style Example:Visual,  
          Auditory, Kinesthetic"
              name="learningStyle"
              value={studentInfo.learningStyle}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            <div className=" header2"> Interests:</div>
            <input
              type="text"
              placeholder="Enter your Interests.Example: Maths,Science
          "
              name="interests"
              value={studentInfo.interests}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <button type="button" onClick={generateLearningPlan}>
            Generate Learning Plan
          </button>

          {learningPlan && (
            <div className="response-container">
              <h2>Learning Plan</h2>
              <button className="close-button" onClick={clearLearningPlan}>
                X{" "}
              </button>
              <div dangerouslySetInnerHTML={{ __html: learningPlan }}></div>
            </div>
          )}
        </div>
      </div>

      {/* Heavenly bodies */}
      <div className="sun"></div>
      <div className="planet1"></div>
      <div className="planet2"></div>
      <div className="planet3"></div>

      <div className="shooting-stars">
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
      </div>

      <footer>
        <p class="copyright">© 2023 . Idris Kulubi.</p>
      </footer>
    </div>
  );
};

export default LearningPlanGenerator;
