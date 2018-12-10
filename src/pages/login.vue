<template>
  <div class="page page--login">
    <LoginForm/>
  </div>
</template>

<script>
import LoginForm from '~/components/pages/login/LoginForm';

export default {
  components: {
    LoginForm,
  },
};
</script>

<style lang="scss">
.page {
  margin-top: 7rem;
}
</style>
