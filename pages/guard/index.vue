<template>
  <div>
    
    <el-row type="flex" justify="center" align="middle">
      <el-col :span="10">
        <div class="guard">
          <h1>Unauthorized Access</h1>
          <h4>You have no rights to access this page!</h4>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<style scoped>
  .el-row {
    height: 93vh;
    background-color: #f7f7f7;
    margin-bottom: 0;
  }
  .guard {
    text-align: center
  }
  .guard h1 {
    font-size: 30px;
  }
</style>
