export const notEmpty = (v) => !!v?.trim();
export const noSpaces = (v) => !/\s/.test(v || "");
export const isEmail = (v) => /\S+@\S+\.\S+/.test(v || "");

const hasLower = (v) => /[a-z]/.test(v || "");
const hasUpper = (v) => /[A-Z]/.test(v || "");
const hasDigit = (v) => /\d/.test(v || "");
const hasSpecial = (v) => /[*@%$#]/.test(v || "");

export const isStrongPassword = (v) =>
    (v || "").length >= 8 && hasLower(v) && hasUpper(v) && hasDigit(v) && hasSpecial(v);

export const validateRegister = (data) => {
    const e = {};
    if (!isEmail(data.email)) e.email = "Invalid email";
    if (!notEmpty(data.name)) e.name = "Name is required";
    if (!notEmpty(data.username)) e.username = "Username is required";
    else if (!noSpaces(data.username)) e.username = "Username cannot contain spaces";
    if (!isStrongPassword(data.password)) e.password = "Weak password";
    if (!notEmpty(data.confirmPassword)) e.confirmPassword = "Confirm Password is required";
    else if (data.confirmPassword !== data.password) e.confirmPassword = "Passwords do not match";
    return e;
};

export const validateLogin = (data) => {
    const e = {};
    if (!isEmail(data.email)) e.email = "Invalid email";
    if ((data.password || "").length < 8) e.password = "Password must be at least 8 characters";
    return e;
};
