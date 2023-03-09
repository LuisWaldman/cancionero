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

        mostrando_texto: function ()
        {

            var cont1 = 0;
            var cont2 = 0;
            while (cont1 < value.renglones)
            {
                /*
                var renglon = value.renglones[cont1];
                if (renglon.tipo == "musica")
                {

                }
                renglon.acordes.forEach(aco => {
                    acor.forEach(cuar => )
                });*/
                cont1++;
            }
            this.value.renglones.forEach(re => {

            });
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

        sonandocuarto: function (sonando) {
            let mostrandorenglon = -1;
            this.value.renglones.forEach(renglon => {
                if (renglon.tipo != "musica")
                {
                    if (renglon.desdecuarto <= parseInt(sonando) && renglon.hastacuarto >= parseInt(sonando))
                    {
                        if (renglon.nro_renglon > 7) {

                            var editorDiv = document.querySelector('#editor');
                            editorDiv.scrollTop = 40 * parseInt(renglon.nro_renglon);
                        }
                    }
                }
            });
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
            var renglon = this.value.renglones[renglonid];
            renglon.editando = false;
            this.value.renglones[renglonid + 1].editando = true;
            this.$forceUpdate();

            $("#txtacorde_" + (renglonid + 1)).focus();

        },

        enteren_arriba(renglonid) {
            if (renglonid != 0) {

                var renglon = this.value.renglones[renglonid];
                renglon.editando = false;
                this.value.renglones[renglonid - 1].editando = true;
                this.$forceUpdate();
                $("#txtacorde_" + (renglonid - 1)).focus();
            }
        },
        enteren_abajo(renglonid) {
            if (renglonid < this.value.renglones.length) {

                var renglon = this.value.renglones[renglonid];
                renglon.editando = false;
                this.value.renglones[renglonid + 1].editando = true;
                this.$forceUpdate();
                $("#txtacorde_" + (renglonid + 1)).focus();
            }
        },
        enteren_delete(renglonid) {
            var renglon = this.value.renglones[renglonid];
            if (renglon.acordesentexto == "") {
                this.value.renglones.splice(renglonid, 1);

                this.value.renglones[renglonid - 1].editando = true;
                this.$forceUpdate();
                const input = document.getElementById("txtacorde_" + (renglonid - 1));
                input.focus();
                input.selectionStart = 0;
                input.selectionEnd = 0;

                //$("#txtacorde_" + (renglonid + 1)).focus();
            }
        },
        enteren_backspace(renglonid) {
            var renglon = this.value.renglones[renglonid];
            if (renglon.acordesentexto == "") {
                this.value.renglones.splice(renglonid, 1);


                this.value.renglones[renglonid - 1].editando = true;
                this.$forceUpdate();
                const input = document.getElementById("txtacorde_" + (renglonid - 1));
                input.focus();


            }
        },
        enteren_esc(renglonid) {
            console.log(`La tecla esc se presionó en el elemento con renglonid ${renglonid}`);
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

