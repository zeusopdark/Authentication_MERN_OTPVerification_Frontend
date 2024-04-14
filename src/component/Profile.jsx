import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import avatar from "../assets/profile.png";
import styles from "../styles/username.module.css";
import { useFormik } from "formik";
import { profileValidate } from "../helper/validate";
import convertToBase64 from "../helper/convert";
import extend from "../styles/profile.modules.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/reducers/rootslice";
const Profile = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      mobile: "",
      address: "",
      email: "",
    },
    validate: profileValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { profile: file || "" });
      const { data } = await axios.put(
        "http://localhost:5000/api/user/updateuser",
        values,
        { withCredentials: true }
      );
      if (data.success) {
        dispatch(setUserInfo(data.rest));
      }
    },
  });

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center h-screen">
        <div
          className={`${styles.glass} ${extend.glass}`}
          style={{ width: "45%", paddingTop: "3em" }}
        >
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Profile</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              You can Update your Profile
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  src={file || avatar}
                  className={`${styles.profile_img} ${extend.profile_img}`}
                  alt="avatar"
                />
              </label>

              <input
                onChange={onUpload}
                type="file"
                id="profile"
                name="profile"
              />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <div className="name flex w-3/4 gap-10">
                <input
                  {...formik.getFieldProps("firstname")}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="FirstName"
                />
                <input
                  {...formik.getFieldProps("lastname")}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="LastName"
                />
              </div>

              <div className="name flex w-3/4 gap-10">
                <input
                  {...formik.getFieldProps("mobile")}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="Mobile No."
                />
                <input
                  {...formik.getFieldProps("email")}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="Email*"
                />
              </div>

              <input
                {...formik.getFieldProps("address")}
                className={`${styles.textbox} ${extend.textbox}`}
                type="text"
                placeholder="Address"
              />
              <button className={styles.btn} type="submit">
                Update
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Come Back Later?{" "}
                <NavLink className="text-red-500" to="/">
                  Logout
                </NavLink>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
