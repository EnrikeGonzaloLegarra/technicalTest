import GeniallyIsEmptyName from "./GeniallyIsEmptyName";
import GeniallyIsValidName from "./GeniallyIsValidName";
import GeniallyIsValidDescription from "./GeniallyIsValidDescription";

export default class Genially {
    private _id: string;
    private _name: string;
    private _description: string;
    private _createdAt: Date;
    private _modifiedAt: Date;
    private _deletedAt: Date;

    constructor(id: string, name: string, description?: string) {
        if (this.isNameEmpty(name)) {
            throw new GeniallyIsEmptyName(id);
        }
        if (!this.isNameValid(name)) {
            throw new GeniallyIsValidName(name);
        }
        if (this.isDescriptionValid(description)) {
            throw new GeniallyIsValidDescription(id);
        }

        this._id = id;
        this._name = name;
        this._description = description;
        this._createdAt = new Date();
    }


    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get description(): string {
        return this._description;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get modifiedAt(): Date {
        return this._modifiedAt;
    }

    get deletedAt(): Date {
        return this._deletedAt;
    }

    isNameEmpty(name: string): boolean {
        return name.length == 0;
    }

    isNameValid(name: string) {
        return name.length >= 3 && name.length <= 20;
    }

    isDescriptionValid(description: string): boolean {
        return description.length > 125;
    }

    delete(): Genially {
        this._deletedAt = new Date();
        return this;
    }

    rename(updatedName: string): Genially {
        this._name = updatedName;
        this._modifiedAt = new Date();
        return this;
    }
}
