import * as yup from 'yup';

const gamingPackSchema = yup.object().shape({
    name: yup.string().max(50, 'Pack name should be maximum 100 characters only').required('Please enter pack name'),
    coins: yup.number().required('Please enter coins amount'),
    diamonds: yup.number().required('Please enter diamonds amount'),
    price: yup.number().required('Please enter price'),
    discount: yup.string().required('Please select the discount'),
    percentage: yup.number().when('discount', { is: 'true', then: yup.number().required('Please enter the discount percentage') })
});

export default gamingPackSchema;
