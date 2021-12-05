
import React, {useState} from "react";
import axios from "axios";
import config from 'IndraReactCommon/config';
import ActionsInput from "./ActionsInput";

export default () => {
  const [step, setStep] = useState(0);

  const [firstData, setFirstData] = useState(null);

  const [name, setName] = useState('');
  const [loadingStepOne, setLoadingStepOne] = useState(false);
  const createModel = () => {
    setLoadingStepOne(true);
    axios.post(`${config.GENERATOR_CREATE_MODEL}?model_name=${name}`)
      .then((res) => {
        setLoadingStepOne(false);
        setFirstData(res.data);
        setStep(1);
        setName('');
      })
      .catch(() => {
        window.alert('something went wrong');
      });
  };
  const renderStepOne = () => (
    <>
      <p>Please specify the name of your model.</p>
      <div>
        <input value={name} className="col-sm-4 col-md-4 col-lg-4" style={{ width: 200 }} type="text" onChange={e => setName(e.target.value)} />
      </div>
      <br />
      <button
        disabled={!name}
        className="btn btn-success m-1"
        onClick={() => createModel()}
      >
        Next
      </button>
      {loadingStepOne && <span>Loading...</span>}
    </>
  );

  const [secondData, setSecondData] = useState(null);

  const [group, setGroup] = useState({
    name: '',
    color: '',
    membersNum: "0",
    actionsNum: "0"
  });
  const [loadingStepTwo, setLoadingStepTwo] = useState(false);
  const modelGroup = () => {
    setLoadingStepTwo(true);
    axios.post(`${config.GENERATOR_CREATE_GROUP}${firstData && firstData.exec_key}?group_name=${group.name}&group_color=${group.color}&group_number_of_members=${group.membersNum}&group_actions=${group.actionsNum}`)
      .then((res) => {
        setLoadingStepTwo(false);
        setSecondData(res.data);
        setStep(2)
      })
      .catch(() => {
        window.alert("something went wrong");
        setLoadingStepTwo(false);
      });
  }
  const renderStepTwo = () => (
    <>
      <p>What is the group name of your model?</p>
      <div>
        <input
          className="col-sm-4 col-md-4 col-lg-4"
          value={group.name}
          style={{ width: 200 }}
          type="text"
          onChange={e => setGroup({
            ...group,
            name: e.target.value
          })}
        />
      </div>
      <p>What is the color of your group?</p>
      <div>
        <input
          className="col-sm-4 col-md-4 col-lg-4"
          value={group.color}
          style={{ width: 200 }}
          type="text"
          onChange={e => setGroup({
            ...group,
            color: e.target.value
          })}
        />
      </div>
      <br />
      <p>How many members are there in your group?</p>
      <div>
        <input
          type="INT"
          className="col-sm-4 col-md-4 col-lg-4"
          value={group.membersNum}
          style={{ width: 200 }}
          onChange={e => setGroup({
            ...group,
            membersNum: e.target.value
          })}
        />
      </div>
      <button
        className="btn btn-success m-1"
        onClick={() => modelGroup()}
        disabled={!group.name || !group.color}
      >
        Next
      </button>
      {loadingStepTwo && <span>Loading...</span>}
    </>
  );

  const renderStepThree = () => {
    return (
      <ActionsInput data={secondData} />
    )
  };

  const renderForm = () => {
    if (step === 0) {
      return renderStepOne();
    } else if (step === 1) {
      return renderStepTwo();
    } else if (step === 2) {
      return renderStepThree();
    }
  }
  return (
    <>
      <h4>Generate Your Model Now!</h4>
      {renderForm()}
    </>
  );
}
