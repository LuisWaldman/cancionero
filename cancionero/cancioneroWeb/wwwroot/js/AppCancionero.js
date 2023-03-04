import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
import { ControladorMusica } from './controlador/ControladorMusica.js'
import MyComponent from './nota.js'



export default {
    components: {
        MyComponent
    }
}



let Datos = {
       dataRecibida: ''
}

Datos.dataRecibida = ControladorMusica.data();


createApp({
    data() {
        return Datos;
    }
}).mount('#app')
