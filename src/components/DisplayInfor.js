import React from "react";
import "./DisplayInfor.scss";
// import logo from "./../logo.svg";
class DisplayInfor extends React.Component {
  constructor(props) {
    console.log("call constructor 1");
    super(props);
    this.state = {
      isShowListUser: true,
    };
  }

  componentDidMount() {
    console.log("componentDidMount");
    setTimeout(() => {
      document.title = "Nhut Nam";
    }, 3000);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("componentDisUpdate", this.props, prevProps);
    if (this.props.listUser !== prevProps.listUser) {
      if (this.props.listUser.length === 5) {
        alert("You have 5 users");
      }
    }
  }

  handleShowHide = () => {
    this.setState({
      isShowListUser: !this.state.isShowListUser,
    });
  };

  render() {
    console.log("render");
    const { listUser } = this.props;
    return (
      <div className="display-infor-container">
        {/* <img src={logo} /> */}
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
          <>
            {listUser.map((user) => {
              return (
                <div
                  key={user.id}
                  className={+user.age > 25 ? "green" : "yellow"}
                >
                  <div>My name is: {user.name} </div>
                  <div>My age is: {user.age}</div>
                  <button onClick={() => this.props.handleDeleteUser(user.id)}>
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
  }
}

export default DisplayInfor;
