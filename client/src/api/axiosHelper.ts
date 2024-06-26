import axios from 'axios';

const axiosHelper = async (url:string, method:string, formData = null, JSONData = null) => {
    const headers:any = {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    if (formData) {
        headers['Content-Type'] = 'multipart/form-data';
    }
    if (JSONData) {
        headers['Content-Type'] = 'application/json';
    }

    const response = await axios({
        method,
        url,
        data: formData || JSONData || null,
        headers,
    });
    return response;
};

export default axiosHelper;