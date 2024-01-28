import React, { useEffect, useRef, useState } from "react";

export function OtpInput({ length = 4, onOtpSubmit = () => {} }) {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRef = useRef([])

  useEffect(() => {
    if(inputRef.current[0]){
      inputRef.current[0].focus();
    }
  }, []);

  const handleChange = (idx, e) => {
  const value = e.target.value;

  if(isNaN(value)) return;

  const newOTP = [...otp];

  newOTP[idx] = value.substring(value.length - 1);
  setOtp(newOTP);


  // submit trigger
  const combinedOtp = newOTP.join("");
  if(combinedOtp.length === length){
    onOtpSubmit(combinedOtp);
  }

  // move to next input if current field is filled
  if(value && idx < length - 1 && inputRef.current[idx + 1]){
    inputRef.current[idx + 1].focus();

  }


  };
  const handleClick = (idx) => {
    inputRef.current[idx].setSelectionRange(1,1);

    if(idx > 0 && !otp[idx - 1]){
      inputRef.current[otp.indexOf("")].focus();
    }
  };
  const handleKeyDown = (idx, e) => {
   if(e.key ==="Backspace" && !otp[idx] && idx > 0 && inputRef.current[idx - 1]){
    inputRef.current[idx - 1].focus()
   }
  };

  return (
    <div>
      {otp.map((value, idx) => (
        <input
          key={idx}
          type="text"
          value={value}
          ref={input => inputRef.current[idx] = input}
          onChange={(e) => handleChange(idx, e)}
          onClick={() => handleClick(idx)}
          onKeyDown={e => handleKeyDown(idx, e)}
          className="otpInput"
        />
      ))}
    </div>
  );
}
