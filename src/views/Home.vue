<template>
  
  <div>
    <Breadcrumb :style="{margin: '16px 0'}">
        <BreadcrumbItem>首页</BreadcrumbItem>
    </Breadcrumb>
    <Card>
     Welcome .
    </Card>
  </div>
</template>

<script>
import { Breadcrumb, BreadcrumbItem, Card } from "view-design"
export default {
  components: {
     Breadcrumb, 
     BreadcrumbItem, 
     Card
  }
}
</script>

<style scoped>
</style>