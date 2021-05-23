<template>
  <div class="blog-add-wrap">
    <div class="blog-add-main">
      <div class="blog-add-header">
        <el-button type="info" size="medium" @click="onScrolltop">回到顶部</el-button>
        <el-button type="warning" size="medium" @click="onReset">清空所有</el-button>
        <el-button type="primary" size="medium" @click="onDeploy">发布文章</el-button>
      </div>
      <div class="blog-add-body">
        <div class="blog-add-form">
          <div class="blog-add-form__item">
            <h2>文章标题*</h2>
            <el-input type="text" v-model="blogForm.title" placeholder="标题"></el-input>
          </div>
          <div class="blog-add-form__item">
            <h2>文章分类*</h2>
            <el-select v-model="blogForm.className" placeholder="请选择" style="width: 100%">
              <el-option
                v-for="opt in state.classOptions"
                :key="opt.value"
                :label="opt.label"
                :value="opt.value">
              </el-option>
            </el-select>
          </div>
          <div class="blog-add-form__item">
            <h2>文章封面/上传附件</h2>
            <el-input type="text" placeholder="标题"></el-input>
          </div>
          <div class="blog-add-form__item">
            <h2>文章内容*</h2>
            <v-md-editor v-model="blogForm.blogContent" height="400px"></v-md-editor>
          </div>
        </div>
      </div>
    </div>
    新增博客
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { FindBlogClass } from '@/apis/blog'
import { ElMessage } from 'element-plus'
export default defineComponent({
  name: 'BlogAdd',
  setup() {
    const state = reactive({
      classOptions: []
    })

    const blogForm = reactive({
      title: '',
      className: '',
      blogContent: ''
    })

    FindBlogClass().then(res => {
      if (res.data.success) {
        state.classOptions = res.data.data
      } else {
        ElMessage({
          type: 'error',
          message: res.data.errorMsg
        })
      }
    })

    const onScrolltop = () => {}
    const onReset = () => {}
    const onDeploy = () => {}

    return {
      state,
      blogForm,
      onScrolltop,
      onReset,
      onDeploy
    }
  }
})
</script>
