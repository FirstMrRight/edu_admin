<template>
  <div class="app-container">
    课程列表

    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.title" placeholder="课程标题"/>
      </el-form-item>

      <el-form-item>
        <el-input v-model="searchObj.price" placeholder="课程价格"/>
      </el-form-item>

      <el-form-item label="添加时间">
        <el-date-picker
          v-model="searchObj.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="searchObj.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getListCourse()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row>

      <el-table-column
        label="序号"
        width="100"
        align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="title" label="名称"  width="350"/>

      <el-table-column prop="price" label="价格" width="200"/>

      <el-table-column prop="lessonNum" label="课时数" width="200"/>

      <el-table-column prop="buyCount" label="购买人数" width="160"/>

      <el-table-column label="操作" width="250" align="center">
        <template slot-scope="scope">
          <router-link :to="'/teacher/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getListCourse"
    />
  </div>
</template>

<script>
  import course from '@/api/course'

  export default {
    //定义变量和初始值
    data() {
      return {
        listLoading: true, // 是否显示loading信息
        list:null, //每页数据list集合
        total:0, //总记录数
        page:1,//当前页
        limit:10,//每页显示记录数
        searchObj:{}//条件封装对象
      }
    },
    //在页面渲染之前调用，调用具体的某个方法
    created () {
      //调用方法
      this.getListCourse()
    },
    //写具体的方法调用
    methods: {
      // //删除课程的方法
      removeDataById(id){

        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(response => {
          //调用方法进行删除
          //return 表示后面then还会执行
          return course.deleteCourseId(id)
        }).then(() => {
          //刷新整个页面
          this.getListCourse()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          //判断点击取消，还是删除失败
          // if (respponse === 'cancel') {
          //   this.$message({
          //     type: 'info',
          //     message: '已取消删除'
          //   })
          // } else {
          //   this.$message({
          //     type: 'error',
          //     message: '删除失败'
          //   })
          // }
        })
      },

      //1 讲师列表
      getListCourse(page=1) {
        this.page=page
        this.listLoading=true
        course.getCoursePageList(this.page,this.limit,this.searchObj)
          .then(response => { //如果请求成功，返回状态码20000，执行then里面操作
            this.listLoading=false
            //每页数据
            this.list = response.data.rows
            this.total=response.data.total

          })
          .catch(response => { //如果请求失败，执行catch里面操作
            console.log(response)
          })
      },
      resetData(){
        this.searchObj = {}
        this.getListCourse()
      }
    }
  }
</script>
