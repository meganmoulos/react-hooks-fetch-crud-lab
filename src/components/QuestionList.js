import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem"

function QuestionList() {
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setQuestions(data)
    })
  }, [setQuestions])

  function handleDeleteClick(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(() => {
        const updatedQuestions = questions.filter((question) => question.id !== id)
        setQuestions(updatedQuestions)
      })
  }

  function handleAnswerChange(id, correctIndex){
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({correctIndex})
    })
    .then(res => res.json())
    .then((updatedQuestion) => {
      const updatedQuestions = questions.map((q) => {
        if (q.id === updatedQuestion.id) return updatedQuestion
        return q
      })
      setQuestions(updatedQuestions)
    })
  }


  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions.map((question) => <QuestionItem key={question.id} question={question} onHandleDeleteClick={handleDeleteClick} onAnswerChange={handleAnswerChange}/>)}</ul>
    </section>
  );
}

export default QuestionList;
