<template>
    <div class="cell" :style="style">
        <div ref="carouselExampleControls" class="carousel slide">
            <div class="carousel-inner">
                <div class="carousel-item" v-for="page in pages" :class="{active: page.active}">
                    <div style="display: flex; flex-wrap: wrap; justify-content: center">
                        <Card v-for="item in page.items" :data="item"></Card>
                    </div>
                </div>
            </div>
            <a class="carousel-control-prev" href="#" role="button" data-slide="prev" @click="prev()"
               v-if="pages.length > 1">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#" role="button" data-slide="next" @click="next()"
               v-if="pages.length > 1">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
    </div>
</template>

<script lang="ts">
    import {Vue, Component, Prop, Watch, Emit} from 'vue-property-decorator';
    import Card from "@/components/Card.vue";
    import 'jquery';
    import * as _ from 'lodash';

    declare const $: any;

    @Component({
        components: {Card}
    })
    export default class Cell extends Vue {
        @Prop() row!: number;
        @Prop() column!: number;
        @Prop() items!: any[];
        readonly ITEMS_PER_PAGE = 3;
        $carousel: any;

        mounted() {
            const p = this.pages;
            this.$carousel = $(this.$refs['carouselExampleControls']).carousel({ride: 'carousel', interval: 0});
        }

        get pages() {
            const numbersOfPages = Math.ceil(this.items.length / this.ITEMS_PER_PAGE);
            console.log(numbersOfPages);
            const p = _.times(numbersOfPages, (i: number) => ({
                page: i,
                active: i === 0,
                items: _.drop(this.items, i * this.ITEMS_PER_PAGE).slice(0, this.ITEMS_PER_PAGE)
            }));
            return p;
        }

        get style() {
            return {'grid-row': this.row + 2, 'grid-column': this.column + 2};
        }

        prev() {
            this.$carousel.carousel('prev');
        }

        next() {
            this.$carousel.carousel('next');
        }
    }
</script>

<style scoped>
    .cell {
        border-top: 1px solid #dfdfdf;
        border-right: 1px solid #dfdfdf;
    }

    .carousel-control-prev-icon {
        opacity: 0.1;
        background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' fill='dfdfdf' viewBox='0 0 8 8'><path d='M5.25 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/></svg>");
    }

    .carousel-control-next-icon {
        opacity: 0.3;
        background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' fill='dfdfdf' viewBox='0 0 8 8'><path d='M2.75 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/></svg>");
    }
</style>
