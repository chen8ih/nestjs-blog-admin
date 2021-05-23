<template>
  <div class="aside-wrap">
    <div class="aside-main">
      <div class="logo">
        Chenh Blog
      </div>
      <div class="app-menus">
        <el-scrollbar>
          <el-menu :default-active="activeMenu" unique-opened router>
            <menu-item
              v-for="route in routes"
              :key="route.path"
              :item="route"
              :base-path="route.path"
            ></menu-item>
          </el-menu>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import MenuItem from '@/layouts/MenuItem.vue'
import { customRoutes } from '@/router'
import { mapGetters } from 'vuex'
export default defineComponent({
  name: 'AppAside',
  components: {
    MenuItem
  },
  setup () {
    console.log(customRoutes)
    return {
      routes: customRoutes
    }
  },
  computed: {
    ...mapGetters(['activeMenu'])
  }
})
</script>