import "react-tagsinput/react-tagsinput.css";
import React, { useEffect, useState } from "react";
import "react-phone-input-2/lib/material.css";
import { isAuthenticated } from "../../Services/auth/AuthService";
import {
  addCommunity,
  getCommunity,
} from "../../Services/Community/CommunityService";
import TagsInput from "react-tagsinput";
import { RedirectTo } from "../../Services/CommonService";
const renderBulletPoints = (points) => {
  return (
    <ul>
      {points.map((obj, i) => (
        <li key={i}>{obj}</li>
      ))}
    </ul>
  );
};

const CommunityFromScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [community, setCommunity] = useState("");
  const [tags, setTags] = useState([]);
  const [bulletPoints, setBulletPoints] = useState([]);
  const [description, setDescription] = useState("");
  const [redirect, setRedirect] = useState("");

  const fetchMyAPI = async () => {
    setLoading(true);
    if (!isAuthenticated()) {
      setRedirect("/signIn");
      return;
    }
    const response = await getCommunity();
    if (response) {
      setName(response.name);
      setCommunity(response.community);
      setTags(response.tags || []);
      setBulletPoints(response.bulletPoints || []);
      setDescription(response.description);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchMyAPI();
  }, []);
  if (redirect) {
    return RedirectTo(redirect);
  }

  const handleClick = async () => {
    setLoading(true);
    await addCommunity(name, community, tags, bulletPoints, description);
    setRedirect("/show-community");
    setLoading(false);
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
      {(isLoading && (
        <div class="spinner-border text-primary m-5" role="status">
          <span class="sr-only"></span>
        </div>
      )) || (
        <div className="pb-5">
          <div className="pt-4">
            <div class="form-group">
              <label
                className="d-flex justify-content-start mb-1"
                htmlFor="name"
              >
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
              <label
                className="d-flex justify-content-start pb-1"
                htmlFor="purpose"
              >
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
              <label
                className="d-flex justify-content-start pb-1"
                htmlFor="purpose"
              >
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
              <label
                className="d-flex justify-content-start pb-1"
                htmlFor="purpose"
              >
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
            <div className="form-group mt-2" style={{ textAlign: "start" }}>
              <label
                className="d-flex justify-content-start pb-1"
                htmlFor="purpose"
              >
                Rules
              </label>
              <TagsInput
                class="d-flex justify-content-start pb-1 form-control"
                value={bulletPoints}
                onChange={setBulletPoints}
                onlyUnique={true}
                inputProps={{
                  className: "react-tagsinput-input",
                  placeholder: "Add Persona",
                }}
              />
              {renderBulletPoints(bulletPoints)}
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
      )}
    </div>
  );
};

export default CommunityFromScreen;
