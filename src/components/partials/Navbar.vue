<template>
  <div class="navbar">
    <el-menu mode="horizontal" @select="onNavigate">
      <el-menu-item index="1">Sign Out</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  methods: {
    onNavigate(key, keyPath) {
      switch (key) {
        case '1': // Sign Out
          this.$fireAuth.signOut();
          this.$router.push('/');
      }
    },
  },
};
</script>
