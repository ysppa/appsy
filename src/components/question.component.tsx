import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Question, Space, User } from "../models";
import { Link } from "react-router-dom";
import questionService from "../services/question.service";
import { handleError } from "../Utils/Common";
import Alert from "./alert.component";

export default function QuestionComponent(props: any = {}) {
  const [currentUser, setCurrentUser] = useState<User>(new User());
  const [space, setSpace] = useState(new Space());
  const [question, setQuestion] = useState(new Question());
  const [alert, setAlert] = useState<any>({});

  const follow = async () => {
    try {
      const res: any = await question.follow();
      setQuestion(new Question(res.data.question));
    } catch (err) {
      handleError(err, setAlert);
    }
  };

  useEffect(() => {
    if (props.user) {
      setCurrentUser(props.user);
    }
    if (props.space) {
      setSpace(props.space);
    }
    setQuestion(props.question);

    return () => {};
  }, [props]);

  return (
    <>
      <Alert {...alert} />
      <div className={`card text-left border ${props.className}`}>
        <div className="card-body pb-0 position-relative">
          <h5 className="card-title">{question.title || <Skeleton />}</h5>
          {question.id ? (
            <Link
              to={`/space/${question.spaceId}/questions/${question.id}`}
              className="stretched-link"
            ></Link>
          ) : (
            <></>
          )}
          <section className="card-text">
            <span>
              {question.strAnswers() || <Skeleton className="w-50" />}
            </span>
            <span className="text-muted">{question.strPostedAt()}</span>
          </section>
        </div>
        <div className="card-footer bg-transparent border-0">
          <section className="d-flex justify-content-start">
            <aside>
              {question.id ? (
                <button
                  type="button"
                  className="btn btn-light rounded-pill border"
                  onClick={() => {
                    props.answer(question);
                  }}
                >
                  <span className="bi bi-pencil-square"></span>
                  <span className="ms-2">Answer</span>
                </button>
              ) : (
                <Skeleton
                  className="bg-light rounded-pill"
                  width={75}
                  height={30}
                />
              )}
            </aside>
            <aside className="ms-4 d-flex align-items-center">
              {question.id ? (
                <button
                  type="button"
                  onClick={follow}
                  className="btn rounded-pill"
                >
                  {question.followedBy(currentUser) ? (
                    <span
                      title="Unfollow"
                      className="text-success bi bi-check-all"
                    ></span>
                  ) : (
                    <span className="">Follow</span>
                  )}
                </button>
              ) : (
                <Skeleton className="" width={95} />
              )}
            </aside>
            <aside></aside>
          </section>
        </div>
      </div>
    </>
  );
}
