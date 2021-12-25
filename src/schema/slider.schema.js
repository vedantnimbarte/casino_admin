import * as yup from 'yup';

const sliderSchema = yup.object().shape({
    name: yup.string().max(100, 'Name should be maximum 100 characters').required('Please enter the game name'),
    url: yup
        .string()
        .url('Please enter valid game url')
        .max(255, 'URL should be maximum 255 characters')
        .required('Please enter the game url')
});

export default sliderSchema;
