import Select from "react-select";
import { useState } from "react";
import "./Questions.scss";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { FaRegMinusSquare } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
const Questions = () => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      description: "",
      imageFile: "",
      imageName: "",
      answers: [
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
        },
      ],
    },
  ]);

  const handleAddRemoveQuestion = (type, id) => {
    if (type === "ADD") {
      const newQuestion = {
        id: uuidv4(),
        description: "",
        imageFile: "",
        imageName: "",
        answers: [
          {
            id: uuidv4(),
            description: "",
            isCorrect: false,
          },
        ],
      };
      setQuestions([...questions, newQuestion]);
    }
    if (type === "REMOVE") {
      let questionClone = questions;
      questionClone = questionClone.filter((q) => q.id !== id);
      setQuestions(questionClone);
    }
  };

  const handleAddRemoveAnswer = (type, questionId, answerId) => {
    let questionClone = _.cloneDeep(questions);
    if (type === "ADD") {
      const newAnswer = {
        id: uuidv4(),
        description: "",
        isCorrect: false,
      };
      let index = questionClone.findIndex((item) => item.id === questionId);
      questionClone[index].answers.push(newAnswer);
      setQuestions(questionClone);
    }
    if (type === "REMOVE") {
      let index = questionClone.findIndex((item) => item.id === questionId);
      questionClone[index].answers = questionClone[index].answers.filter(
        (item) => item.id !== answerId
      );
      setQuestions(questionClone);
    }
  };

  return (
    <div className="question-container">
      <div className="title">Manage Question</div>
      <div className="add-new-question">
        <div className="col-6 form-group">
          <label className="mb-2">Select Quiz:</label>
          <Select
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
            options={options}
          />
        </div>
        <div className="mt-3 mb-2">Add question:</div>
        {questions &&
          questions.length > 0 &&
          questions.map((q, index) => {
            return (
              <div key={q.id} className="q-main mb-4">
                <div className="question-content d-flex">
                  <div className="form-floating description">
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      value={q.description}
                    />
                    <label>Question {index + 1} 's description</label>
                  </div>
                  <div className="group-upload">
                    <span className="icon-upload">
                      <RiImageAddFill />
                    </span>
                    <input type="file" className="form-control" hidden />
                    <span>No File Upload</span>
                  </div>
                  <div className="btn-add">
                    <span className="">
                      <AiOutlinePlusSquare
                        className="icon-add"
                        onClick={() => handleAddRemoveQuestion("ADD", "")}
                      />
                    </span>
                    {questions.length > 1 && (
                      <span
                        className=""
                        onClick={() => handleAddRemoveQuestion("REMOVE", q.id)}
                      >
                        <FaRegMinusSquare className="icon-remove" />
                      </span>
                    )}
                  </div>
                </div>
                {q.answers &&
                  q.answers.length > 0 &&
                  q.answers.map((a, index) => {
                    return (
                      <div key={a.id} className="answers-content">
                        <input className="form-check-input" type="checkbox" />
                        <div className="form-floating answer-name">
                          <input
                            value={a.description}
                            type="text"
                            className="form-control iscorrect"
                            placeholder=""
                          />
                          <label>Answer {index + 1} </label>
                        </div>
                        <div className="btn-group">
                          <span
                            className=""
                            onClick={() =>
                              handleAddRemoveAnswer("ADD", q.id, "")
                            }
                          >
                            <MdOutlineAddToPhotos className="icon-add" />
                          </span>
                          {q.answers.length > 1 && (
                            <span
                              className=""
                              onClick={() =>
                                handleAddRemoveAnswer("REMOVE", q.id, a.id)
                              }
                            >
                              <FaRegTrashAlt className="icon-remove" />
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Questions;
