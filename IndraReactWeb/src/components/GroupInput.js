import React, {useState} from "react";
import axios from "axios";
import config from 'IndraReactCommon/config';
import PropTypes from 'prop-types';
import Button from "./Button";
import ModelInputField from "./ModelInputField";

function GroupInput({ data, next }) {
  const [groupName, setGroupName] = useState("");
  const [groupColor, setGroupColor] = useState("");
  const [groupCount, setGroupCount] = useState(0);
  const [listOfGroups, setListOfGroups] = useState([]);
  return <>
    <h4>Model {data.env.name} is created. Now you need to create at least one group for your model</h4>

    <ul>
      {listOfGroups.map((o, i) => (
        <li key={o.name}>
          {i + 1}: name: {o.name}&nbsp;color: {o.color}&nbsp;count: {o.count}
        </li>
      ))}
    </ul>
    <div>
      <div>
        <ModelInputField
          type="text"
          label="Group Name:"
          name="input_name"
          propChange={e => setGroupName(e.target.value)}
          placeholder=""
        />
      </div>
      <div>
        <ModelInputField
          type="text"
          label="Group Color:"
          name="input_color"
          propChange={e => setGroupColor(e.target.value)}
          placeholder=""
        />
      </div>
      <div>
        <ModelInputField
          label="Group Count:"
          name="input_count"
          type="INT"
          propChange={e => setGroupCount(e.target.value)}
          placeholder=""
        />
      </div>
      <Button
        className="btn btn-primary m-2"
        onClick={() => {
          setListOfGroups(
            listOfGroups.concat({
              name: groupName,
              color: groupColor,
              count: groupCount
            })
          );
          document.getElementById("input_name").value = ""
          document.getElementById("input_color").value = ""
          document.getElementById("input_count").value = ""
        }}
        text="Add"
      />
    </div>
    <Button
      className="btn btn-primary m-2"
      onClick={() => {
        let res = Promise.resolve();
        listOfGroups.forEach(o => {
          res = res.then(() => axios.post(`${config.GENERATOR_CREATE_GROUP}${data && data.exec_key}?group_name=${o.name}&group_color=${o.color}&group_number_of_members=${o.count}`))
            .catch(() => {
              window.alert(`Failed to add group ${o.name}!`)
            });
        })
        res.then(() => {
          setListOfGroups([]);
          next();
        })
      }}
      text="Save & Continue"
    />
  </>;
}

GroupInput.propTypes = {
  data: PropTypes.object,
  name: PropTypes.string,
  next: PropTypes.func
}

export default GroupInput;
