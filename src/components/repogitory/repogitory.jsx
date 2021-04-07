import React, { useState } from "react";
import { Octokit } from "@octokit/core";
const Repogitory = (props) => {
  const [user, setUser] = useState([]);
  const octokit = new Octokit({
    headers: {
      accept: "application/vnd.github.v3+json",
      authorization: process.env.REACT_APP_GITHUB_TOKEN_KEY,
    },
  });
  const response = octokit.request(`GET /orgs/{org}/repos`, {
    org: "octokit",
    type: "public",
    per_page: "10",
  });
  response //
    .then((res) => {
      const info = res.data.map((data) => ({
        name: data.full_name,
        id: data.id,
        avatar: data.owner.avatar_url,
      }));
      setUser(info);
    });
  return (
    <div>
      {user.map((title) => (
        <>
          <li key={title.id}>{title.name}</li>
          <img src={title.avatar}></img>
        </>
      ))}
    </div>
  );
};

export default Repogitory;
