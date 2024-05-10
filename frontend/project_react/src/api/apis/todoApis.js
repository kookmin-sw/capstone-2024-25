import instance from '../instance'

export const todoApis = {
    getAllTodo: () => instance.get('api/todo'),
    getNextTodo: (type) => instance.patch(`api/todo/next/${type}`),
    getPreviousTodo: (type) => instance.patch(`api/todo/previous/${type}`),
    postTodoClear: (type) => instance.post(`api/todo/${type}`),
}