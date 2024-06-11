import React, { useState } from "react";
import AddUserInfor from "./AddUserInfor";
import DisplayInfor from "./DisplayInfor";

// class MyComponent extends React.Component {
//   state = {
//     listUser: [
//       {
//         id: 1,
//         name: "Hoi dan IT",
//         age: 26,
//       },
//       {
//         id: 2,
//         name: "Hoi dan IT 2",
//         age: 27,
//       },
//       {
//         id: 3,
//         name: "Hoi dan IT 3",
//         age: 21,
//       },
//     ],
//   };

//   handleAddNewUser = (userObject) => {
//     console.log(userObject);
//     this.setState({
//       listUser: [userObject, ...this.state.listUser],
//     });
//   };
//   handleDeleteUser = (id) => {
//     let listUserClone = [...this.state.listUser];
//     listUserClone = listUserClone.filter((user) => user.id !== id);
//     this.setState({
//       listUser: listUserClone,
//     });
//   };
//   // JSX
//   render() {
//     return (
//       <>
//         <AddUserInfor handleAddNewUser={this.handleAddNewUser} />
//         <DisplayInfor
//           listUser={this.state.listUser}
//           handleDeleteUser={this.handleDeleteUser}
//         />
//       </>
//     );
//   }
// }

const MyComponent = (props) => {
  const [listUsers, setListUsers] = useState([
    {
      id: 1,
      name: "Hoi dan IT",
      age: 26,
    },
    {
      id: 2,
      name: "Hoi dan IT 2",
      age: 27,
    },
    {
      id: 3,
      name: "Hoi dan IT 3",
      age: 21,
    },
  ]);

  const handleAddNewUser = (userObject) => {
    setListUsers([userObject, ...listUsers]);
  };
  const handleDeleteUser = (id) => {
    let listUserClone = listUsers;
    listUserClone = listUserClone.filter((user) => user.id !== id);
    setListUsers(listUserClone);
  };
  return (
    <>
      <AddUserInfor handleAddNewUser={handleAddNewUser} />
      <DisplayInfor listUser={listUsers} handleDeleteUser={handleDeleteUser} />
    </>
  );
};

export default MyComponent;
