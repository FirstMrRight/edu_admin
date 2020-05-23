<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="信息描述">
        <el-tag type="info">excel模版说明</el-tag>
        <el-tag>
          <i class="el-icon-download"/>
          <a :href="'/static/课程分类列表模板.xls'">点击下载模版</a>
        </el-tag>

      </el-form-item>

      <el-form-item label="选择Excel">
        <el-upload
          ref="upload"
          :auto-upload="false"
          :on-success="fileUploadSuccess"
          :on-error="fileUploadError"
          :disabled="importBtnDisabled"
          :limit="1"
          :action="BASE_API+'/eduservice/subject/import'"
          name="file"
          accept="application/vnd.ms-excel">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button
            :loading="loading"
            style="margin-left: 10px;"
            size="small"
            type="success"
            @click="submitUpload">{{fileUploadBtnText}}</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      //初始值
      return {
        BASE_API: process.env.BASE_API, // 接口API地址，配置文件中取路径
        importBtnDisabled: false, // 按钮是否禁用,
        loading: false,
        fileUploadBtnText: '上传到服务器',
      }
    },
    created() {
    },
    methods: {

      //提交表单
      submitUpload() {
        //doucment.getElementById("formid").submit();
        this.fileUploadBtnText = '正在上传'
        this.loading = true
        //提交表单
        this.$refs.upload.submit()
      },
      //上传成功
      //上传组件为什么要传递参数?
      //提交表单的方法
      submitUpload() {
        //doucment.getElementById("formid").submit();
        this.importBtnDisabled = true
        this.loading = true
        //提交表单
        this.$refs.upload.submit()
      },
      //上传成功调用的方法
      fileUploadSuccess(response) {
        if (response.success == true) {
          //response是上传成功的数据?
          console.log(response)
          this.loading = false
          this.$message({
            type: 'success',
            message: '导入成功'
          })
          //跳转回到列表页面
          this.$router.push({ path: '/subject' })
        } else {
          //获取返回list集合
          const messages = response.data.msgList
          console.log(messages)
          let msgString = '<ul>'
          messages.forEach(msg => {
            msgString += `<li>${msg}</li>`
          })
          msgString += '</ul>'
          this.$alert(msgString, response.message, {
            dangerouslyUseHTMLString: true
          })
          //跳转回到列表页面
          this.$router.push({ path: '/subject' })
        }
      },
      //上传失败调用的方法
      fileUploadError() {
        this.loading = false
        this.$message({
          type: 'error',
          message: '导入失败'
        })
      }
    }
  }
</script>
