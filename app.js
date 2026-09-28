const formulario = document.getElementById('form')
const columnaEstudiantes = document.getElementById('columnaEstudiantes')
const columnaProfesores = document.getElementById('columnaProfesores')
const templateEstudiante = document.getElementById('cardEstudiante').content
const templateProfesor = document.getElementById('cardProfesores').content
const alert = document.querySelector(".alert")


const profesores = []
const estudiantes = []


document.addEventListener('click', (e)=>{
    if(e.target.dataset.uid){
        if(e.target.matches('.btn-success')){
            estudiantes.map(item => {
                if(e.target.dataset.uid === item.uid){
                    item.setEstado = true
                }
                return item
            })
        }
        if(e.target.matches('.btn-danger')){
            estudiantes.map(item => {
                if(e.target.dataset.uid === item.uid){
                    item.setEstado = false
                }
                return item
            })
        }
        Persona.pintarPersonas("Estudiante")
    }
    

})

formulario.addEventListener('submit', (e)=>{
    e.preventDefault()
    const data = new FormData(formulario)
    const [nombre, edad, rol] = [...data.values()]

    if(!nombre.trim() || !edad.trim() || !rol.trim()){
        alert.classList.remove('d-none')
    }else{
        alert.classList.add('d-none')
    }

    if(rol === "Profesor"){
        const profesor = new Profesor(nombre,edad)
        profesores.push(profesor)
        Persona.pintarPersonas(rol)
    }

    if (rol === "Estudiante") {
        const estudiante = new Estudiante(nombre,edad)
        estudiantes.push(estudiante)
        Persona.pintarPersonas(rol)
        
    }
    
})




class Persona{
    constructor(nombre, edad){
        this.nombre = nombre
        this.edad = edad 
        this.uid = `${Date.now()}`
    }
    


    static pintarPersonas(rol){
        if (rol === "Profesor") {
            columnaProfesores.textContent = ""
            const fragmento = document.createDocumentFragment()
            profesores.forEach(item => {
                fragmento.appendChild(item.nuevoProfesor())
        })
        columnaProfesores.appendChild(fragmento)
        }

        if (rol === "Estudiante"){
            columnaEstudiantes.textContent = ""
            const fragmento = document.createDocumentFragment()
            estudiantes.forEach(item => {
                fragmento.appendChild(item.nuevoEstudiante())
            })
        columnaEstudiantes.appendChild(fragmento)
        }
    }
}

class Estudiante extends Persona{
    #rol = "Estudiante"
    #estado = false
    

    set setEstado(estado){
        this.#estado = estado
    }

    get getRol(){
        return this.#rol
    }

    nuevoEstudiante(){
        const clone = templateEstudiante.cloneNode(true)
        clone.querySelector('h5 .text-primary').textContent = this.nombre
        clone.querySelector('h6').textContent = this.getRol
        clone.querySelector('.lead').textContent = this.edad
        clone.querySelector('.btn-success').dataset.uid = this.uid
        clone.querySelector('.btn-danger').dataset.uid = this.uid

        if(this.#estado){
            clone.querySelector('.btn-success').disabled = true;
            clone.querySelector('.btn-danger').disabled = false;
        }else{
            clone.querySelector('.btn-danger').disabled = true;
            clone.querySelector('.btn-success').disabled = false;
        }


        clone.querySelector('.badge').textContent = this.#estado ?"Aprobado" : "Reprobado"
        clone.querySelector('.badge').className = this.#estado ?"bg-success badge " : "bg-danger badge"
        
        
        return clone
    }
}

class Profesor extends Persona{
    #rol = "Profesor"

    get getRol(){
        return this.#rol
    }

    nuevoProfesor(){
        const clone = templateProfesor.cloneNode(true)
        clone.querySelector('h5').textContent = this.nombre
        clone.querySelector('h6').textContent = this.getRol
        clone.querySelector('.lead').textContent = this.edad
        return clone
    }
    
}
