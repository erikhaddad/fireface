import {Component, OnInit, ViewEncapsulation, Input} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MdIconRegistry} from '@angular/material';

import * as html2canvas from "html2canvas";
import 'rxjs/add/observable/throw';
import {Avatar} from "../common/avatar.model";
import {AssetService, IColor} from "../common/asset.service";
import {AvatarService} from "../common/avatar.service";

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
                private sanitizer: DomSanitizer,
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
        /*
        // SETS defaults
        for (let k = 0; k < this.setsKeys.length; k++) {
            let key = this.setsKeys[k];
            let value = this.sets[key][this.selectedGender][0];

            this.setConfigValue(key, value);
        }
        */

        // SETS random values
        this.renderRandom();
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
        console.log('state of currentAvatar', this.currentAvatar);

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
