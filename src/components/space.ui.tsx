import React, { useEffect, useState } from "react";
import Avatar from "./avatar.component";
import Skeleton from "react-loading-skeleton";
import { Space } from "../models";
import { Link } from "react-router-dom";

export default function SpaceUI(props: any = {}) {
  const [space, setSpace] = useState(new Space());

  useEffect(() => {
    if (props.space) {
      setSpace(props.space);
    }

    return () => {};
  }, [props]);

  return (
    <>
      <article className="Space position-relative d-flex align-items-center">
        {space.id ? (
          <Link
            to={`/space/${space.id}`}
            className="nav-link d-flex align-items-center stretched-link"
          ></Link>
        ) : (
          <></>
        )}
        {space.id ? (
          <Avatar user={space} />
        ) : (
          <Skeleton circle={true} className="logo" />
        )}
        <span className="ms-2" style={{ width: "5rem" }}>
          {space.id ? space.name : <Skeleton height={14} count={2} />}
        </span>
      </article>
    </>
  );
}
