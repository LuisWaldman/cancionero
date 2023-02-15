Datos =
{
    EditandoCancion: {
        Nombre: "Homero",
        Autor: "Viejas Locas",
        Tempo: 110,
        Escala: "Sol"
    },
    message: 'Hello Eva!'
}


const { createApp } = Vue

createApp({
    data() {
        return Datos;
    }
}).mount('#app')