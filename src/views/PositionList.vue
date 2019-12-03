<template>
     <Table stripe border :columns="formTitle" :data="positionList">
        <template slot="header">
          <strong>职位列表</strong>
          <Button
            class="add"
            type="success"
            size="small"
            icon="md-add-circle"
            @click="modalShow = true"
          >添加职位</Button>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button
            type="primary"
            icon="md-create"
            size="small"
            style="margin-right: 5px"
            @click="changeMessage(index)"
          >修改</Button>
          <Button 
            type="error" 
            icon="ios-trash" 
            size="small" 
            @click="remove(index)"
            >删除</Button>
        </template>
        <template slot="footer">
          <slot></slot>
        </template>
      </Table>
</template>

<script>
  import {
    Table,
    Button
  } from "view-design";

  import {update} from "utils/http";
export default {
  props: ["positionList"],
  components: {
    Table,
    Button
  },
  methods: {
    async remove(index) {
      let { _id:id , companyLogo:tempCompanyLogo } = this.positionList[index] 
      await update("/api/position","delete",{
        id,
        tempCompanyLogo
      })
      this.positionList.splice(index,1)
    },
  },
  data () {
    return {
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
      ]
    }
  }
}
</script>

<style>

</style>