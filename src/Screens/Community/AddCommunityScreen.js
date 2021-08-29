import "react-tagsinput/react-tagsinput.css";
import React, { useState } from "react";
import "react-phone-input-2/lib/material.css";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../../Services/auth/AuthService";
import { addCommunity } from "../../Services/Community/CommunityService";
import TagsInput from "react-tagsinput";
const AddCommunityScreen = () => {
  const [name, setName] = useState("");
  const [community, setCommunity] = useState("");
  const [tags, setTags] = useState([]);
  const [description, setDescription] = useState("");
  if (!isAuthenticated()) {
    return <Redirect to="/"></Redirect>;
  }

  const handleClick = async () => {
    await addCommunity(name, community);
  };
  return (
    <div
      style={{
        backgroundColor: "#faf8f3",
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
      }}
      className="App pt-1 px-5  "
    >
      <div className="pb-5">
        <div className="pt-4">
          <div class="form-group">
            <label className="d-flex justify-content-start mb-1" for="name">
              Name
            </label>

            <input
              id="name"
              type="text"
              class="form-control"
              value={community}
              placeholder="Enter Name"
              onChange={(e) => {
                setCommunity(e.target.value);
              }}
            />
          </div>
          <div class="form-group mt-2">
            <label className="d-flex justify-content-start pb-1" for="purpose">
              Purpose
            </label>
            <textarea
              class="form-control"
              id="purpose"
              rows="3"
              value={name}
              placeholder="Enter Purpose"
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></textarea>
          </div>
          <div className="form-group mt-2" style={{ textAlign: "start" }}>
            <label className="d-flex justify-content-start pb-1" for="purpose">
              Persona
            </label>
            <TagsInput
              class="d-flex justify-content-start pb-1 form-control"
              value={tags}
              onChange={setTags}
              maxTags={3}
              onlyUnique={true}
              inputProps={{
                className: "react-tagsinput-input",
                placeholder: "Add Persona",
              }}
            />
          </div>
          <div class="form-group mt-2">
            <label className="d-flex justify-content-start pb-1" for="purpose">
              Description
            </label>
            <textarea
              class="form-control"
              id="purpose"
              rows="3"
              value={description}
              placeholder="Enter Description"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></textarea>
          </div>
        </div>
        <button
          onClick={handleClick}
          type="button"
          className="btn btn-dark mt-3"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddCommunityScreen;
