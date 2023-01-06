import React, { useEffect, useState } from "react";
import { User } from "../models";

export default function Avatar(props = {}) {
  const [user, setUser] = useState(new User());

  useEffect(() => {
    setUser(new User(props.user));

    return () => {};
  }, [props]);

  return (
    <figure className="logo m-0" style={props.style}>
      <img
        className="card-img-top h-100 w-100"
        src={user.avatar}
        alt={user.initials()}
      />
    </figure>
  );
}
