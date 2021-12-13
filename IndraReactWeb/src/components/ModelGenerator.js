
import React, {useState} from "react";
import axios from "axios";
import config from 'IndraReactCommon/config';
import ActionsInput from "./ActionsInput";
import GroupInput from "./GroupInput";

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
      <h4>Generate Your Model Now!</h4>
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
  const renderStepTwo = () => (
    <>
      <GroupInput data={firstData} name={name} next={() => {
        setStep(2)
      }} />
    </>
  );

  const secondData = {};

  const renderStepThree = () => {
    return (
      <ActionsInput data={secondData} />
    )
  };

  if (step === 0) {
    return renderStepOne();
  } else if (step === 1) {
    return renderStepTwo();
  } else if (step === 2) {
    return renderStepThree();
  }
}
