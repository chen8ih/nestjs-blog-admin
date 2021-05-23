<template>
  <div v-if="!item.meta || !item.meta.hidden">
    <el-menu-item
      v-if="!item.children"
      :index="resolvePath(theOnlyOneChild.path)"
    >
      {{ item.meta.title }}
    </el-menu-item>
    <el-submenu v-else :index="basePath">
      <template #title>{{ item.meta.title }}</template>
      <template v-if="item.children">
        <menu-item
          v-for="route in item.children"
          :key="route.path"
          :item="route"
          :base-path="resolvePath('/' + route.path)"
        />
      </template>
    </el-submenu>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import { resolve } from '@/utils'
export default defineComponent({
  props: {
    item: {
      type: Object as PropType<RouteRecordRaw>,
      required: true,
    },
    basePath: {
      type: String,
      required: true,
    }
  },
  setup (props) {
    const showingChildNumber = computed(() => {
      if (props.item.children) {
        const showingChildren = props.item.children.filter((item) => {
          if (item.meta && item.meta.hidden) {
            return false
          } else {
            return true
          }
        })
        return showingChildren.length
      }
      return 0
    })

    const theOnlyOneChild = computed(() => {
      if (showingChildNumber.value > 1) {
        return null
      }
      if (props.item.children) {
        for (const child of props.item.children) {
          if (!child.meta || !child.meta.hidden) {
            return child
          }
        }
      }
      return { ...props.item, path: '' }
    })
    const resolvePath = (routePath: string) => {
      return resolve(props.basePath, `${routePath}`)
    }

    return {
      theOnlyOneChild,
      resolvePath
    }
  }
})
</script>
