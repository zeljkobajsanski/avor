<template>
  <div id="app">
    <div class="outer-grid">
      <div v-for="(date, ix) in goodDates" :style="{'grid-row': 1, 'grid-column': ix + 2}" class="date-header"><p>
        {{date}}</p></div>
      <div v-for="(group, ix1) in groups" :style="{'grid-column': 1, 'grid-row': ix1 + 2}" class="group-header"><p>
        {{group}}</p></div>
      <div v-for="p in itemPlaceholders" :style="{'grid-row': p.row, 'grid-column': p.column}" class="item-placeholder">
        <div v-for="item in getItems(p)" class="item"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class App extends Vue {
  goodDates = ['2019-09-03', '2019-09-02', '2019-09-01', '2019-08-31', '2019-08-30'];
  groups = ['PG1', 'PG2', 'PG3', 'PG4'];
  items = [{g: 1, d: 1}, {g: 1, d: 1}, {g: 1, d: 1}, {g: 2, d: 1}, {g: 2, d: 3}, {g: 2, d: 3}, {g: 2, d: 3}, {
    g: 2,
    d: 3
  }, {g: 2, d: 3}, {g: 2, d: 3}];

  get itemPlaceholders() {
    const p: any[] = [];
    this.groups.forEach((group, ix) => {
      this.goodDates.forEach((date, ix1) => {
        p.push({row: ix + 2, column: ix1 + 2, group: group, date: date});
      });
    });

    return p;
  }

  getItems(placeholder: any) {
    return this.items.filter(i => i.g === placeholder.row - 1 && i.d === placeholder.column - 1);
  }
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
    grid-template-columns: 100px 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 50px repeat(4, 1fr);
    grid-gap: 0;
  }

  .date-header {
    justify-self: stretch;
    text-align: center;
    border-top: 1px solid #dfdfdf;
    border-right: 1px solid #dfdfdf;
    /*transform: translate(0, 25%);*/
  }

  .date-header:first-child {
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
</style>
