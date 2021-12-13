import React, {useState} from "react";
import axios from "axios";
import config from 'IndraReactCommon/config';
import PropTypes from 'prop-types';

function GroupInput({ data, name, next }) {
  const [groupName, setGroupName] = useState("");
  const [groupColor, setGroupColor] = useState("");
  const [groupCount, setGroupCount] = useState(0);
  const [listOfGroups, setListOfGroups] = useState([]);
  console.log(data, name, listOfGroups);
  return <>
    <h4>Model {data.env.name} is created. Now you need to create at least one group for your model</h4>

    <ul>
      {listOfGroups.map((o, i) => (
        <li key={o.name}>
          {i}: name: {o.name}&nbsp;color: {o.color}&nbsp;count: {o.count}
        </li>
      ))}
    </ul>
    <div style={{
      display: "flex",
      justifyContent: "space-around"
    }}>
      <div>
        <span style={{
          "min-width": "100px",
          display: "inline-block"
        }}>Group Name:</span>
        <input
          className="col-sm-4 col-md-4 col-lg-4"
          style={{ width: 150 }}
          value={groupName}
          type="text"
          onChange={e => setGroupName(e.target.value)}
        />
      </div>
      <div>
        <span style={{
          "min-width": "100px",
          display: "inline-block"
        }}>Group Color:</span>
        <input
          className="col-sm-4 col-md-4 col-lg-4"
          style={{ width: 150 }}
          type="text"
          value={groupColor}
          onChange={e => setGroupColor(e.target.value)}
        />
      </div>
      <div>
        <span style={{
          "min-width": "100px",
          display: "inline-block"
        }}>Group Count:</span>
        <input
          className="col-sm-4 col-md-4 col-lg-4"
          style={{ width: 150 }}
          type="INT"
          value={groupCount}
          onChange={e => setGroupCount(e.target.value)}
        />
      </div>
      <button
        className="btn btn-success m-1"
        onClick={() => {
          setListOfGroups(
            listOfGroups.concat({
              name: groupName,
              color: groupColor,
              count: groupCount
            })
          );
          setGroupName("");
          setGroupColor("");
          setGroupCount(0);
        }}
      >Add</button>
    </div>
    <button
      className="btn btn-success m-1"
      onClick={() => {
        Promise.all(listOfGroups.map(o => (
          axios.post(`${config.GENERATOR_CREATE_GROUP}${data && data.exec_key}?group_name=${o.name}&group_color=${o.color}&group_number_of_members=${o.count}`)
        ))).then(() => {
          setListOfGroups([]);
          next();
        })
      }}
    >Save & Continue</button>
  </>;
}

GroupInput.propTypes = {
  data: PropTypes.object,
  name: PropTypes.string,
  next: PropTypes.func
}

export default GroupInput;
