import React, { useEffect, useState } from "react";
import { User } from "../models";
import Skeleton from "react-loading-skeleton";

export default function Avatar(props: any = {}) {
  const [user, setUser] = useState(new User());

  useEffect(() => {
    setUser(new User(props.user));

    return () => {};
  }, [props]);

  return user.id ? (
    <figure
      className={`logo m-0 ${props.className}`}
      style={props.style}
      {...props}
    >
      <img
        className="card-img-top h-100 w-100"
        src={user.avatar || user.fullLogo()}
        alt={user.initials()}
      />
    </figure>
  ) : (
    <Skeleton style={props.style} className="logo" circle={true} {...props} />
  );
}
