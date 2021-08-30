export default function ({ store, redirect }) {
  if (!store.state['UserSignup'].email || !store.state['UserSignup'].password) {
    return redirect('/register')
  }
}
