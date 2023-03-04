import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
import MiComponente from '/componentes/nota.vue'

export default {
    components: { Nota }
};

createApp({
    data() {
        return {
            message: 'Hello Vue!'
        }
    }
}).mount('#app')
