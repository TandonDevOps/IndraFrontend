import {Dropdown} from "react-bootstrap";
import React, {useState} from "react";
import axios from "axios";
import config from 'IndraReactCommon/config';
import PropTypes from "prop-types";
import Button from "./Button";
import ModelInputField from "./ModelInputField";

function ActionsInput({ secondData }) {
  const [groupName, setGroupName] = useState("");
  const [groupAction, setGroupAction] = useState("");

  const [loadingStepThree, setLoadingStepThree] = useState(false);

  const modelAction = () => {
    setLoadingStepThree(true);
    axios.post(`${config.GENERATOR_CREATE_ACTION}${secondData && secondData.exec_key}?group_name=${groupName}&group_action=${groupAction}`)
      .then(() => {
        setLoadingStepThree(false);
      })
      .catch(() => {
        window.alert("something went wrong");
        setLoadingStepThree(false);
      });
  }
  return (
    <>
      <ModelInputField
        label="Describe your action"
        type="text"
        propChange={e => setGroupName(e.target.value)}
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
      <ModelInputField
        label="Action method name"
        type="text"
        propChange={e => setGroupAction(e.target.value)}
      />
      <br />
      <ModelInputField
        label="Action submethod name"
        type="text"
        propChange={e => setGroupAction(e.target.value)}
      />
      <br />
      <Button
        className="btn btn-primary m-2"
        onClick={() => modelAction()}
        disabled={!groupName}
        text="Next"
      />
      {loadingStepThree && <span>Loading...</span>}
    </>
  );
}

ActionsInput.propTypes = {
  secondData: PropTypes.object
}

export default ActionsInput;
