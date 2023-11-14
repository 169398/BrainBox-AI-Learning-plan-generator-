import React, { useState } from "react";

const Quiz = ({ questions, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);

  const handleAnswerClick = (selectedAnswer) => {
    const isCorrect =
      questions[currentQuestion].correctAnswer === selectedAnswer;

    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      { question: currentQuestion, answer: selectedAnswer, correct: isCorrect },
    ]);
    setScore(isCorrect ? score + 1 : score);

    // Move to the next question
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    } else {
      // Quiz completed, trigger the onComplete callback
      onComplete({ userAnswers, score });
    }
  };

  return (
    <div>
      <h2>{questions[currentQuestion].question}</h2>
      <ul>
        {questions[currentQuestion].answers.map((answer, index) => (
          <li key={index} onClick={() => handleAnswerClick(answer)}>
            {answer}
          </li>
        ))}
      </ul>
      <p>Score: {score}</p>
    </div>
  );
};

export default Quiz;
