const alerta = document.querySelector('div .alert-danger')
const formulario = document.getElementById('formulario')
const elementos = document.getElementById('elementos')
const templateTodo = document.getElementById('templateTodo').content

let todos=[]


document.addEventListener('click', e => {
    if (e.target.matches('.btn-danger')) {
        todos = todos.filter(item => item.id !== e.target.dataset.id)
        pintarTodos()
    }
})

formulario.addEventListener('submit', (e) =>{
    e.preventDefault()
    alerta.classList.add('d-none')
    const datos = new FormData(formulario)
    const [todo] = [...datos.values()]

    if (!todo.trim()) {
        alerta.classList.remove('d-none')
        return
    }

    agregarTodo(todo)
    pintarTodos()
})

const agregarTodo = todo => {
    objetoTodo = {
        nombre: todo,
        id:`${Date.now()}` 
    }

    todos.push(objetoTodo)
}

const pintarTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos))

    elementos.textContent = ""
    const fragmento = document.createDocumentFragment()

    todos.forEach(item => {
        const clone = templateTodo.cloneNode(true)
        clone.querySelector('p').textContent = item.nombre
        clone.querySelector('.btn').dataset.id = item.id
        fragmento.appendChild(clone)
    })

    elementos.appendChild(fragmento)
}

document.addEventListener('DOMContentLoaded', () =>{
    if (localStorage.getItem('todos')) {
        todos = JSON.parse(localStorage.getItem('todos'))
        pintarTodos()
    }
})