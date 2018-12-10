<template>
  <div class="page page--verify-email">
    <VerifyEmail/>
  </div>
</template>

<script>
import VerifyEmail from '~/components/pages/sign-up/VerifyEmail';

export default {
  components: {
    VerifyEmail,
  },
};
</script>

<style lang="scss">
.page {
  margin-top: 7rem;
}
</style>
