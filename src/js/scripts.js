// Validación del formulario register

const formRegisterPQRS = document.getElementById('formRegisterpqrs');
const buttonRegisterPQRS = document.getElementById('sendRegister');

const typeRequest = document.getElementById('request');
const entidad = document.getElementById('entidad');

const email = document.getElementById('email');
const numberTel = document.getElementById('numberTel');
const asunto = document.getElementById('asunto');

const validateFormRegister = {
    request = false,
    entidad = false,
    email = false,
    numberT = false,
    asunto = false
}

formRegisterPQRS.addEventListener('submit', (e)=>{
    e.preventDefault();
    validarForm();
});

typeRequest.addEventListener('change', (e)=>{
    if (e.target.value != 'select') validateFormRegister.request=true
    else validateFormRegister.request=false;
});
entidad.addEventListener('change', (e)=>{
    if (e.target.value != 'select') validateFormRegister.entidad=true
    else validateFormRegister.entidad=false;
});

email.addEventListener('change', (e)=>{
    if(e.target.value.trim().length > 0) validateFormRegister.email=true
    else validateFormRegister.email=false;
});
numberT.addEventListener('change', (e)=>{
    if(e.target.value.trim().length > 0) validateFormRegister.numberT=true
    else validateFormRegister.email=false;
});
asunto.addEventListener('change', (e)=>{
    if(e.target.value.length > 0) validateFormRegister.asunto=true
    else validateFormRegister.email=false;
});


const validarForm = () =>{
    const formValues = Object.values(validateFormRegister);
    const valid = formValues.findIndex(value => value == false)
    if (valid == -1){
        formRegisterPQRS.submit();
    }else{
        alert('Llena todos los campos por favor.');
    }
}