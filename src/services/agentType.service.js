import { API_URL, InternalAPI } from 'services/common/constants';

async function create({ name, description }) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ROLE_NAME: name, DESCRIPTION: description })
    };
    try {
        const response = await fetch(`${API_URL}${InternalAPI.AGENT}`, requestOptions);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        return new Error(error);
    }
}

export default create;
