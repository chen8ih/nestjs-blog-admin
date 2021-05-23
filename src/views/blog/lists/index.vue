<template>
  <div class="blog-lists-wrap">
    <div class="blog-lists-main">
      <Search></Search>
      <Table></Table>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Search from './components/Search.vue'
import Table from './components/Table.vue'
export default defineComponent({
  name: 'BlogLists',
  components: {
    Search,
    Table
  },
  setup() {
    
  }
})
</script>
