import React from "react";
import { NavLink } from "react-router-dom";
import avatar from "../assets/profile.png";
import styles from "../styles/username.module.css";
import { useFormik } from "formik";
import { passwordValidate } from "../helper/validate";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../redux/reducers/rootslice";

const Password = () => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.root.username);

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const { data } = await toast.promise(
        axios.post(
          "http://localhost:5000/api/user/login",
          {
            username: username.value,
            password: values.password,
          },
          { withCredentials: true }
        ),
        {
          pending: "Logging in...",
          success: "Login successfully",
          error: "Unable to login user",
          loading: "Logging user...",
        }
      );
      if (data.success) {
        dispatch(setUserInfo(data.rest));
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
                type="Password"
                placeholder="Password"
                {...formik.getFieldProps("password")}
              />
              <button className={styles.btn} type="submit">
                Sign In
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Forgot Password?{" "}
                <NavLink className="text-red-500" to="/recovery">
                  Recover Now
                </NavLink>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Password;
