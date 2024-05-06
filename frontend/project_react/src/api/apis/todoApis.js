import instance from '../instance'

export const todoApis = {
    getAllTodo: () => instance.get('api/todo'),
}