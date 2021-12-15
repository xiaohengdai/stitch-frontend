<template>
  <div><!--:action是必不可少但是却没什么作用的:http-request可以覆盖默认的上传方法--><!--      :headers="{username:username}"-->
    <el-upload
      :action="action"
      list-type="picture-card"
      :on-success="handleSuccess"
      :before-upload="uploadImage"
      :file-list="fileLists"
      :on-progress="handleProgress"
      :data="data"
      accept="video/mp4, video/ogg, video/flv,video/avi,video/wmv,video/rmvb"

      :disabled="fileLists.length >= limit || uploadBtn">
      <i slot="default" class="el-icon-plus"></i>
      <div slot="file" slot-scope="{file}">
<!--        <video class="el-upload-list__item-thumbnail" :src="file.url" alt=""></video>-->
<!--        <span class="el-upload-list__item-actions">-->
<!--                    <span class="el-upload-list__item-preview" @click="handleShowVideo(file)">-->
<!--                        <i class="el-icon-video-play"></i>-->
<!--                    </span>-->
<!--                    <span class="el-upload-list__item-edit" @click="handleEditVideo(file)">-->
<!--                        <i class="el-icon-edit"></i>-->
<!--                    </span>-->
<!--                    <span class="el-upload-list__item-delete" @click="handleRemove(file)">-->
<!--                        <i class="el-icon-delete"></i>-->
<!--                    </span>-->
<!--                </span>-->
<!--        <el-progress type="circle" class="progressModule" :color="colors" :percentage="Number(uploadPercentage)"-->
<!--                     v-if="showProgress && file.url == uploadUrl"></el-progress>-->
      </div>
    </el-upload>

<!--    <el-dialog :visible.sync="dialogVisible" append-to-body width="40%" style="text-align:center">-->
<!--      <video :src="dialogImageUrl" alt="" autoplay class="video" controls="controls"></video>-->
<!--    </el-dialog>-->
<!--    <el-dialog :visible.sync="editView" width="40%" append-to-body>-->
<!--      <el-input type="textarea" :rows="4" v-model="editForm.url" @input="editVideo"></el-input>-->
<!--    </el-dialog>-->
  </div>
</template>

<script>
import axios from 'axios'

let upload_http
let upload
export default {
  props: {
    limit: {
      type: Number,
      default: 12,
    },
    action: {
      type: String,
      default: '#'
    },
    fileList: {
      type: Array,
      default: () => {
        return []
      }
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {

      // get_video_url:this.$deploy_url+'video/get',
      get_video_url:'/api/video/get',
      dialogImageUrl: '',
      dialogVisible: false,
      fileLists: this.fileList,
      // actionUrl:'/api/video/get',
      editForm: {
        url: '',
        uid: null
      },
      editView: false,
      username: '',
      uploadPercentage: 0,
      showProgress: false,
      uploadUrl: '',
      colors: [
        {color: '#ADD8E6', percentage: 20},
        {color: '#87CEEB', percentage: 40},
        {color: '#87CEFA', percentage: 60},
        {color: '#00BFFF', percentage: 80},
        {color: '#1296DB', percentage: 100}
      ],
      uploadBtn: false,
    }
  },
  // mounted () {
  //   this.username = Cookies.get('username')
  // },
  methods: {


    // 上传图片方法
    uploadImage(param){
      console.log("上传图片")
      const formData = new FormData()
      formData.append('file', param.file)
      console.log("this.get_video_url:"+this.get_video_url)
      axios.post(this.get_video_url, formData,{headers: {'Content-Type': 'multipart/form-data'}}).then(response => {
        console.log('response.data:'+response.data)
        console.log('response.data.video_url:'+response.data.data.video_url)
        this.uploadUrl=JSON.stringify(response.data.data.video_url)
        console.log('this.uploadUrl:'+this.uploadUrl)
        console.log('上传图片成功')
        
      }).catch(response => {
        console.log('图片上传失败')
      })
    },

    // 移除视频
    handleRemove (file) {
      console.log("进入到handleRemove方法中")
      for (let i in this.fileLists) {
        if (this.fileLists[i].uid == file.uid) {
          this.fileLists.splice(i, 1)
        }
      }
      this.submitFile()
      console.log("handleRemove方法执行完成")
    },
    handleShowVideo (file) {
      console.log("进入到handleShowVideo方法中")
      this.dialogImageUrl = file.url
      this.dialogVisible = true
      console.log("handleShowVideo方法执行完成")
    },
    // 上传完成
    handleSuccess (response, file, fileList) {
      console.log("进入到handleSuccess方法中")
      this.showProgress = false
      this.uploadBtn = false
      if (response.code != 0) {
        for (var i = 0; i < fileList.length; i++) {
          if (i + 1 == fileList.length) {
            fileList.splice(i, 1)
          }
        }
        this.$message.error(response.sub_msg)
        return
      } else {
        this.$message.success(response.sub_msg)
        let obj = {
          name: response.data.pictureName,
          status: 'success',
          uid: file.uid,
          url: response.data.url,
        }
        this.fileLists.push(obj)
        this.submitFile()
      }
      console.log("handleSuccess执行完成")
    },
    // 播放视频
    handleEditVideo (file) {
      console.log("进入到handleEditVideo方法中")
      this.editForm.url = file.url
      this.editForm.uid = file.uid
      this.editView = true
      console.log("handleEditVideo执行完成")
    },
    // 编辑视频
    editVideo () {
      console.log("进入到editVideo方法中")
      for (let i in this.fileLists) {
        if (this.fileLists[i].uid == this.editForm.uid) {
          this.fileLists[i].url = this.editForm.url
        }
      }
      this.submitFile()
      console.log("editVideo执行完成")
    },
    // 将图片文件传回给父组件
    submitFile () {
      console.log("进入到submitFile方法中")
      this.$emit('submitImg', this.fileLists)
      console.log("submitFile执行完成")
    },
    // 上传进度
    handleProgress (response, file, fileList) {
      console.log("进入到handleProgress方法中")
      this.uploadBtn = true
      file.url=this.uploadUrl
      // this.uploadUrl = file.url
      console.log("this.uploadUrl:"+this.uploadUrl)
      this.showProgress = true
      this.uploadPercentage = file.percentage.toFixed(0)
      console.log("handleProgress执行完成")
    },
  }
}
</script>

<style scoped>
.el-icon-plus {
  font-size: 30px !important;
}

.el-icon-edit {
  font-size: 18px !important;
}

.el-icon-video-play {
  font-size: 18px !important;

}

.el-icon-delete {
  font-size: 18px !important;
  color: rgb(243, 143, 130);
}

.el-input >>> .el-textarea__inner {
  font-size: 18px !important;
}

.video {
  min-height: 200px;
  max-height: 600px;
  min-width: 200px;
  max-width: 100%;
}

.progressModule >>> .el-progress__text {
  color: #1296DB;
  font-size: 15px !important;
}
</style>
