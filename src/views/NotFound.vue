<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <div class="not-found-title">404</div>
      <div class="not-fond-subtitle">页面没找到</div>
      <div class="not-fond-msg">
        找不到请求的页面 <br/>
        尝试检查网址是否有错误
      </div>
      <router-link class="not-found-btn" to="/">返回主页</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NotFound'
  }
</script>