<template>
  <el-form
    ref="loginForm"
    :model="loginForm"
    :rules="loginRules"
    status-icon
    label-width="120px"
    class="login-form"
    @keyup.enter.native="onSubmit"
  >
    <h2 class="login-form__title">Authentication required</h2>
    <p
      class="login-form__desc"
    >Please enter your email and password to continue. If you do not yet have an account you can
      <nuxt-link to="/sign-up">sign up here</nuxt-link>.
    </p>
    <el-form-item label="Email" prop="email">
      <el-input v-model="loginForm.email" type="text"/>
    </el-form-item>
    <el-form-item label="Password" prop="password">
      <el-input v-model="loginForm.password" type="password"/>
    </el-form-item>
    <el-form-item>
      <el-button @click="onSubmit">Login</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { auth } from '~/plugins/firebase';

export default {
  data() {
    return {
      loginForm: {
        email: '',
        password: '',
      },
      loginRules: {
        email: [
          {
            required: true,
            message: `Your email can't be blank`,
            trigger: 'blur',
          },
          {
            type: 'email',
            message: 'Please enter a valid email address.',
            trigger: ['blur', 'change'],
          },
        ],
        password: [
          {
            required: true,
            message: `Your password can't be blank`,
            trigger: 'blur',
          },
        ],
      },
    };
  },
  mounted() {
    if (auth.currentUser) {
      this.$router.push('/dashboard');
    }
  },
  methods: {
    onSubmit() {
      console.log('yay');
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          try {
            const resp = await auth.signInWithEmailAndPassword(
              this.loginForm.email,
              this.loginForm.password
            );
            console.log(resp);
            this.$router.push('/dashboard');
          } catch (error) {
            this.$message.error(error);
          }
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss">
.login-form {
  width: 400px;
  display: block;
  margin: 2rem auto;

  &__title {
    margin: 1rem 0;
  }

  &__desc {
    margin-bottom: 3rem;
  }

  .el-form-item {
    margin-bottom: 25px;
  }

  .el-button {
    margin-top: 15px;
  }
}
</style>
