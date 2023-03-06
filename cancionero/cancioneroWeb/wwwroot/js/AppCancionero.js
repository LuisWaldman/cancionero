import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
import micabecera from './controlador/micabecera.js'
import mirenglon from './controlador/mirenglon.js'
import micancion from './controlador/micancion.js'
import mimusico from './controlador/mimusico.js'
import mipianista from './controlador/mipianista.js'

import helperMusica from './util/helperMusica.js'

// Crea Datos
let Datos = {
    dataRecibida: '',
    CancionesDisponibles: cancionesDefault,
    EditandoCancion: {}
};


let ControladorCancionero = {
    calculartiempos: function (cancion)
    {
        /* primero incializo nro_cuarto */
        cancion.renglones.forEach(renglon => {
            renglon.acordes.forEach(compas => {
                compas.forEach(cuarto => {
                    cuarto.nro_cuarto = [];
                });
            });
        });

        cancion.compaces = 0;
        var termino = false;
        var recorriendorenglon = 0;

        var renglon_initrepeat = 0;
        var cont_renglon = 0;
        var recorriendorenglon = 0;
        while (!termino)
        {
            if (recorriendorenglon >= cancion.renglones.length) {
                termino = true;
            }
            else
            {
                var renglon = cancion.renglones[recorriendorenglon];
                if (renglon.tipo == 'musica') {
                    renglon.acordes.forEach(compas => {
                        if (compas[0].tipo == 'init') {
                            renglon_initrepeat = recorriendorenglon;
                        }
                        else if (compas[0].tipo == 'repeat') {
                            if (!compas[0].repeticionescuenta)
                                compas[0].repeticionescuenta = compas[0].repetir;
                            compas[0].repeticionescuenta--;

                            if (compas[0].repeticionescuenta > 0) {
                                recorriendorenglon = renglon_initrepeat - 1;
                            }
                        }
                        else {

                            compas.forEach(cuarto => {
                                cuarto.nro_cuarto.push(cancion.compaces);
                                cancion.compaces++;
                            });
                        }

                    });
                }
                else
                {
                 

                }
                recorriendorenglon++;

            }

        }
        return cancion;
    },
    cargarcancion: function (cancion)
    {
        
        var ret = {
            nombre: cancion.nombre,
            tempo: cancion.tempo,
            escala: cancion.escala,
            sonandocuarto: 0,
            sonando: false,
            renglones: [],
        }
        
        cancion.renglones.forEach(texto =>
        {
            ret.renglones.push(helperMusica.textotoarenglon(texto));
        });
        this.calculartiempos(ret);

        //let v = helperMusica.cargarcancion(cancion);

        return ret;

    },
    guardarcancion: function (cancion)
    {
        var ret = {
            nombre: cancion.nombre,
            tempo: cancion.tempo,
            escala: cancion.escala,
            renglones: [],
        }

        cancion.renglones.forEach(renglon =>
        {
            ret.renglones.push(renglon.acordesentexto);
        });

        return ret;

    }
}

var cancion = {
    tempo: 60,
    nombre: "nueva",
    renglones: [
        "DO RE x3",
        "UNA CANCIOn",
        "SIMPLE PARA PODER",
        "TOCAR TRANQUI",
    ]
};
/*
cancion = {
    tempo: 111,
    nombre: "solo c",
    renglones: [
            "C",
        ]
};*/

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

    let app = createApp(
        {
            created: function () {
                Datos.EditandoCancion = ControladorCancionero.cargarcancion(cancion);
            },
            methods: {
                event_cancioneditada: function ()
                {
                    Datos.EditandoCancion = ControladorCancionero.calculartiempos(Datos.EditandoCancion);
                    this.$forceUpdate();
                },

                guardarcancion: function ()
                {
                    var editCan = ControladorCancionero.guardarcancion(Datos.EditandoCancion);
                    console.log(JSON.stringify(editCan));
                },



                event_cargocancion: function (cancion)
                {
                    Datos.EditandoCancion = ControladorCancionero.cargarcancion(cancion);
                    this.$forceUpdate();
                }
            },
            data() {
                return Datos;
            }
    });


    app.component('micabecera', micabecera);
    app.component('mirenglon', mirenglon);
    app.component('micancion', micancion);
    app.component('mipianista', mipianista);
    app.component('mimusico', mimusico);
    
    app.mount('#app');


}


$(function () {

    cargarAplicacion();


});


