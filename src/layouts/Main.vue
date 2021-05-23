<template>
  <el-container>
    <el-aside><app-aside /></el-aside>
    <el-container class="app-container">
      <el-header>
        <app-header />
        <!-- <app-tabs /> -->
      </el-header>
      <el-main style="margin-top: 25px">
        <router-view v-slot="{ Component }">
          <transition name="el-fade-in" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import AppHeader from './Header.vue'
import AppAside from './Aside.vue'
export default defineComponent({
  components: {
    AppHeader,
    AppAside
  }
})
</script>
<style lang="scss" scoped>
.el-aside {
  background-color: #fafafa;
  width: 220px !important;

  .aside-wrap {
    width: 200px;
  }

  :deep(.logo) {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1002;
    width: 220px;
    height: 49px;
    line-height: 50px;
    padding: 0 15px;
    box-sizing: border-box;
    overflow: hidden;
    text-align: center;
    font-weight: 300;
    background-repeat: no-repeat;
    background-position: center center;
    background-color: #20222A !important;
    color: rgba(255,255,255,.8);
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 15%);
  }

  :deep(.app-menus) {
    width: 220px;
    margin-top: 50px;
    background: 0 0;
    position: relative;
    background-color: #393D49;
    color: #fff;
    border-radius: 2px;
    font-size: 0;
  }
}
.el-header {
  position: fixed;
  top: 0;
  left: 0;  
  width: 100%;
  height: 50px !important;
  line-height: 50px;
  border-bottom: none;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
  box-sizing: border-box;
  background-color: #fff;
  z-index: 1000;
}
.el-main {
  margin-top: 50px !important;
}
.app-container {
  min-width: 800px;
}
</style>
