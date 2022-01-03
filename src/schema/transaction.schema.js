import * as yup from 'yup';

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,15}$/;

const transactionSchema = yup.object().shape({
    username_playerId: yup.string().required('Please enter username or id'),
    password: yup
        .string()
        .min(8, 'Password should be minimum 8 characters long')
        .max(150, 'Password should be maximum 150 Characters')
        .matches(PASSWORD_REGEX, 'Password must include uppercase, lowercase, number and special symbol')
        .required('Please enter your password')
});

export default transactionSchema;
