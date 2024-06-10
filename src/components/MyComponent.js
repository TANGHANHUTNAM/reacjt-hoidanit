import React from "react";
import AddUserInfor from "./AddUserInfor";
import DisplayInfor from "./DisplayInfor";
class MyComponent extends React.Component {
  state = {
    listUser: [
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
    ],
  };

  handleAddNewUser = (userObject) => {
    console.log(userObject);
    this.setState({
      listUser: [userObject, ...this.state.listUser],
    });
  };
  // JSX
  render() {
    return (
      <div>
        <AddUserInfor handleAddNewUser={this.handleAddNewUser} />
        <DisplayInfor listUser={this.state.listUser} />
      </div>
    );
  }
}

export default MyComponent;
