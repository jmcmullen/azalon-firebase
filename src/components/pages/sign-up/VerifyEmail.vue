<template>
  <el-form
    ref="verifyForm"
    :model="verifyForm"
    :rules="verifyRules"
    status-icon
    label-width="120px"
    class="verify-form"
    @keyup.enter.native="onSubmit"
  >
    <h2 class="verify-form__title">Email verification needed</h2>
    <p class="verify-form__desc">We've sent you an email. Please click the link inside.
      <br>If your email is wrong, you can change it below.
    </p>
    <el-form-item label="Email" prop="email">
      <el-input v-model="verifyForm.email" type="text"/>
    </el-form-item>
    <el-form-item>
      <el-button @click="onSubmit">Resend Email</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      currentUser: {
        email: '',
        emailVerified: false,
      },
      verifyForm: {
        email: '',
      },
      verifyRules: {
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
      },
    };
  },
  mounted() {
    if (this.$fireAuth.currentUser) {
      this.currentUser = this.$fireAuth.currentUser;
      this.verifyForm.email = this.currentUser.email;

      // Redirct if already verified email.
      if (this.currentUser.emailVerified) {
        this.$router.push('/dashboard');
      }
    }

    // Fetch user from firebase if not loaded yet.
    this.$fireAuth.onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user;
        this.verifyForm.email = user.email;

        // Redirect on verifcation.
        if (user.emailVerified) {
          this.$router.push('/dashboard');
        }
      }
    });
  },
  methods: {
    onSubmit() {
      this.$refs.verifyForm.validate(async valid => {
        if (valid) {
          try {
            // Update user with correct email.
            if (this.currentUser.email !== this.verifyForm.email) {
              await this.currentUser.updateEmail(this.verifyForm.email);
              this.currentUser = this.$fireAuth.currentUser;
            }

            // Send verification email.
            await this.currentUser.sendEmailVerification();
            this.$message.success(
              `We've sent a new email to ${this.currentUser.email}`
            );
          } catch (error) {
            this.$message.error(error);

            console.log(error);

            // Can't change email unless logged in recently.
            if (error.code === 'auth/requires-recent-login') {
              this.$fireAuth.signOut();
              this.$router.push('/login');
            }
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
.verify-form {
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
