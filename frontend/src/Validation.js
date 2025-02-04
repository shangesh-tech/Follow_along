const Validate_obj = {
  validateName: (name) => {
    const nameRegex = /^[a-zA-Z][a-zA-Z\s'-]{1,49}$/;
    if (name.length < 2) {
      return "Name cannot have less than 2 letters";
    }
    if (nameRegex.test(name) == false) {
      return "Name cannot contain any symbols";
    }
    return true;
  },
  validatePassword: (password) => {
    const passwordRegex = {
      minLength: 8,
      maxLength: 128,
      hasUpperCase: /[A-Z]/,
      hasLowerCase: /[a-z]/,
      hasNumbers: /[0-9]/,
      hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
    };
    if (password.length < passwordRegex.minLength) {
      return "More letters!!!";
    }
    if (password.length > passwordRegex.maxLength) {
      return "Too much letter";
    }

    if (passwordRegex.hasLowerCase.test(password) == false) {
      return "";
    }
    if (passwordRegex.hasUpperCase.test(password) == false) {
      return "";
    }
    if (passwordRegex.hasSpecialChar.test(password) == false) {
      return "";
    }
    return true;
  },
  validateEmail: (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (email.length > 254) {
      // RFC 5321

      return { isValid: false, error: "Email is too long" };
    }
    return true;
  },
};

export default Validate_obj