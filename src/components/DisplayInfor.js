import React from "react";
import "./DisplayInfor.scss";
import { useState, useEffect } from "react";

const DisplayInfor = (props) => {
  const { listUser } = props;
  const [isShowHideListUser, setShowHideListUser] = useState(true);
  const handleShowHideListUser = () => {
    setShowHideListUser(!isShowHideListUser);
  };
  console.log("render");
  useEffect(() => {
    if (listUser.length === 0) {
      alert("All user has been deleted");
    } 
    console.log("useEffect");
  }, [listUser]);
  return (
    <div className="display-infor-container">
      <div>
        <span onClick={() => handleShowHideListUser()}>
          Show List User
          {isShowHideListUser === true ? " Hide" : " Show"}
        </span>
      </div>
      {isShowHideListUser && (
        <>
          {listUser.map((user) => {
            return (
              <div
                key={user.id}
                className={+user.age > 25 ? "green" : "yellow"}
              >
                <div>My name is: {user.name} </div>
                <div>My age is: {user.age}</div>
                <button onClick={() => props.handleDeleteUser(user.id)}>
                  Delete
                </button>
                <hr />{" "}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};
export default DisplayInfor;
