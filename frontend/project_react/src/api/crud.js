import instance from "./instance";

/** get요청을 try-catch로 감싼 함수
 * @param {string} url - 요청할 url
 * @param {object} config - 쿼리 parameter등을 담은 객체
 */
export const api_get = async (url, config) => {
    try {
        return await instance.get(url, config);
    } catch (error) {
        throw new Error('[API GET Error]', error);
    }
}

/** post요청을 try-catch로 감싼 함수
 * @param {string} url - 요청할 url
 * @param {object} data - post할 객체
 * @param {object} config - 쿼리 parameter등을 담은 객체
 */
export const api_post = async (url, data, config) => {
    try {
        return await instance.post(url, data, config);
    } catch (error) {
        throw new Error('[API POST Error]', error);
    }
}

/** patch요청을 try-catch로 감싼 함수
 * @param {string} url - 요청할 url
 * @param {object} data - patch(수정)할 객체
 * @param {object} config - 쿼리 parameter등을 담은 객체
 */
export const api_patch = async (url, data, config) => {
    try {
        return await instance.patch(url, data, config);
    } catch (error) {
        throw new Error('[API PATCH Error]', error);
    }
}

/** delete요청을 try-catch로 감싼 함수
 * @param {string} url - 요청할 url
 * @param {object} config - 쿼리 parameter등을 담은 객체
 */
export const api_delete = async (url, config) => {
    try {
        return await instance.delete(url, config);
    } catch (error) {
        throw new Error('[API DELETE Error]', error);
    }
}