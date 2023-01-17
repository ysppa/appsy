import React, { useEffect, useState } from "react";
import { Space, User } from "../models";
import Skeleton from "react-loading-skeleton";

export default function Avatar(props: any = {}) {
  const [user, setUser] = useState<User | Space>();

  useEffect(() => {
    if (props.user.className === "User") {
      setUser(new User(props.user));
    } else {
      setUser(new Space(props.user));
    }

    return () => {};
  }, [props]);

  return user && user.id ? (
    <figure
      className={`logo m-0 ${props.className}`}
      style={props.style}
      {...props}
    >
      <img
        className="card-img-top h-100 w-100"
        src={user.fullLogo()}
        alt={user.initials()}
      />
    </figure>
  ) : (
    <Skeleton style={props.style} className="logo" circle={true} {...props} />
  );
}
