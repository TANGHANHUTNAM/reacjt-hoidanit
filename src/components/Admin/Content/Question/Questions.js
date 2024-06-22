import Select from "react-select";
import { useState } from "react";
import "./Questions.scss";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { FaRegMinusSquare } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineAddToPhotos } from "react-icons/md";
const Questions = () => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const [selectedQuiz, setSelectedQuiz] = useState({});
  return (
    <div className="question-container">
      <div className="title">Manage Question</div>
      <div className="add-new-question">
        <div className="col-6 form-group">
          <label>Select Quiz:</label>
          <Select
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
            options={options}
          />
        </div>
        <div className="mt-3">Add question:</div>
        <div>
          <div className="question-content d-flex">
            <div class="form-floating description">
              <input
                type="text"
                class="form-control"
                placeholder="name@example.com"
              />
              <label>Description</label>
            </div>
            <div className="group-upload">
              <label className="label-upload">Upload Image</label>
              <input type="file" class="form-control" hidden />
              <span>No File Upload</span>
            </div>
            <div className="btn-add">
              <span className="">
                <AiOutlinePlusSquare className="icon-add" />
              </span>
              <span className="">
                <FaRegMinusSquare className="icon-remove" />
              </span>
            </div>
          </div>
          <div className="answers-content">
            <input className="form-check-input" type="checkbox" />
            <div className="form-floating answer-name">
              <input type="text" className="form-control iscorrect" placeholder="" />
              <label>Answer 1 </label>
            </div>
            <div className="btn-group">
              <span className="">
                <MdOutlineAddToPhotos className="icon-add" />
              </span>
              <span className="">
                <FaRegTrashAlt className="icon-remove" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
