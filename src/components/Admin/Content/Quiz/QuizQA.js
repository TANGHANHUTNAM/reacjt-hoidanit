import Select from "react-select";
import { useState } from "react";
import "./QuizQA.scss";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { FaRegMinusSquare } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import Lightbox from "react-awesome-lightbox";
import { useEffect } from "react";
import {
  getAllQuizForAdmin,
  getQuizWithQA,
  postUpsertQA,
} from "../../../../services/apiService";
import { toast } from "react-toastify";
const QuizQA = () => {
  const initQuestion = [
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
  ];
  const [questions, setQuestions] = useState(initQuestion);
  const [isPreviewImage, setIsPreviewImage] = useState(false);
  const [dataImagePreview, setDataImagePreview] = useState({
    title: "",
    url: "",
  });
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [listQuiz, setListQuiz] = useState([]);
  useEffect(() => {
    fetchQuiz();
  }, []);

  useEffect(() => {
    if (selectedQuiz && selectedQuiz.value) fetchQuizWithQA();
  }, [selectedQuiz]);

  function urltoFile(url, filename, mimeType) {
    if (url.startsWith("data:")) {
      var arr = url.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      var file = new File([u8arr], filename, { type: mime || mimeType });
      return Promise.resolve(file);
    }
    return fetch(url)
      .then((res) => res.arrayBuffer())
      .then((buf) => new File([buf], filename, { type: mimeType }));
  }

  const fetchQuizWithQA = async () => {
    let res = await getQuizWithQA(selectedQuiz.value);
    if (res && res.EC === 0) {
      // convert base64 to file object
      let newQA = [];
      for (let i = 0; i < res.DT.qa.length; i++) {
        let q = res.DT.qa[i];
        if (q.imageFile) {
          q.imageName = `Question-${q.id}.png`;
          q.imageFile = await urltoFile(
            `data:image/png;base64,${q.imageFile}`,
            `Question-${q.id}.png`,
            "image/png"
          );
          newQA.push(q);
        }
      }

      setQuestions(newQA);
    }
  };

  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      let newQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.description}`,
        };
      });
      setListQuiz(newQuiz);
    }
  };

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

  const handleOnChange = (type, questionId, value) => {
    if (type === "QUESTION") {
      let questionClone = _.cloneDeep(questions);
      let index = questionClone.findIndex((item) => item.id === questionId);
      if (index > -1) {
        questionClone[index].description = value;
        setQuestions(questionClone);
      }
    }
  };

  const handleOnChangeFileQuestion = (questionId, event) => {
    let questionClone = _.cloneDeep(questions);
    let index = questionClone.findIndex((item) => item.id === questionId);
    if (
      index > -1 &&
      event.target &&
      event.target.files &&
      event.target.files[0]
    ) {
      questionClone[index].imageFile = event.target.files[0];
      questionClone[index].imageName = event.target.files[0].name;
      setQuestions(questionClone);
    }
  };

  const handleAnswerQuestion = (type, answerId, questionId, value) => {
    let questionClone = _.cloneDeep(questions);
    let index = questionClone.findIndex((item) => item.id === questionId);
    if (index > -1) {
      questionClone[index].answers = questionClone[index].answers.map((a) => {
        if (a.id === answerId && type === "CHECKBOX") {
          a.isCorrect = value;
        }
        if (a.id === answerId && type === "INPUT") {
          a.description = value;
        }
        return a;
      });

      setQuestions(questionClone);
    }
  };

  const handleSubmitQuestionForQuiz = async () => {
    // validate selected quiz
    if (_.isEmpty(selectedQuiz)) {
      return toast.error("Please select quiz");
    }
    // validate question
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].description === "") {
        return toast.error(`Please input question ${i + 1}`);
      }
    }
    // validate answer
    for (let i = 0; i < questions.length; i++) {
      let isValid = true;
      for (let j = 0; j < questions[i].answers.length; j++) {
        if (questions[i].answers[j].description === "") {
          isValid = false;
          return toast.error(
            `Please input answer for question ${i + 1}, answer ${j + 1}`
          );
        }
      }
      if (!isValid) {
        break;
      }
    }
    // validate answer correct
    for (let i = 0; i < questions.length; i++) {
      let isValid = false;
      for (let j = 0; j < questions[i].answers.length; j++) {
        if (questions[i].answers[j].isCorrect === true) {
          isValid = true;
          break;
        }
      }
      if (!isValid) {
        return toast.error(
          `Please select correct answer for question ${i + 1}`
        );
      }
    }

    // submit questions
    let questionClone = _.cloneDeep(questions);
    for (let i = 0; i < questionClone.length; i++) {
      if (questionClone[i].imageFile) {
        questionClone[i].imageFile = await toBase64(questionClone[i].imageFile);
      }
    }
    let res = await postUpsertQA({
      quizId: selectedQuiz.value,
      questions: questionClone,
    });
    if (res && res.EC === 0) {
      toast.success(res.EM);
      fetchQuizWithQA();
    }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const handlePreviewImage = (questionId) => {
    let questionClone = _.cloneDeep(questions);
    let index = questionClone.findIndex((item) => item.id === questionId);
    if (index > -1) {
      setDataImagePreview({
        url: URL.createObjectURL(questionClone[index].imageFile),
        title: questionClone[index].imageName,
      });
      setIsPreviewImage(true);
    }
  };

  return (
    <div className="question-container">
      <div className="add-new-question">
        <div className="col-6 form-group">
          <label className="mb-2">Select Quiz:</label>
          <Select
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
            options={listQuiz}
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
                      onChange={(e) =>
                        handleOnChange("QUESTION", q.id, e.target.value)
                      }
                    />
                    <label>Question {index + 1} 's description</label>
                  </div>
                  <div className="group-upload">
                    <label className="icon-upload" htmlFor={`${q.id}`}>
                      <RiImageAddFill />
                    </label>
                    <input
                      id={`${q.id}`}
                      type={"file"}
                      className="form-control"
                      hidden
                      onChange={(e) => handleOnChangeFileQuestion(q.id, e)}
                    />

                    <span>
                      {q.imageName ? (
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => handlePreviewImage(q.id)}
                        >
                          {q.imageName}
                        </span>
                      ) : (
                        "No File Upload"
                      )}
                    </span>
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
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={a.isCorrect}
                          onChange={(e) =>
                            handleAnswerQuestion(
                              "CHECKBOX",
                              a.id,
                              q.id,
                              e.target.checked
                            )
                          }
                        />
                        <div className="form-floating answer-name">
                          <input
                            value={a.description}
                            type="text"
                            className="form-control iscorrect"
                            placeholder=""
                            onChange={(e) =>
                              handleAnswerQuestion(
                                "INPUT",
                                a.id,
                                q.id,
                                e.target.value
                              )
                            }
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
        {questions && questions.length > 0 && (
          <div>
            <button
              className="btn btn-warning"
              onClick={() => handleSubmitQuestionForQuiz()}
            >
              Save question
            </button>
          </div>
        )}
        {isPreviewImage === true && (
          <Lightbox
            image={dataImagePreview.url}
            title={dataImagePreview.title}
            onClose={() => setIsPreviewImage(false)}
          ></Lightbox>
        )}
      </div>
    </div>
  );
};

export default QuizQA;
