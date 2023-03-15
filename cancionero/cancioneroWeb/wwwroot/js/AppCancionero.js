﻿import { createApp } from './vueesm.js'
import micabecera from './controlador/micabecera.js'
import mirenglon from './controlador/mirenglon.js'
import micancion from './controlador/micancion.js'
import mimusico from './controlador/mimusico.js'
import mipianista from './controlador/mipianista.js'
import mibaterista from './controlador/mibaterista.js'
import minota from './controlador/minota.js'

import minotaedit from './controlador/minotaedit.js'

import cancionesAdmin from './controlador/CancionesAdmin.js'

import helperMusica from './util/helperMusica.js'

// Crea Datos
let Datos = {
    dataRecibida: '',
    CancionesDisponibles: [],
    EditandoCancion: {},
    Musicos: []
};
function GetBaterista() {
    var ret =
    {

        tipo: 'baterista',
        instrumento_id: 117,
        notas: [],
        tempo: 100,
        canal: 1,
        volumen: 127,
        tocandobeat: 4,
        tocando: false,
        tocandointervalId: null,
        bateria_cargada: false,
        viendo: false,
    }


    ret.notas.push(helperMidi.getNotaMusico(24));
    ret.notas.push(helperMidi.getNotaMusico(51));
    ret.notas.push(helperMidi.getNotaMusico(42));
    ret.notas.push(helperMidi.getNotaMusico(84));

    return ret;
}


function GetPianista() {
    var ret =
    {

        tipo: 'pianista',
        instrumento_id: 0,
        notas: [],
        tempo: 100,
        canal: 2,
        volumen: 127,
        tocandobeat: 4,
        tocando: false,
        tocandointervalId: null,
        bateria_cargada: false,
        viendo: false,
    }


    for (var i = 33; i <= (33 + (12 * 3)); i++) {
        ret.notas.push(helperMidi.getNotaMusico(i));
    }
    return ret;
}
Datos.Musicos.push(GetBaterista());
/*
for (var i = 33; i <= 33 + (12 * 3); i++) {
    Datos.Musicos[0].notas.push(helperMidi.getNotaMusico(i));
}*/


/*
 Notas Baterista
*/


let cancionesLocales = JSON.parse(localStorage.getItem('misCanciones'));
if (!cancionesLocales) {
    cancionesLocales = cancionesDefault;
}
Datos.CancionesDisponibles = cancionesLocales;

let ControladorCancionero = {
    calcularletra: function (cancion) {
 
        var id_musicas = [];
        var bucle_completo = [];
        var nro_renglon = 0;
        cancion.renglones.forEach(renglon =>
        {
            renglon.nro_renglon = nro_renglon;
            nro_renglon++;
            renglon.id_musica = -1;
            if (renglon.tipo == 'musica') {
                if (renglon.esInicio) {

                    id_musicas = [];
                    bucle_completo = [];
                }
                id_musicas.push(renglon.nro_renglon);
                bucle_completo.push(renglon.nro_renglon);
                if (renglon.repite > 1) {
                    for (var i = 0; i < (renglon.repite - 1); i++) {
                        for (var e in bucle_completo)
                            id_musicas.push(bucle_completo[e]);
                    }
                }
            }
            else
            {
                if (id_musicas.length > 0)
                {
                    let id = id_musicas.shift();
                    renglon.id_musica = id;

                    var renglonmusical = cancion.renglones[renglon.id_musica];

                    if (!renglonmusical.repeticiones)
                        renglonmusical.repeticiones = 0;

                    var repes = cancion.renglones[id].repeticiones;

                    var primeracorde = renglonmusical.acordes[0];
                    if (!primeracorde[0].nro_cuarto)
                        primeracorde = renglonmusical.acordes[1];
                    if (primeracorde[0].nro_cuarto.length == 0)
                        primeracorde = renglonmusical.acordes[1];

                    var ultimoacorde = renglonmusical.acordes[renglonmusical.acordes.length - 1];
                    if (ultimoacorde[3].nro_cuarto.length == 0)
                        ultimoacorde = renglonmusical.acordes[renglonmusical.acordes.length - 2];
                    if (primeracorde)
                        renglon.desdecuarto = primeracorde[0].nro_cuarto[repes];
                    var ultimocuarto = ultimoacorde[3].nro_cuarto;
                    renglon.hastacuarto = ultimocuarto[repes];



                    renglonmusical.repeticiones++;
                    cancion.renglones[renglon.id_musica] = renglonmusical;
                    
                }

            }
        });



    },
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
        
        var renglon_initrepeat = 0;
        var cont_renglon = 0;
        var recorriendorenglon = 0;
        var initAsignado = false;
        
        while (!termino)
        {
            if (recorriendorenglon >= cancion.renglones.length) {
                termino = true;
            }
            else
            {
                var renglon = cancion.renglones[recorriendorenglon];
                if (renglon.tipo == 'musica') {
                    renglon.acordes.forEach(compas =>
                    {
                        if (!initAsignado)
                        {
                            renglon_initrepeat = recorriendorenglon;
                            initAsignado = true;

                        }
                        if (compas[0].tipo == 'init')
                        {
                            renglon_initrepeat = recorriendorenglon;
                            initAsignado = true;
                        }
                        else if (compas[0].tipo == 'repeat')
                        {
                            if (!compas[0].repeticionescuenta)
                                compas[0].repeticionescuenta = compas[0].repetir;
                            compas[0].repeticionescuenta--;
                            if (compas[0].repeticionescuenta > 0) {
                                recorriendorenglon = renglon_initrepeat - 1;
                            }
                            else {
                                initAsignado = false;
                            }
                        }
                        else
                        {

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
            banda: cancion.banda,
            tempo: cancion.tempo,
            sonandocuarto: 0,
            sonando: false,
            renglones: [],
        }

        var recorriendorenglon = 0;
        var empezo = false;


        cancion.renglones = cancion.renglones.flatMap(cadena => cadena.split('\n'));
        cancion.renglones.forEach(texto =>
        {
            var renglon = helperMusica.textotoarenglon(texto);
            renglon.esInicio = false;
            renglon.repite = 0;
            if (ret.tono == undefined)
            {
                if (renglon.tipo == 'musica') {

                    console.log("MUSIA");
                    var primeracorde = renglon.acordes[0];
                    var segundo = renglon.acordes[1];

                    if (primeracorde[0].tipo == 'init') {
                        primeracorde = segundo;
                    }

                    ret.tono = primeracorde[0];

                }
            }

            if (renglon.tipo == 'musica')
            {
                var primeracorde = renglon.acordes[0];
                var ultimoacorde = renglon.acordes[renglon.acordes.length - 1];

                if (!empezo) {
                    renglon.esInicio = true;
                    empezo = true;
                }
                if (primeracorde[0].tipo == 'init')
                {
                    renglon.esInicio = true;
                }
                if (ultimoacorde[0].tipo == 'repeat') {

                    renglon.repite = ultimoacorde[0].repetir;
                    empezo = false;
                }

            }


            renglon.nro_renglon = recorriendorenglon;
            recorriendorenglon++;



            ret.renglones.push(renglon);
        });


        this.calculartiempos(ret);
        this.calcularletra(ret);

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
    tempo: 100,
    nombre: "Nueva",
    renglones: [
        "A Bm D7 C/B",
        "Una cancion"
    ]

};

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
            methods:
            {
                event_cancioneditada: function ()
                {
                    let c = ControladorCancionero.calculartiempos(Datos.EditandoCancion);
                    ControladorCancionero.calcularletra(c);
                    Datos.EditandoCancion = c;
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
                },
                event_sonandocuarto: function (sonando)
                {
                    this.$refs.micancionComponent.sonandocuarto(sonando);
                }
            },
            data() {
                return Datos;
            }
    });
    
    app.component('minota', minota);
    app.component('minotaedit', minotaedit);
    app.component('cancionesadmin', cancionesAdmin);
    app.component('micabecera', micabecera);
    app.component('mirenglon', mirenglon);
    app.component('micancion', micancion);
    app.component('mipianista', mipianista);
    app.component('mibaterista', mibaterista);
    app.component('mimusico', mimusico);
    
    app.mount('#app');


}


$(function () {

    cargarAplicacion();


});


