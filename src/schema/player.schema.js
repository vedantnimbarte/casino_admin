import * as yup from 'yup';

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,15}$/;
const PHONE_NO_REGEX = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
const USERNAME_REGEX = /^[A-Za-z][A-Za-z0-9-_]+$/;

const playerSchema = yup.object().shape({
    username: yup
        .string()
        .max(30, 'Username should be maximum 30 characters')
        .matches(USERNAME_REGEX, 'Username should start with letters and only contain letters, numbers and dashes')
        .required('please enter username'),
    name: yup.string().required('Please enter your name'),
    email: yup
        .string()
        .email('Please enter valid email address')
        .max(100, 'email should be maximum 100 characters')
        .required('Please enter your email address'),
    password: yup
        .string()
        .min(8, 'Password should be minimum 8 characters long')
        .max(150, 'Password should be maximum 150 Characters')
        .matches(PASSWORD_REGEX, 'Password must include uppercase, lowercase, number and special symbol')
        .required('Please enter the password'),
    confirm_password: yup
        .string()
        .min(8, 'Password should be min 8 characters')
        .max(15, 'Password should be max 15 characters')
        .matches(PASSWORD_REGEX, 'Password must include uppercase, lowercase, number and special symbol')
        .required('Please enter the password')
        .oneOf([yup.ref('password')], 'Password and confirm password does not match'),
    phone_no: yup.string().matches(PHONE_NO_REGEX, 'Phone number is invalid').required('Please enter phone number'),
    agent: yup.string().required('Please select the agent')
});

const updatePlayerSchema = yup.object().shape({
    username: yup
        .string()
        .max(30, 'Username should be maximum 30 characters')
        .matches(USERNAME_REGEX, 'Username should start with letters and only contain letters, numbers and dashes')
        .required('please enter username'),
    name: yup.string().required('Please enter your name'),
    email: yup
        .string()
        .email('Please enter valid email address')
        .max(100, 'email should be maximum 100 characters')
        .required('Please enter your email address'),
    password: yup
        .string()
        .optional()
        .min(8, 'Password should be minimum 8 characters long')
        .max(150, 'Password should be maximum 150 Characters')
        .matches(PASSWORD_REGEX, 'Password must include uppercase, lowercase, number and special symbol'),
    confirm_password: yup
        .string()
        .optional()
        .min(8, 'Password should be min 8 characters')
        .max(15, 'Password should be max 15 characters')
        .matches(PASSWORD_REGEX, 'Password must include uppercase, lowercase, number and special symbol')
        .oneOf([yup.ref('password')], 'Password and confirm password does not match'),
    phone_no: yup.string().matches(PHONE_NO_REGEX, 'Phone number is invalid').required('Please enter phone number'),
    agent: yup.string().required('Please select the agent')
});

export { updatePlayerSchema };

export default playerSchema;
