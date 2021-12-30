import * as yup from 'yup';

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,15}$/;
const PHONE_NO_REGEX = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

const playerSchema = yup.object().shape({
    // username: yup.string().max(30, 'Username should be maximum 30 characters').required(),
    // email: yup.string().max(100, 'Email should be maximum 100 characters').required(),
    // password: yup
    //     .string()
    //     .min(8, 'Password should be min 8 characters')
    //     .max(15, 'Password should be max 15 characters')
    //     .matches(PASSWORD_REGEX, 'Password must include uppercase, lowercase, number and special symbol')
    //     .required('Please enter the password'),
    // confirm_password: string()
    //     .min(8, 'Password should be min 8 characters')
    //     .max(15, 'Password should be max 15 characters')
    //     .matches(PASSWORD_REGEX, 'Password must include uppercase, lowercase, number and special symbol')
    //     .required('Please enter the password')
    //     .oneOf([yup.ref('password')], 'Password and confirm password does not match'),
    // phone_no: yup.number().matches(PHONE_NO_REGEX, 'Phone number is invalid').required('Please enter phone number'),
    // agent: yup.string().required('Please select the agent')
});

export default playerSchema;
