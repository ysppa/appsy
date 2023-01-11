import React, { useEffect, useState } from "react";
import { Comment } from "./../models";
import CommentUI from "./comment.ui";

export default function CommentsComponent(props = {}) {
  const [comments, setComments] = useState([
    new Comment(),
    new Comment(),
    new Comment(),
  ]);

  useEffect(() => {
    if (props.comments) {
      setComments(props.comments);
    }

    return () => {};
  }, [props]);

  return (
    <>
      <ul className="list-group">
        {comments.map((comment, key) => (
          <li key={key} className="list-group-item border-0 p-0">
            <CommentUI
              key={key}
              user={props.user}
              comment={comment}
              setAlert={props.setAlert}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
