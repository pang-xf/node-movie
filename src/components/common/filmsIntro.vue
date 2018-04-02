<template>
<div class="wrap">
  <el-card>
    {{filmDetail}}
  </el-card>
</div>
</template>
<script>
export default {
  props:['filmDetail']
}
</script>
<style lang="less" scoped>
.wrap{
  width: 100%;
}
</style>

