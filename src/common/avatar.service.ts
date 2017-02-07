import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/switchMap';

import {Injectable} from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {AuthService} from '../auth/auth.service';
import {IAvatar, Avatar} from './avatar.model';


@Injectable()
export class AvatarService {
    private _allAvatars$: FirebaseListObservable<IAvatar[]>;
    private _userAvatars$: FirebaseListObservable<IAvatar[]>;

    constructor(af: AngularFire, auth: AuthService) {
        const allAvatarsPath = `/avatars`;
        this._allAvatars$ = af.database.list(allAvatarsPath);

        const userAvatarsPath = `/users/${auth.id}/avatars`;
        this._userAvatars$ = af.database.list(userAvatarsPath);
    }


    get allAvatars(): FirebaseListObservable<IAvatar[]> {
        return this._allAvatars$;
    }

    get userAvatars(): FirebaseListObservable<IAvatar[]> {
        return this._userAvatars$;
    }

    /** PUBLIC EVENTS **/
    createPublicAvatar(title: string, datetime: string, image: string): firebase.Promise<any> {
        return this._allAvatars$.push(new Avatar(title, datetime, image));
    }

    removePublicAvatar(avatar: IAvatar): firebase.Promise<any> {
        return this._allAvatars$.remove(avatar.$key);
    }

    updatePublicAvatar(avatar: IAvatar, changes: any): firebase.Promise<any> {
        return this._allAvatars$.update(avatar.$key, changes);
    }

    /** USER-CENTRIC EVENTS **/
    createUserAvatar(title: string, datetime: string, image: string): firebase.Promise<any> {
        return this._userAvatars$.push(new Avatar(title, datetime, image));
    }

    removeUserAvatar(avatar: IAvatar): firebase.Promise<any> {
        return this._userAvatars$.remove(avatar.$key);
    }

    updateUserAvatar(avatar: IAvatar, changes: any): firebase.Promise<any> {
        return this._userAvatars$.update(avatar.$key, changes);
    }
}
