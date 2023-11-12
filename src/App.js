import React, { useState } from "react";
import axios from "axios";
import "./App.css";

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
        "X-RapidAPI-Key": "d2f3dc4321mshc24366b6a9d2bb6p1de96ejsn9c6813e944fc",
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
        // Replace placeholder with dynamic links based on user interests
        const formattedLearningPlan = response.data.response.replace(
          /\b(?:Khan Academy|YouTube|DragonBox|Photomath|Prodigy)\b/g,
          (match) => {
            const lowerCaseMatch = match.toLowerCase();
            return `<a href="https://www.${lowerCaseMatch}.com/" target="_blank">${match}</a>`;
          }
        );

        // Add line breaks after each number and place response in front of the number
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
      <div className="header">
        {" "}
        <h1>Brain Box</h1>
      </div>
      <label>
        <div className=" header2"> Your Grade:</div>
        <input
          type="text"
          placeholder="Enter your Grade"
          name="grade"
          value={studentInfo.grade}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        <div className=" header2"> Learning Style</div>

        <input
          type="text"
          placeholder="Enter your Learning Style"
          name="learningStyle"
          value={studentInfo.learningStyle}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        <div className=" header2"> Interests</div>
        <input
          type="text"
          placeholder="Enter your Interests"
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
