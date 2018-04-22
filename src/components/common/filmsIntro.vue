<template>
<div class="wrap">
  <el-card>
    <div slot="header">
      <span>剧情简介</span>
    </div>
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
  font-size: 16px;
  margin-bottom: 18px;
}
</style>

