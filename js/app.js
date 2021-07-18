//VARIABLES

const btnEnviar = document.querySelector('#enviar')

const inputEmail = document.querySelector('#email')

const inputAsunto = document.querySelector('#asunto')

const inputMensaje = document.querySelector('#mensaje')

const form = document.querySelector('#enviar-mail')

const btnDelete = document.querySelector('#resetBtn')

let arr = [inputEmail, inputAsunto, inputMensaje]

eventListeners()

function eventListeners() {

    addEventListener('DOMContentLoaded', iniciarApp)
    inputEmail.addEventListener('blur', validarFormulario)
    inputAsunto.addEventListener('blur', validarFormulario)
    inputMensaje.addEventListener('blur', validarFormulario)
    arr.forEach(item => item.addEventListener('blur', validarFormularios))
    btnEnviar.addEventListener('click', enviarFormulario)
    btnDelete.addEventListener('click', eliminarCampos)
}

//FUNCIONES

function iniciarApp() {

    btnEnviar.disabled = true
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')
}

function habilitarBotonDeEnviar() {

    btnEnviar.disabled = false

    btnEnviar.classList.add('form')

    btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50')
} 

function limpiarFormulario() {

    inputEmail.classList.remove('border', 'border-green-500')
    inputAsunto.classList.remove('border', 'border-green-500')
    inputMensaje.classList.remove('border', 'border-green-500')

    if(form.childElementCount === 6) {

    form.removeChild(form.children[5])
    inputEmail.classList.remove('border', 'border-red-500', 'border-green-500')
    inputAsunto.classList.remove('border', 'border-red-500', 'border-green-500')
    inputMensaje.classList.remove('border', 'border-red-500', 'border-green-500')
    }
}

//VALIDACIÓN DE FORMULARIO

function validarFormulario(e) {
    if(e.target.value.length > 0) {
        e.target.classList.add('border', 'border-green-500')  

    } else { 
        e.target.classList.add('border', 'border-red-500')
        mostrarError('Todos los campos son obligatorios')
    }

    if(e.target.type === 'email') {

        if(e.target.value.includes('@hotmail.com') 
        || e.target.value.includes('@gmail.com')) {

            e.target.classList.remove('border', 'border-red-500') 
            e.target.classList.add('border', 'border-green-500')
            if(form.childElementCount === 6 ) {

                form.removeChild(form.children[5])
            }
    
        } else {
           mostrarError('Por favor, pon un email válido')
            e.target.classList.remove('border', 'border-green-500')
            e.target.classList.add('border', 'border-red-500')
            
        }
    }

    if(e.target.type === 'text') {
        if(e.target.value.length < 5) {
            // mostrarError('Por favor, dinos tu consulta')
            e.target.classList.remove('border', 'border-green-500')
            e.target.classList.add('border', 'border-red-500')
            if(form.childElementCount === 6) {

                form.removeChild(form.children[5])
                mostrarError('Por favor, dinos tu consulta')

            } else {

                mostrarError('Por favor, dinos tu consulta')
            }
        } else {

            e.target.classList.remove('border', 'border-red-500') 
            e.target.classList.add('border', 'border-green-500')

            if(form.childElementCount === 6 ) {

                form.removeChild(form.children[5])
            }
        }
    }

    if(e.target.type === 'textarea') {
        if(e.target.value.length < 5) {

            // mostrarError('Por favor, cuentanos mas sobre tu consulta')
            e.target.classList.remove('border', 'border-green-500')
            e.target.classList.add('border', 'border-red-500')
            if(form.childElementCount === 6) {

                form.removeChild(form.children[5])
                mostrarError('Por favor, cuentanos mas sobre tu consulta')

            } else {

                mostrarError('Por favor, cuentanos mas sobre tu consulta')
            }
            
        } else {
            e.target.classList.remove('border', 'border-red-500') 
            e.target.classList.add('border', 'border-green-500')
            if(form.childElementCount === 6 ) {

                form.removeChild(form.children[5])
            }
        }
    }
}

//VALIDACIÓN DE FORMULARIOS

function validarFormularios (e) {
    
    let ultimo = arr[arr.length -1] 

    let elDelmedio = arr[Math.floor(arr.length / 2)]

    let primero = arr[0]
    
    arr.forEach( (item, index) => {

    item.addEventListener('blur', () => {

        if(ultimo.classList.contains('border-green-500') 
        && primero.classList.contains('border-green-500')
        && elDelmedio.classList.contains('border-green-500')) {

            let mensajeDeValidacion = document.createElement('p')

            mensajeDeValidacion.textContent = 'Información validada, puedes enviar tu mensaje'

            mensajeDeValidacion.style.color = 'rgba(72,187,120,var(--border-opacity))'
            
            mensajeDeValidacion.classList.add('border', 'border-green-500', 'background-green-100', 'text-green-100', 'p-3', 'mt-5', 'text-center', 'exito')

            let validacion = document.querySelectorAll('.exito')

            if(validacion.length === 0 ) {

                form.appendChild(mensajeDeValidacion)

            }

            let condicionForm = form.children[5] === mensajeDeValidacion

            if(condicionForm) {

               habilitarBotonDeEnviar()
            }                

        
            if(form.childElementCount === 7 ) {

                form.removeChild(form.children[5]) 
                condicionForm = form.children[5] === mensajeDeValidacion

                if(condicionForm) {
                    habilitarBotonDeEnviar()
                    }
                }
            }
        }) 
    })
}


//MUESTRA EL ERROR

function mostrarError(mensaje) {

    let mensajeDeError = document.createElement('p')

    mensajeDeError.textContent = mensaje

    mensajeDeError.style.color = 'rgb(245 101 101)'
    
    mensajeDeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-100', 'p-3', 'mt-5', 'text-center', 'error')

    let validacion = document.querySelectorAll('.error')

    if(validacion.length === 0) {

    form.appendChild(mensajeDeError)

    }

}

//ENVIAR FORMULARIO 

function enviarFormulario(e) {

    if(!e.target.disabled) {

        e.preventDefault()
        swal('Información enviada', 'Nos pondremos en contacto contigo en la brevedad', 'success')
    }

    form.reset()

    limpiarFormulario()

    iniciarApp()
}

//RESETEAR FORMULARIO

function eliminarCampos(e) {

    e.preventDefault()

    form.reset()

    limpiarFormulario()
}

