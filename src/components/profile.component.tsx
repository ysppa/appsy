import React, { useEffect, useState } from "react";
import { User } from "../models";

export default function Profile(props: any = {}) {
  const [user, setUser] = useState(new User());

  useEffect(() => {
    setUser(props.user);

    return () => {};
  }, [props]);

  return (
    <>
      <h1>Profile - {user.username}</h1>
    </>
  );
}
