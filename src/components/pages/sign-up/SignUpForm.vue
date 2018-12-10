<template>
  <el-form
    ref="signUpForm"
    :model="signUpForm"
    :rules="loginRules"
    status-icon
    label-width="120px"
    class="login-form"
    @keyup.enter.native="onSubmit"
  >
    <h2 class="login-form__title">Create an account</h2>
    <p
      class="login-form__desc"
    >Fill out the form below to sign up. If you already have an account you can
      <nuxt-link to="/login">login here</nuxt-link>.
    </p>
    <el-form-item label="Email" prop="email">
      <el-input v-model="signUpForm.email" type="text"/>
    </el-form-item>
    <el-form-item label="Password" prop="password">
      <el-input v-model="signUpForm.password" type="password"/>
    </el-form-item>
    <el-form-item label="Verify Password" prop="verifyPassword">
      <el-input v-model="signUpForm.verifyPassword" type="password"/>
    </el-form-item>
    <el-form-item>
      <el-button @click="onSubmit">Sign Up</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      signUpForm: {
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
            message: 'Please enter a valid email address',
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
        verifyPassword: [
          {
            required: true,
            validator: this.verifyPassword,
            trigger: 'blur',
          },
        ],
      },
    };
  },
  mounted() {
    // Redirct if already authenticated.
    if (this.$fireAuth.currentUser) {
      this.$router.push('/dashboard');
    }

    // If firebase is loaded after mounted redirect if authenticated.
    this.$fireAuth.onAuthStateChanged(user => {
      if (user) this.$router.push('/dashboard');
    });
  },
  methods: {
    onSubmit() {
      this.$refs.signUpForm.validate(async valid => {
        if (valid) {
          try {
            await this.$fireAuth.createUserWithEmailAndPassword(
              this.signUpForm.email,
              this.signUpForm.password
            );
            this.$router.push('/login');
          } catch (error) {
            this.$message.error(error);
          }
        } else {
          return false;
        }
      });
    },
    verifyPassword(rule, value, callback) {
      if (value === '') {
        callback(new Error(`Your password can't be blank`));
      } else if (value !== this.signUpForm.password) {
        callback(new Error(`Both password fields must be the same`));
      } else {
        callback();
      }
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
