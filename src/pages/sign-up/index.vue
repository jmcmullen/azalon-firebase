<template>
  <div class="page page--sign-up">
    <SignUpForm/>
  </div>
</template>

<script>
import SignUpForm from '~/components/pages/sign-up/SignUpForm';

export default {
  components: {
    SignUpForm,
  },
};
</script>

<style lang="scss">
.page {
  margin-top: 7rem;
}
</style>
