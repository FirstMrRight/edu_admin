import request from '@/utils/request'
import id from 'element-ui/src/locale/lang/id'

const apiurl= "/eduservice/course"

export default {
  addCourseInfo(courseInfo){
    return request({
      url : '/eduservice/course',
      method: 'post',
      data: courseInfo
    })
  },

  getTeacherList(){
    return request({
      url : '/eduservice/edu-teacher',
      method: 'get',
    })
  },
  //根据课程id查询课程信息
  getCourseInfoById(id) {
    return request({
      url: '/eduservice/course/getCourseInfo/'+id,
      method: 'get'
    })
  },
  //修改课程信息的方法
  updateCourseInfoById(id,courseInfo){
    return request({
      url:'/eduservice/course/updateCourseInfo/'+id,
      method:'post',
      data:courseInfo
    })
  },
  //查询所有课程
  getCourseList(){
    return request({
      url:'/eduservice/course/listCourse',
      method:'get',
    })
  },
  //分页条件查询的方法
  //三个参数:当前页、每页记录数、条件封装对象
  getCoursePageList(page,limit,searchObj){
    return request({
      //后端controller里的路径
      url: `${apiurl}/MoreCourseByList/${page}/${limit}`,
      method: 'post',
      // //传递条件对象,如果传递json数据，使用data。如果不是json，使用params
      data: searchObj
    })
  },
  deleteCourseId(id){
    return request({
      url:`${apiurl}/deleteCourse/`+id,
      method:'delete'
    })
  },  //根据课程id查询课程详情
  getCourseInfo(courseInfo){
    return request({
      url:'/eduservice/course/getAllCourseInfo/'+courseInfo,
      method:'get'
    })
  },
  // updateCourseStatus(id){
  //   return request({
  //     url:'/eduservice/course/publishCourse'+id,
  //     method:'get'
  //   })
  // }

  //根据课程id查询课程详情信息
  updateCourseStatus(id) {
    return request({
      url: '/eduservice/course/publishCourse/'+id,
      method: 'get'
    })
  }
}
