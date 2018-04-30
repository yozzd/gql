<template>
  <div>

    <el-row class="header" type="flex" align="middle">
      <el-col :span="4">
        <nuxt-link to="/" exact><el-button type="text" size="small">Home</el-button></nuxt-link>
      </el-col>
      <el-col :span="14">
        <nuxt-link to="/manage" v-if="$auth.hasRole('admin')"><el-button type="text" size="small">Manage</el-button></nuxt-link>
      </el-col>
      <el-col :span="6">
        <div class="nav-right">
          <el-button type="text" size="small" @click="$auth.logout()" v-if="$auth.state.loggedIn">Logout</el-button>
          <nuxt-link to="/login" v-else><el-button type="text" size="small">Login</el-button></nuxt-link>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<style scoped>
  .header.el-row {
    height: 46px;
    margin-bottom: 0;
    //background-color: #f9fafc;
    //border-bottom: 1px solid #eeeeee;
  }
  .nav-right {
    float: right;
  }
  .el-button--text {
    color: #2c3e50;
  }
  .nuxt-link-active .el-button--text {
    color: #409eff;
  }
</style>
