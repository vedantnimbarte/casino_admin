import * as yup from 'yup';

const FAQSchema = yup.object().shape({
    question: yup.string().max(255, 'Question should be maximum 255 characters').required('Please enter the question'),
    answer: yup.string().max(255, 'Answer should be maximum 255 characters').required('Please enter the answer')
});

export default FAQSchema;
