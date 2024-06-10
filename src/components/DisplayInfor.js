import React from "react";
import "./DisplayInfor.scss";
class DisplayInfor extends React.Component {
  state = {
    isShowListUser: true,
  };
  handleShowHide = () => {
    this.setState({
      isShowListUser: !this.state.isShowListUser,
    });
  };
  render() {
    const { listUser } = this.props;
    return (
      <div className="display-infor-container">
        <div>
          <span
            onClick={() => {
              this.handleShowHide();
            }}
          >
            Hide list users:
            {this.state.isShowListUser ? "Hide" : "Show"}
          </span>
        </div>
        {this.state.isShowListUser && (
          <div>
            {listUser.map((user) => {
              return (
                <div
                  key={user.id}
                  className={+user.age > 25 ? "green" : "yellow"}
                >
                  <div>My name is: {user.name} </div>
                  <div>My age is: {user.age}</div>
                  <hr />{" "}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default DisplayInfor;
