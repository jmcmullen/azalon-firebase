<template>
  <div>
    <Navbar/>
    <nuxt/>
  </div>
</template>

<script>
import Navbar from '~/components/partials/Navbar.vue';

export default {
  components: {
    Navbar,
  },
};
</script>
