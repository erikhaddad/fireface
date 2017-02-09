export interface IAvatar {
    $key?: string;

    createdAt: number;
    author: string;
    image?: string;

    gender: string;
    color: string;
    face: string;
    clothes: string;
    eyes: string;
    hair: string;
    facialhair: string;
    hat: string;
    neck: string;
    ears: string;
}

export class Avatar implements IAvatar {
    createdAt: number;
    author: string;
    image: string;

    gender: string;
    color: string;
    face: string;
    clothes: string;
    eyes: string;
    hair: string;
    facialhair: string;
    hat: string;
    neck: string;
    ears: string;

    constructor() {
        //this._createdAt = firebase.database()['ServerValue']['TIMESTAMP'];
        this.createdAt = +new Date();
    }
}