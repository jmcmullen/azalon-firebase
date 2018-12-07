<template>
  <div class="page page--login">
    <Form/>
  </div>
</template>

<script>
import Form from '~/components/pages/login/Form';

export default {
  components: {
    Form,
  },
};
</script>

<style lang="scss">
.page {
  margin-top: 7rem;
}
</style>
