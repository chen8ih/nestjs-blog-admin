<template>
  <div class="blog-class-wrap">
    <div class="blog-class-main">
      <div class="blog-class-header">
        <el-buton type="primary" size="medium">
          <i class="el-icon-plus"></i>
          新增分类
        </el-buton>
      </div>
      <div class="blog-class-body">
        <el-row>
          <el-col :span="3" v-for="{item} in state.classLists" :key="item.className">
            <el-card class="box-card">
              {{ item.className }}
              <el-button type="text">删除</el-button>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { FindBlogClass } from '@/apis/blog'
import { ElMessage } from 'element-plus'
export default defineComponent({
  name: 'BlogClass',
  setup () {
    const state = reactive({
      classLists: []
    })

    FindBlogClass().then(res => {
      if (res.data.success) {
        state.classLists = res.data.data
      } else {
        ElMessage({
          type: 'error',
          message: res.data.errorMsg
        })
      }
    })

    return {
      state
    }
  }
})
</script>
