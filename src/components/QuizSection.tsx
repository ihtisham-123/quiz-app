'use client'
import React, { useState } from 'react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

interface QuizSectionProps {
  questions: Question[];
}

const QuizSection = ({ questions }: QuizSectionProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleOptionClick = (option: string) => {
    if (showResult) return; // Prevent selecting after showing result
    setSelectedOption(option);
    setShowResult(true);
    
    if (option === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextClick = () => {
    setSelectedOption(null);
    setShowResult(false);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setQuizCompleted(false);
    setShowResult(false);
  };

  const getOptionClassName = (option: string) => {
    const baseClass = "p-2 border rounded cursor-pointer";
    
    if (!showResult) {
      return `${baseClass} hover:bg-gray-100`;
    }
    
    if (option === questions[currentQuestionIndex].correctAnswer) {
      return `${baseClass} bg-green-200 border-green-500`;
    }
    
    if (option === selectedOption && option !== questions[currentQuestionIndex].correctAnswer) {
      return `${baseClass} bg-red-200 border-red-500`;
    }
    
    return `${baseClass} opacity-50`;
  };

  if (quizCompleted) {
    return (
      <div className="text-black p-6 bg-gray-50 rounded-lg shadow">
        <h2 className="text-3xl font-bold mb-4">Quiz Completed!</h2>
        <p className="text-xl mb-6">
          Your final score: <span className="font-bold">{score}</span> out of {questions.length}
        </p>
        <p className="text-xl mb-6">
          Percentage: <span className="font-bold">{Math.round((score / questions.length) * 100)}%</span>
        </p>
        <button
          onClick={resetQuiz}
          className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 font-bold"
        >
          Try Again
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="text-black p-6 bg-gray-50 rounded-lg shadow my-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">
          Question {currentQuestionIndex + 1} of {questions.length}
        </h3>
        <div className="text-lg font-semibold">
          Score: {score}
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-6">{currentQuestion.question}</h2>
      
      <ul className="space-y-3 mb-6">
        {currentQuestion.options.map((option, optionIndex) => (
          <li
            key={optionIndex}
            className={getOptionClassName(option)}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </li>
        ))}
      </ul>
      
      {showResult && (
        <div className="mb-4 p-3 rounded bg-gray-100">
          {selectedOption === currentQuestion.correctAnswer ? (
            <p className="text-green-700">Correct answer! Well done!</p>
          ) : (
            <p className="text-red-700">
              Incorrect. The correct answer is: {currentQuestion.correctAnswer}
            </p>
          )}
        </div>
      )}
      
      <button
        onClick={handleNextClick}
        disabled={!showResult}
        className={`mt-4 px-4 py-2 rounded text-white ${
          showResult ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish Quiz"}
      </button>
    </div>
  );
};

export default QuizSection;