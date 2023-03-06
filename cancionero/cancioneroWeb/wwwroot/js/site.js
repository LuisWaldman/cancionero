
//https://galactic.ink/midi-js/

Datos =
{
    indice: [],
    editandoAcordes: false,

    viendoinstrumento: false,
    tocandocompas: 0,
    totalcompas: 0,
    EditandoCancion: {
        Nombre: "antologia",
        Autor: "shakira",
        Tempo: 60,
    },
    octavas: [1, 2, 3, 4, 5, 6, 7, 8],
    notas: ["LA", "LA#", "SI", "DO", "DO#", "RE", "RE#", "MI", "FA", "FA#", "SOL", "SOL#"],
    activeBeat: 0,
    intervalId: null,


    canalbateria: 10,
    canalpiano: 1,
    canalprueba: 15,
    instrumentos: DataInstrumentos,
    estado_cargainstrumento: "",
    cargaInstrumentoId: 0,
    baterista: {
        tocandobeat: 4,
        tocando: false,
        tocandointervalId: null,
        bateria_cargada: false,

        instrumentos: [
            { numero: 21, beat: [true, true, true, true] },
            { numero: 51, beat: [false, false, false, false] },
            { numero: 42, beat: [false, false, false, false] },
            { numero: 85, beat: [false, false, false, true] }
        ],

        viendo: false,
    },

    pianista: elPianista,


    bajista: {
        tocandobeat: 0,
        tocandocuartobeat: 0,
        tocandointervalId: null,
        mostrandoNota: {
            Mayor: true,
            NumeroModificador: 0,
            NumeroNota: 8,
        },
        mostrando_tipo: "",

        teclas: [],
        cuartos: [],
        bajo: [],
        viendo: false,
    },

    actualizando_cancion: false,
    id_cancionseleccionada: 0,
    tocando: false,
    CancionesDisponibles: [
        { Nombre: "flaca", Autor: "andres_calamaro" },
        { Nombre: "tuyo_siempre", Autor: "andres_calamaro" },
        { Nombre: "legalizenla", Autor: "viejas locas" },
        { Nombre: "tarea_fina", Autor: "patricio rey" },

        
        { Nombre: "balada para otra mujer", Autor: "viejas locas" },
        { Nombre: "homero", Autor: "viejas locas" },
        { Nombre: "un_trago_para_ver_mejor", Autor: "viejas locas" },
        { Nombre: "lo_artesanal", Autor: "viejas locas" },
        { Nombre: "el_arbol_de_la_vida", Autor: "viejas locas" },
        { Nombre: "buey_que_mierda_es", Autor: "viejas locas" },
        { Nombre: "gallo rojo", Autor: "fabulosos" },
        { Nombre: "contigo", Autor: "joaquin sabina" },
        { Nombre: "una_cancion_para_la_magdalena", Autor: "joaquin sabina" },
        { Nombre: "paloma", Autor: "andres_calamaro" },
        { Nombre: "ansia_en_plaza_francia", Autor: "andres calamaro" }
    ],
}

function ReemplazaEspaciosPor_(Cadena) {

    let toret = Cadena.replace(" ", "_");
    toret = toret.replace(" ", "_");
    toret = toret.replace(" ", "_");
    toret = toret.replace(" ", "_");
    toret = toret.replace(" ", "_");
    toret = toret.replace(" ", "_");
    toret = toret.replace(" ", "_");
    return toret;
    //Cadena.replace(/ /g, "_");
}

ControladorBaterista = {
    TocarBeat: function (beat, instrumentos) {
        for (var i in instrumentos)
            if (instrumentos[i].beat[beat])
                if (instrumentos[i].beat[beat]) {
                    var delay = 0; // play one note every quarter second
                    var velocity = 127; // how hard the note hits
                    // play the note
                    MIDI.setVolume(10, 127);
                    MIDI.noteOn(10, instrumentos[i].numero, velocity, delay);
                    MIDI.noteOff(10, instrumentos[i].numero, delay + 0.75);
                }
    },
    TocarCompas: function (instrumentos) {
        var delay = 0.0;
        let intervalo = (1000 / Datos.EditandoCancion.Tempo) * 60;
        let duracion = intervalo * 0.75

        for (var beat in [1, 2, 3, 4])
        {
            for (var i in instrumentos)
                if (instrumentos[i].beat[beat])
                    if (instrumentos[i].beat[beat])
                    {
                        var velocity = 127; // how hard the note hits
                        // play the note
                        MIDI.setVolume(10, 127);
                        MIDI.noteOn(10, instrumentos[i].numero, velocity, delay);
                        MIDI.noteOff(10, instrumentos[i].numero, duracion);
                    }
            delay = delay + (intervalo / 1000);
        }
    },
    TocarMuestra: function (app) {

        MIDI.programChange(Datos.canalbateria, 117);
        let intervalo = (1000 / Datos.EditandoCancion.Tempo) * 60;
        Datos.baterista.tocandobeat = -1;
        Datos.baterista.tocandointervalId = setInterval(ControladorBaterista.ActualizarTempoBaterista, intervalo, app);
        Datos.baterista.tocando = true;
    },
    PararTocarMuestra: function () {

        Datos.baterista.tocandobeat = 5;
        Datos.baterista.tocandointervalId = clearInterval(Datos.baterista.tocandointervalId);
    },
    ActualizarTempoBaterista: function (app) {
        Datos.baterista.tocandobeat = (Datos.baterista.tocandobeat + 1) % 4;
        ControladorBaterista.TocarBeat(Datos.baterista.tocandobeat, Datos.baterista.instrumentos);
        app.$forceUpdate();
    },
};
ControladorPianista = {
    CalcularPianista: function () {
        


        cargarteclasPianista(Datos.pianista);


        var mostrandoNota = Datos.pianista.mostrandoNota;
        var modo = mostrandoNota.modo;
        if (modo == undefined)
            modo = "";

        /* Inicializa las notas */
        Datos.pianista.cuartos = [];
        Datos.pianista.bajo = [];
        for (var i = 0; i < 4; i++) {
            cuartoaadd = [];
            bajoadd = []
            for (var j = 0; j < 4; j++) {

                var notascuarto = []
                for (var k = 0; k < 24; k++) {
                    notascuarto.push("");
                }
                cuartoaadd.push(notascuarto);
                bajoadd.push("");

            }
            Datos.pianista.cuartos.push(cuartoaadd);
            Datos.pianista.bajo.push(bajoadd);
        }



        /* Carga la estructura de acordes  */
        if (!mostrandoNota.Mayor)
            tercera = 15;
        calcularCompasPianista(Datos.pianista);


    },

    TocarBeat: function (beat, cuarto, cuartos, delay, duracion, duracion_bajo)
    {
        if (delay == undefined)
            delay = 0;
        if (duracion == undefined)
            duracion = 0.75;
        if (duracion_bajo == undefined)
            duracion_bajo = 3.75;


        MIDI.setVolume(1, 127);
        let cuartoatocar = cuartos[beat][cuarto];
        var velocity = 127; // how hard the note hits

        // play the note
        for (var i in Datos.pianista.teclas)
        {
            if (cuartoatocar[i] == "0")
            {
                /*
                console.log("MIDI.noteOn(1, " + Datos.pianista.teclas[i].numero + ", 128 , " + delay + ", " + duracion + ");");
                console.log("MIDI.noteOff(1, " + Datos.pianista.teclas[i].numero + ", " + (parseFloat(delay) + parseFloat(duracion)) + ");");
                */
                MIDI.noteOn(1, Datos.pianista.teclas[i].numero, velocity, delay);
                MIDI.noteOff(1, Datos.pianista.teclas[i].numero, parseFloat(delay) + parseFloat(duracion));
            }
        }
        if (Datos.pianista.bajo[beat][cuarto] == "0") {
            MIDI.noteOn(1, 33, velocity, delay);
            MIDI.noteOff(1, Datos.pianista.mostrandoNota.NumeroNota + 21, delay + duracion_bajo);
        }

    },
    TocarCompas: function () {

        var delay = 0.0;
        let intervalo = (1000.0 / Datos.EditandoCancion.Tempo) * 60.0;
        let tcuarto = intervalo / 4000.0;
        let duracion = (intervalo / 4) * 0.75

        for (var beat in [1, 2, 3, 4])
        {

            for (var cuarto in [1, 2, 3, 4])
            {

                ControladorPianista.TocarBeat(beat, cuarto, Datos.pianista.cuartos, delay, duracion, duracion * 4)
                delay = delay + (tcuarto);

            }
        }

    },
    TocarMuestra: function (app) {

        MIDI.programChange(Datos.canalpiano, Datos.pianista.instrumentoid);


        let intervalo = ((1000 / Datos.EditandoCancion.Tempo) * 60) / 4;
        Datos.pianista.tocandobeat = 0;
        Datos.pianista.tocandocuarto = -1;

        Datos.pianista.tocandointervalId = setInterval(ControladorPianista.ActualizarTempoPianista, intervalo, app);
        Datos.pianista.tocando = true;
    },

    PararTocarMuestra: function () {
        Datos.pianista.tocandobeat = 0;
        Datos.pianista.tocandocuarto = -1;

        Datos.pianista.tocandobeat = 5;
        Datos.pianista.tocandointervalId = clearInterval(Datos.pianista.tocandointervalId);
    },
    ActualizarTempoPianista: function (app) {
        Datos.pianista.tocandocuarto++;
        if (Datos.pianista.tocandocuarto >= 4) {
            Datos.pianista.tocandobeat = (Datos.pianista.tocandobeat + 1) % 4;
            Datos.pianista.tocandocuarto = 0;

        }
        ControladorPianista.TocarBeat(Datos.pianista.tocandobeat, Datos.pianista.tocandocuarto, Datos.pianista.cuartos);
        app.$forceUpdate();
    },
};
ControladorBandas = {
    GetAcordeNumero(numero) {
        var nuevaspartes = Datos.EditandoCancion.PartesCancion;
        for (var i in nuevaspartes) {
            for (var j in nuevaspartes[i]) {
                if (nuevaspartes[i][j].Notas)
                {
                    for (var k in nuevaspartes[i][j].Notas)
                    {
                        if (nuevaspartes[i][j].Notas[k].compas == numero)
                            return nuevaspartes[i][j].Notas[k];
                    }
                }
            }
        }
    },
    GetTempoTema: function (autor, tema) {
        autor = autor.replace(" ", "_");
        tema = tema.replace(" ", "_");
        const banda = Datos.indice.find((banda) => banda.Nombre === autor);
        if (banda) {
            const ctema = banda.temasBanda.find((vtema) => vtema.Nombre === tema);
            if (ctema.datosSpotify)
                return ctema.datosSpotify.Tempo;
            return 60;
        }
    },
    CargarTempoTema: function () {
        fetch("/indice.json")
            .then(response => response.json())
            .then(data => {
                {
                    Datos.indice = data;

                }
                ;
            });
    },
    CargarBanda: function (appVue) {

        let temaSeleccionado = Datos.CancionesDisponibles[Datos.id_cancionseleccionada];

        /* Inicializa la cancion */
        Datos.tocandocompas = 0;

        let Nombre = temaSeleccionado.Nombre;
        let Autor = temaSeleccionado.Autor;

        bNombre = ReemplazaEspaciosPor_(Nombre);
        bAutor = ReemplazaEspaciosPor_(Autor);
        fetch("/json/" + bAutor + "/" + bNombre + ".json")
            .then(response => response.json())
            .then(data => {
                {

                    appVue.$forceUpdate();

                    // 
                    Datos.totalcompas = 0;
                    var nuevaspartes = data;
                    for (var i in nuevaspartes) {
                        for (var j in nuevaspartes[i]) {
                            if (nuevaspartes[i][j].Notas) {
                                for (var k in nuevaspartes[i][j].Notas) {
                                    nuevaspartes[i][j].Notas[k].compas = Datos.totalcompas;
                                    Datos.totalcompas++;
                                }
                            }
                        }
                    }


                    Datos.actualizando_cancion = false;
                    Datos.EditandoCancion.PartesCancion = nuevaspartes;
                    Datos.EditandoCancion.Nombre = Nombre;
                    Datos.EditandoCancion.Autor = Autor;

                    Datos.EditandoCancion.Tempo = Math.floor(ControladorBandas.GetTempoTema(Autor, Nombre));

                }
                ;
            });
    },
    ActualizarTempo: function (appVue) {

        Datos.activeBeat = (Datos.activeBeat + 1) % 4;

        if (Datos.activeBeat == 0)
        {

            Datos.tocandocompas++;

            // Compas del pianista
            MIDI.programChange(Datos.canalpiano, Datos.pianista.instrumentoid);
            let nota = ControladorBandas.GetAcordeNumero(Datos.tocandocompas);
            Datos.pianista.mostrandoNota = nota;

            if (nota.modo)
            if (nota.modo != "") {
                Datos.pianista.modo = nota.modo;
            }
            Datos.pianista.tocandoinversion = "";
            if (nota.tocandoinversion)
                if (nota.tocandoinversion != "")
                {
                    Datos.pianista.tocandoinversion = nota.tocandoinversion;
                }

            
            ControladorPianista.CalcularPianista();
            ControladorPianista.TocarCompas();


            // Compas del baterista
            MIDI.programChange(Datos.canalbateria, 117);
            ControladorBaterista.TocarCompas(Datos.baterista.instrumentos);


        }

        
        appVue.$forceUpdate();
    },
    /* MIDI */
    CargarInstrumento: function (archivo) {

        MIDI.loadPlugin({
            soundfontUrl: "./soundfont/",
            instrument: archivo,
            onprogress: function (state, progress) {
                console.log(state, progress);
            },
            onsuccess: function () {
                console.log(archivo + " cargada");
            }
        });
    },
    TocarNota: function (octava, nota, canal) {
        //const now = Tone.now()
        // tambor.triggerAttackRelease(nota + octava, "8n", now)
        if (canal == undefined)
            canal = 0;

        var delay = 0; // play one note every quarter second
        var note = ((octava - 1) * 12) + nota; // the MIDI note
        note = note + 21;
        console.log("tocando nota " + note);

        var velocity = 127; // how hard the note hits
        // play the note
        MIDI.setVolume(canal, 127);
        MIDI.noteOn(canal, note, velocity, delay);
        MIDI.noteOff(canal, note, delay + 0.75);

    }

}

// COMIENCA INICIALIZACION 

ControladorBandas.CargarTempoTema();
ControladorPianista.CalcularPianista();
ControladorBandas.CargarInstrumento("acoustic_grand_piano");
ControladorBandas.CargarInstrumento("melodic_tom");
const { createApp } = Vue
// Declara la aplicacion
var laApp;
function IniciarApp() {
    laApp = createApp({
        data() {
            return Datos;
        },
        created() {

            ControladorBandas.CargarBanda(this);
        },
        methods: {
            change_instrumento: function () {

                let cargaInstrumento = Datos.instrumentos[Datos.pianista.instrumentoid];
                ControladorBandas.CargarInstrumento(cargaInstrumento.archivo);
                MIDI.programChange(Datos.canalpiano, cargaInstrumento.instrumentoid);

            },
            cambio_nota_pianista: function () {
                ControladorPianista.CalcularPianista();
                this.$forceUpdate();
            },
            Click_EditarBaterista: function () {
                Datos.baterista.viendo = !Datos.baterista.viendo;
                this.$forceUpdate();

            },
            Click_EditarPianista: function () {
                Datos.pianista.viendo = !Datos.pianista.viendo;
                this.$forceUpdate();

            },

            Click_EditarBajista: function () {
                Datos.bajista.viendo = !Datos.bajista.viendo;
                this.$forceUpdate();

            },

            

            Click_cargarInstrumento: function () {
                let cargaInstrumento = Datos.instrumentos[Datos.cargaInstrumentoId];
                ControladorBandas.CargarInstrumento(cargaInstrumento.archivo);


                MIDI.programChange(15, cargaInstrumento.instrumentoid);

            },
            Tocar: function (octava, nota, canal) {

                ControladorBandas.TocarNota(octava, nota, 15);

            },
            Click_ActualizarCancion: function () {
                if (Datos.actualizando_cancion) {
                    Datos.actualizando_cancion = false;
                } else {
                    Datos.actualizando_cancion = true;
                }
                this.$forceUpdate();
            },

            Click_Play: function () {
                Datos.tocando = true;
                Datos.activeBeat = - 1;
                Datos.tocandocompas--;
                let intervalo = (1000 / Datos.EditandoCancion.Tempo) * 60;
                Datos.intervalId = setInterval(ControladorBandas.ActualizarTempo, intervalo, this);
            },

            Click_Pause: function () {
                Datos.intervalId = clearInterval(Datos.intervalId);
                Datos.activeBeat = 0;
                Datos.tocando = false;
                this.$forceUpdate();
            },
            Click_PlayBateria: function () {
                ControladorBaterista.TocarMuestra(this);

                this.$forceUpdate();
            },
            Click_PauseBateria: function () {

                ControladorBaterista.PararTocarMuestra();
                Datos.baterista.tocando = false;
                this.$forceUpdate();
            },

            Click_PlayPiano: function () {
                ControladorPianista.TocarMuestra(this);
                this.$forceUpdate();
            },
            Click_PausePiano: function () {

                ControladorPianista.PararTocarMuestra();
                Datos.pianista.tocando = false;
                this.$forceUpdate();
            },


            Cambio_seleccion: function () {
                ControladorBandas.CargarBanda(this);
                this.$forceUpdate();
            },
            cambiarbeat_click: function (instrumento, beatid) {
                instrumento.beat[beatid] = !instrumento.beat[beatid];
            }

        }

    }).mount('#app')

}
IniciarApp();

// funciones bandidas
function TocarTodosLosInstrumentos(de, a) {
    if (de == undefined)
        de = 0;
    if (a == undefined)
        a = 129;

    var delay = 0; // play one note every quarter second
    var velocity = 127; // how hard the note hits
    var note = 45;

    for (var i = de; i <= a; i++) {
        MIDI.programChange(10, i);
        MIDI.setVolume(10, 127);
        MIDI.noteOn(10, note, velocity, delay);
        MIDI.noteOff(10, note, delay + 0.75);

    }

}






function a() {

    MIDI.noteOn(1, 53, 128, 0, 90);
    MIDI.noteOff(1, 53, 090);
    MIDI.noteOn(1, 57, 128, 0, 90);
    MIDI.noteOff(1, 57, 090);
    MIDI.noteOn(1, 60, 128, 0, 90);
    MIDI.noteOff(1, 60, 090);

    MIDI.noteOn(1, 53, 128, 120, 90);
    MIDI.noteOff(1, 53, 12090);
    MIDI.noteOn(1, 57, 128, 120, 90);
    MIDI.noteOff(1, 57, 12090);
    MIDI.noteOn(1, 60, 128, 120, 90);
    MIDI.noteOff(1, 60, 12090);
    MIDI.noteOn(1, 53, 128, 240, 90);
    MIDI.noteOff(1, 53, 24090);
    MIDI.noteOn(1, 57, 128, 240, 90);
    MIDI.noteOff(1, 57, 24090);
    MIDI.noteOn(1, 60, 128, 240, 90);
    MIDI.noteOff(1, 60, 24090);
    MIDI.noteOn(1, 53, 128, 360, 90);
    MIDI.noteOff(1, 53, 36090);
    MIDI.noteOn(1, 57, 128, 360, 90);
    MIDI.noteOff(1, 57, 36090);
    MIDI.noteOn(1, 60, 128, 360, 90);
    MIDI.noteOff(1, 60, 36090);

}