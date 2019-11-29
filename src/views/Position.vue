<template>
<div>
   <Breadcrumb :style="{margin: '16px 0'}">
        <BreadcrumbItem to="/">首页</BreadcrumbItem>
        <BreadcrumbItem>管理职位</BreadcrumbItem>
    </Breadcrumb>
    <Card>
      <Table 
        stripe 
        border 
        :columns="formTitle" 
        :data="positionList"
        >
          <template slot="header">
           <strong> 职位列表</strong>
          </template>
          <template slot-scope="{ row, index }" slot="action">
              <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">修改</Button>
              <Button type="error" size="small" @click="remove(index)">删除</Button>
          </template>
          <template slot="footer">
            <Pagination @onPageInfo="handlePageInfo"></Pagination>
          </template>
      </Table>
    </Card>
</div>
</template>
<script>
import { Table, Button, Breadcrumb, BreadcrumbItem, Card, Page } from "view-design"
import Pagination from "./Pagination"
import { get } from "utils/http"
import _ from "lodash"
export default {
  components: {
    Page,
    Card,
    Table,
    Button,
    Breadcrumb,
    BreadcrumbItem,
    Pagination
  },
   async mounted () {
    let result = await get("/api/position")

    this.dataScore  = result.list
    this.positionList =  _.chunk(this.dataScore,this.pageSize)[this.pageNo-1]
    // console.log(this.positionList)
  },
  watch: {
      pageNo(){
       this.positionList = _.chunk(this.dataScore,this.pageSize)[this.pageNo-1]
      },
      pageSize(){
       this.positionList = _.chunk(this.dataScore,this.pageSize)[0]
      }
  },
  methods: {
      show (index) {
   
      },
      remove (index) {
          this.positionList.splice(index, 1);
      },
      handlePageInfo({pageNo,pageSize}){
          this.pageNo = pageNo
          this.pageSize = pageSize
      }
  },
    beforeRouteEnter(to, from, next){
        next((vm)=>{
            // console.log(vm)  
            vm.$emit("onRouteChange", to)
        })   
  },
  data () {
      return {
          pageSize:5,
          pageNo:1,
          formTitle: [
              {
                  title: '公司Logo',
                  key: 'companyLogo',
                  render:(h,{row, column,  index})=>{
                    //   console.log(row.companyLogo)
                    return h("img",{
                        attrs:{
                            src:`http://10.9.49.231:3000/uploads/${row.companyLogo}`
                        }
                    },null)
                  },
                  className:"logo",
                  width:"100px"
      
              },
              {
                  title: '公司名称',
                  key: 'company'
              },
              {
                  title: '招聘职位',
                  key: 'position'
              },
                {
                  title: '公司地点',
                  key: 'companySite'
              }, 
              {
                  title: '实习薪资/日薪',
                  key: 'salary'
              },
                {
                  title: '发布时间',
                  key: 'createTime'
              },
              {
                  title:'周工作天数',
                  key:"weeks"
              },
              {
                  title: '操作',
                  slot: 'action'
              }
          ],
          positionList: []
            
      }
  }
 
}
</script>
<style>

.logo img{
    height: 60px;
    width: 60px;
}
</style>
