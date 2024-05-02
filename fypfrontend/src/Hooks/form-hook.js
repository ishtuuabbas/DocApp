import React, { useState } from "react";

const useCustomForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
    setNameError("");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const validateName = () => {
    if (name.trim() === "") {
      setNameError("Name is required");
      return false;
    }
    return true;
  };

  const validateEmail = () => {
    if (email.trim() === "") {
      setEmailError("Email is required");
      return false;
    }
    return true;
  };

  const isFormValid = () => {
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    return isNameValid && isEmailValid;
  };

  return {
    name,
    setName,
    email,
    setEmail,
    nameError,
    emailError,
    handleNameChange,
    handleEmailChange,
    isFormValid,
  };
};

export default useCustomForm;
