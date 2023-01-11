import React, { useEffect, useState } from "react";
import PostUI from "../components/post.ui";
import { Link, useLocation } from "react-router-dom";
import { Post } from "../models";
import postService from "../services/post.service";

import CommentsComponent from "../components/comments.component";
import CommentFormUI from "../components/comment.form.ui";
import Alert from "../components/alert.component";

export default function PostPage(props = {}) {
  const [post, setPost] = useState(new Post());
  const location = useLocation();
  const [alert, setAlert] = useState();

  useEffect(() => {
    if (props.post) {
      setPost(props.post);
    }

    if (props.user && props.user.id && props.space && props.space.id) {
      postService
        .get(props.space.id, Number(location.pathname.split("/")[4]))
        .then((res) => {
          setPost(new Post(res.data.post));
        })
        .catch((err) => {
          setAlert({
            color: "danger",
            message: err.response ? err.response.data.message : err.message,
            show: true,
          });
        });
    }

    return () => {};
  }, [props]);

  return (
    <>
      <Link to={`/space/${props.space.id}/posts`} className="btn mb-3">
        <span className="bi bi-arrow-left"></span>
        <span className="ms-2">Back</span>
      </Link>
      <PostUI
        user={props.user}
        space={props.space}
        post={post}
        setAlert={setAlert}
        className="rounded-0 rounded-top border-bottom-0"
      />
      <Alert {...alert} />
      <CommentFormUI
        user={props.user}
        post={post}
        setPost={setPost}
        setAlert={setAlert}
        commentAbleType="post"
        commentAbleId={post.id}
      />
      <CommentsComponent
        user={props.user}
        setAlert={setAlert}
        comments={post.comments}
      />
    </>
  );
}
