const carrito = document.querySelector('#carrito')
const template = document.querySelector('#template')
const botones = document.querySelectorAll('.btn')
const fragmento = document.createDocumentFragment()

const carritoBackend = []

const agregarACarritoBackend = (e) => {
    fruta = e.target.dataset.fruta
    const producto = {
        titulo:fruta ,
        cantidad: 1,
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
    carritoBackend.forEach((item) => {
        carrito.textContent = ''
        const clone = template.content.firstElementChild.cloneNode(true)
        clone.querySelector('.lead').textContent = item.titulo
        clone.querySelector('.badge').textContent = item.cantidad
        fragmento.appendChild(clone)
    })
    carrito.appendChild(fragmento)
}


botones.forEach((btn) => btn.addEventListener('click', agregarACarritoBackend))









