import React from "react";
import "./DisplayInfor.scss";
import { useState } from "react";
// class DisplayInfor extends React.Component {
//   render() {
//     console.log("render");
//     const { listUser } = this.props;
//     return (
//       <div className="display-infor-container">
//         {true && (
//           <>
//             {listUser.map((user) => {
//               return (
//                 <div
//                   key={user.id}
//                   className={+user.age > 25 ? "green" : "yellow"}
//                 >
//                   <div>My name is: {user.name} </div>
//                   <div>My age is: {user.age}</div>
//                   <button onClick={() => this.props.handleDeleteUser(user.id)}>
//                     Delete
//                   </button>
//                   <hr />{" "}
//                 </div>
//               );
//             })}
//           </>
//         )}
//       </div>
//     );
//   }
// }

const DisplayInfor = (props) => {
  const { listUser } = props;
  const [isShowHideListUser, setShowHideListUser] = useState(true);
  const handleShowHideListUser = () => {
    setShowHideListUser(!isShowHideListUser);
  };
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
