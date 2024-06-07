import React from "react";
import UserInfor from "./UserInfor";
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
  // JSX
  render() {
    return (
      <div>
        <UserInfor />
        <DisplayInfor listUser={this.state.listUser} />
      </div>
    );
  }
}

export default MyComponent;
