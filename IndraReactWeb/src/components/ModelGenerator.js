
import React, {useState} from "react";
import axios from "axios";
import config from 'IndraReactCommon/config';

export const ModelGenerator = () => {
  const [step, setStep] = useState(0);

  const [name, setName] = useState('');
  const [loadingStepOne, setLoadingStepOne] = useState(false);
  const createModel = () => {
    setLoadingStepOne(true);
    axios.post(`${config.GENERATOR_CREATE_MODEL}?model_name=${name}`)
      .then((res) => {
        setLoadingStepOne(false);
        window.alert(`i got this: ${JSON.stringify(res.data)}`);
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
      <button  text="Submit" className="btn btn-success m-1" onClick={() => createModel()}>Next</button>
      {loadingStepOne && <span>Loading...</span>}
    </>
  );

  const [group, setGroup] = useState({
    name: '',
    color: '',
    membersNum: "0",
    actionsNum: "0"
  });
  const [loadingStepTwo, setLoadingStepTwo] = useState(false);
  const modelGroup = () => {
    setLoadingStepTwo(true);
    axios.post(`${config.GENERATOR_CREATE_GROUP}111?group_name=${group.name}&group_color=${group.color}&group_number_of_members=${group.membersNum}&group_actions=${group.actionsNum}`)
      .then((res) => {
        window.alert(JSON.stringify(res.data));
        setLoadingStepTwo(false);
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
      <button  text="Submit" className="btn btn-success m-1" onClick={() => modelGroup()}>Next</button>
      {loadingStepTwo && <span>Loading...</span>}
    </>
  )
  const renderForm = () => {
    if (step === 0) {
      return renderStepOne();
    } else if (step === 1) {
      return renderStepTwo();
    }
  }
  return (
    <>
      <h4>Generate Your Model Now!</h4>
      {renderForm()}
    </>
  );
}
