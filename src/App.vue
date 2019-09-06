<template>
    <div id="app">
        <div class="outer-grid" :style="gridStyles">
            <!--  HEADER-->
            <!--<div :style="headerStyleGood" v-if="view != 1" class="top-header" style="grid-template-columns: 1fr auto; cursor: pointer;">
                <p class="text-center" @click="increaseViewIndex()">Ready for production</p>
                <i class="fa fa-caret-left fa-2x" style="margin-right: 10px; color: #dfdfdf" @click="decreaseViewIndex()"></i>
            </div>
            <div :style="headerStyleBad" v-if="view != 3" class="top-header" style="grid-template-columns: auto 1fr; cursor: pointer;">
                <i class="fa fa-caret-right fa-2x" style="margin-left: 14px; color: #dfdfdf" @click="increaseViewIndex()"></i>
                <p class="text-center" @click="decreaseViewIndex()">Bad</p>
            </div>-->

            <div :style="headerStyleGood" v-if="view != 1" style="cursor: pointer; font-weight: bold">
                <p class="text-center header-caption" @click="toggleIncreaseViewIndex()">Ready for production</p>
            </div>
            <div :style="headerStyleBad" v-if="view != 3" style="cursor: pointer; font-weight: bold">
                <p class="text-center header-caption" @click="toggleDecreaseViewIndex()">Bad</p>
            </div>

            <!--  Header for good orders-->
            <div v-for="(date, ix) in datesForGood"
                 :style="{'grid-row': 2, 'grid-column': ix + 2, 'border-left': ix === 0 ? '1px solid #dfdfdf' : ''}"
                 class="grid-columns-header">
                <p>
                    {{date}}
                </p>
            </div>
            <!--  SPLITTER -->
            <div v-if="view === 2" class="splitter"></div>

            <!--  Header for bad orders-->
            <div v-for="(date, ix) in datesForBad"
                 :style="{'grid-row': 2, 'grid-column': ix + offest + 2, 'border-left': ix === 0 ? '1px solid #dfdfdf' : ''}"
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
                  :items="cellContent('good', cell.rowObject, cell.columnObject)"
                  :max-rows="groups.length">
            </Cell>

            <Cell v-for="cell in cellsForBadOrders"
                  :row="cell.row + 1"
                  :column="cell.column + offest"
                  :items="cellContent('bad', cell.rowObject, cell.columnObject)"
                  :max-rows="groups.length">
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
            {
                type: 'good',
                group: 'PG-1',
                date: '2019-09-04',
                material: 'PEGASYS 180MCG/0.5ML 4ASDA US',
                orders: 15,
                cartons: 200,
                note: 'Customer must be informed'
            },
            {
                type: 'good',
                group: 'PG-1',
                date: '2019-09-04',
                material: 'HERCEPTI 440MG 1VILY IV COPK ZA',
                orders: 15,
                cartons: 200
            },
            {
                type: 'good',
                group: 'PG-1',
                date: '2019-09-04',
                material: 'EMICIZUM 150MG/1ML 1VIAL SC NL',
                orders: 15,
                cartons: 200
            },
            {
                type: 'good',
                group: 'PG-1',
                date: '2019-09-04',
                material: 'TAMIFLU 75MG 10CAPH FR',
                orders: 15,
                cartons: 200
            },
            {
                type: 'good',
                group: 'PG-1',
                date: '2019-09-04',
                material: 'DORMICUM 7.5MG 10TAFI SK',
                orders: 15,
                cartons: 200
            },
            {
                type: 'good',
                group: 'PG-1',
                date: '2019-09-04',
                material: 'MABTHERA 1400MG/11.7ML 1VIAL SC GR',
                orders: 15,
                cartons: 200
            },
            {
                type: 'good',
                group: 'PG-1',
                date: '2019-09-04',
                material: 'AVASTIN 400MG/16ML 1VIAL PK',
                orders: 15,
                cartons: 200
            },
            {
                type: 'good',
                group: 'PG-2',
                date: '2019-09-03',
                material: 'TARCEVA 150MG 30TAFI AT-DE',
                orders: 15,
                cartons: 200
            },
            {
                type: 'good',
                group: 'PG-2',
                date: '2019-09-03',
                material: 'ESBRIET 267MG CAPH GB FOC',
                orders: 15,
                cartons: 200
            },
            {
                type: 'good',
                group: 'PG-2',
                date: '2019-09-03',
                material: 'KADCYLA 100MG 1VILY IN',
                orders: 15,
                cartons: 200
            },
            {
                type: 'good',
                group: 'PG-2',
                date: '2019-09-03',
                material: 'MADOPAR 200/50MG 100 CAPH DK',
                orders: 15,
                cartons: 200
            },
            {
                type: 'bad',
                group: 'PG-3',
                date: '2019-09-03',
                material: 'LARIAM 250MG 8TABL FI',
                orders: 15,
                cartons: 200
            },
            {
                type: 'bad',
                group: 'PG-4',
                date: '2019-09-04',
                material: 'ROFERONA 3 000 000IU/0.5ML 1ASRG CL',
                orders: 15,
                cartons: 200
            },
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
                'grid-template-rows': `50px 25px repeat(${this.groups.length}, 1fr)`
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

        toggleDecreaseViewIndex() {
            if (this.view === 1) {
                ++this.view;
            } else {
                --this.view;
            }
        }

        toggleIncreaseViewIndex() {
            if (this.view === 3) {
                --this.view;
            } else {
                ++this.view;
            }
        }

    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Montserrat:400,800&display=swap');
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
        background-color: #dfdfdf;
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
        /*transform: rotate(270deg);*/
        position: relative;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%) rotate(270deg);
        text-align: center;
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
        display: grid;
        align-items: center;
    }

    .splitter {
        height: 100%;
        width: 25px;
        background-color: #dfdfdf;
        grid-column: 4;
        grid-row-start: 1;
        grid-row-end: -1;
    }

    p, span, td {
        font-family: 'Montserrat', sans-serif;
    }

    .header-caption {
        opacity: 0.7;
    }

    .header-caption:hover {
        opacity: 1;
    }

    html {
        height: 100%;
    }

</style>
