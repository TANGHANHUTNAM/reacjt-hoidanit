import "./SignUp.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postSignUp } from "../../services/apiService";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
const SignUp = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSignUp = async () => {
    // validate
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("Email is invalid");
      return;
    }

    if (!password) {
      toast.error("Password is required");
      return;
    }

    if (!username) {
      toast.error("Username is required");
      return;
    }
    // submit api
    let data = await postSignUp(email, password, username);
    if (data && +data.EC === 0) {
      toast.success(data.EM);
      navigate("/");
    }

    if (data && +data.EC !== 0) {
      toast.error(data.EM);
    }
  };
  return (
    <div className="signup-container">
      <div className="header pe-5 pt-1">
        <span>Already have an account ?</span>
        <button
          className="btn-login py-1 px-2 rounded-2 ms-2"
          onClick={() => navigate("/login")}
        >
          Log in
        </button>
      </div>
      <div className="title col-4 mx-auto text-center">HoiDanIT</div>
      <div className="welcome col-4 mx-auto text-center">
        Start your journey
      </div>
      <div className="content-form col-4 mx-auto d-flex flex-column gap-4 mt-2">
        <div className="form-group">
          <label className="mb-2">Email (*)</label>
          <input
            type={"email"}
            className="form-control"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-group form-password">
          <label className="mb-2">Password (*)</label>
          <input
            type={isShowPassword ? "text" : "password"}
            className="form-control"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {isShowPassword ? (
            <span className="icon-eye" onClick={() => setIsShowPassword(false)}>
              <IoIosEye />
            </span>
          ) : (
            <span className="icon-eye" onClick={() => setIsShowPassword(true)}>
              <IoIosEyeOff />
            </span>
          )}
        </div>
        <div className="form-group">
          <label className="mb-2">Username</label>
          <input
            type={"text"}
            className="form-control"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <div>
            <button className="btn-signup w-100" onClick={() => handleSignUp()}>
              Create a free account
            </button>
          </div>
          <div className="back-home text-center pointer">
            <span onClick={() => navigate("/")}>&#60;&#60; Go to Homepage</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
