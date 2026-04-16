import React, { useState } from 'react'
import "./Quiz.css"
import { data } from '../assets/data'

const Quiz = () => {

  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState(false)
  const [showResult, setShowResult] = useState(false)

  let question = data[index]

  const checkAns = (e, ans) => {
    if (selected) return   // prevent multiple clicks

    setSelected(true)

    if (question.ans === ans) {
      e.target.classList.add("correct")
      setScore(score + 1)
    } else {
      e.target.classList.add("wrong")
    }
  }

  const nextQuestion = () => {
    if (index < data.length - 1) {
      setIndex(index + 1)
      setSelected(false)

      // remove previous styles
      const options = document.querySelectorAll("li")
      options.forEach(option => {
        option.classList.remove("correct", "wrong")
      })

    } else {
      setShowResult(true)
    }
  }

  const restartQuiz = () => {
    setIndex(0)
    setScore(0)
    setSelected(false)
    setShowResult(false)
  }

  // ✅ Result Screen
  if (showResult) {
    return (
      <div className="container">
        <h1>Quiz Completed 🎉</h1>
        <h2>Your Score: {score} / {data.length}</h2>
        <button onClick={restartQuiz}>Restart</button>
      </div>
    )
  }

  return (
    <div className='container'>
      <h1>Quiz App</h1>
      <hr />

      <h2>{index + 1}. {question.question}</h2>

      <ul>
        <li onClick={(e) => checkAns(e, 1)}>{question.option1}</li>
        <li onClick={(e) => checkAns(e, 2)}>{question.option2}</li>
        <li onClick={(e) => checkAns(e, 3)}>{question.option3}</li>
        <li onClick={(e) => checkAns(e, 4)}>{question.option4}</li>
      </ul>

      <button onClick={nextQuestion}>
        {index === data.length - 1 ? "Finish" : "Next"}
      </button>

      <div className="index">
        {index + 1} of {data.length} questions
      </div>
    </div>
  )
}

export default Quiz