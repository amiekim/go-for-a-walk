import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

class AuthService {
    constructor() {
        this.firebaseAuth = getAuth();
        this.googleProvider = new GoogleAuthProvider();
    }
    login(providerName) {
        const authProvider = this.getProvider(providerName);
        // 기본정보, 로그인시 제공받은 정보를 넣는다.
        return signInWithPopup(this.firebaseAuth, authProvider);
    }
    logout() {
        return signOut(this.firebaseAuth);
    }
    onAuthChange(onUserChanged) {
        this.firebaseAuth.onAuthStateChanged((user) => {
            console.log(user)
            onUserChanged(user);
        })
    }
    getProvider(providerName) {
        switch (providerName) {
            case "Google":
                // 구글 인증받기
                return this.googleProvider;
            default:
                throw new Error(`not supported provider: ${providerName}`)
        }
    }
}

export default AuthService