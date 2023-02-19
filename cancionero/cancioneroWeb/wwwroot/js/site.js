Datos =
{
    EditandoCancion: {
        Nombre: "antologia",
        Autor: "shakira"
    },
    actualizando_cancion: false,
    id_cancionseleccionada: 2,
    CancionesDisponibles: [ 
        { Nombre: "antologia", Autor: "shakira" },
        { Nombre: "homero", Autor: "viejas locas" },
        { Nombre: "gallo rojo", Autor: "fabulosos" },
        { Nombre: "contigo", Autor: "joaquin sabina" },
        { Nombre: "una_cancion_para_la_magdalena", Autor: "joaquin sabina" },
        { Nombre: "flaca", Autor: "andres_calamaro" },
        { Nombre: "paloma", Autor: "andres_calamaro" },
        { Nombre: "ansia_en_plaza_francia", Autor: "andres_calamaro" }
        ],
}

function ReemplazaEspaciosPor_(Cadena) {
    return Cadena.replace(" ", "_"); //Cadena.replace(/ /g, "_");
}

ControladorBandas = {

    CargarBanda: function (appVue) {

        let temaSeleccionado = Datos.CancionesDisponibles[Datos.id_cancionseleccionada];

        let Nombre = temaSeleccionado.Nombre;
        let Autor = temaSeleccionado.Autor;

        bNombre = ReemplazaEspaciosPor_(Nombre);
        bAutor = ReemplazaEspaciosPor_(Autor);
        fetch("https://localhost:7073/json/" + bAutor + "/" + bNombre + ".json")
            .then(response => response.json())
            .then(data => {
                { 
                    
                    appVue.$forceUpdate();
                    Datos.EditandoCancion.PartesCancion = data
                    Datos.EditandoCancion.Nombre = Nombre;
                    Datos.EditandoCancion.Autor = Autor;
                    
                }
                    ;
            });
    }
}


const { createApp } = Vue


function IniciarApp() {
    createApp({
        data() {
            return Datos;
        },
        created() {
            
            ControladorBandas.CargarBanda(this);
        },
        methods: {
            Click_ActualizarCancion: function () {
                Datos.actualizando_cancion = true;
                this.$forceUpdate();
            },
            Cambio_seleccion: function () {
                ControladorBandas.CargarBanda(this);
            }
        }
        
    }).mount('#app')

}


IniciarApp();
