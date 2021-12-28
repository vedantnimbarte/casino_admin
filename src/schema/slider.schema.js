import * as yup from 'yup';

const SUPPORTED_FILETYPES = ['jpeg', 'png', 'jpg'];

const sliderSchema = yup.object().shape({
    name: yup.string().max(100, 'Name should be maximum 100 characters').required('Please enter the game name'),
    image: yup
        .mixed()
        .required('Please select game image')
        .test(
            'filetype',
            'Only .jpg, .jpeg, .png files are supported',
            (value) => !value || (value && SUPPORTED_FILETYPES.includes(value.split('.').slice(-1)[0]))
        )
});

export default sliderSchema;
