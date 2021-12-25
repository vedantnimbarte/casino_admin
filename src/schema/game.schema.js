import * as yup from 'yup';

const SUPPORTED_FILETYPES = ['image/jpeg', 'image/png'];

const gameSchema = yup.object().shape({
    name: yup.string().max(100, 'URL should be maximum 255 characters').required('Please enter the game name'),
    url: yup
        .string()
        .max(255, 'URL should be maximum 255 characters')
        .url('Please enter valid game url')
        .required('Please enter the game url'),
    image: yup
        .mixed()
        .required('Please select game image')
        .test(
            'filetype',
            'Only .jpg, .jpeg, .png files are supported',
            (value) => !value || (value && SUPPORTED_FILETYPES.includes(value.type))
        ),
    gameGroup: yup.string().required('Please select the game group')
});

export default gameSchema;
