import * as yup from 'yup';

const roleSchema = yup.object().shape({
    name: yup.string().max(100, 'Role name should be maximum 100 characters').required('Please enter the role name')
});

export default roleSchema;
