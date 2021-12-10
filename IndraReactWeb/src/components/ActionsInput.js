import {Dropdown} from "react-bootstrap";
import React, {useState} from "react";
import axios from "axios";
import config from 'IndraReactCommon/config';

export default function ({ secondData }) {
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
          <div>23</div>
          <div>34</div>
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
  );
}