<template>
    <div class="card" :style="{'border-left-color': data.type === 'good' ? '#64bd63' : '#dd5826'}">
        <p class="material">{{data.material}}</p>
        <table class="table">
            <tbody>
            <tr>
                <td title="Production Orders"><i class="fa fa-copy"></i></td>
                <td style="text-align: right; font-weight: bold">{{data.orders}}</td>
            </tr>
            <tr>
                <td title="Folding Boxes"><i class="fa fa-cubes"></i></td>
                <td style="text-align: right; font-weight: bold">{{data.cartons}}</td>
            </tr>
            </tbody>
        </table>
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
        border-left-width: 8px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        cursor: pointer;
        /*-webkit-box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.75);
        -moz-box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.75);
        box-shadow: 2px 2px 1px 0px rgba(0,0,0,0.75);*/
    }

    .card p {
        margin: 0 4px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: left;
    }

    p.material {
        text-align: center;
        font-weight: bold;
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
            width: 120px;
            height: 120px;
            margin: 5px;
            font-size: 10px;
        }
    }


</style>
