// Importación de sweetAlert


// Validación de los compos
const formRegisterPQRS = document.getElementById('formRegisterpqrs');
const buttonRegisterPQRS = document.getElementById('sendRegister');

const typeRequest = document.getElementById('request');
const campoEntidad = document.getElementById('entidad');

const email = document.getElementById('email');
const campoTel = document.getElementById('numberTel');
const campoAsunto = document.getElementById('asunto');

console.log(campoTel.textContent);

let validateFormRegister = {
    requisito : false,
    entidad : false,
    email : false,
    numberT : false,
    asunto : false
}

formRegisterPQRS.addEventListener('submit', (e)=>{
    e.preventDefault();
    validarForm();
});

typeRequest.addEventListener('change', (e)=>{
    if (e.target.value != 'select') validateFormRegister.requisito=true
    else validateFormRegister.requisito=false;
});
campoEntidad.addEventListener('change', (e)=>{
    if (e.target.value != 'select') validateFormRegister.entidad=true
    else validateFormRegister.entidad=false;
});

email.addEventListener('change', (e)=>{
    if(e.target.value.trim().length > 0) validateFormRegister.email=true
    else validateFormRegister.email=false;
});
campoTel.addEventListener('change', (e)=>{
    if(e.target.value.trim().length > 0) validateFormRegister.numberT=true
    else validateFormRegister.email=false;
});
campoAsunto.addEventListener('change', (e)=>{
    if(e.target.value.length > 0) validateFormRegister.asunto=true
    else validateFormRegister.email=false;
});


const validarForm = () =>{
    const formValues = Object.values(validateFormRegister);
    const valid = formValues.findIndex(value => value == false)
    if (valid == -1){
        formRegisterPQRS.submit();
        console.log('esperame, no envies a la db la info my doggy');
    }else{
        Swal.fire({
            icon: 'warning',
            title: 'No podemos enviar la solicutud',
            text: 'Por favor, llena todos los campos requeridos.',
        });
    }
}
