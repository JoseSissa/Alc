const botonObtenerRegistros = document.getElementById('botonObtenerRegistros');
const registersBody = document.getElementById('registersBody');

botonObtenerRegistros.addEventListener('click', async (req, res)=>{
    try {
        const response = await axios.get('/prueba');
        console.log(response.data);
        const fragment = document.createDocumentFragment();
        for (const data of response.data){
            const fila = document.createElement('tr');
            for (let index = 2; index < Object.values(data).length; index++) {
                const column = document.createElement('td');
                column.textContent = Object.values(data)[index];
                fila.appendChild(column);
            };
            fragment.appendChild(fila);
        };
        registersBody.appendChild(fragment);
        // FALTA AGREGAR LOS ESTILOS GG IZI
    } catch (error) {
        console.log(error);
    };
    // axios({
    //     method: 'GET',
    //     url: '/prueba',
    // })
    // .then((res)=>{
    //     console.log(res.data);
    // })
    // .catch((error)=>{
    //     console.log(error);
    // })
});