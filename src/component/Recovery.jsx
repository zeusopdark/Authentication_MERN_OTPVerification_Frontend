import React, { useEffect, useState } from "react";
import styles from "../styles/username.module.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Recovery = () => {
  const navigate = useNavigate();
  const username = useSelector((state) => state.root.username);
  const [otp, setOtp] = useState("");
  const [check, setCheck] = useState(false);
  const generateOtp = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/user/generateotp/${username.value}`,
        { withCredentials: true }
      );
      if (data.success) {
        const dataObject = {
          email: data.email,
          text: "Password recovery OTP",
          subject: `Your OTP for recovering the password is ${data.code}`,
        };
        await axios.post(
          "http://localhost:5000/api/user/registermail",
          dataObject,
          { withCredentials: true }
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    generateOtp();
  }, [username.value, check]);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.get(
        `http://localhost:5000/api/user/verifyotp/?code=${otp}`,
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        navigate("/reset");
      }
    } catch (err) {
      console.log("There is an error", err);
    }
  };
  const handleResend = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/user/createresetsession",
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        setCheck((value) => !value);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Recovery</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Enter OTP to recover passowrd.
            </span>
          </div>

          <form className="py-20" onSubmit={handleSubmit}>
            <div className="textbox flex flex-col items-center gap-6">
              <div className="input text-center">
                <span className="py-4 text-sm text-left text-gray-500">
                  Enter 6 digit OTP sent to our email address
                </span>
                <input
                  className={styles.textbox}
                  type="Password"
                  placeholder="OTP"
                  value={otp}
                  name="otp"
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>

              <button className={styles.btn} type="submit">
                Recover
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Can't get OTP??{" "}
                <button
                  type="button"
                  className="text-red-500"
                  onClick={handleResend}
                >
                  Resend
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Recovery;
