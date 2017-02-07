export interface IAvatar {
    $key?: string;
    createdAt: number;
    title: string;
    datetime: string;
    image: string;
}

export class Avatar implements IAvatar {
    createdAt: number = firebase.database()['ServerValue']['TIMESTAMP'];
    title: string;
    datetime: string;
    image: string;

    gender:string;
    color:string;
    face:string;
    clothes:string;
    eyes:string;
    hair:string;
    facialhair:string;
    hat:string;
    neck:string;
    ears:string;

    constructor(title: string, datetime: string, image: string) {
        this.title = title;
        this.datetime = datetime;
        this.image = image;
    }
}