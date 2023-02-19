Datos =
{
    EditandoCancion: {
        Nombre: "Homero",
        Autor: "Viejas Locas",
        Tempo: 110,
        Escala: "Sol",
        Partes: [
            {
                Nombre: "Intro",
                Acordes: ["Am", "F", "C", "G"],
                Repeticiones: 2
            },
            {
                Nombre: "Verso",
                Acordes: ["Am", "F", "C", "G"],
                Repeticiones: 2
            }],
        PartesCancion: [
            {
                Parte: 0,
                Texto: "",
                viendo_modo: 0
            },
            {
                Parte: 1,
                Texto: ["Cuando sale del trabajo", "homero viene pensando", "que al salir del colectivo esquivara", "unos autos"],                
                viendo_modo: 1
            },
            {
                Parte: 1,
                Texto: ["cruzara la avenida ", "se metera en el barrio","pasara dando saludos y", "monedas a unos vagos"],
                viendo_modo: 2
            }
        ]

    },
    message: 'Hello Eva!'
}


const { createApp } = Vue

createApp({
    data() {
        return Datos;
    }
}).mount('#app')