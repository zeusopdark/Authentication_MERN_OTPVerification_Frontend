import React from "react";
import styles from "../styles/username.module.css";
import { useFormik } from "formik";
import { resetPaawordValidate } from "../helper/validate";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Reset = () => {
  const navigate = useNavigate();
  const username = useSelector((state) => state.root.username);
  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_pwd: "",
    },
    validate: resetPaawordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        const { data } = await toast.promise(
          axios.put(
            "http://localhost:5000/api/user/resetpassword",
            { password: values.password, username: username.value },
            { withCredentials: true }
          ),
          {
            pending: "Reseting...",
            success: "Successfull",
            error: "Unable to reset the password",
            loading: "loading...",
          }
        );
        if (data.success) {
          navigate("/password");
        }
      } catch (err) {
        console.log("Some error occured", err);
      }
    },
  });

  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass} style={{ width: "50%" }}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Reset</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Enter New Password
            </span>
          </div>

          <form className="py-20" onSubmit={formik.handleSubmit}>
            <div className="textbox flex flex-col items-center gap-6">
              <input
                className={styles.textbox}
                type="Password"
                placeholder="New Password"
                {...formik.getFieldProps("password")}
              />
              <input
                className={styles.textbox}
                type="Password"
                placeholder="Confirm Password"
                {...formik.getFieldProps("confirm_pwd")}
              />
              <button className={styles.btn} type="submit">
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reset;
