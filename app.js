const cardDinamicas = document.getElementById('card-dinamicas')
const templateCard = document.getElementById('template-card').content

document.addEventListener("DOMContentLoaded", () => {
    fetchData();
});

const fetchData = async () => {
    try {

       loadingData(true)
       const res = await fetch("https://rickandmortyapi.com/api/character")
       const data = await res.json()
       pintarCards(data)
        
    } catch (error) {
        console.log(error)
        
    } finally {
        loadingData(false)

    }
}

const pintarCards = (data) => {
    const fragmento = document.createDocumentFragment()
    data.results.forEach(item => {
        const clone = templateCard.cloneNode(true)
        clone.querySelector('h5').textContent = item.name
        clone.querySelector('p').textContent = item.species
        clone.querySelector('img').src = item.image
        clone.querySelector('img').alt = item.name

        fragmento.appendChild(clone)  
    });
    cardDinamicas.appendChild(fragmento)
}

const loadingData = (estado) => {
    const loading = document.getElementById('Loading')
    if (estado === true) {
        loading.classList.remove("d-none")
    }else {
        loading.classList.add("d-none")
    }

}


