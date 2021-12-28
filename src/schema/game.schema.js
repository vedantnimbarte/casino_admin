import * as yup from 'yup';

const SUPPORTED_FILETYPES = ['jpeg', 'png', 'jpg'];

const gameSchema = yup.object().shape({
    name: yup.string().max(100, 'URL should be maximum 255 characters').required('Please enter the game name'),
    url: yup.string().max(255, 'URL should be maximum 255 characters').required('Please enter the game url'),
    image: yup
        .mixed()
        .required('Please select game image')
        .test(
            'filetype',
            'Only .jpg, .jpeg, .png files are supported',
            (value) => !value || (value && SUPPORTED_FILETYPES.includes(value.split('.').slice(-1)[0]))
        ),
    group: yup.string().required('Please select the game group'),
    description: yup.string().optional().max(255, 'Description should be maximum 255 characters')
});

export default gameSchema;
