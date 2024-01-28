import React, { useState } from "react";
import { OtpInput } from "./otp-input";

export function PhoneOtpLogin() {
  const [phone, setPhone] = useState("");
  const [showOTPField, setShowOTPField] = useState(false);

  const handlePhoneNumber = (e) => {
    setPhone(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const regex = /[^0-9]/g;
    if (phone.length < 10 || regex.test(phone)) {
      alert("Invalid phone number");
      return;
    }

    setShowOTPField(true);
  };

  const onOtpSubmit = (otp) => {
    console.log(otp);
  }
  return (
    <div>
      {!showOTPField ? (
        <form onSubmit={handleSubmit}>
          <input type="text" value={phone} onChange={handlePhoneNumber} />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
            <p>Enter OTP sent to {phone}</p>
            <OtpInput length={4} onOtpSubmit={onOtpSubmit}/>
        </div>
      )}
    </div>
  );
}
