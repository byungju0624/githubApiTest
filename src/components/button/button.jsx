import React, { useState } from "react";
import axios from "axios";
import { Octokit } from "@octokit/core";
const Button = (props) => {
  const [user, setUser] = useState([]);

  const onClick = () => {
    const octokit = new Octokit({
      headers: {
        accept: "application/vnd.github.v3+json",
        authorization: `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`,
      },
    });
    const response = octokit.request(`GET /orgs/{org}/repos`, {
      org: "octokit",
      type: "public",
    });
    response //
      .then((res) =>
        res.data.map((data) =>
          setUser(
            user.concat({
              name: data.full_name,
              id: data.id,
              avatar: data.owner.avatar_url,
            }),
            console.log(user)
          )
        )
      );
  };
  return (
    <div>
      <button onClick={onClick}>정보가져오기</button>
      <div>
        {user.map((title) => (
          <>
            <li key={title.id}>{title.name}</li>
            <img src={title.avatar}></img>
          </>
        ))}
      </div>
    </div>
  );
};

export default Button;
