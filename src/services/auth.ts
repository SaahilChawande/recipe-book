import firebase from 'firebase';

export class AuthService  {
  signup(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }
}
