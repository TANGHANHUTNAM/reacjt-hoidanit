/* eslint-disable no-unused-vars */
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaRegPlusSquare } from "react-icons/fa";
// import { toast } from "react-toastify";
import { useEffect } from "react";
import _ from "lodash";

const ModalViewUser = (props) => {
  const { show, setShow, dataView } = props;
  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setUsername("");
    setImage("");
    setRole("USER");
    setPreviewImage("");
    props.setDataView({});
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (!_.isEmpty(dataView)) {
      setEmail(dataView.email);
      setUsername(dataView.username);
      setImage("");
      setRole(dataView.role);
      if (dataView.image) {
        setPreviewImage(`data:image/jpeg;base64,${dataView.image}`);
      }
    }
  }, [dataView]);
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop="static"
        className="modal-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update a user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                disabled={true}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                disabled={true}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                disabled={true}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Role</label>
              <select
                id="inputState"
                className="form-select"
                disabled={true}
                onChange={(event) => setRole(event.target.value)}
                value={role}
              >
                <option value="USER">USERS</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            <div className="col-md-12">
              <label className="form-label label-upload" htmlFor="labelUpload">
                <FaRegPlusSquare />
                Upload File Image
              </label>
              <input type="file" hidden id="labelUpload" disabled={true} />
            </div>
            <div className="col-md-12 img-preview">
              {previewImage ? (
                <img src={previewImage} alt="preview" />
              ) : (
                <span>Preview Image</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalViewUser;
