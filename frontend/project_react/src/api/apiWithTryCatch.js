import instance from "./instance";

// get요청을 try-catch로 감싼 함수
export const api_get = async (url, config) => {
    try {
        const response = await instance.get(url, config);
        return response;
    } catch (error) {
        console.error(error);
    }
}

// post요청을 try-catch로 감싼 함수
export const api_post = async (url, data, config) => {
    try {
        const response = await instance.post(url, data, config);
        return response;
    } catch (error) {
        console.error(error);
    }
}

// put요청을 try-catch로 감싼 함수
export const api_patch = async (url, data, config) => {
    try {
        const response = await instance.patch(url, data, config);
        return response;
    } catch (error) {
        console.error(error);
    }
}

// delete요청을 try-catch로 감싼 함수
export const api_delete = async (url, config) => {
    try {
        const response = await instance.delete(url, config);
        return response;
    } catch (error) {
        console.error(error);
    }
}