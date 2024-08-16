import React from "react";

const PasswordStrengthIndicator = ({ password }) => {
  const getStrengthMessage = () => {
    if (!password) return ""; // Return an empty string if no password is entered

    if (password.length < 8) return "Password Strength: Too Short";
    if (password.length < 12) return "Password Strength: Weak";
    if (!/[A-Z]/.test(password))
      return "Password Strength: Medium (Include uppercase)";
    if (!/[0-9]/.test(password))
      return "Password Strength: Medium (Include numbers)";
    return "Password Strength: Strong";
  };

  return (
    <div className="password-strength-indicator">
      {getStrengthMessage() && <p>{getStrengthMessage()}</p>}
    </div>
  );
};

export default PasswordStrengthIndicator;
