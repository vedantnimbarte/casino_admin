import * as yup from 'yup';

const gameGroupSchema = yup.object().shape({
    name: yup.string().max(100, 'Name should be maximum 255 characters').required('Please enter the name of game group'),
    description: yup.string().optional().max(100, 'Description should be maximum 100 characters')
});

export default gameGroupSchema;
