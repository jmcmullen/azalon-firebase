export default function({ app, redirect }) {
  if (app.$fireAuth.currentUser && !app.$fireAuth.currentUser.emailVerified) {
    redirect('/sign-up/verify');
  }

  app.$fireAuth.onAuthStateChanged(user => {
    if (user && !user.emailVerified) {
      redirect('/sign-up/verify');
    } else if (!user) {
      redirect('/login');
    }
  });
}
