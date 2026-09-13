import {
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "firebase/auth";

import { auth } from "../firebase/firebaseConfig";

let confirmationResult = null;

export const setupRecaptcha = () => {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "normal",
        callback: () => {
          console.log("reCAPTCHA solved");
        },
        "expired-callback": () => {
          console.log("reCAPTCHA expired");
        }
      }
    );
  }

  return window.recaptchaVerifier;
};

export const sendOTP = async (phoneNumber) => {
  const appVerifier = setupRecaptcha();

  confirmationResult = await signInWithPhoneNumber(
    auth,
    phoneNumber,
    appVerifier
  );

  return confirmationResult;
};

export const verifyOTP = async (otp) => {
  if (!confirmationResult) {
    throw new Error("OTP request not initialized");
  }

  const result = await confirmationResult.confirm(otp);

  return result.user;
};