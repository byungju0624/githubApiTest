import React, { useState } from "react";
import axios from "axios";
import { Octokit } from "@octokit/core";
const Button = (props) => {
  const [user, setUser] = useState([]);

  const onClick = () => {
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
