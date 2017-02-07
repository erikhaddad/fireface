import {Injectable} from '@angular/core';
import {AuthProviders, AngularFireAuth, FirebaseAuthState} from 'angularfire2';
import UserInfo = firebase.UserInfo;

@Injectable()
export class AuthService {
    private authState: FirebaseAuthState = null;

    constructor(public auth$: AngularFireAuth) {
        auth$.subscribe((state: FirebaseAuthState) => {
            this.authState = state;
        });
    }

    get authenticated(): boolean {
        return this.authState !== null;
    }

    get id(): string {
        return this.authenticated ? this.authState.uid : '';
    }

    get state(): FirebaseAuthState|null {
        return this.authenticated ? this.authState : null;
    }

    get userInfo(): UserInfo {
        let info:UserInfo;

        if (this.authenticated) {
            switch (this.state.provider) {
                case AuthProviders.Google:
                    info = this.state.google;
                    break;

                case AuthProviders.Facebook:
                    info = this.state.facebook;
                    break;

                case AuthProviders.Twitter:
                    info = this.state.twitter;
                    break;

                case AuthProviders.Github:
                    info = this.state.github;
                    break;
            }
        }

        return info;
    }

    signIn(provider: number): firebase.Promise<FirebaseAuthState> {
        return this.auth$.login({provider})
            .catch(error => console.log('ERROR @ AuthService#signIn() :', error));
    }

    signInWithGithub(): firebase.Promise<FirebaseAuthState> {
        return this.signIn(AuthProviders.Github);
    }

    signInWithGoogle(): firebase.Promise<FirebaseAuthState> {
        return this.signIn(AuthProviders.Google);
    }

    signInWithFacebook(): firebase.Promise<FirebaseAuthState> {
        return this.signIn(AuthProviders.Facebook);
    }

    signInWithTwitter(): firebase.Promise<FirebaseAuthState> {
        return this.signIn(AuthProviders.Twitter);
    }

    signOut(): void {
        this.auth$.logout();
    }
}
