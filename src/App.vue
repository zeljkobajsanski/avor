<template>
    <div id="app">
        <div class="outer-grid" :style="gridStyles">
            <!--  HEADER-->
            <div :style="headerStyleGood" v-if="view != 1" class="top-header">
                <span style="align-self: center">Ready for production</span>
                <a href="javascript: void(0);" style="align-self: flex-end;" @click="decreaseViewIndex()" class="btn">
                    <i class="fa fa-caret-left fa-2x"></i>
                </a>
            </div>
            <div :style="headerStyleBad" v-if="view != 3" class="top-header">
                <span style="align-self: center">Bad</span>
                <a href="javascript: void(0);" style="align-self: flex-start;" @click="increaseViewIndex()" class="btn">
                    <i class="fa fa-caret-right fa-2x"></i>
                </a>
            </div>
            <!--  Header for good orders-->
            <div v-for="(date, ix) in datesForGood" :style="{'grid-row': 2, 'grid-column': ix + 2}"
                 class="grid-columns-header">
                <p>
                    {{date}}
                </p>
            </div>
            <!--  SPLITTER -->
            <div v-if="view === 2" class="splitter"></div>

            <!--  Header for bad orders-->
            <div v-for="(date, ix) in datesForBad" :style="{'grid-row': 2, 'grid-column': ix + offest + 2}"
                 class="grid-columns-header">
                <p>
                    {{date}}
                </p>
            </div>
            <!--  ./HEADER-->
            <!--  ROWS-HEADER-->
            <div v-for="(group, ix1) in groups" :style="{'grid-column': 1, 'grid-row': ix1 + 3}" class="group-header">
                <p>
                    {{group}}
                </p>
            </div>
            <!--  ./ROWS-HEADER-->

            <!--      CELLS-->
            <Cell v-for="cell in cellsForGoodOrders"
                  :row="cell.row + 1"
                  :column="cell.column"
                  :items="cellContent('good', cell.rowObject, cell.columnObject)">
            </Cell>

            <Cell v-for="cell in cellsForBadOrders"
                  :row="cell.row + 1"
                  :column="cell.column + offest"
                  :items="cellContent('bad', cell.rowObject, cell.columnObject)">
            </Cell>
            <!--    ./CELLS-->
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {matrix} from "@/utils/extensions";
    import Cell from "@/components/Cell.vue";
    import Card from "@/components/Card.vue";
    import * as _ from 'lodash';

    @Component({
        components: {
            Cell, Card
        },
    })
    export default class App extends Vue {
        groups = ['PG-1', 'PG-2', 'PG-3', 'PG-4', 'PG-5', 'PG-6', 'PG-7', 'PG-8'];
        items = [
            {type: 'good', group: 'PG-1', date: '2019-09-04'},
            {type: 'good', group: 'PG-1', date: '2019-09-04'},
            {type: 'good', group: 'PG-1', date: '2019-09-04'},
            {type: 'good', group: 'PG-1', date: '2019-09-04'},
            {type: 'good', group: 'PG-1', date: '2019-09-04'},
            {type: 'good', group: 'PG-1', date: '2019-09-04'},
            {type: 'good', group: 'PG-1', date: '2019-09-04'},
            {type: 'good', group: 'PG-2', date: '2019-09-03'},
            {type: 'good', group: 'PG-2', date: '2019-09-03'},
            {type: 'good', group: 'PG-2', date: '2019-09-03'},
            {type: 'good', group: 'PG-2', date: '2019-09-03'},
            {type: 'bad', group: 'PG-3', date: '2019-09-03'},
            {type: 'bad', group: 'PG-4', date: '2019-09-04'},
        ];
        view = 2;
        dates = ['2019-09-04', '2019-09-03', '2019-09-02', '2019-09-01', '2019-08-31'];

        get datesForGood() {
            switch (this.view) {
                case 1:
                    return [];
                case 2:
                    return _.take(this.dates, 2);
                case 3:
                    return _.take(this.dates, 5);
            }
        }

        get datesForBad() {
            switch (this.view) {
                case 3:
                    return [];
                case 2:
                    return _.take(this.dates, 2);
                case 1:
                    return _.take(this.dates, 5);
            }
        }

        get cellsForGoodOrders() {
            return matrix(this.groups, this.datesForGood);
        }

        get cellsForBadOrders() {
            return matrix(this.groups, this.datesForBad);
        }

        cellContent(type: string, rowObject: string, columnObject: string) {
            const items = this.items.filter(item => item.type === type && item.group === rowObject && item.date === columnObject);
            return items;
        }

        get offest() {
            return this.view === 2 ? 3 : 0;
        }

        get gridStyles() {
            return {
                'grid-template-columns': this.view === 2 ? '100px 1fr 1fr 2px 1fr 1fr' : '100px 1fr 1fr 1fr 1fr 1fr',
                'grid-template-rows': `50px 50px repeat(${this.groups.length}, 1fr)`
            };
        };

        get headerStyleGood() {
            return {
                'grid-row': 1,
                'grid-column-start': 2,
                'grid-column-end': this.view === 2 ? 4 : -1,
            }
        }

        get headerStyleBad() {
            return {
                'grid-row': 1,
                'grid-column-start': this.view === 2 ? 4 : 2,
                'grid-column-end': -1,
            }
        }

        decreaseViewIndex() {
            --this.view;
        }

        increaseViewIndex() {
            ++this.view;
        }

    }
</script>

<style>
    #app {
        padding: 5px;
    }

    .outer-grid {
        display: grid;
        grid-gap: 0;
    }

    .grid-columns-header {
        justify-self: stretch;
        text-align: center;
        border-top: 1px solid #dfdfdf;
        border-right: 1px solid #dfdfdf;
        /*transform: translate(0, 25%);*/
    }

    .grid-columns-header:first-child {
        border-left: 1px solid #dfdfdf;
    }

    .date-header p {
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%)
    }

    .group-header {
        border: 1px solid #dfdfdf;
        /*transform: rotate(-90deg);*/
    }

    .group-header p {
        transform: rotate(270deg);
    }

    .item {
        border: 1px solid black;

    }

    .item-placeholder {
        display: flex;
        flex-wrap: wrap;
        border-top: 1px solid #dfdfdf;
        border-right: 1px solid #dfdfdf;
        align-content: start;

    }

    .top-header {
        font-weight: bold;
        display: flex;
        flex-flow: column;
        align-items: stretch;
    }

    .splitter {
        height: 100%;
        width: 2px;
        background-color: black;
        grid-column: 4;
        grid-row-start: 1;
        grid-row-end: -1;
    }
</style>
