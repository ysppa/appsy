import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Question, Space } from "../models";
import { Link } from "react-router-dom";

export default function QuestionComponent(props = {}) {
  const [space, setSpace] = useState(new Space());
  const [question, setQuestion] = useState(new Question());

  useEffect(() => {
    if (props.space) {
      setSpace(props.space);
    }
    setQuestion(props.question);

    return () => {};
  }, [props]);

  return (
    <>
      <div className={`card text-left border ${props.className}`}>
        <div className="card-body pb-0 position-relative">
          <h5 className="card-title">{question.title || <Skeleton />}</h5>
          {question.id ? (
            <Link
              to={`/space/${space.id}/questions/${question.id}`}
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
                <button type="button" className="btn rounded-pill">
                  <span className="">Follow</span>
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
