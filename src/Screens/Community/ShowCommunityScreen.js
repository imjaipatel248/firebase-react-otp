import "react-tagsinput/react-tagsinput.css";
import React, { useEffect, useState } from "react";
import "react-phone-input-2/lib/material.css";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../../Services/auth/AuthService";
import {
  addCommunity,
  getCommunity,
} from "../../Services/Community/CommunityService";
import TagsInput from "react-tagsinput";
import { RedirectTo } from "../../Services/CommonService";

const ShowCommunityScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [redirect, setRedirect] = useState("");
  const [tags, setTags] = useState([]);
  const [bulletPoints, setBulletPoints] = useState([]);
  const [description, setDescription] = useState("");
  async function fetchMyAPI() {
    setLoading(true);
    if (!isAuthenticated()) {
      setRedirect("/signIn");
      return;
    }
    const response = await getCommunity();
    if (response) {
      setName(response.name);
      setPurpose(response.purpose);
      setTags(response.tags || []);
      setBulletPoints(response.bulletPoints || []);
      setDescription(response.description);
    } else {
      setRedirect("/purpose");
    }
    setLoading(false);
  }
  useEffect(() => {
    fetchMyAPI();
  }, []);
  if (redirect) {
    return RedirectTo(redirect);
  }

  const handleClick = async () => {
    setLoading(true);
    await addCommunity(name, purpose, tags, bulletPoints, description);
    setRedirect("show-purpose");
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
          <Link className="btn btn-primary float-end mt-2" to="/community">
            Edit
          </Link>
          <div className="pt-4">
            <div class="table table-responsive-xl px-5 text-align-start">
              <table class="table">
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>{name}</td>
                  </tr>
                  <tr>
                    <td>Purpose</td>
                    <td>{purpose}</td>
                  </tr>
                  <tr>
                    <td>Persona</td>
                    <td>
                      {tags.map((tag) => (
                        <li>{tag}</li>
                      ))}
                    </td>
                  </tr>
                  <tr>
                    <td>Description</td>
                    <td>{description}</td>
                  </tr>
                  <tr>
                    <td>Rules</td>
                    <td>
                      {bulletPoints.map((bulletPoint) => (
                        <li>{bulletPoint}</li>
                      ))}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowCommunityScreen;
