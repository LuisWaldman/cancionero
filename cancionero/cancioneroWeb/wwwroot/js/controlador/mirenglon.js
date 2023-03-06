export default {
    data() {
        return {
            checked: false,
        }
    },
    props: {
        renglon: Object,
    },
    
    methods: {
        actualizarcuartos() {
            
        },
        check() { this.checked = !this.checked; }
    },
    template: "#mirenglon"
}