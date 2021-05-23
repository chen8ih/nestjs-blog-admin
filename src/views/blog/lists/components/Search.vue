<template>
  <div class="search-wrap">
    <div class="search-form">
      <el-form
        ref="listSearchFormRef"
        :inline="true"
        :model="listSearchForm"
        size="medium">
        <el-form-item label="分类" prop="className">
          <el-select v-model="listSearchForm.className" placeholder="请选择">
            <el-option
              v-for="opt in state.classOptions"
              :key="opt.value"
              :label="opt.label"
              :value="opt.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="listSearchForm.title"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium" @click="onSearch">
            <i class="el-icon-search"></i>
            查询
          </el-button>
          <el-button type="info" size="medium" @click="onReset">
            <i class="el-icon-refresh"></i>
            重制
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { FindBlogClass, FindBlogByUsernameHasPage  } from '@/apis/blog'
import { ElMessage } from 'element-plus'
import { store } from '@/store'
interface IClassOptions {
  id: number,
  className: string
}
export default defineComponent({
  emits: ['click'],
  setup(prop, context) {
    const listSearchFormRef = ref()

    const listSearchForm = reactive({
      className: '',
      title: '',
      page: 1,
      row: 10,
      userName: 'test111'
    })

    const state = reactive({
      classOptions: Array<IClassOptions>()
    })

    // 获取分类信息
    FindBlogClass().then(res => {
      if (res.data.success) {
        state.classOptions = res.data.data
      } else {
        ElMessage({
          type: 'error',
          message: res.data.errorMsg || '获取分类信息失败'
        })
      }
    })

    const onSearch = () => {
      FindBlogByUsernameHasPage(listSearchForm).then(res => {
        if (res.data.success) {
          context.emit('click', res.data.data)
        } else {
          ElMessage({
            type: 'error',
            message: res.data.errorMsg || '查询博客列表信息失败'
          })
        }
      })
    }
    const onReset = () => {
      // 重制查询信息
      listSearchForm.className = ''
      listSearchForm.title = ''
    }

    // const rules = {
    //   className: [
    //     { required: true, message: '请选择', trigger: 'blur' },
    //   ],
    //   title: [
    //     { required: true, message: '请输入密码', trigger: 'blur' },
    //   ]
    // }

    return {
      state,
      listSearchFormRef,
      listSearchForm,
      onSearch,
      onReset
    }
  }
})
</script>
