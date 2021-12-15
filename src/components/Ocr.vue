<template>
  <div>

    <div style="display: flex">
      <div style="margin: 0 0 0 100px; flex-grow: 1">
        <el-upload
          multiple
          ref="upload"
          action=""
          :limit=1
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-change="handleChange"
          :file-list="fileList"
          :auto-upload="false"
          list-type="picture">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-down: 10px;" size="medium" type="warning" @click="startRun">start run</el-button>
          <div slot="tip" class="el-upload__tip">最多上传1张jpg/png文件</div>
        </el-upload>
      </div>
    </div>


    <div style="display: flex">
      <div style="margin: 0 0 0 100px; flex-grow: 1">
        <el-link type="primary">识别结果：</el-link>  <!-- el-link:Link 文字链接 -->
      </div>
    </div>

    <div style="display: flex">
      <div style="margin: 0 0 0 100px; flex-grow: 1">
        <el-table
          :data="resultTable"
          border
          style="width: 100%">
          <el-table-column
            :prop="item.prop"
            :label="item.label"
            v-for="(item,key) in result"
            :key="key"
            width="180">
          </el-table-column>

        </el-table>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Ocr',
  data () {
    return {
      upload_pic_url: this.$deploy_url + 'upload_pic',
      start_run_pic_url: this.$deploy_url + 'ocr/start_run',
      get_video_url:this.$deploy_url+'video/get',
      loading: true,
      activityData: [], //查看活动数据
      resultTable:[],//表格数据
      result: [], //查看数据用于循环的数据
      fileList: [], // upload多文件数组

      step_active: 0,
      url: '',
      srcList: [],
      ssim: '',
      hist: '',
      psnr: '',
      feature_num: '',
      total_time_cost: '',
      algorithm_time_cost: ''
    }
  },
  methods: {
    getCol(src) {
      let col = [];
      for (let j in src[0]) {
          col.push({
            prop: j,
            label: j,
          });

      }
      // }
      return col;
    },

    getTable(src) {
      let table = [];
      let col = [];
      for (let i = 0; i < src.length; i++) {
        let temp = {};
        for (let j in src[i]) {
            temp[j] = src[i][j].toString();//需转换成字符串，要不在表格中显示时坐标里的的逗号会被截断
        }
        table.push(temp);
      }
      return table;
    },

    handleRemove (file, fileList) {
      this.fileList = fileList
    },
    handlePreview (file) {
      console.log(file)
    },
    handleChange (file, fileList) {
      this.fileList = fileList
    },


    // 开始对图片进行ocr识别
    startRun: function () {
      if (this.fileList.length < 1) {
        this.$message({
          message: '还未上传图片文件',
          type: 'warning'
        })
      } else {
        this.srcList = [] // 计算结果归零
        const isLt5M = this.fileList.every(file => file.size / 1024 / 1024 < 5)
        if (!isLt5M) {
          this.$message.error('请检查，上传文件大小不能超过5M!')
        } else {
          let formData = new FormData() // new formData对象
          this.fileList.forEach(file => {
            formData.append('file', file.raw)
          })
          axios.post(this.start_run_pic_url, formData).then((response) => {
            console.log(response)
            if (response.status === 200) {
              // this.form.pic_uuid = response.data.uuid
              // this.form.pic1_name = response.data.pic1_name
              this.code = response.data.code
              // this.pic_ocr_result = JSON.stringify(response.data.data.roi_text)
              // this.pic_name='test.jpg'
              // this.resultTable=JSON.stringify([{"pic_ocr_result":this.pic_ocr_result,"pic_name":this.pic_name}])
              // console.log("this.code:"+this.code)
              // console.log("this.pic_ocr_result:"+this.pic_ocr_result)
              this.activityData = response.data.data.roi_text;
              console.log("this.activityData:"+this.activityData)
              this.result = this.getCol(this.activityData);
              this.resultTable = this.getTable(this.activityData);
              console.log("this.resultTable:"+this.resultTable)
              this.$message({
                message: 'ocr识别成功',
                type: 'success'
              })
            }
          }).catch(error => {
            this.$message({
              message: 'ocr识别失败,具体信息为:' + error,
              type: 'error'
            })
          })
        }
      }
    },

  }
}
</script>

<style scoped>

</style>
