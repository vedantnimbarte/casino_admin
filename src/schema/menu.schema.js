import * as yup from 'yup';

const menuSchema = yup.object().shape({
    name: yup.string().required('Please enter menu name'),
    slug: yup.string().required('Please enter the menu url')
});

export default menuSchema;
