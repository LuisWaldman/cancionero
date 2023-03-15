export default {
    data() {
        return {
            cancionesLocales: [],
            cancionesRemotas: [],
            cancionesFiltradas: [],
            filtroNombre: "",
            filtroBanda: "",
            filtroTempo: "",
            filtroBailable: "",
            filtroTono: "",
            filtroAcordes: "",
            filtroNroAcordes: "",
            visible: true
        }
    },
    methods: {
        ckick_listo() {
            this.visible = false;
            this.$forceUpdate();
        },
        iniciar() {
            this.visible = true;
            this.$forceUpdate();
        },
        borrarCancion(index) {
            this.cancionesLocales.splice(index, 1);
            // guardar los cambios en el localStorage
            localStorage.setItem('indiceCanciones', JSON.stringify(this.cancionesLocales));
        },
        agregarCancion(index) {
            const nuevaCancion = this.cancionesRemotas[index];
            let urltema = '/getcancion/' + nuevaCancion.Nombre + "$" + nuevaCancion.Banda + ".json";
            fetch(urltema)
                .then(response => response.json())
                .then(data => {
                    this.cancionesLocales.push(data);
                    // guardar los cambios en el localStorage
                    localStorage.setItem('indiceCanciones', JSON.stringify(this.cancionesLocales));
                });

        },
        cambiofiltro: function () {
            this.calcularCancionesFiltradas();
            this.$forceUpdate();
        },
        calcularCancionesFiltradas() {
            this.cancionesFiltradas = [];   
            var count = 0;

            while ((count < this.cancionesRemotas.length) && (this.cancionesFiltradas.length < 100))
            {
                var agregar = true;

                if (this.filtroNombre != "") {
                    if (!(this.cancionesRemotas[count].Nombre.toLowerCase().includes(this.filtroNombre.toLowerCase())))
                    {
                        agregar = false;
                    }
                }
                if (this.filtroBanda != "") {
                    if (!(this.cancionesRemotas[count].Banda.toLowerCase().includes(this.filtroBanda.toLowerCase()))) {
                        agregar = false;
                    }
                }

                if (this.filtroTempo != "")
                {
                    var sp = this.filtroTempo.split(",");
                    var cancionremota = this.cancionesRemotas[count];
                    if ((cancionremota.Tempo < parseFloat(sp[0]))
                        || (cancionremota.Tempo > parseFloat(sp[1])))
                        {
                        agregar = false;
                    }
                }
                
                /*
                 
            filtroTempo: "",
            filtroBailable: "",
            filtroTono: "",
            filtroAcordes: "",
            filtroNroAcordes: ""
                 * */
                if (this.filtroBailable != "")
                {
                    
                    var cancionremota = this.cancionesRemotas[count];
                    var desde = 0.0;
                    var hasta = 1.0;
                    if (this.filtroBailable == "1") {
                        hasta = 0.2;
                    }
                    if (this.filtroBailable == "2") {
                        desde = 0.2;
                        hasta = 0.4;
                    }
                    if (this.filtroBailable == "3") {
                        desde = 0.4;
                        hasta = 0.6;
                    }
                    if (this.filtroBailable == "4") {
                        desde = 0.6;
                        hasta = 0.8;
                    }
                    if (this.filtroBailable == "5") {
                        desde = 0.8;
                    }
                    if ((cancionremota.Danceability < desde) || (cancionremota.Danceability > hasta)) {
                        agregar = false;
                    }
                    
                }


                if (agregar)
                    this.cancionesFiltradas.push(this.cancionesRemotas[count]);
                count++;
            }
        }

    },
    mounted() {
        // cargar las canciones locales desde el localStorage
        let cancionesLocales = JSON.parse(localStorage.getItem('cancionesLocales'));
        if (!cancionesLocales) {
            cancionesLocales = cancionesDefault;
            localStorage.setItem('indiceCanciones', JSON.stringify(this.cancionesLocales));
        }
        this.cancionesLocales = cancionesLocales;

        // cargar las canciones remotas desde el servidor
        fetch('getcanciones.json')
            .then(response => response.json())
            .then(canciones => {
                this.cancionesRemotas = canciones;
                this.calcularCancionesFiltradas();
            });
        // cargar las canciones remotas desde el servidor
        // aquí deberías hacer una petición HTTP para obtener las canciones remotas
        // y asignarlas a this.cancionesRemotas
    },
    template: "#CancionesAdmin",
    props: {
        value: Boolean,
        
    },
}