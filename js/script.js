const host = 'http://127.0.0.1:8000'

window.addEventListener('DOMContentLoaded', () => {
    var todosContainer = document.querySelector('.todos-container')

    if (!todosContainer) {
        console.error('Element with class "todos-container" not found')
        return
    }

    function getTodos() {
        axios
            .get(`${host}/todo/`)
            .then((res) => {
                console.log(res.data)
                renderTodos(res.data.todos)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function renderTodos(todos) {
        todosContainer.innerHTML = '' // todo 초기화
        todos.forEach((todo) => {
            const todoDiv = document.createElement('div')
            todoDiv.classList.add('todo-item')
            todoDiv.textContent = todo.task
            todosContainer.appendChild(todoDiv)

            const deleteBtn = document.createElement('button')
            deleteBtn.classList.add('delete-btn')
            deleteBtn.textContent = 'X'

            deleteBtn.addEventListener('click', () => {
                deleteTodo(todo.id)
            })

            todoDiv.appendChild(deleteBtn)
        })
    }

    getTodos()

    const todoInput = document.querySelector('.todo-input')

    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo()
        }
    })

    function addTodo() {
        console.log('addTodo')
        const title = todoInput.value.trim()

        axios
            .post(`${host}/todo/`, {
                id: 0,
                task: title,
            })
            .then((res) => {
                console.log(res.data)
                todoInput.value = ''
                getTodos()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const deleteTodo = (todoId) => {
        axios
            .delete(`${host}/todo/${todoId}`)
            .then((res) => {
                console.log(res.data)
                getTodos()
            })
            .catch((err) => {
                console.log(err)
            })
    }
})
