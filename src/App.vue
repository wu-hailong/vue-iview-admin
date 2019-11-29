<template>
    <div class="layout">
        <Layout :style="{minHeight: '100vh'}">
            <Sider collapsible :collapsed-width="78" v-model="isCollapsed">
                <Menu :active-name="currentName" theme="dark" width="auto" :class="menuitemClasses">
                    <MenuItem name="1-1" to="/home">
                        <Icon type="md-home" />
                        <span>首页</span>
                    </MenuItem>
                    <MenuItem name="1-2" to="/position">
                        <Icon type="md-contacts" />
                        <span>管理职位</span>
                    </MenuItem>
                </Menu>
            </Sider>
            <Layout>
                <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
                  实习僧后台管理系统
                </Header>
                <Content :style="{padding: '0 16px 16px'}">
                    <router-view @onRouteChange="handleRouteChange"></router-view>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
import { Layout, Sider, Menu, MenuItem, Icon, Header, Content, Breadcrumb, Card, BreadcrumbItem} from 'view-design';
export default {
  components: {
    Layout, 
    Sider, 
    Menu, 
    MenuItem, 
    Icon, 
    Header, 
    Content, 
    Breadcrumb, 
    Card,
    BreadcrumbItem
  },
  data () {
      return {
          isCollapsed: false,
          currentName:"1-1"
      };
  },
  computed: {
      menuitemClasses: function () {
          return [
              'menu-item',
              this.isCollapsed ? 'collapsed-menu' : ''
          ]
      }
  },
  methods: {
    //   解决高亮问题
      handleRouteChange(to){
          let map = {
              "home":"1-1",
              "position":"1-2"
          }
          this.currentName = map[to.name]
      }
  },
  watch: {
      //检测路由解决高亮问题
      $route(to){
          let map = {
             "home" : "1-1",
             "position" : "1-2"
          }
        this.currentName = map[to.name]
      }
  }
}
</script>
<style scoped>
    .layout-con{
        height: 100%;
        width: 100%;
    }
    .ivu-layout-header{
      font-size: 20px;
      font-weight: 700;
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
</style>