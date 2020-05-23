import request from '@/utils/request'

// const apiurl='/eduservice/chapter'
export default {
  getAllChapterVideoList(courseId){
    return request({
      url: '/eduservice/chapter/getChapterVideoList/'+courseId,
      method:'get'
    })
  },
  //添加方法
  addChapter(chapter){
    return request({
      url: '/eduservice/chapter/addChapter',
      method:'post',
      data:chapter
    })
  },
  getChapterInfo(chapterId){
    return request({
      url:'/eduservice/chapter/getChapterInfo/'+chapterId,
      method:'get'
    })
  },
  //修改的方法
  updateChapter(chapter) {
    return request({
      url: '/eduservice/chapter/updateChapter',
      method: 'post',
      data: chapter
    })
  },
  //删除的方法
  deleteChapter(chapterId) {
    return request({
      url: '/eduservice/chapter/'+chapterId,
      method: 'delete'
    })
  },

}
