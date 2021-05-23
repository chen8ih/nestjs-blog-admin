<template>
  <div class="table-wrap">
    <div class="table-main">
      <el-table
        :data="state.listsData"
        style="width: 100%"
        >
        <el-table-column
          prop="title"
          label="标题"
          width="180">
        </el-table-column>
        <el-table-column
          prop="title"
          label="发布时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="title"
          label="评论">
        </el-table-column>
        <el-table-column
          prop="title"
          label="收藏">
        </el-table-column>
        <el-table-column
          prop="title"
          label="封面">
        </el-table-column>
        <el-table-column
          prop="title"
          label="附件">
        </el-table-column>
        <el-table-column
          prop="title"
          label="分类">
        </el-table-column>
        <el-table-column
          prop="title"
          label="置顶">
        </el-table-column>
        <el-table-column
          prop="title"
          label="首页可见">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template #default="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const state = reactive({
      listsData: []
    })
    return {
      state
    }
  }
})
</script>
