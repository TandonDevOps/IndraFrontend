
import React, {useState} from "react";
import axios from "axios";
import config from 'IndraReactCommon/config';
import { Dropdown } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import {Link} from "react-router-dom";

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
  const allItems = {
    a: {
      name: "333",
      doc: "444"
    }
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

  const [action, setAction] = useState("");
  const [actionName, setActionName] = useState("");
  const [loadingStepThree, setLoadingStepThree] = useState(false);

  const modelAction = () => {
    setLoadingStepThree(true);
    axios.post(`${config.GENERATOR_CREATE_ACTION}${secondData && secondData.exec_key}?group_name=${action}&group_action=${actionName}`)
      .then((res) => {
        setLoadingStepThree(false);
        console.log(res.data);
      })
      .catch(() => {
        window.alert("something went wrong");
        setLoadingStepThree(false);
      });
  }

  const renderStepThree = () => {
    return (
      <>
        <p>Describe your action</p>
        <input
          className="col-sm-4 col-md-4 col-lg-4"
          value={action}
          style={{ width: 200 }}
          type="text"
          onChange={e => setAction(e.target.value)}
        />
        <br />
        <div>You can choose a group name from below</div>
        <Dropdown>
          <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
            Choose...
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {Object.keys(allItems).map((item) => (!('active' in allItems[item])
            || allItems[item].active === true ? (
              <OverlayTrigger
                key={`${allItems[item].name}-tooltip`}
                placement="right"
                overlay={<Tooltip>{allItems[item].doc}</Tooltip>}
              >
                <Link
                  to={{
                    pathname: `/models/props/${allItems[item].modelID}`,
                    state: {
                      menuId: allItems[item].modelID,
                      name: allItems[item].name,
                      source: allItems[item].source,
                      graph: allItems[item].graph,
                    },
                  }}
                  className="link text-dark dropdown-item"
                  key={allItems[item].name}
                >
                  {allItems[item].name}
                </Link>
              </OverlayTrigger>
            ) : null))}
          </Dropdown.Menu>
        </Dropdown>
        <div>Describe the group action</div>
        <input onChange={e => setActionName(e.target.value)} />
        <br />
        <button
          className="btn btn-success m-1"
          onClick={() => modelAction()}
          disabled={!action}
        >
          Next
        </button>
        {loadingStepThree && <span>Loading...</span>}
      </>
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
