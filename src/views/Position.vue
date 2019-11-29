<template>
  <div>
    <Breadcrumb :style="{margin: '16px 0'}">
      <BreadcrumbItem to="/">首页</BreadcrumbItem>
      <BreadcrumbItem>管理职位</BreadcrumbItem>
    </Breadcrumb>
    <Card>
      <Table stripe border :columns="formTitle" :data="positionList">
        <template slot="header">
          <strong>职位列表</strong>
          <Button class="add" type="success" size="small" icon="md-add-circle" @click="modalShow = true">添加职位</Button>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary"  icon="md-create" size="small" style="margin-right: 5px" @click="show(index)">修改</Button>
          <Button type="error" icon="ios-trash" size="small" @click="remove(index)">删除</Button>
        </template>
        <template slot="footer">
          <Pagination @onPageInfo="handlePageInfo"></Pagination>
        </template>
      </Table>
    </Card>
      <Modal
        title="添加职位"
        width="700px"
        v-model="modalShow"
        class-name="vertical-center-modal">
           <Form :model="formData" label-position="left" :label-width="100">
              <FormItem label="公司LOGO">
                  <Upload
                   name="companyLogo"
                   action="/api/position"
                   :before-upload="handleUpload"
                   >
                      <Button icon="ios-cloud-upload-outline">点击上传公司LOGO</Button>
                  </Upload>
                  <div v-if="file !== null">
                      <img :src="uploadImg" alt="" style="width: 60px; height: 60px;"/>
                  </div>
              </FormItem>
              <FormItem label="公司名称">
                  <Input placeholder="请输入公司名称"/>
              </FormItem>
              <FormItem label="招聘职位">
                  <Input placeholder="请输入招聘职位"/>
              </FormItem>
              <FormItem label="公司地点">
                  <Input placeholder="请输入公司点"/>
              </FormItem>
              <FormItem label="实习薪资/日薪">
                  <Input placeholder="请输入实习薪资"/>
              </FormItem>
              <FormItem label="周工作天数">
                  <Input placeholder="请输入周工作天数"/>
              </FormItem>
          </Form>
      </Modal>
  </div>
</template>
<script>
import {
  Table,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Page,
  Modal,
  Form,
  FormItem,
  Input,
  Upload
} from "view-design";
import Pagination from "./Pagination";
import { get } from "utils/http";
import _ from "lodash";
export default {
  components: {
    Page,
    Card,
    Table,
    Button,
    Breadcrumb,
    BreadcrumbItem,
    Pagination,
    Modal,
    Form,
    FormItem,
    Input,
    Upload
  },
  async mounted() {
    let result = await get("/api/position");

    this.dataScore = result.list;
    this.positionList = _.chunk(this.dataScore, this.pageSize)[this.pageNo - 1];
    // console.log(this.positionList)
  },
  watch: {
    pageNo() {
      this.positionList = _.chunk(this.dataScore, this.pageSize)[
        this.pageNo - 1
      ];
    },
    pageSize() {
      this.positionList = _.chunk(this.dataScore, this.pageSize)[0];
    }
  },
  methods: {
    show(index) {},
    remove(index) {
      this.positionList.splice(index, 1);
    },
    handleUpload(file){
      // console.log(file)
      this.file = file
      const reader = new FileReader
      //将读取的文件编码成Data URL
      reader.readAsDataURL(file)
      reader.onload = (event)=>{
        //拿到图片的路径
        // console.log(event)
        this.uploadImg = event.srcElement.result
        
      }
      // return false
    },
    handlePageInfo({ pageNo, pageSize }) {
      this.pageNo = pageNo;
      this.pageSize = pageSize;
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // console.log(vm)
      vm.$emit("onRouteChange", to);
    });
  },
  data() {
    return {
      pageSize: 5,
      pageNo: 1,  
      modalShow: false,
      file:null,
      uploadImg:"",
      formData:{
        company: "",
        companyLogo: "",
        companySite: "",
        position: "",
        salary: "",
        weeks: "",
      },
      formTitle: [
        {
          title: "公司Logo",
          key: "companyLogo",
          render: (h, { row, column, index }) => {
            //   console.log(row.companyLogo)
            return h(
              "img",
              {
                attrs: {
                  src: `http://10.9.49.231:3000/uploads/${row.companyLogo}`
                }
              },
              null
            );
          },
          className: "logo",
          width: "100px"
        },
        {
          title: "公司名称",
          key: "company"
        },
        {
          title: "招聘职位",
          key: "position"
        },
        {
          title: "公司地点",
          key: "companySite"
        },
        {
          title: "实习薪资/日薪",
          key: "salary"
        },
        {
          title: "发布时间",
          key: "createTime"
        },
        {
          title: "周工作天数",
          key: "weeks"
        },
        {
          title: "操作",
          slot: "action"
        }
      ],
      positionList: []
    };
  }
};
</script>
<style>
.logo img {
  height: 60px;
  width: 60px;
}
.ivu-table-title{
	padding: 0 20px;
  display:flex;
  justify-content:space-between ;
  align-items: center;
}
.ivu-table-title strong{
	font-size:20px
}
</style>
