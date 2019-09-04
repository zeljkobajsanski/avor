<template>
  <div id="app">
    <div class="outer-grid" :style="gridStyles">
      <!--  HEADER-->
      <!--  Header for good orders-->
      <div v-for="(date, ix) in datesForGood" :style="{'grid-row': 1, 'grid-column': ix + 2}"
           class="grid-columns-header">
        <p>
          {{date}}
        </p>
      </div>
      <!--  SPLITTER -->
      <div v-if="view === 2" class="splitter"></div>

      <!--  Header for good orders-->
      <div v-for="(date, ix) in datesForBad" :style="{'grid-row': 1, 'grid-column': ix + 3 + 2}"
           class="grid-columns-header">
        <p>
          {{date}}
        </p>
      </div>
      <!--  ./HEADER-->
      <!--  ROWS-HEADER-->
      <div v-for="(group, ix1) in groups" :style="{'grid-column': 1, 'grid-row': ix1 + 2}" class="group-header">
        <p>
          {{group}}
        </p>
      </div>
      <!--  ./ROWS-HEADER-->

      <!--      CELLS-->
      <Cell v-for="cell in cells" :row="cell.row" :column="cell.column">
        <Card v-for="item in cellContent(cell.rowObject, cell.columnObject)" :data="item"></Card>
      </Cell>
      <!--    ./CELLS-->

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
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
  groups = ['PG-1', 'PG-2', 'PG-3', 'PG-4', 'PG-5'];
  items = [
    {type: 'good', group: 'PG-1', date: '2019-09-03'},
    {type: 'good', group: 'PG-1', date: '2019-09-03'},
    {type: 'good', group: 'PG-2', date: '2019-09-02'},
    {type: 'bad', group: 'PG-3', date: '2019-09-02'},
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

  get cells() {
    return matrix(this.groups, this.datesForGood);
  }

  cellContent(rowObject: string, columnObject: string) {
    return this.items.filter(item => item.group === rowObject && item.date === columnObject)
  }

  gridStyles = {
    'grid-template-columns': `100px 1fr 1fr ${this.view === 2 ? '2px' : '1fr'} 1fr 1fr`,
    'grid-template-rows': `50px repeat(${this.groups.length}, 1fr)`
  };
}
</script>

<style>
  button {
    margin: 5px;
  }

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
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-90deg);
  }

  @media (min-width: 3840px) and (max-width: 7680px) {
    .item {
      width: 600px;
      height: 400px;
      margin: 15px;
    }
  }

  @media (min-width: 1920px) and (max-width: 3840px) {
    .item {
      width: 300px;
      height: 200px;
      margin: 10px;
    }
  }

  @media (min-width: 1024px) and (max-width: 1920px) {
    .item {
      width: 150px;
      height: 100px;
      margin: 5px;
    }
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

  .splitter {
    height: 100%;
    width: 2px;
    background-color: black;
    grid-column: 4;
    grid-row-start: 1;
    grid-row-end: -1;
  }
</style>
