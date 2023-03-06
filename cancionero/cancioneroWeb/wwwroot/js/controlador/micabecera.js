export default {
    data() {
        return {
            tocando: false,
            editandoAcordes: false,
            actualizando_cancion: false,

        }
    },
    props: {
        cancion: Object
    },    
    methods: {
        Click_ActualizarCancion() { },
        Click_Play() { },
        Click_Pause() { },
        Cambio_seleccion() { },
        Click_EditarBajista() { },
        Click_EditarPianista() { },
        Click_EditarBaterista() { },

        check() { this.checked = !this.checked; }
    },
    template: "#micabecera"
}