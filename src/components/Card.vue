<template>
    <div class="card" :style="{'border-left-color': data.type === 'good' ? 'green' : 'red'}">
        <p>{{data.material}}</p>
        <p>PO: {{data.orders}}</p>
        <p>CA: {{data.cartons}}</p>
    </div>
</template>

<script lang="ts">
    import {Vue, Component, Prop, Watch, Emit} from 'vue-property-decorator';

    @Component({})
    export default class Card extends Vue {
        @Prop() data!: any;
    }
</script>

<style scoped>
    .card {
        border: 1px solid #dfdfdf;
        border-left-width: 5px;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        /*-webkit-box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.75);
        -moz-box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.75);
        box-shadow: 2px 2px 1px 0px rgba(0,0,0,0.75);*/
    }

    .card p {
        border-bottom: 1px solid #dfdfdf;
        margin: 0 2px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .card p:last-child {
        border-bottom: 0;
    }

    @media (min-width: 3840px) and (max-width: 7680px) {
        .card {
            width: 600px;
            height: 400px;
            margin: 15px;
        }
    }

    @media (min-device-width: 1920px) and (max-width: 3840px) {
        .card {
            width: 200px;
            height: 150px;
            margin: 10px;
        }
    }

    @media (max-device-width: 1920px) {
        .card {
            width: 100px;
            height: 100px;
            margin: 5px;
        }
    }


</style>
