
export default {
    data() {
        return {
            checked: false,
            tocando_cuarto: 0,
            tocando_16avo: -1,
            tocua: 3,
            hilo_tocar: undefined,

        }
    },
    props: {
        value: Object,
    },

    methods: {
        tocar_cuarto(delayInicial) {
            if (!delayInicial)
                delayInicial = 0;

            let intervalo = ((1.0 / this.value.tempo) * 60) / (4);

            for (var notaid in this.value.notas) {
                var nota = this.value.notas[notaid];
                var cuarto = nota.cuartos[this.tocando_cuarto];

                delayInicial = 0;
                for (var dieavo in cuarto) {
                    if (cuarto[dieavo] != 0) {

                        helperMidi.tocar_nota(nota.numeroNota, 1, delayInicial, (cuarto[dieavo] * intervalo * 0.98));
                    }
                    delayInicial += intervalo;
                }
                //
            }
        },
        mousedown_nota(nota)
        {
            MIDI.noteOn(this.value.canal, nota.numeroNota, 127, 0);
        },
        mouseup_nota(nota) {
            MIDI.noteOff(this.value.canal, nota.numeroNota, 127, 0);
        },
        clk_Paso()
        {
            this.tocando_16avo = this.tocando_16avo + 1;
            if (this.tocando_16avo > 3) {
                this.tocando_cuarto++;
                if (this.tocando_cuarto > 3) {
                    this.tocando_cuarto = 0;
                }      
                this.tocando_16avo = 0;
            }

            
            if (this.tocando_16avo == 0)
                this.tocar_cuarto();


        },

        Click_PlayMusico: function () {

            this.value.tocando = true;
            let intervalo = ((1000 / this.value.tempo) * 60) / (4.0);
            console.log(intervalo);
            this.hilo_tocar = setInterval(this.clk_Paso, intervalo);


            this.$forceUpdate();
        },
        Click_PauseMusico: function () {


            
            this.hilo_tocar = clearInterval(this.hilo_tocar);
            this.value.tocando = false;
            this.$forceUpdate();
        },
        click_beatinstrumentosecu(nota, cuartoid, dieciseisavoid)
        {
            nota.cuartos[cuartoid][dieciseisavoid] = 0;
        },
        click_beatinstrumento(nota, cuartoid, dieciseisavoid)
        {
            if (nota.cuartos[cuartoid][dieciseisavoid] == 0)
                nota.cuartos[cuartoid][dieciseisavoid] = 1;
            else if (nota.cuartos[cuartoid][dieciseisavoid] == 1)
                nota.cuartos[cuartoid][dieciseisavoid] = 2;
            else if (nota.cuartos[cuartoid][dieciseisavoid] == 2)
                nota.cuartos[cuartoid][dieciseisavoid] = 4;
            else if (nota.cuartos[cuartoid][dieciseisavoid] == 4)
                nota.cuartos[cuartoid][dieciseisavoid] = 8;
            else if (nota.cuartos[cuartoid][dieciseisavoid] == 8)
                nota.cuartos[cuartoid][dieciseisavoid] = 16;
            else if (nota.cuartos[cuartoid][dieciseisavoid] == 16)
                nota.cuartos[cuartoid][dieciseisavoid] = 0;

        }
    },
    mounted() {
        helperMidi.InicializarInstrumento(this.value.instrumento_id, this.value.canal);
    },
    template: "#mimusico"
}