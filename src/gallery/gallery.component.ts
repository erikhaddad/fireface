import {Component, OnInit, ViewEncapsulation, Input} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {FirebaseListObservable} from 'angularfire2';
import {IAvatar} from '../common/avatar.model';
import {AvatarService} from '../common/avatar.service';

@Component({
    selector: 'gallery-root',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class GalleryComponent implements OnInit {
    allAvatars: FirebaseListObservable<IAvatar[]>;
    userAvatars: FirebaseListObservable<IAvatar[]>;

    constructor(avatarService: AvatarService) {
        this.allAvatars = avatarService.allAvatars;
        this.userAvatars = avatarService.userAvatars;

        console.log('all avatars', this.allAvatars);
    }

    ngOnInit() {}
}
