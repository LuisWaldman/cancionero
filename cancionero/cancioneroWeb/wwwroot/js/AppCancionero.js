import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
import micabecera from './controlador/micabecera.js'
import mirenglon from './controlador/mirenglon.js'
import micancion from './controlador/micancion.js'
import helperMusica from './util/helperMusica.js'

// Crea Datos
let Datos = {
    dataRecibida: '',
    EditandoCancion:
    {
        Nombre: "Cancion Nueva",
        Autor: "Usuario",
        Tempo: 100,
        Escala: "C",
        Renglones: [
            { 

                AcordesTexto: "a b !c d! e",
                AcordePorCuarto: ["a", "", "", "", "b", "", "", "", "c", "", "d", "", "e", "", "", ""],
                AcordesMusica: [],
                Instrucciones: [],
                Letra: "Uno vive lleno de esperanzas "
            },
            {
                AcordesTexto: "Cm ,F G7, C C7",
                AcordesMusica: [],
                Instrucciones: [],
                Letra: "Uno vive lleno de esperanzas "
            }],

        renglones:
            [
                {
                    acordesentexto: "",
                    acordes: [],
                }

            ]
    }
};


let ControladorCancionero = {
    cargar_cancion: function (cancion) {
        var ret = {
            tempo: 120,
            renglones: [],
        }
        
        cancion.renglones.forEach(texto => {
            ret.renglones.push(helperMusica.textotoarenglon(texto));
        });

        return ret;

    }
}

var cancion = {
    tempo: 120,
    renglones: [
        "C F G C",
        "sarasa",
        "pedrito ",
        "(C !F G! C x4",
        "un texto de cancion",
        "con alguna rima si queres",
        "sarasa",
        "pedrito ",
        "(c f *3",
        "mas palabras que sonn",
        "en realidad txto cualquiera"
    ]
};

Datos.EditandoCancion = ControladorCancionero.cargar_cancion(cancion);

async function cargarAplicacion() {
    const templates = document.querySelectorAll('.templatevue');

    const promesas = Array.from(templates).map(async (template) => {
        const id = template.id;
        const url = "template/" + id + ".html";
        const respuesta = await fetch(url);

        if (respuesta.ok) {
            const html = await respuesta.text();
            template.innerHTML = html;
        } else {
            console.error(`Error al cargar el template ${id}`);
        }
    });

    await Promise.all(promesas);

    console.log('Todos los templates han sido cargados');

    let app = createApp({
        data() {
            return Datos;
        }
    });


    app.component('micabecera', micabecera);
    app.component('mirenglon', mirenglon);
    app.component('micancion', micancion);

    app.mount('#app');


}


$(function () {

    cargarAplicacion();


});


