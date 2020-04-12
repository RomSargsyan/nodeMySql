const Todo = require('../models/todo')

let users = [
    { name: 'Ani', email: 'ani@gmail.com', age: 21 },
    { name: 'Maria', email: 'mari@gmail.com', age: 19 }
]

module.exports = {
    test() {
        return {
            count: Math.trunc(Math.random() * 10),
            users
        }
    },
    random({ min, max, count }) {
        const arr = [];
        for (let i = 0; i < count; i++) {
            const random = Math.random() * (max - min) + min;
            arr.push(random)
        }
        return arr
    },
    addTestUser({ user }) {
        const newUser = {
            name: user.name,
            email: user.email,
            age: Math.ceil(Math.random() * 30)
        }

        users.push(user);
        return newUser
    },
    async getTodos() {
        try {
            return await Todo.findAll()
        } catch (e) {
            console.log(err)
        }
    },
    async addTodo({ todo }) {
        try {
            return await Todo.create({
                title: todo.title,
                done: false
            })
        } catch (err) {
            console.log(err)
        }
    },
    async removeTodo({id}) {
        try {
            const todos = await Todo.findAll({
                where: { id }
            })
            const todo = todos[0]
            await todo.destroy()
            return true

        } catch (err) {
            console.log(err)
        }
    },
    async updateTodo({ id }) {
        try {
            const todo = await Todo.findByPk(id)
            todo.done = true;
            await todo.save();
            return todo;
        } catch (err) {
            console.log(err);
        }

    }

}