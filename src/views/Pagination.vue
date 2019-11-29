<template>
      <Page
       :total="47"
       class="page" 
       show-sizer  
       :current="pageNo"
       placement="top"
       :page-size-opts="pageOpt"
       :page-size="5"
       @on-change="handleChange"
       @on-page-size-change="handlePageSizeChange"
       />
</template>

<script>
import { Page } from 'view-design'
export default {
  data () {
    return {
      pageOpt:[5,10,20],
      pageNo:1,
      pageSize:5
    }
  },
  components: {
    Page
  },
  mounted () {
    
    this.$watch(
      ()=>{
        //派发
        this.$emit("onPageInfo",{
          pageNo:this.pageNo,
          pageSize:this.pageSize
        })
      }
    )
  },
  methods: {
    handleChange(pageNo){
      this.pageNo = pageNo
    },
    handlePageSizeChange(pageSize){
      this.pageSize = pageSize
    }
  }
}
</script>

<style scoped>
  .page{
    line-height: 48px;
    text-align: end
  }
</style>