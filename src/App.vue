<template>
  <div id="app">
    <keep-alive>
          <router-view v-if="$route.meta.keepAlive">
            <!-- 这里是会被缓存的视图组件 -->
          </router-view>
        </keep-alive>

        <router-view v-if="!$route.meta.keepAlive">
          <!-- 这里是不被缓存的视图组件 -->
        </router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
a{
  text-decoration: none;
}
p{
  margin: 0;
  padding: 0;
}
.flexCen{
  display: flex;
  justify-content: center;
  align-items: center;
}
.full{
  width: 100%;
  height: 100%;
}
.none{
    width: 500px;
    height: 100px;
    border-radius: 4px;
    float: left;
    padding: 15px;
    color:#666;
    font-size: 22px;
    font-weight: bold;
    letter-spacing: 5px;
    background: #fff;
  }

</style>
