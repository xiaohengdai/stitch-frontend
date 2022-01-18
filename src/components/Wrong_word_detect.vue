<template>
  <div>

    <div style="display: flex">
      <div style="margin: 0 0 0 100px; flex-grow: 1">
        <el-input v-model="input" placeholder="请输入内容" clearable  @change="getText"
                  icon="el-icon-search">
        </el-input>
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
  name: 'Wrong_word_detect',
  data () {
    return {
      message_alert:'',
      input:'',
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      start_run_pic_url: this.$deploy_url + 'wrong_word/detect',
      loading: true,
      activityData: [], //查看活动数据
      resultTable: [],//表格数据
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
    getCol (src) {
      let col = []
      for (let j in src[0]) {
        col.push({
          prop: j,
          label: j,
        })

      }
      // }
      return col
    },

    getTable (src) {
      let table = []
      let col = []
      for (let i = 0; i < src.length; i++) {
        let temp = {}
        for (let j in src[i]) {
          temp[j] = src[i][j].toString()//需转换成字符串，要不在表格中显示时坐标里的的逗号会被截断
        }
        table.push(temp)
      }
      return table
    },

    getText(value){
      this.input=value;
      console.log("this.input:"+this.input)
      let formData = new FormData() // new formData对象
      formData.append('text', this.input)
      axios.post(this.start_run_pic_url, formData).then((response) => {
        console.log("response:"+response)
        console.log("response.status:"+response.status)
        if (response.status === 200) {
          this.code = response.data.code
          this.activityData = response.data.data.res
          console.log('this.activityData:' + this.activityData)
          this.result = this.getCol(this.activityData)
          this.resultTable = this.getTable(this.activityData)
          console.log('this.resultTable:' + this.resultTable)
          if (this.activityData.length>=1){
            this.message_alert=",检测出错别字"
          }else{
            this.message_alert=",没有检测出错别字"
          }
          console.log("this.message_alert:"+this.message_alert)


          this.$message({
            message: '错别字检测识别完成'+this.message_alert,
            type: 'success'
          })
        }
      }).catch(error => {
        this.$message({
          message: '错别字检测识别失败,具体信息为:' + error,
          type: 'error'
        })
      })
    },
  }
}
</script>


