<template>
  <div id="app">
    <h1 align="center">笑哼的图像识别评测平台</h1>
    <el-tabs @tab-click="handleClick" v-model="first">
      <el-tab-pane name="first" label="图像拼接（developing)" ></el-tab-pane>
      <el-tab-pane name="second" label="数据比较（developing)"></el-tab-pane>
      <el-tab-pane name="third" label="图像diff"></el-tab-pane>
      <el-tab-pane name="fouth" label="ocr文本识别"></el-tab-pane>
      <el-tab-pane name="fifth" label="图像颜色聚类"></el-tab-pane>
      <el-tab-pane name="sixth" label="泛白屏检测（developing)"></el-tab-pane>
      <el-tab-pane name="seventh" label="绿屏检测（developing)"></el-tab-pane>
      <el-tab-pane name="eighth" label="视频裁剪（developing)"></el-tab-pane>
      <el-tab-pane name="ninth" label="图片裁剪（developing)"></el-tab-pane>
      <el-tab-pane name="tenth" label="错别字检测"></el-tab-pane>
      <el-tab-pane name="eleventh" label="错别字自动纠错"></el-tab-pane>
    </el-tabs>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      first: 'first'
    }
  },
  methods: {
    handleClick (tab) {
      if (tab.name === 'first') {
        this.$router.push('/')
      } else if(tab.name === 'second'){
        this.$router.push('/analysis')
      }else if (tab.name === 'third'){
        this.$router.push('/diff')
      }else if (tab.name === 'fouth'){
        this.$router.push('/ocr')
      }else if (tab.name === 'fifth'){
        this.$router.push('/cluster')
      }else if (tab.name === 'sixth'){
        this.$router.push('/white_detect')
      }
      else if (tab.name === 'seventh'){
        this.$router.push('/Green_detect')
      }else if (tab.name==='eighth'){
        this.$router.push('/VideoCutter')
      }else if (tab.name==='ninth'){
        this.$router.push('/ImgCrop')
      } else if (tab.name==='tenth'){
        this.$router.push('/Wrong_word_detect')
      }else if (tab.name==='eleventh'){
        this.$router.push('/Wrong_word_auto_correct')
      }
    }
  }
}
</script>

<style>
</style>
