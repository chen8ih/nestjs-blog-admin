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
          label="发布时间"
          width="180">
          <template #default="scope">{{ scope.row.update_time }}</template>
        </el-table-column>
        <el-table-column
          prop="reviewsCount"
          label="评论">
        </el-table-column>
        <el-table-column
          prop="fabulousCount"
          label="收藏">
        </el-table-column>
        <el-table-column
          prop="bgImg"
          label="封面">
        </el-table-column>
        <el-table-column
          prop="upFileUrl"
          label="附件">
        </el-table-column>
        <el-table-column
          prop="className"
          label="分类">
        </el-table-column>
        <el-table-column
          label="置顶">
          <template #default="scope">
            <el-switch v-model="scope.row.IsTop" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="首页可见">
          <template #default="scope">
            <el-switch v-model="scope.row.ShowIndex" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template #default="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">转到</el-button>
            <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, PropType } from 'vue'
import { FindBlogByUsernameHasPage } from '@/apis/blog'
import { store } from '@/store'
import router from '@/router'
import { ElMessage } from 'element-plus'
import { format } from 'date-fns'
interface ISearchForm {
  className: string,
  title: string
}

// interface IBlogEntity {
//   bgImg: string,
//   blogId: number,
//   body: string,
//   className: string,
//   creat_time: string,
//   fabulousCount: string,
//   isTop: string,
//   readcount: number,
//   reviewsCount: string,
//   showIndex: string,
//   title: string,
//   upFileUrl: string,
//   update_time: string,
//   userName: string
// }

export default defineComponent({
  props: {
    searchFrom: {
      type: Object as PropType<ISearchForm>,
      default: {
        className: '',
        title: ''
      }
    }
  },
  setup(props, context) {
    const state = reactive({
      listsData: []
    })

    const handleClick = (item) => {
      console.log(item.title)
    }

    const handleEdit = (item) => {
      router.push({ name: 'BlogAdd', params: item})
    }

    FindBlogByUsernameHasPage({
      ...props.searchFrom,
      page: 1,
      row: 10,
      userName: store.getters.userData.name
    }).then((res) => {
      if (res.data.success) {
        let listsData = res.data.data
        listsData.forEach(list => {
          list.update_time = format(new Date(list.update_time), 'yyyy-mm-dd hh:mm')
          list.IsTop = !!Number(list.isTop)
          list.ShowIndex = !!Number(list.showIndex)
        })
        console.log(listsData)
        state.listsData = listsData
      } else {
        ElMessage({
          type: 'error',
          message: res.data.errorMsg
        })
      }
    })

    return {
      state,
      handleClick,
      handleEdit
    }
  }
})
</script>
