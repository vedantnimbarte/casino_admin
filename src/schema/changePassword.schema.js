import * as yup from 'yup';

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,15}$/;

const changePasswordSchema = yup.object().shape({
    currentPassword: yup.string().required('Please enter your current password'),
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
        .oneOf([yup.ref('password')], 'Password and confirm password does not match')
});

export default changePasswordSchema;
