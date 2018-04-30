<template>
  <div>

    <Navbar/>
    <nuxt/>

  </div>
</template>

<script>
  import Navbar from '@/components/navbar/index'

  export default {
    components: {
      Navbar
    }
  }
</script>

<style>
  @font-face {
    font-family: 'robotoregular';
    src: url('~/assets/font/roboto-regular-webfont.woff2') format('woff2'), url('~/assets/font/roboto-regular-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  html {
    font-family: 'robotoregular';
    font-size: 12px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: border-box;
    margin: 0;
  }
  body, input, textarea, select, button {
    font-family: inherit;
    font-size: inherit;
  }
  .el-row {
    margin-bottom: 20px;
    padding: 0 100px;
  }
  .el-form-item__label,
  .el-input__inner,
  .el-table,
  .el-select-dropdown__item {
    font-size: 12px;
    color: #2c3e50;
  }
  .el-message__content {
    font-size: 12px;
  }
</style>
