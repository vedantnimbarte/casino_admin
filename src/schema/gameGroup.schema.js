import * as yup from 'yup';

let gameGroupSchema = yup.object().shape({
    name: yup.string().max(100, 'Name should be maximum 255 characters').required('Please enter the name of game group'),
    description: yup.string().max(255, 'Description should be maximum 255 characters')
});

export default gameGroupSchema;
