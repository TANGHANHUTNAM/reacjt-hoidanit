import React from "react";
class DisplayInfor extends React.Component {
  render() {
    // const { age, name } = this.props;
    const { listUser } = this.props;
    console.log(listUser);
    return (
      <div>
        {listUser.map((user) => {
          return (
            <div key={user.id}>
              <div>My name is: {user.name} </div>
              <div>My age is: {user.age}</div>
            </div>
          );
        })}
        {/* <div>My name is: {name}</div>
        <div>My age is: {age}</div> */}
      </div>
    );
  }
}

export default DisplayInfor;
