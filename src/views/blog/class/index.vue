<template>
  <div class="blog-class-wrap">
    <div class="blog-class-main">
      <div class="blog-class-header">
        <el-button type="primary" size="medium" @click="onAddBlogClass">
          <i class="el-icon-plus"></i>
          新增分类
        </el-button>
      </div>
      <div class="blog-class-body">
        <el-row>
          <el-col :span="6" v-for="item in state.classLists" :key="item.id">
            <el-card class="box-card">
              {{ item.className }}
              <el-button type="danger" size="medium" @click="onDeleteClass({ className: item.className })">删除</el-button>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
    <Form v-model="showForm"></Form>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import Form from './components/Form.vue'
import { IClassName, FindBlogClass, DeleteBlogClass } from '@/apis/blog'
import { ElMessage, ElMessageBox } from 'element-plus'

export default defineComponent({
  name: 'BlogClass',
  components: {
    Form
  },
  setup () {
    const state = reactive({
      classLists: []
    })

    const showForm = ref(false)

    const onInit = () => {
      FindBlogClass().then(res => {
        console.log(res)
        if (res.data.success) {
          state.classLists = res.data.data
        } else {
          ElMessage({
            type: 'error',
            message: res.data.errorMsg
          })
        }
      })
    }

    const onAddBlogClass = () => {
      showForm.value = true
    }

    const onDeleteClass = (item: IClassName) => {
      ElMessageBox.confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        DeleteBlogClass(item).then(res => {
          if (res.data.success) {
            ElMessage({
              type: 'success',
              message: '分类删除成功'
            })
            // 重新获取
            onInit()
          } else {
            ElMessage({
              type: 'error',
              message: res.data.errorMsg
            })
          }
        })
      })
    }

    onInit()
    return {
      state,
      showForm,
      onAddBlogClass,
      onDeleteClass
    }
  }
})
</script>
<style lang="scss" scoped>
.blog-class-header {
  padding: 20px;
  background-color: #fff;
}

.blog-class-body {
  margin-top: 10px;

  :deep(.el-card__body) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
