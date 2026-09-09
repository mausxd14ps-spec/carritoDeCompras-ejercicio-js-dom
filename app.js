const carrito = document.querySelector('#carrito')
const template = document.querySelector('#template')
const footer = document.querySelector('#footer')
const templateFooter = document.querySelector('#templateFooter')
const fragmento = document.createDocumentFragment()

document.addEventListener('click', (e) => {
    if (e.target.matches('.card .btn-outline-primary')) {
        agregarACarritoBackend(e)}
    if (e.target.matches('.d-flex .btn-success')){
        btnAumentar(e)
    }
    if (e.target.matches('.d-flex .btn-danger')){
        btnQuitar(e)
    }
})

let carritoBackend = []

const agregarACarritoBackend = (e) => {
    fruta = e.target.dataset.fruta
    const producto = {
        titulo:fruta ,
        cantidad: 1,
        precio: parseInt(e.target.dataset.precio)
    }
    
    indice = carritoBackend.findIndex((item) => item.titulo === fruta)
    
    if (indice === -1) {
        carritoBackend.push(producto)
    }else{
        carritoBackend[indice].cantidad++
    }
    
    
    pintarcarrito()
}

const pintarcarrito = () => {
    carrito.textContent = ''
    carritoBackend.forEach((item) => {
        const clone = template.content.cloneNode(true)
        clone.querySelector('.text-white .lead').textContent = item.titulo
        clone.querySelector('.badge').textContent = item.cantidad
        clone.querySelector('div .lead span').textContent = item.precio * item.cantidad
        clone.querySelector('.btn-danger').dataset.id = item.titulo
        clone.querySelector('.btn-success').dataset.id = item.titulo
        fragmento.appendChild(clone)
    })
    carrito.appendChild(fragmento)
    pintarFooter()
}

const pintarFooter = () => {
    footer.textContent = ''
    const Total = carritoBackend.reduce((acc, current) => acc + current.precio * current.cantidad, 0)
    console.log(Total)
    const clone = templateFooter.content.cloneNode(true)
    clone.querySelector('span').textContent = Total
    if (clone.querySelector('span').textContent > 0){
        footer.appendChild(clone)
    }
}

const btnAumentar = (e) => {
    carritoBackend = carritoBackend.map(item => {
        if (item.titulo === e.target.dataset.id) {
            item.cantidad++
        }
        return item
    })
    pintarcarrito()
}

const btnQuitar = (e) => {
    carritoBackend = carritoBackend.filter(item => {
        if (item.titulo === e.target.dataset.id && item.cantidad > 0){
                item.cantidad--
                if (item.cantidad === 0) return
                return item
        }else {return item}
    })
    pintarcarrito()
}












