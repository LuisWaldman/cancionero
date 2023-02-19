Datos =
{
    EditandoCancion: {
        Nombre: "Homero",
        Autor: "Viejas Locas",
    }
}

function ReemplazaEspaciosPor_(Cadena) {
    return Cadena.replace(/ /g, "_");
}

ControladorBandas = {

    CargarBanda: function (Nombre, Autor) {

        bNombre = ReemplazaEspaciosPor_(Nombre);
        bAutor = ReemplazaEspaciosPor_(Autor);
        fetch("https://localhost:7073/json/" + bAutor + "/" + bNombre + ".json")
            .then(response => response.json())
            .then(data => {
                (Datos.EditandoCancion.PartesCancion = data);
                IniciarApp();
            });
    }
}

ControladorBandas.CargarBanda(Datos.EditandoCancion.Nombre, Datos.EditandoCancion.Autor);

const { createApp } = Vue


function IniciarApp() {
    createApp({
        data() {
            return Datos;
        },
        created() {
            // Simple GET request using fetch
        }
    }).mount('#app')

}


