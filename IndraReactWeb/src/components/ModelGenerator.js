
import React, {useState} from "react";
import axios from "axios";
import config from 'IndraReactCommon/config';
import ActionsInput from "./ActionsInput";
import GroupInput from "./GroupInput";
import Button from "./Button";
import ModelInputField from "./ModelInputField";

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
      <div>
        <ModelInputField
          label="Please specify the name of your model."
          propChange={e => setName(e.target.value)}
          placeholder=""
        />
      </div>
      <br />
      <Button
        disabled={!name}
        className="btn btn-primary m-2"
        onClick={() => createModel()}
        text="Next"
      />
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
