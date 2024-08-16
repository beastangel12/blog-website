import React from 'react';

const getStrength = (password) => {
  if (password.length < 6) return 'Too Short';
  if (password.length < 8) return 'Weak';
  if (!/[A-Z]/.test(password)) return 'Weak';
  if (!/[0-9]/.test(password)) return 'Moderate';
  if (!/[!@#$%^&*()_+{}\[\]:;"'<>,.?/\\|`~]/.test(password)) return 'Strong';
  return 'Very Strong';
};

const PasswordStrengthIndicator = ({ password }) => {
  const strength = getStrength(password);
  const strengthColor = {
    'Too Short': 'text-red-500',
    'Weak': 'text-red-500',
    'Moderate': 'text-yellow-500',
    'Strong': 'text-green-500',
    'Very Strong': 'text-blue-500',
  }[strength];

  return (
    <div className="mt-2">
      <p className={`text-sm ${strengthColor}`}>
        Password Strength: {strength}
      </p>
    </div>
  );
};

export default PasswordStrengthIndicator;
