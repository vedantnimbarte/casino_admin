import * as yup from 'yup';

const loyaltyPointsSchema = yup.object().shape({
    level: yup.string().required('Please enter loyalty level'),
    pointsNeeded: yup.string().required('Please enter points needed for loyalty level'),
    multiplier: yup.number('Multiplier should be a number').required('Please enter multiplier for loyalty level'),
    wageringValue: yup.string().required('Please enter wagering value')
});

export default loyaltyPointsSchema;
