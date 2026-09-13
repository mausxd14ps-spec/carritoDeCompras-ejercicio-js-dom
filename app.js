const formulario = document.getElementById("formulario")
const userName = document.getElementById('userName')
const userEmail = document.getElementById('userEmail')

const regUserName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
const regUserEmail = /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/;

const alertSuccess = document.getElementById("alertSuccess");
const alertName = document.getElementById("alertName");
const alertEmail = document.getElementById("alertEmail");

formulario.addEventListener("submit", (e) => {
    const Errores = []

    e.preventDefault()
    alertSuccess.classList.add("d-none")

    if (!regUserName.test(userName.value) || !userName.value.trim()) {
        userName.classList.add("is-invalid")
        Errores.push({
            tipo:alertName,
            msg: "Solo escriba letras"
        })
    }else{
        userName.classList.remove("is-invalid")
        userName.classList.add("is-valid")
        alertName.classList.add("d-none")
    }

    if (!regUserEmail.test(userEmail.value) || !userEmail.value.trim()) {
        userEmail.classList.add("is-invalid")
        Errores.push({
            tipo:alertEmail,
            msg: "Escriba un correo valido"
        })
    }else{
        userEmail.classList.remove("is-invalid")
        userEmail.classList.add("is-valid")
        alertEmail.classList.add("d-none")
    }

    if (Errores.length !== 0) {
        mostrarMsgError(Errores)
    }else{
        mostrarMsgExito()
    }
    
})

const mostrarMsgExito = () => {
    alertSuccess.classList.remove("d-none")
    alertSuccess.textContent = "Mensaje enviado con éxito"
}

const mostrarMsgError = (Errores) => {
    Errores.forEach(error => {
        error.tipo.classList.remove("d-none")
        error.tipo.textContent = error.msg
    });
}


