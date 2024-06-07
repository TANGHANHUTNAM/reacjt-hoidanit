import React from "react";
class DisplayInfor extends React.Component {
  render() {
    const { age, name, myInfor } = this.props;
    console.log(this.props);
    return (
      <div>
        <div>My name is: {name}</div>
        <div>My age is: {age}</div>
        <div>My Infor is: {myInfor}</div>
      </div>
    );
  }
}

export default DisplayInfor;
