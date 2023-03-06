import mirenglon from './mirenglon.js'
import helperMusica from '../util/helperMusica.js'



export default {

    methods:
    {
        apreto_enter(event) {
            console.log(this.value.acorde);
            
        },
        click_acorde(renglonid)
        {
            var renglon = this.value.renglones[renglonid]
            if (renglon.editando == true) {
                renglon.editando = false;
            } else {
                renglon.editando = true;
            }

            this.value.renglones[renglonid] = renglon;

            $("#txtacorde_" + renglonid).focus();

        },
        textotoarenglon(renglonid)
        {
            var renglon = this.value.renglones[renglonid];
            var texto = renglon.acordesentexto;
            this.value.renglones[renglonid] = helperMusica.textotoarenglon(texto);
        },
        focusout_acorde(renglonid)
        {
            var renglon = this.value.renglones[renglonid];
            this.textotoarenglon(renglonid);
            renglon.editando = false;

        },

        enteren_acorde(renglonid) {

            var renglon = this.value.renglones[renglonid];
            this.textotoarenglon(renglonid);

            // Insertar el nuevo renglón después del renglón especificado
            this.value.renglones.splice(renglonid + 1, 0, {
                acordesentexto: "",
                acordes: [],
                editando: true
            });

            this.$forceUpdate();

            // Enfocar el nuevo campo de texto de acordes
            $("#txtacorde_" + (renglonid + 1)).focus();

            renglon.editando = false;
        },
        


        check() { this.checked = !this.checked; }
    },

    data() {
        return {
            checked: false,
        }

    },

    props: {
        value: Object
    },

    components: {
        mirenglon,
    },
    template: "#micancion"
}

