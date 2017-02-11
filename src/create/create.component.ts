import {Component, OnInit, ViewEncapsulation, Input} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MdIconRegistry} from '@angular/material';

import * as html2canvas from "html2canvas";
import 'rxjs/add/observable/throw';
import {Avatar} from "../common/avatar.model";
import {AssetService, IColor} from "../common/asset.service";
import {AvatarService} from "../common/avatar.service";
import {ActivatedRoute, Router, Params} from "@angular/router";
import {AuthService} from "../auth/auth.service";

import * as firebase from 'firebase';

@Component({
    selector: 'create-root',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CreateComponent implements OnInit {

    currentAvatar: Avatar;

    @Input()
    selectedTabIndex: number;

    @Input()
    selectedGender: string;

    setsKeys: string[];
    intervalPromise: number|null;
    imageData: string;
    sets: any;
    colors: IColor[];

    constructor(iconRegistry: MdIconRegistry,
                private route: ActivatedRoute,
                private router: Router,
                private sanitizer: DomSanitizer,
                private authService: AuthService,
                private assetService: AssetService,
                private avatarService: AvatarService) {
        this.currentAvatar = new Avatar();

        this.colors = assetService.colors;
        this.sets = assetService.sets;
        this.setsKeys = assetService.assetKeys;

        this.selectedTabIndex = 0;
        this.selectedGender = this.currentAvatar.gender = "male";
        this.currentAvatar.color = this.colors[0].value;

        this.intervalPromise = null;
        this.imageData = "#";

        iconRegistry.addSvgIconSetInNamespace(
            'avatar',
            sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/avatar-icons.svg'));
    }

    ngOnInit() {
        console.log('attempting to load avatar id', this.route.params);
        this.route.params
            .switchMap((params: Params) => this.avatarService.getPublicAvatar(params['id']))
            .subscribe((avatar: Avatar) => {
                if (typeof avatar.createdAt !== 'undefined') {
                    this.currentAvatar = avatar;
                } else {
                    // SETS random values
                    this.renderRandom();
                }
            });
    }

    setConfigValue(key:string, val:string|null) {
        this.currentAvatar[key] = val;

        this.updateImageData();
    }

    renderRandom(): void {
        this.currentAvatar.color = this.colors[this.randIndex(this.colors)].value;

        for (let k = 0; k < this.setsKeys.length; k++) {
            let key = this.setsKeys[k];
            this.addAssetRandom(key, this.sets[key][this.selectedGender]);
        }

        this.updateImageData();
    }

    updateImageData(): void {
        if (typeof html2canvas !== 'undefined') {
            let that = this;
            setTimeout(function () {
                html2canvas(document.getElementById('avatar'))
                    .then(function (canvas) {
                        (document.getElementById('save') as HTMLAnchorElement).href = that.imageData = canvas.toDataURL('image/png');

                        //console.log('new image data', that.image);
                    });
            }, 2000);
        }
    }

    uploadAvatar(): void {
        this.currentAvatar.author = this.authService.userInfo.displayName;
        this.currentAvatar.createdAt = firebase.database.ServerValue.TIMESTAMP;

        console.log('pre upload', this.currentAvatar);

        // For demo, upload all to public, user-specific, and Firebase storage
        this.avatarService.createPublicAvatar(this.currentAvatar);
        this.avatarService.createUserAvatar(this.currentAvatar);
    }

    addAssetRandom(key, list): void {
        this.currentAvatar[key] = list[this.randIndex(list)];
    }

    randIndex(list): number {
        return Math.floor(Math.random() * list.length);
    }

    autoShuffle(): void {
        if (this.intervalPromise) {
            clearInterval(this.intervalPromise);
            this.intervalPromise = null;
        } else {
            this.renderRandom();
            this.intervalPromise = setInterval(this.renderRandom, 2000);
        }
    }

    setSelectedGender(gender:string) {
        if (this.selectedGender != gender) {
            this.selectedGender = gender;
            this.currentAvatar.gender = gender;

            this.renderRandom();
        }
    }
}
