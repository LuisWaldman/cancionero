﻿var DataInstrumentos = [
    { instrumentoid: 0, nombre: "Acoustic Grand (piano de cola)", archivo: "acoustic_grand_piano" },
    { instrumentoid: 1, nombre: "Bright Acoustic (piano brillante)", archivo: "bright_acoustic_piano" },
    { instrumentoid: 2, nombre: "Electric Grand (piano de cola eléctrico)", archivo: "electric_guitar_clean" },
    { instrumentoid: 3, nombre: "Honky-Tonk (piano honky-tonk)", archivo: "honkytonk_piano" },
    { instrumentoid: 4, nombre: "Electric Piano 1 (piano eléctrico 1)", archivo: "electric_piano_1" },
    { instrumentoid: 5, nombre: "Electric Piano 2 (piano eléctrico 2)", archivo: "electric_piano_2" },
    { instrumentoid: 6, nombre: "Harpsichord (clave)", archivo: "harpsichord" },
    { instrumentoid: 7, nombre: "Clavinet", archivo: "clavinet" },
    { instrumentoid: 8, nombre: "Celesta", archivo: "celesta" },
    { instrumentoid: 9, nombre: "Glockenspiel", archivo: "glockenspiel" },
    { instrumentoid: 10, nombre: "Music Box (caja de música)", archivo: "music_box" },
    { instrumentoid: 11, nombre: "Vibraphone (vibráfono)", archivo: "vibraphone" },
    { instrumentoid: 12, nombre: "Marimba", archivo: "marimba" },
    { instrumentoid: 13, nombre: "Xylophone (xilófono)", archivo: "xylophone" },
    { instrumentoid: 14, nombre: "Tubular Bells (campanas tubulares)", archivo: "tubular_bells" },
    { instrumentoid: 15, nombre: "Dulcimer", archivo: "dulcimer" },
    { instrumentoid: 16, nombre: "Drawbar Organ (órgano Hammond)", archivo: "drawbar_organ" },
    { instrumentoid: 17, nombre: "Percussive Organ (órgano percusivo)", archivo: "pan_flute" },
    { instrumentoid: 18, nombre: "Rock Organ (órgano de rock)", archivo: "reverse_cymbal" },
    { instrumentoid: 19, nombre: "Church Organ (órgano de iglesia)", archivo: "church_organ" },
    { instrumentoid: 20, nombre: "Reed Organ (armonio)", archivo: "recorder" },
    { instrumentoid: 21, nombre: "Accordion (acordeón)", archivo: "accordion" },
    { instrumentoid: 22, nombre: "Harmonica (armónica)", archivo: "harmonica" },
    { instrumentoid: 23, nombre: "Tango Accordion (bandoneón)", archivo: "tango_accordion" },
    { instrumentoid: 24, nombre: "Nylon String Guitar (guitarra con cuerdas de nailon)", archivo: "" },
    { instrumentoid: 25, nombre: "Steel String Guitar (guitarra con cuerdas de acero)", archivo: "steel_drums" },
    { instrumentoid: 26, nombre: "Electric Jazz Guitar (guitarra eléctrica de jazz)", archivo: "electric_guitar_jazz" },
    { instrumentoid: 27, nombre: "Electric Clean Guitar (guitarra eléctrica limpia)", archivo: "electric_grand_piano" },
    { instrumentoid: 28, nombre: "Electric Muted Guitar (guitarra eléctrica asordinada)", archivo: "electric_guitar_muted" },
    { instrumentoid: 29, nombre: "Overdriven Guitar (guitarra eléctrica saturada)", archivo: "overdriven_guitar" },
    { instrumentoid: 30, nombre: "Distortion Guitar (guitarra eléctrica distorsionada)", archivo: "distortion_guitar" },
    { instrumentoid: 31, nombre: "Guitar Harmonics (armónicos de guitarra)", archivo: "guitar_harmonics" },
    { instrumentoid: 32, nombre: "Acoustic Bass (contrabajo pizzicato)", archivo: "acoustic_bass" },
    { instrumentoid: 33, nombre: "Electric Bass - finger) (bajo electrico)", archivo: "electric_bass_finger" },
    { instrumentoid: 34, nombre: "Electric Bass - pick) (bajo eléctrico con púa)", archivo: "electric_bass_pick" },
    { instrumentoid: 35, nombre: "Fretless Bass (bajo sin trastes)", archivo: "fretless_bass" },
    { instrumentoid: 36, nombre: "Slap Bass 1 (bajo slap 1)", archivo: "sitar" },
    { instrumentoid: 37, nombre: "Slap Bass 2 (bajo slap 2)", archivo: "slap_bass_1" },
    { instrumentoid: 38, nombre: "Synth Bass 1 (bajo sintético 1)", archivo: "synth_bass_1" },
    { instrumentoid: 39, nombre: "Synth Bass 2 (bajo sintético 2)", archivo: "synth_bass_2" },
    { instrumentoid: 40, nombre: "Violin (violín)", archivo: "violin" },
    { instrumentoid: 41, nombre: "Viola", archivo: "viola" },
    { instrumentoid: 42, nombre: "Cello (violonchelo)", archivo: "cello" },
    { instrumentoid: 43, nombre: "Contrabass (contrabajo con arco)", archivo: "contrabass" },
    { instrumentoid: 44, nombre: "Tremolo Strings (trémolo de cuerdas)", archivo: "tremolo_strings" },
    { instrumentoid: 45, nombre: "Pizzicato Strings (cuerdas pizzicato)", archivo: "piccolo" },
    { instrumentoid: 46, nombre: "Orchestral Strings (cuerdas de orquesta)", archivo: "orchestra_hit" },
    { instrumentoid: 47, nombre: "Timpani (timbales)", archivo: "timpani" },
    { instrumentoid: 48, nombre: "String Ensemble 1 (ensamble de cuerdas 1)", archivo: "string_ensemble_1" },
    { instrumentoid: 49, nombre: "String Ensemble 2 (ensamble de cuerdas 2)", archivo: "string_ensemble_2" },
    { instrumentoid: 50, nombre: "SynthStrings 1 (cuerdas sintéticas 1)", archivo: "synth_strings_1" },
    { instrumentoid: 51, nombre: "SynthStrings 2 (cuerdas sintéticas 1)", archivo: "synth_strings_2" },
    { instrumentoid: 52, nombre: "Choir Aahs (coro aahs)", archivo: "choir_aahs" },
    { instrumentoid: 53, nombre: "Voice Oohs (voces oohs)", archivo: "voice_oohs" },
    { instrumentoid: 54, nombre: "Synth Voice (voz sintética)", archivo: "synth_brass_2" },
    { instrumentoid: 55, nombre: "Orchestra Hit (acorde de orquesta)", archivo: "orchestral_harp" },
    { instrumentoid: 56, nombre: "Trumpet (trompeta)", archivo: "trumpet" },
    { instrumentoid: 57, nombre: "Trombone (trombón)", archivo: "trombone" },
    { instrumentoid: 58, nombre: "Tuba (tuba)", archivo: "tuba" },
    { instrumentoid: 59, nombre: "Muted Trumpet (trompeta con sordina)", archivo: "muted_trumpet" },
    { instrumentoid: 60, nombre: "French Horn (corno)", archivo: "french_horn" },
    { instrumentoid: 61, nombre: "Brass Section (sección de metales)", archivo: "brass_section" },
    { instrumentoid: 62, nombre: "SynthBrass 1 (metales sintéticos 1)", archivo: "synth_choir" },
    { instrumentoid: 63, nombre: "SynthBrass 2 (metales sintéticos 2)", archivo: "synth_drum" },
    { instrumentoid: 64, nombre: "Soprano Sax (saxo soprano)", archivo: "slap_bass_2" },
    { instrumentoid: 65, nombre: "Alto Sax (saxo alto)", archivo: "alto_sax" },
    { instrumentoid: 66, nombre: "Tenor Sax (saxo tenor)", archivo: "tenor_sax" },
    { instrumentoid: 67, nombre: "Baritone Sax (saxo barítono)", archivo: "baritone_sax" },
    { instrumentoid: 68, nombre: "Oboe", archivo: "oboe" },
    { instrumentoid: 69, nombre: "English Horn (corno inglés)", archivo: "english_horn" },
    { instrumentoid: 70, nombre: "Bassoon (fagot)", archivo: "bassoon" },
    { instrumentoid: 71, nombre: "Clarinet (clarinete)", archivo: "clarinet" },
    { instrumentoid: 72, nombre: "Piccolo (flautín)", archivo: "percussive_organ" },
    { instrumentoid: 73, nombre: "Flute (flauta)", archivo: "flute" },
    { instrumentoid: 74, nombre: "Recorder (flauta dulce)", archivo: "pizzicato_strings" },
    { instrumentoid: 75, nombre: "Pan Flute (flauta de pan)", archivo: "pad_8_sweep" },
    { instrumentoid: 76, nombre: "Blown Bottle (botella soplada)", archivo: "blown_bottle" },
    { instrumentoid: 77, nombre: "Sakuhachi", archivo: "rock_organ" },
    { instrumentoid: 78, nombre: "Whistle (silbido)", archivo: "whistle" },
    { instrumentoid: 79, nombre: "Ocarina", archivo: "ocarina" },
    { instrumentoid: 80, nombre: "Lead 1 - square (solo 1 onda cuadrada)", archivo: "lead_1_square" },
    { instrumentoid: 81, nombre: "Lead 2 - sawtooth (solo 2 diente de sierra)", archivo: "lead_2_sawtooth" },
    { instrumentoid: 82, nombre: "Lead 3 - calliope (solo 3 órgano a vapor)", archivo: "lead_3_calliope" },
    { instrumentoid: 83, nombre: "Lead 4 - chiff (solo 4 órgano)", archivo: "lead_4_chiff" },
    { instrumentoid: 84, nombre: "Lead 5 - charang (solo 5 charanga)", archivo: "lead_5_charang" },
    { instrumentoid: 85, nombre: "Lead 6 - voice (solo 6 voz)", archivo: "lead_6_voice" },
    { instrumentoid: 86, nombre: "Lead 7 - fifths (solo 7 quintas)", archivo: "lead_7_fifths" },
    { instrumentoid: 87, nombre: "Lead 8 - bass+lead (solo 8 bajo+solo)", archivo: "lead_8_bass__lead" },
    { instrumentoid: 88, nombre: "Pad 1 - new age (fondo 1 New Age)", archivo: "" },
    { instrumentoid: 89, nombre: "Pad 2 - warm (fondo 2 cálido)", archivo: "pad_1_new_age" },
    { instrumentoid: 90, nombre: "Pad 3 - polysynth (fondo 3 poli-sintetizador)", archivo: "pad_2_warm" },
    { instrumentoid: 91, nombre: "Pad 4 - choir (fondo 4 coro)", archivo: "pad_3_polysynth" },
    { instrumentoid: 92, nombre: "Pad 5 - bowed (fondo 5 frotado con arco)", archivo: "pad_4_choir" },
    { instrumentoid: 93, nombre: "Pad 6 - metallic (fondo 6 metálico)", archivo: "pad_5_bowed" },
    { instrumentoid: 94, nombre: "Pad 7 - halo (fondo 7 halo)", archivo: "pad_6_metallic" },
    { instrumentoid: 95, nombre: "Pad 8 - sweep (fondo 8 barrido de armónicos)", archivo: "pad_7_halo" },
    { instrumentoid: 96, nombre: "FX 1 - rain (efecto 1 lluvia)", archivo: "fx_1_rain" },
    { instrumentoid: 97, nombre: "FX 2 - soundtrack (efecto banda sonora)", archivo: "fx_2_soundtrack" },
    { instrumentoid: 98, nombre: "FX 3 - crystal (efecto 3 cristalino)", archivo: "fx_3_crystal" },
    { instrumentoid: 99, nombre: "FX 4 - atmosphere (efecto 4 atmósfera)", archivo: "fx_4_atmosphere" },
    { instrumentoid: 100, nombre: "FX 5 - brightness (efecto 5 brillo)", archivo: "fx_5_brightness" },
    { instrumentoid: 101, nombre: "FX 6 - goblins (efecto 6 duendes)", archivo: "fx_6_goblins" },
    { instrumentoid: 102, nombre: "FX 7 - echoes (efecto 7 ecos)", archivo: "fx_7_echoes" },
    { instrumentoid: 103, nombre: "FX 8 - sci-fi (efecto 8 ciencia ficción)", archivo: "fx_8_scifi" },
    { instrumentoid: 104, nombre: "Sitar", archivo: "shanai" },
    { instrumentoid: 105, nombre: "Banjo", archivo: "banjo" },
    { instrumentoid: 106, nombre: "Shamisen", archivo: "shakuhachi" },
    { instrumentoid: 107, nombre: "Koto", archivo: "koto" },
    { instrumentoid: 108, nombre: "Kalimba", archivo: "kalimba" },
    { instrumentoid: 109, nombre: "Bagpipe (gaita)", archivo: "bagpipe" },
    { instrumentoid: 110, nombre: "Fiddle (violín folclórico)", archivo: "fiddle" },
    { instrumentoid: 111, nombre: "Shanai", archivo: "shamisen" },
    { instrumentoid: 112, nombre: "Tinkle Bell (campanillas)", archivo: "tinkle_bell" },
    { instrumentoid: 113, nombre: "Agogo (agogó)", archivo: "agogo" },
    { instrumentoid: 114, nombre: "Steel Drums (tambores de metal)", archivo: "soprano_sax" },
    { instrumentoid: 115, nombre: "Woodblock", archivo: "woodblock" },
    { instrumentoid: 116, nombre: "Taiko Drum (tambor de acero)", archivo: "taiko_drum" },
    { instrumentoid: 117, nombre: "Melodic Tom (tom melódico)", archivo: "melodic_tom" },
    { instrumentoid: 118, nombre: "Synth Drum (tambor sintético)", archivo: "synth_brass_1" },
    { instrumentoid: 119, nombre: "Reverse Cymbal (plato en reversa)", archivo: "reed_organ" },
    { instrumentoid: 120, nombre: "Guitar Fret Noise (ruido de trastes de guitarra)", archivo: "guitar_fret_noise" },
    { instrumentoid: 121, nombre: "Breath Noise (respiración)", archivo: "breath_noise" },
    { instrumentoid: 122, nombre: "Seashore (olas de mar)", archivo: "seashore" },
    { instrumentoid: 123, nombre: "Bird Tweet (piar de pájaro)", archivo: "bird_tweet" },
    { instrumentoid: 124, nombre: "Telephone Ring (timbre de teléfono)", archivo: "telephone_ring" },
    { instrumentoid: 125, nombre: "Helicopter (helicóptero)", archivo: "helicopter" },
    { instrumentoid: 126, nombre: "Applause (aplauso)", archivo: "applause" },
    { instrumentoid: 127, nombre: "Gunshot (disparo)", archivo: "gunshot" }

];

var helperMidi = {
    valorstring: "",
    inicializar: function ()
    {
        
    },
    getNotaMusico: function (nroNota) {
        var ret = {
            numeroNota: nroNota,
            cuartos: []
        };       

        
        for (var i = 0; i < 4; i++) {
            var diecisextos = []
            for (var j = 0; j < 4; j++) {
                
                diecisextos.push(0);
            }
            ret.cuartos.push(diecisextos);
        }
        return ret;
    },
    InicializarInstrumento: function (archivoid, canal)
    {

        var ar = DataInstrumentos[archivoid];
        
        MIDI.loadPlugin({
            soundfontUrl: "./soundfont/",
            instrument: ar.archivo,
            onprogress: function (state, progress) {
            },
            onsuccess: function () {
                console.log(ar.archivo + " cargada");
                MIDI.programChange(canal, ar.instrumentoid);
                MIDI.setVolume(canal, 127);
            }
        });
    },
    setearvolumen(volumen, canal) {
        MIDI.setVolume(canal, volumen);
    },
    tocar_nota(nota, canal, delay, duracion, velocity) {
        if (!delay)
            delay = 0;
        if (!velocity)
            velocity = 127;
        if (!duracion)
            duracion = 0.75;
        MIDI.noteOn(canal, nota, velocity, delay);
        MIDI.noteOff(canal, nota, delay + duracion);

    },
    
}

