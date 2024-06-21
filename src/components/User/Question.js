import _ from "lodash";
const Question = (props) => {
  const { data, index } = props;
  if (_.isEmpty(data)) return <></>;
  const handleCheckbox = (event, aId, qId) => {
    // console.log(event.target.checked);
    console.log("data", data, aId, qId);
    props.handleCheckbox(aId, qId);
  };
  return (
    <>
      {data.image ? (
        <div className="q-image">
          <img src={`data:image/jpeg;base64,${data.image}`} alt="" />
        </div>
      ) : (
        <div className="q-image"></div>
      )}
      <div className="q-content">
        <div className="question">
          Question {index + 1}: {data.questionDescription} ?{" "}
        </div>
        <div className="answer">
          {data.answers &&
            data.answers.length &&
            data.answers.map((a, index) => {
              return (
                <div key={`answers-${index}`} className="a-child">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={a.isSelected}
                      onChange={(event) =>
                        handleCheckbox(event, a.id, data.questionId)
                      }
                    />
                    <label className="form-check-label">{a.description}</label>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Question;
