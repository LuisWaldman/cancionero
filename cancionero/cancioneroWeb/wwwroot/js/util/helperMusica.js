export default {

    nuevanota: function (textoentrada) {

        const notas = [
            { "nombre": "DO#", "numero": 4 },
            { "nombre": "D#", "numero": 6 },
            { "nombre": "FA#", "numero": 9 },
            { "nombre": "F#", "numero": 9 },
            { "nombre": "E#", "numero": 8 },
            { "nombre": "LA#", "numero": 1 },
            { "nombre": "FA#", "numero": 9 },
            { "nombre": "SOL#", "numero": 11 },
            { "nombre": "G#", "numero": 11 },
            { "nombre": "SI#", "numero": 3 },
            { "nombre": "B#", "numero": 3 },
            { "nombre": "SIB", "numero": 1 },
            { "nombre": "BB", "numero": 1 },
            { "nombre": "REB", "numero": 4 },
            { "nombre": "MIB", "numero": 6 },
            { "nombre": "EB", "numero": 6 },
            { "nombre": "FAB", "numero": 7 },
            { "nombre": "FB", "numero": 7 },
            { "nombre": "SOLB", "numero": 9 },
            { "nombre": "GB", "numero": 9 },
            { "nombre": "LA", "numero": 0 },
            { "nombre": "SI", "numero": 2 },
            { "nombre": "DO", "numero": 3 },
            { "nombre": "RE", "numero": 5 },
            { "nombre": "MI", "numero": 7 },
            { "nombre": "FA", "numero": 8 },
            { "nombre": "F", "numero": 8 },
            { "nombre": "SOL", "numero": 10 },
            { "nombre": "A", "numero": 0 },
            { "nombre": "A#", "numero": 1 },
            { "nombre": "B", "numero": 2 },
            { "nombre": "C", "numero": 3 },
            { "nombre": "C#", "numero": 4 },
            { "nombre": "D", "numero": 5 },
            { "nombre": "D#", "numero": 6 },
            { "nombre": "E", "numero": 7 },
            { "nombre": "F", "numero": 8 },
            { "nombre": "F#", "numero": 9},
            { "nombre": "G", "numero": 10 },
            { "nombre": "G#", "numero": 11 }
        ]
        let notaBajo = undefined;

        let spl = textoentrada.split("/");
        if (spl.length > 1)
        {
            textoentrada = spl[0];
            notaBajo = this.nuevanota(spl[1]);
        }

        let textoMayuscula = textoentrada.toUpperCase();
        const nota = notas.find(
            n =>
                textoMayuscula.indexOf(n.nombre) >= 0
        );

        try {
            if (textoentrada[0] == '*' || textoentrada[0] == 'x') {
                let repeticion = textoentrada.replace("*", "").replace("x", "");
                return {
                    nombre: "x" + repeticion,
                    repetir: parseInt(repeticion),
                    tipo: "repeat",
                    decodificadaOk: true
                };
            }
            if (textoentrada[0] == '(' || textoentrada[0] == '|' || textoentrada[0] == ')') {
                let repeticion = textoentrada[1];
                return {
                    nombre: "|",
                    tipo: "init",
                    decodificadaOk: true
                };
            }

        } catch (e) {

            return {
                nombre: textoentrada,
                numeroNota: 0,
                mayor: true,
                numeroModificador: 0,
                decodificadaOk: false
            };
        }

        if (!nota)
        {
            return {
                nombre: textoentrada,
                numeroNota: 0,
                mayor: true,
                numeroModificador: 0,
                decodificadaOk: false
            };
        }
        let numeroModificador = 0;

        textoMayuscula = textoMayuscula.replace(nota.nombre, "");
        textoMayuscula = textoMayuscula.replace(nota.alt, "");
        let esMayor = true;
        if (textoMayuscula.indexOf("M") >= 0) {
            esMayor = false;
            textoMayuscula = textoMayuscula.replace("M", "");
        }

        if (textoMayuscula.indexOf("7") >= 0) {
            numeroModificador = 7;
            textoMayuscula = textoMayuscula.replace("7", "");
        }

        if (textoMayuscula.indexOf("5") >= 0) {
            numeroModificador = 5;
            textoMayuscula = textoMayuscula.replace("5", "");
        }

        var toNotabjo
        if (notaBajo)
        {
            if (!notaBajo.decodificadaOk) {

                return {
                    nombre: textoentrada,
                    numeroNota: 0,
                    mayor: true,
                    numeroModificador: 0,
                    decodificadaOk: false
                };
            }
            else {
                textoentrada = textoentrada + "/" + spl[1];
                toNotabjo = {
                    numeroNota: notaBajo.numeroNota,
                    mayor: notaBajo.mayor
                    }
            }
        }
        if (textoMayuscula != "")
        {

            return {
                notabajo: toNotabjo,
                nombre: textoentrada,
                numeroNota: 0,
                mayor: true,
                numeroModificador: 0,
                decodificadaOk: false
            };
        }





        return {
            nombre: textoentrada,
            numeroNota: nota.numero,
            mayor: esMayor,
            numeroModificador: numeroModificador,
            decodificadaOk: true,
            notaBajo: notaBajo

        };
    },

    separar: function (str) {
        // Reemplazar dobles espacios y tab por un solo espacio
        str = str.replace("(", "( ");
        str = str.replace(")", "( ");
        str = str.replace("|", "| ");
        str = str.replace("* ", "*");
        str = str.replace("x ", "x");
        str = str.replace("X ", "x");
        str = str.replace(/\s+/g, ' ');

        // Separar por espacios y agrupar lo que está entre !
        const regex = /([^!\s]+)|!([^!]+)!/g;
        const matches = str.matchAll(regex);
        const resultado = [];
        for (const match of matches) {
            resultado.push(match[1] || match[2]);
        }
        return resultado;
    },
    transformar: function (arr) {
        let resultadofinal = [];
        arr.forEach((acordes) => {
            const resultado = [];
            const notas = acordes.split(' ');
            const len = notas.length;
            if (len === 1) {

                var primernota = this.nuevanota(notas[0]);
                resultado.push(primernota);
                if (!primernota.tipo)
                    primernota.tipo = '';
                if (primernota.tipo != "init") {
                    resultado.push(this.nuevanota(""));
                    resultado.push(this.nuevanota(""));
                    resultado.push(this.nuevanota(""));
                }
            }
            else if (len === 2) {
                resultado.push(this.nuevanota(notas[0]));
                resultado.push(this.nuevanota(""));
                resultado.push(this.nuevanota(notas[1]));
                resultado.push(this.nuevanota(""));
            }
            else if (len === 3) {
                resultado.push(this.nuevanota(notas[0]));
                resultado.push(this.nuevanota(""));
                resultado.push(this.nuevanota(notas[1]));
                resultado.push(this.nuevanota(notas[2]));
            }
            else if (len > 3) {
                resultado.push(this.nuevanota(notas[0]));
                resultado.push(this.nuevanota(notas[1]));
                resultado.push(this.nuevanota(notas[2]));
                resultado.push(this.nuevanota(notas[3]));
            }

            resultadofinal.push(resultado);

        });
        return resultadofinal;
    },
    textotoarenglon: function (texto)
    {
        var renglon = {
            acordesentexto: texto,
            tipo: "",
            acordes: [],
            letra: "",
        }
            var arrSep = this.separar(texto);
            var acordes = this.transformar(arrSep);

            let totalAcordes = 0;
            let totalAcordesConErrores = 0;
            acordes.forEach(ac => {
                ac.forEach(cuar => {
                    if (cuar.nombre != "") {
                        totalAcordes++;
                        if (!cuar.decodificadaOk)
                            totalAcordesConErrores++;

                    }
                })
            });
        if (totalAcordes > 0)
            renglon.tipo = "musica";

            renglon.letra = "";
            if (totalAcordesConErrores >= 2)
            {
                acordes = [];
                renglon.letra = texto;
                renglon.tipo = "texto";
            }
            if (totalAcordes < 2) {
                if (totalAcordesConErrores > 0)
                {
                    acordes = [];
                    renglon.letra = texto;

                    renglon.tipo = "texto";
                }
            }
            renglon.acordes = acordes;
            return renglon;
    },

    cargarcancion: function (cancion) {
        var ret = {
            tempo: 120,
            renglones: [],
        }

        cancion.renglones.forEach(texto => {
            ret.renglones.push(helperMusica.textotoarenglon(texto));
        });

        return ret;

    }

}