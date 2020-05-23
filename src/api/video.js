import request from '@/utils/request'

export default {

  //小节API
  addVideo(video){
    return request({
      url:'/eduservice/video/addVideo',
      data:video,
      method:'post'
    })
  },
  getVideoInfo(videoId){
    return request({
      url:'/eduservice/video/'+videoId,
      method:'get'
    })
  },
  updateVideo(video){
    return request({
      url:'/eduservice/video/updateEduVideo',
      data:video,
      method:'post'
    })
  },
  deleteVideo(videoId){
    return request({
      url:'/eduservice/video/'+videoId,
      method:'delete'
    })
  },
  //删除阿里云视频
  removeAliyunVideo(videoId){
    return request({
      url:'ossservice/vod/'+videoId,
      method:'delete'
    })
  }

}
