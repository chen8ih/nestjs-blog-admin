<template>
  <el-dialog
    title='提示'
    v-model="visible"
    width='30%'
    >
    <el-form
      ref="blogClassFormRef"
      :model="blogClassForm"
      size="medium">
      <el-form-item label="请填写分类">
        <el-input ref="classNameInputRef" v-model="blogClassForm.className"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent, ref, unref, onMounted, reactive, nextTick, watch } from 'vue'
import { AddBlogClass } from '@/apis/blog'
import { ElMessage } from 'element-plus'
export default defineComponent({
  emit: ['click'],
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  setup(props, content) {
    const visible = ref(false)
    const blogClassFormRef = ref()
    const classNameInputRef = ref()
    const blogClassForm = reactive({
      className: ''
    })

    watch(
      () => props.value,
      (val, oldVal) => {
        if (val) {
          visible.value = true
        } else {
          visible.value = false
        }
      }
    )

    const onSubmit = () => {
       AddBlogClass(blogClassForm).then(res => {
         if (res.data.success) {
           content.emit('click')
           visible.value = false
         } else {
           ElMessage({
             type: 'error',
             message: res.data.errorMsg
           })
         }
       })
    }

    onMounted(() => {
      nextTick(() => {
        const inputRef = unref(classNameInputRef)
        inputRef?.focus()
      })
    })



    return {
      visible,
      blogClassForm,
      blogClassFormRef,
      classNameInputRef,
      onSubmit
    }
  },
})
</script>
