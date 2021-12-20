const botonObtenerRegistros = document.getElementById('botonObtenerRegistros');

botonObtenerRegistros.addEventListener('click', async ()=>{
    console.log('ENTRÉ AL ADDEVENTLISTENER');
    await axios({
        method: 'get',
        url: '/prueba'
    })
    .then((res)=>{
        console.log(res);
    });
});