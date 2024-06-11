import React from "react";
import "./DisplayInfor.scss";
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
  return (
    <div className="display-infor-container">
      {true && (
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
