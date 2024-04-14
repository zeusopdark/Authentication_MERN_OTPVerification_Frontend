import React from "react";
import { NavLink } from "react-router-dom";
import avatar from "../assets/profile.png";
import styles from "../styles/username.module.css";
import { useFormik } from "formik";
import { usernameValidate } from "../helper/validate";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUsername } from "../redux/reducers/rootslice";
const Username = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const { data } = await toast.promise(
        axios.get(
          `http://localhost:5000/api/user/${values.username}`,

          { withCredentials: true }
        ),
        {
          pending: "Searching...",
          success: "Successfull",
          error: "Unable to find user",
          loading: "loading...",
        }
      );
      if (data.success) {
        dispatch(setUsername(formik.getFieldProps("username")));
      }
    },
  });

  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Hello Again!</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Explore More by connecting with us.
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img src={avatar} className={styles.profile_img} alt="avatar" />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input
                className={styles.textbox}
                type="text"
                placeholder="Username"
                {...formik.getFieldProps("username")}
              />
              <button className={styles.btn} type="submit">
                Let's Go
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Not a Member{" "}
                <NavLink className="text-red-500" to="/register">
                  Register Now
                </NavLink>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Username;