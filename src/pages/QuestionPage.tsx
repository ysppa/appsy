import React, { useEffect, useState } from "react";
import QuestionComponent from "../components/question.component";
import { Answer, Question, Space, User } from "../models";
import { Link } from "react-router-dom";
import questionService from "../services/question.service";
import Alert from "../components/alert.component";
import AnswerComponent from "../components/answer.component";
import answerService from "../services/answer.service";
import AnswerForm from "../components/answer.form.component";

export default function QuestionPage(props: any = {}) {
  const [user, setUser] = useState(new User());
  const [space, setSpace] = useState(new Space());
  const [question, setQuestion] = useState(new Question());
  const [alert, setAlert] = useState<any>();
  const reply = () => {
    props.modal.show();
    props.setModalProps({
      children: (
        <AnswerForm
          user={props.user}
          question={question}
          setQuestion={setQuestion}
          modal={props.modal}
        />
      ),
    });
  };
  const removeAnswer = (answer: Answer) => {
    setAlert({ color: "info", message: "Removing...", show: true });
    answerService
      .delete(question.id, answer.id)
      .then((res) => {
        setAlert({ color: "success", message: res.data.message, show: true });
        question.removeAnswer(answer.id);
        setQuestion(new Question(question));
      })
      .catch((err) => {
        setAlert({
          color: "danger",
          message: err.response.data.message || err.message,
          show: true,
        });
      });
  };

  useEffect(() => {
    setUser(props.user);
    setSpace(props.space);

    if (props.user.id && props.space.id && props.questionId) {
      questionService
        .get(props.space.id, props.questionId)
        .then((res) => {
          setQuestion(new Question(res.data.question));
        })
        .catch((err) => {
          setAlert({ color: "danger", message: err.message, show: true });
        });
    }
    return () => {};
  }, [props]);

  return (
    <>
      <Link to={`/space/${space.id}/questions`} className="btn mb-3">
        <span className="bi bi-arrow-left"></span>
        <span className="ms-2">Back</span>
      </Link>
      <Alert {...alert} />
      <QuestionComponent
        user={user}
        space={space}
        question={question}
        answer={reply}
        className="mb-2"
      />
      {question.answers.map((a: any, key: number) => (
        <AnswerComponent
          key={key}
          user={user}
          space={space}
          question={question}
          answer={a}
          remove={removeAnswer}
          setAlert={setAlert}
          className="mb-2"
        />
      ))}
    </>
  );
}
