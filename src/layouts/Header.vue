<template>
  <div class="header-wrap">
    <header class="header-main">
      <div class="app-breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="item in breadcrumb" :key="item">
            {{ item }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="app-navs">
        <div class="name">{{ user.name }}</div>
        <div class="line">|</div>
        <div class="dropdown">
          <el-dropdown @command="handleDropdownClick">
            <span> 操作<i class="el-icon-arrow-down" /> </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="logout">注销</el-dropdown-item>
                <el-dropdown-item command="change">更换账号</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </header>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
// import { Logout } from '@/apis/login'
import { store } from '@/store'
// import { ElMessage } from 'element-plus'
// import router from 'vue-router'

export default defineComponent({
  name: 'AppHeader',
  setup () {
    const user = store.getters.userData

    const handleLogout = () => {}
    const handleDropdownClick = (value: string) => {
      switch (value) {
        case 'logout':
          handleLogout()
          break
        case 'change':
          handleLogout()
          break
      }
    }

    return {
      user,
      handleDropdownClick
    }
  },
  computed: {
    ...mapGetters(['breadcrumb']),
  }
})
</script>
<style lang="scss" scoped>
.header-wrap {
  .header-main {
    display: flex;
    height: 100%;
    justify-content: space-between;
    align-items: center;

    .app-navs {
      display: flex;
      .line {
        margin: 0 9px;
        color: #c0c4cc;
      }
      & > div {
        user-select: none;
      }
    }
  }
}
</style>
