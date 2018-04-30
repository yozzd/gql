<template>
  <div>

    <el-col :span="3" class="sidebar">
      <ul>
        <li v-for="link in links" :key="link.name">
          <nuxt-link :to="{ path: link.path }"><el-button type="text" size="small">{{ link.name }}</el-button> <i class="el-icon-arrow-right el-icon-right"></i></nuxt-link>
        </li>
      </ul>
    </el-col>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        links: [{
          name: 'User',
          path: '/manage/user'
        }]
      }
    }
  }
</script>

<style scoped>
  .sidebar.el-col {
    border-right: 1px dashed #dddddd;
    height: 50vh;
    padding: 10px 0;
  }
  .sidebar.el-col > ul {
    padding: 0;
    list-style: none;
    margin-top: 2px;
  }
  .el-button--text {
    padding: 8px 20px;
    color: #2c3e50;
  }
  .nuxt-link-active .el-button--text,
  .nuxt-link-active .el-icon-right {
    color: #409eff;
  }
  .sidebar.el-col > ul > li > a {
    position: relative;
    display: block;
  }
  .el-icon-right {
    position: absolute;
    right: 20px;
    top: 38%;
    color: #2c3e50;
  }
</style>
                                                                                                                                                            
