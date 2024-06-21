import { toast } from "react-toastify";
import { postCreateNewQuiz } from "../../../../services/apiService";
import "./ManageQuiz.scss";
import { useState } from "react";
import Select from "react-select";
import { set } from "nprogress";
const options = [
  { value: "EASY", label: "EASY" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HARD", label: "HARD" },
];
const ManageQuiz = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState(null);
  const handleChangFile = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };
  const handleSubmitQuiz = async () => {
    // validate
    if (!name || !description || !type) {
      toast.error("Name/description/typeQuiz are required");
      return;
    }
    let res = await postCreateNewQuiz(description, name, type?.value, image);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      setName("");
      setDescription("");
      setType("");
      setImage(null);
    } else {
      toast.error(res.EM);
      setName("");
      setDescription("");
      setImage(null);
      setType("");
    }
  };
  return (
    <div className="quiz-container">
      <div className="title">Manage Quizzes</div>
      <hr />
      <div className="add-new">
        <fieldset className="border rounded-3 p-3">
          <legend className="float-none w-auto px-3">Add new Quiz</legend>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="your quiz name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Name</label>
          </div>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingPassword"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label>Description</label>
          </div>
          <div className="my-3">
            <Select
              defaultValue={type}
              onChange={setType}
              options={options}
              placeholder={"Quiz type..."}
            />
          </div>
          <div className="more-actions">
            <label className="mb-2">Upload image</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => handleChangFile(e)}
            />
          </div>
          <div
            className="btn btn-primary mt-3"
            onClick={() => handleSubmitQuiz()}
          >
            Save
          </div>
        </fieldset>
      </div>
      <div className="list-detail ">table</div>
    </div>
  );
};

export default ManageQuiz;
