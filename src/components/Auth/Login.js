import "./Login.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../services/apiService";
import { toast } from "react-toastify";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    // validate

    //submit api
    let data = await postLogin(email, password);

    if (data && +data.EC === 0) {
      toast.success(data.EM);
      navigate("/");
    }

    if (data && +data.EC !== 0) {
      toast.error(data.EM);
    }
  };
  return (
    <div className="login-container">
      <div className="header pe-5 pt-1">
        <span>Don't have an account yet?</span>
        <button className="btn-register py-1 px-2 rounded-2 ms-2 ">
          Sign up
        </button>
      </div>
      <div className="title col-4 mx-auto text-center">HoiDanIT</div>
      <div className="welcome col-4 mx-auto text-center">
        Hello, who's this?
      </div>
      <div className="content-form col-4 mx-auto d-flex flex-column gap-4 mt-2">
        <div className="form-group">
          <label className="mb-2">Email</label>
          <input
            type={"email"}
            className="form-control"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-group ">
          <label className="mb-2">Password</label>
          <input
            type={"password"}
            className="form-control"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div>
          <span className="forgot-password">Forgot password?</span>
          <div>
            <button className="btn-login w-100" onClick={() => handleLogin()}>
              Login
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

export default Login;
