<template>
    <div class="card">

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
        border: 1px solid black;
    }

    @media (min-width: 3840px) and (max-width: 7680px) {
        .card {
            width: 600px;
            height: 400px;
            margin: 15px;
        }
    }

    @media (min-width: 1920px) and (max-width: 3840px) {
        .card {
            width: 300px;
            height: 200px;
            margin: 10px;
        }
    }

    @media (min-width: 1024px) and (max-width: 1920px) {
        .card {
            width: 150px;
            height: 100px;
            margin: 5px;
        }
    }
</style>
