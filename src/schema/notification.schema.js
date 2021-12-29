import * as yup from 'yup';

const NOTIFICATION_TYPE = ['text', 'image', 'video'];
const SUPPORTED_FILETYPES = ['image/jpeg', 'image/png'];

const notificationSchema = yup.object().shape({
    type: yup
        .mixed()
        .oneOf([...NOTIFICATION_TYPE])
        .required('Please select notification type'),
    title: yup.string().max(255, 'Notification title shoule be maximum 255 characters').required('Please enter the notification title'),
    message: yup.string().max(1024, 'Message should be maximum 1024 characters').required('Please enter the notification message'),
    url: yup.string().when('type', {
        is: 'video',
        then: yup.string().url().max(255, 'Video URL should be maximum 255 characters').required('Please enter video url')
    }),
    image: yup.mixed().when('type', {
        is: 'image',
        then: yup
            .mixed()
            .required('Please select image')
            .test(
                'filetype',
                'Only .jpg, .jpeg, .png files are supported',
                (value) => !value || (value && SUPPORTED_FILETYPES.includes(value.type))
            )
    })
});

export default notificationSchema;
