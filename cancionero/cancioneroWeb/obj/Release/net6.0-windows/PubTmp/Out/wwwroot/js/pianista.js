
let notacentral = 12;
let tercera = 16;
let quinta = 19;
let septima = 23;


var ModosPiano =
    [

        {
            value: "0",
            nombre: "1 acorde",

            hacer: function (pianista) {
                pianista.cuartos[0][0][notacentral] = "0";
                if (pianista.mostrandoNota.NumeroModificador != "5")
                    pianista.cuartos[0][0][tercera] = "0";
                pianista.cuartos[0][0][quinta] = "0";
                if (pianista.mostrandoNota.NumeroModificador == "7")
                    pianista.cuartos[0][0][septima] = "0";
                pianista.bajo[0][0] = "0"

            }
        },
        {
            value: "1",
            nombre: "4 acorde",
            hacer: function (pianista)
            {

                for (var i = 0; i < 4; i++) {
                        pianista.cuartos[i][0][notacentral] = "0";


                        if (pianista.mostrandoNota.NumeroModificador != "5")
                            pianista.cuartos[i][0][tercera] = "0";

                        pianista.cuartos[i][0][quinta] = "0";

                    if (pianista.mostrandoNota.NumeroModificador == "7")
                        pianista.cuartos[i][0][septima] = "0";
                }
                pianista.bajo[0][0] = "0"
            }
        },

        {
            value: "2acorbaj",
            nombre: "2 acordes con bajo",
            hacer: function (pianista) {

                for (var i = 0; i < 4; i++) {
                    if ((i % 2) == 0) {
                        pianista.cuartos[i][0][notacentral] = "0";
                        if (pianista.mostrandoNota.NumeroModificador != "5")
                            pianista.cuartos[i][0][tercera] = "0";
                        pianista.cuartos[i][0][quinta] = "0";
                        if (pianista.mostrandoNota.NumeroModificador == "7")
                            pianista.cuartos[i][0][septima] = "0";
                    }
                }
                pianista.bajo[0][0] = "0"
                pianista.bajo[2][0] = "0"
            }
        },
        {
            value: "2acorbajcruza",
            nombre: "2 acordes adelantados, con bajo",
            hacer: function (pianista) {

                for (var i = 0; i < 4; i++) {
                    if ((i % 2) == 1) {
                        pianista.cuartos[i][0][notacentral] = "0";
                        if (pianista.mostrandoNota.NumeroModificador != "5")
                            pianista.cuartos[i][0][tercera] = "0";
                        pianista.cuartos[i][0][quinta] = "0";
                        if (pianista.mostrandoNota.NumeroModificador == "7")
                            pianista.cuartos[i][0][septima] = "0";
                    }
                }
                pianista.bajo[0][0] = "0"
                pianista.bajo[2][0] = "0"
            }
        },
        {
            value: "10001",
            nombre: "4 acorde fin baja",
            hacer: function (pianista) {

                for (var i = 0; i < 4; i++)
                {
                    if (i < 2)
                        pianista.cuartos[i][0][notacentral] = "0";


                    if (i != 3)
                        if (pianista.mostrandoNota.NumeroModificador != "5")
                            pianista.cuartos[i][0][tercera] = "0";

                    if (i != 2)
                        pianista.cuartos[i][0][quinta] = "0";

                    if (pianista.mostrandoNota.NumeroModificador == "7")
                        pianista.cuartos[i][0][septima] = "0";
                }
                pianista.bajo[0][0] = "0"
                pianista.bajo[2][0] = "0"
            }
        },
        {
            value: "10002",
            nombre: "4 acorde fin sube",
            hacer: function (pianista) {

                for (var i = 0; i < 4; i++) {
                    if (i < 2)
                        pianista.cuartos[i][0][notacentral] = "0";

                    if (i != 2)
                        if (pianista.mostrandoNota.NumeroModificador != "5")
                            pianista.cuartos[i][0][tercera] = "0";

                    if (i < 3)
                        pianista.cuartos[i][0][quinta] = "0";

                    if (pianista.mostrandoNota.NumeroModificador == "7")
                        pianista.cuartos[i][0][septima] = "0";
                }
                pianista.bajo[0][0] = "0"
                pianista.bajo[2][0] = "0"
            }
        },

    ];



var Inversion =
    [

        {
            value: "0",
            nombre: "",
            hacer: function (pianista) {
            }
        },
        {
            value: "1",
            nombre: "1ra INV",
            hacer: function (pianista)
            {
                notacentral = 12;
                tercera = 16;
                quinta = 7;
                septima = 11;
            }
        },
        {
            value: "2",
            nombre: "2da INV",
            hacer: function (pianista)
            {

                notacentral = 12;
                tercera = 4;
                quinta = 7;
                septima = 11;
            }
        },


    ];

var elPianista = {

    instrumentoid: 0,
    modos: ModosPiano,
    inversion: Inversion,
    modo: "0",
    tocandoinversion: "",
    tocandobeat: 0,
    tocandocuartobeat: 0,
    tocandointervalId: null,
    mostrandoNota: {
        Mayor: false,
        NumeroModificador: 0,
        NumeroNota: 0,
    },
    mostrando_tipo: "",

    teclas: [],
    cuartos: [],
    bajo: [],
    viendo: false,
};



cargarteclasPianista = function (pianista) {

    
    var mostrandoNota = pianista.mostrandoNota;
    pianista.teclas = [];
    /* Calcula el teclado */
    for (var i = mostrandoNota.NumeroNota; i < 12; i++) {
        let nota = {
            nombre: Datos.notas[i] + " - 2",
            numero: 33 + i,
            numeroescala: i,
        }
        pianista.teclas.push(nota)
    }
    for (var i = 0; i < 12; i++) {
        let nota = {
            nombre: Datos.notas[i] + " - 3",
            numero: 45 + i,
            numeroescala: i
        }
        pianista.teclas.push(nota)
    }
    for (var i = 0; i < mostrandoNota.NumeroNota; i++) {
        let nota = {
            nombre: Datos.notas[i] + " - 4",
            numero: 57 + i,
            numeroescala: i
        }

        pianista.teclas.push(nota)
    }


}


calcularCompasPianista = function (pianista)
{


    let inv = Inversion.find((d) => d.value == pianista.tocandoinversion)
    if (inv)
        inv.hacer(pianista);

    let modo = ModosPiano.find((d) => d.value == pianista.modo)
    if (modo)
        modo.hacer(pianista);

}