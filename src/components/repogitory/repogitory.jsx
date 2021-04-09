import React, { useState } from "react";
import { Octokit } from "@octokit/core";
import CheckBox from "../checkbox/checkbox";
const Repogitory = (props) => {
  const [user, setUser] = useState([]);
  const [checkedItems, setCheckedItems] = useState(new Set());
  const [bChecked, setChecked] = useState(false);
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
      const updateUser = res.data.map((u) => ({
        name: u.full_name,
        id: u.id,
        avatar: u.owner.avatar_url,
      }));
      setUser(updateUser);
    });
  const checkedItemsHandler = (id, isChecked) => {
    if (isChecked) {
      checkedItems.add(id);
      setCheckedItems(checkedItems);
    } else if (!isChecked && checkedItems.has(id)) {
      checkedItems.delete(id);
      setCheckedItems(checkedItems);
    }
  };
  const checkedHandler = ({ target }) => {
    setChecked(!bChecked);
    checkedItemsHandler(user.id, target.checked);
    console.log(target);
  };
  return (
    <div>
      {user.map((title) => (
        <list>
          <CheckBox key={title.id}>테스트</CheckBox>
        </list>
      ))}
      <input
        type="checkbox"
        checked={bChecked}
        onChange={(e) => checkedHandler(e)}
      />
    </div>
  );
};

export default Repogitory;
