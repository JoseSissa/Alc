const botonObtenerRegistros = document.getElementById('botonObtenerRegistros');
const registersBody = document.getElementById('registersBody');

botonObtenerRegistros.addEventListener('click', async (req, res)=>{
    try {
        const response = await axios.get('/peticionRegistros');
        console.log(response.data);
        const fragment = document.createDocumentFragment();
        for (const data of response.data){
            const fila = document.createElement('tr');
            for (let index = 2; index < Object.values(data).length; index++) {
                const column = document.createElement('td');
                column.textContent = Object.values(data)[index];
                column.setAttribute('class', 'column');
                fila.appendChild(column);
            };
            fragment.appendChild(fila);
        };
        registersBody.appendChild(fragment);
    } catch (error) {
        console.log(error);
    };
});