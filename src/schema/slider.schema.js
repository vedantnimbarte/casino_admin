import * as yup from 'yup';

const SUPPORTED_FILETYPES = ['jpeg', 'png', 'jpg'];

const sliderSchema = yup.object().shape({
    name: yup.string().max(100, 'Name should be maximum 100 characters').required('Please enter the game name'),
    image: yup.mixed().required('Please select game image')
});

const updateSliderSchema = yup.object().shape({
    name: yup.string().max(100, 'Name should be maximum 100 characters').required('Please enter the game name')
});

export { updateSliderSchema };

export default sliderSchema;
