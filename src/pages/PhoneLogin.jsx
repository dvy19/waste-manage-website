import { useState } from "react";
import {
  sendOTP,
  verifyOTP
} from "../firebase/firebaseAuth";

const PhoneLogin = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOTP = async () => {
    try {
      await sendOTP(phone);

      setOtpSent(true);

      console.log("OTP sent");
    } catch (error) {
      console.log(error);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const user = await verifyOTP(otp);

      console.log("Firebase user:", user);

      console.log("UID:", user.uid);
      console.log("Phone:", user.phoneNumber);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>

      {!otpSent && (
        <>
          <input
            type="text"
            placeholder="+91XXXXXXXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button onClick={handleSendOTP}>
            Send OTP
          </button>
        </>
      )}

      {otpSent && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <button onClick={handleVerifyOTP}>
            Verify OTP
          </button>
        </>
      )}

      <div id="recaptcha-container"></div>

    </div>
  );
};

export default PhoneLogin;