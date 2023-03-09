export default {
    data() {
        return {
            id_temporizador: {},
            tocando: false,
            editandoinstrumentos: false,
            id_cancionseleccionada: 0,
            actualizando_cancion: true,
            editandoAcordes: false,
            actualizando_cancion: false,

        }
    },
    props: {
        value: Object,
        canciones: Array
    },    
    methods: {
        Click_ActualizarCancion() {
            this.actualizando_cancion = true;
        },
        Click_Play()
        {
            if (!this.tocando)
            {
                this.value.tocando = true;
                let intervalo = (1000 / this.value.tempo) * 60;
                this.id_temporizador = setInterval(this.AvanzarCuarto, intervalo, this);
            }
        },
        Click_Stop()
        {
            this.value.sonandocuarto = 0;
            this.Click_Pause();
        },
        AvanzarCuarto: function (app)
        {
            this.value.sonandocuarto++;
            if (this.value.sonandocuarto > this.value.compaces)
                this.Click_Stop();

        },
        Click_Pause()
        {
            console.log("pausa");
            clearInterval(this.id_temporizador);
            this.value.tocando = false;
        },
        Cambio_seleccion()
        {
            this.actualizando_cancion = false;
            this.$emit('cargocancion', this.canciones[this.id_cancionseleccionada]);
        },
        Click_EditarBajista() { },
        Click_EditarPianista() { },
        Click_EditarBaterista() { },

        check() { this.checked = !this.checked; }
    },
    template: "#micabecera"
}