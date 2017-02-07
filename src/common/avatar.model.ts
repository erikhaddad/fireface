export interface IAvatar {
    $key?: string;

    createdAt: number;
    title: string;
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
    private _createdAt: number;
    private _title: string;
    private _image: string;

    private _gender: string;
    private _color: string;
    private _face: string;
    private _clothes: string;
    private _eyes: string;
    private _hair: string;
    private _facialhair: string;
    private _hat: string;
    private _neck: string;
    private _ears: string;

    constructor() {
        //this._createdAt = firebase.database()['ServerValue']['TIMESTAMP'];
        this._createdAt = +new Date();
    }

    get createdAt(): number {
        return this._createdAt;
    }
    set createdAt(value: number) {
        this._createdAt = value;
    }

    get title(): string {
        return this._title;
    }
    set title(value: string) {
        this._title = value;
    }

    get image(): string {
        return this._image;
    }
    set image(value: string) {
        this._image = value;
    }

    get gender(): string {
        return this._gender;
    }
    set gender(value: string) {
        this._gender = value;
    }

    get color(): string {
        return this._color;
    }
    set color(value: string) {
        this._color = value;
    }

    get face(): string {
        return this._face;
    }
    set face(value: string) {
        this._face = value;
    }

    get clothes(): string {
        return this._clothes;
    }
    set clothes(value: string) {
        this._clothes = value;
    }

    get eyes(): string {
        return this._eyes;
    }
    set eyes(value: string) {
        this._eyes = value;
    }

    get hair(): string {
        return this._hair;
    }
    set hair(value: string) {
        this._hair = value;
    }

    get facialhair(): string {
        return this._facialhair;
    }
    set facialhair(value: string) {
        this._facialhair = value;
    }

    get hat(): string {
        return this._hat;
    }
    set hat(value: string) {
        this._hat = value;
    }

    get neck(): string {
        return this._neck;
    }
    set neck(value: string) {
        this._neck = value;
    }

    get ears(): string {
        return this._ears;
    }
    set ears(value: string) {
        this._ears = value;
    }
}