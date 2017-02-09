import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/switchMap';

import {Injectable} from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {AuthService} from '../auth/auth.service';
import {IAvatar, Avatar} from './avatar.model';

@Injectable()
export class AvatarService {
    private _publicAvatars$: FirebaseListObservable<IAvatar[]>;
    private _userAvatars$: FirebaseListObservable<IAvatar[]>;

    constructor(af: AngularFire, auth: AuthService) {
        const publicAvatarsPath = `/avatars`;
        this._publicAvatars$ = af.database.list(publicAvatarsPath);

        const userAvatarsPath = `/users/${auth.id}/avatars`;
        this._userAvatars$ = af.database.list(userAvatarsPath);
    }


    get publicAvatars(): FirebaseListObservable<IAvatar[]> {
        return this._publicAvatars$;
    }

    get userAvatars(): FirebaseListObservable<IAvatar[]> {
        return this._userAvatars$;
    }

    /** PUBLIC EVENTS **/
    createPublicAvatar(avatar:Avatar): firebase.Promise<any> {
        return this._publicAvatars$.push(avatar);
    }

    removePublicAvatar(avatar: IAvatar): firebase.Promise<any> {
        return this._publicAvatars$.remove(avatar.$key);
    }

    updatePublicAvatar(avatar: IAvatar, changes: any): firebase.Promise<any> {
        return this._publicAvatars$.update(avatar.$key, changes);
    }

    /** USER-CENTRIC EVENTS **/
    createUserAvatar(avatar:Avatar): firebase.Promise<any> {
        return this._userAvatars$.push(avatar);
    }

    removeUserAvatar(avatar: IAvatar): firebase.Promise<any> {
        return this._userAvatars$.remove(avatar.$key);
    }

    updateUserAvatar(avatar: IAvatar, changes: any): firebase.Promise<any> {
        return this._userAvatars$.update(avatar.$key, changes);
    }
}
