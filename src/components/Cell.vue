<template>
    <div class="cell" :style="style">
        <slot></slot>
    </div>
</template>

<script lang="ts">
    import {Vue, Component, Prop, Watch, Emit} from 'vue-property-decorator';

    @Component({})
    export default class Cell extends Vue {
        @Prop() row!: number;
        @Prop() column!: number;

        get style() {
            return {'grid-row': this.row + 2, 'grid-column': this.column + 2};
        }
    }
</script>

<style scoped>
    .cell {
        display: flex;
        flex-wrap: wrap;
        align-content: start;
        border-top: 1px solid #dfdfdf;
        border-right: 1px solid #dfdfdf;
    }
</style>
