import React from "react";
import UserInfor from "./UserInfor";
import DisplayInfor from "./DisplayInfor";
class MyComponent extends React.Component {
  // JSX
  render() {
    const myInfor = ["abc", "def", "ghi"];
    return (
      <div>
        <UserInfor />
        <DisplayInfor name="Hoi dan IT" myInfor={myInfor} age={26} />
      </div>
    );
  }
}

export default MyComponent;
