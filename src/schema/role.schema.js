import * as yup from 'yup';

const ROLENAME_REGEX = /^[A-Za-z][A-Za-z-_]+$/;

const roleSchema = yup.object().shape({
    name: yup
        .string()
        .matches(ROLENAME_REGEX, 'Agent type should start only with letters and contain only letters, dashes and underscores')
        .max(100, 'Role name should be maximum 100 characters')
        .required('Please enter the role name'),
    parentRole: yup.string().required('Please select parent role'),
    description: yup.string().optional().max(50, 'Role description should be maximum 50 characters')
});

export default roleSchema;
