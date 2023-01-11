import React, { useEffect, useState } from "react";
import Avatar from "./avatar.component";
import { Group } from "../models";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

export default function GroupComponent(props = {}) {
  const [group, setGroup] = useState(new Group());

  useEffect(() => {
    setGroup(
      new Group({ ...props.group, messages: [{ body: "Lorem ipsum dolor" }] })
    );

    return () => {};
  }, [props]);

  return (
    <>
      <li className="list-group-item list-group-item-action d-flex justify-content-start align-items-center bg-transparent border-0 position-relative px-2">
        {group.id ? (
          <Link to={`/group/${group.id}`} className="stretched-link"></Link>
        ) : (
          <></>
        )}
        <aside className="">
          <Avatar user={group.lastMessage().user} width={50} height={50} />
        </aside>
        <aside className="ms-2">
          <strong className="text-white m-0">
            {group.id ? group.name : <Skeleton width={60} height={10} />}
          </strong>
          <section className="d-flex align-items-center">
            <p className="MessageBody m-0">
              {group.id ? (
                <>
                  <span className="text-white">{group.lastMessage().body}</span>
                </>
              ) : (
                <Skeleton width={120} height={8} />
              )}
            </p>
            <span className="bi bi-dot text-white"></span>
            {group.id ? (
              <span className="text-white small">
                {group.lastMessage().strCreatedAt()}
              </span>
            ) : (
              <Skeleton width={35} height={8} />
            )}
          </section>
        </aside>
      </li>
    </>
  );
}
