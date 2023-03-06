import mirenglon from './mirenglon.js'
import helperMusica from '../util/helperMusica.js'



export default {

    created: function () {
        console.log("mi cancion creado");
    },
    methods:
    {
        incluye: function (cuarto, sonandocuarto) 
        {
            sonandocuarto = parseInt(sonandocuarto);
            if (cuarto)
                if (cuarto.nro_cuarto)
                    return cuarto.nro_cuarto.includes(sonandocuarto);
            return false;
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
            this.$emit('cancioneditada')
        },
        focusout_acorde(renglonid)
        {
            var renglon = this.value.renglones[renglonid];
            this.textotoarenglon(renglonid);
            renglon.editando = false;



        },
        insertar_renglon(renglonid, texto) {
            // Insertar el nuevo renglón después del renglón especificado

            var renglontoadd = helperMusica.textotoarenglon(texto)
            this.value.renglones.splice(renglonid + 1, 0, renglontoadd);

        },
        enteren_acorde(renglonid)
        {

            this.textotoarenglon(renglonid);
            this.insertar_renglon(renglonid, "");
            $("#txtacorde_" + (renglonid + 1)).focus();

            var renglon = this.value.renglones[renglonid];
            renglon.editando = false;
        },

        async pegarTexto(renglonid, clipboard)
        {
            let texto = await clipboard.getData('text');
            var nuevosrenglonestexto = texto.split("\r\n");
            let renglonesinsertados = 0;

            nuevosrenglonestexto.reverse().forEach(renglontexto =>
            {
                renglonesinsertados++;
                this.insertar_renglon(renglonid - 1, renglontexto);
            });


            this.value.renglones[renglonid].editando = false;
            this.value.renglones[renglonid + renglonesinsertados].editando = true;
            this.$forceUpdate();
            $("#txtacorde_" + (renglonid + renglonesinsertados)).focus();
            
        },
        onPaste(evento) {
            evento.returnValue = false;

            let renglonid = parseInt(evento.srcElement.id.replace("txtacorde_", ""));
            this.pegarTexto(renglonid, evento.clipboardData);

            

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

