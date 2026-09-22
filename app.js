document.addEventListener("DOMContentLoaded", () => {
    dataDinamic();
});

const templateCard = document.getElementById("templateCard").content
const cardDinamic = document.getElementById('cardDinamic')
const contenedorPaginacion = document.querySelector('footer')


let url = 'https://rickandmortyapi.com/api/character'
let urlNext = null
let urlPrev = null

const controlarPaginacion = () => {
    const btnAtras = contenedorPaginacion.querySelector('[data-accion="volver"]');
    const btnSiguiente = contenedorPaginacion.querySelector('[data-accion="siguiente"]');
    btnAtras.classList.toggle('d-none', urlPrev === null);
    btnSiguiente.classList.toggle('d-none', urlNext === null)
}

document.addEventListener ('click' , (e) => {

    
    const boton = e.target.closest('button')
    if (!boton) {
        return
    }else{
        const accion = boton.dataset.accion
        if (accion === "siguiente") {
            pasarSiguiente()
        }else{volver()}
    }
})

const pasarSiguiente = () => {
    if (!urlNext) return;
    url = urlNext
    dataDinamic()
}

const volver = () => {
    if(!urlPrev)return;
    url = urlPrev
    dataDinamic()
}

const dataDinamic = async () => {
    try {
        cargando(true)
        const res = await fetch(url)
        const data = await res.json()
        urlNext = data.info.next
        urlPrev = data.info.prev
        pintarCard(data)
        
    } catch (error) {
        console.log(error)
    }finally{
        cargando(false)
    }
}

const pintarCard = (data) => {
    cardDinamic.textContent = ""
    const fragmento = document.createDocumentFragment()
    data.results.forEach(item => {
        const clone = templateCard.cloneNode(true)
        clone.querySelector("h5").textContent = item.name
        clone.querySelector("p").textContent = item.species
        clone.querySelector("img").src = item.image
        fragmento.appendChild(clone)
    });
    cardDinamic.appendChild(fragmento)
    controlarPaginacion()
}

const cargando = (estado) => {
    const spiner = document.getElementById('spiner')
    if (estado === true) {
        spiner.classList.remove('d-none')
    }else{
        spiner.classList.add('d-none')
    }
}


