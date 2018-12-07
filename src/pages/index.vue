<template>
  <section class="container">
    <div>
      <h1 class="title">Azalon</h1>
      <h2 class="subtitle">Licencing System.</h2>
      <nuxt-link to="/login">
        <el-button type="primary">Take me to the login area</el-button>
      </nuxt-link>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
  margin-bottom: 0;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 35px;
}
</style>
