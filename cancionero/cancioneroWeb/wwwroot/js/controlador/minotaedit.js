import helperMusica from '../util/helperMusica.js'

export default {
    data() {
        return {
            checked: false,
            nombreNotas: ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G"],
            editando: false
        }
    },
    props: {
        value: Object,
    },
    
    methods: {
        cambioeditando: function () {

            
            var nvalue = helperMusica.nuevanota(this.value.nombre);
            this.value.numeroNota = nvalue.numeroNota;
            this.value.numeroModificador = nvalue.numeroModificador;
            this.value.mayor = nvalue.mayor;
            this.value.notaBajo = undefined;
            if (nvalue.notaBajo) {
                this.value.notaBajo = {
                    numeroNota: nvalue.notaBajo.numeroNota
                }
            }
                

            this.editando = false;
            this.$forceUpdate();
        },
        click_editar: function () { 
            this.editando = true;
            this.$forceUpdate();
        }
    },
    template: "#minotaedit"
}