// validate username 
import toast from "react-hot-toast"

// validate login page username 
export async function usernameValidate(values) {
    const errors = usernameVerify({}, values);
    return errors;
}

function usernameVerify(error = {}, values) {
    if (!values.username) {
        error.username = toast.error("Username Required...!")
    } else if (values.username.includes(" ")) {
        error.username = toast.error('Invalid Username...!')
    }

    return error;
}


//validate password
export async function passwordValidate(values) {
    const errors = passwordVerify({}, values);
    return errors;
}

function passwordVerify(errors = {}, values) {

    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (!values.password) {
        errors.password = toast.error("Password Required...!")
    } else if (values.password.includes(" ")) {
        errors.password = toast.error("Wrong Password...!");
    }
    else if (values.password.legnth < 4) {
        errors.password = toast.error("Password must be more than 4 characters...!");
    }
    else if (!specialChars.test(values.password)) {
        errors.password = toast.error("Password must have special characters...!");
    }
    return errors;
}

// validate reset password 

export async function resetPaawordValidate(values) {
    const errors = passwordVerify({}, values);
    if (values.password != values.confirm_pwd) {
        errors.exists = toast.error("Passwords are Not same...!")
    }
    return errors;
}

//validate register form
export async function registerValidate(values) {
    const errors = passwordVerify({}, values);
    usernameVerify(errors, values);
    emailVerify(errors, values);
}

///verify email

function emailVerify(errors = {}, values) {
    if (!values.email) {
        errors.email = toast.error("Email Required...!");

    } else if (values.email.includes(" ")) {
        errors.email = toast.error("Invalid Email...!");
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = toast.error("Invalid email address...!")
    }
    return errors;
}

//validate profile page
export async function profileValidate(values) {

    const errors = emailVerify({}, values);
    return errors;
}