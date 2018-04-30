<template>
  <div>

    <el-row>
      <Sidebar/>
      <Main/>
    </el-row>

  </div>
</template>

<script>
  import Sidebar from '@/components/manage/sidebar/index'
  import Main from '@/components/manage/index'

  export default {
    middleware: ['auth'],
    components: {
      Sidebar,
      Main
    },
    meta: {
      guard: ['admin']
    }
  }
</script>
