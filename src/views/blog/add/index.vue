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
                :key="opt.id"
                :label="opt.className"
                :value="opt.className">
              </el-option>
            </el-select>
          </div>
          <div class="blog-add-form__item">
            <h2>文章封面/上传附件</h2>
            <div class="upload-box">
              <el-upload
                class="avatar-uploader"
                action="uploadImg"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="blogForm.bgImg" :src="blogForm.bgImg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <el-upload
                class="upload-demo"
                drag
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <template #tip>
                  <div class="el-upload__tip">
                    只能上传 jpg/png 文件，且不超过 500kb
                  </div>
                </template>
              </el-upload>
            </div>
          </div>
          <div class="blog-add-form__item">
            <h2>文章内容*</h2>
            <v-md-editor v-model="blogForm.body" height="400px"></v-md-editor>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, unref } from 'vue'
import { FindBlogClass, addBlog } from '@/apis/blog'
import { uploadImg } from '@/apis/file'
import { ElMessage, ElMessageBox } from 'element-plus'
import router from '@/router'
import { store } from '@/store'
export default defineComponent({
  name: 'BlogAdd',
  setup() {
    const state = reactive({
      classOptions: []
    })

    let blogForm = reactive({
      bgImg: '',
      body: '',
      className: '',
      isTop: '',
      name: store.getters.userData.name,
      showIndex: '',
      title: '',
      upFileUrl: ''
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

    const onScrolltop = () => {

    }

    const onReset = () => {
      blogForm.title = ''
      blogForm.className = ''
      blogForm.bgImg = ''
      blogForm.upFileUrl = ''
      blogForm.body = ''
    }
    const onDeploy = () => {
      ElMessageBox.confirm('确认发布该文章么?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        addBlog(blogForm).then(res => {
          if (res.data.success) {
            ElMessage({
              type: 'success',
              message: '文章发布成功'
            })
            setTimeout(() => {
              router.push('/blog/list')
            }, 1500)
          } else {
            ElMessage({
              type: 'error',
              message: res.data.errorMsg
            })
          }
        })
      })
    }

    const handleAvatarSuccess = () => {}
    const beforeAvatarUpload = () => {}

    onMounted(() => {
      const route = unref(router.currentRoute)
      blogForm = {
        bgImg: route.params.bgImg as string, 
        body: route.params.body as string,
        className: route.params.className as string,
        isTop: route.params.isTop as string,
        name: store.getters.userData.name as string,
        showIndex: route.params.showIndex as string,
        title: route.params.title as string,
        upFileUrl: route.params.upFileUrl as string
      }
    })

    return {
      state,
      blogForm,
      onScrolltop,
      onReset,
      onDeploy,
      handleAvatarSuccess,
      beforeAvatarUpload
    }
  }
})
</script>
<style lang="scss" scoped>
.upload-box {
  display: flex;

  :deep(.avatar-uploader .el-upload) {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin-right: 20px;
    background-color: #fff;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
