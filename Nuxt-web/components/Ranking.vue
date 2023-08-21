<template>
  <div class="panel_hd items-center">
    <h3 class="title items-center">
      <img src="../assets/images/icon_12.png" alt="">
      {{ title }}
    </h3>
  </div>
  <ul class="col-pd">
    <li v-for="(item, index) in list">
      <nuxt-link :to="`/column/${item.columnValue}/movie/${item.id}`" class="between">
        <div>
          <span class="badge">{{ index + 1 }}</span>
          {{ item.title }}
        </div>
        <span class="text-muted">{{ processingState(item) }}</span>
      </nuxt-link>
    </li>
  </ul>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  list: {
    type: Array,
    default: () => []
  }
})

function processingState(data: {
  currentSeason: number;
  columnValue: string;
  theEnd: string | number;
  currentEpisode: any;
}) {
  if (+data.theEnd === 1) {
    return '已完结'
  }
  return data.columnValue === 'tv' ? `更新至${data.currentEpisode || 0}集` : `更新至${data.currentSeason || 0}季`
}
</script>
