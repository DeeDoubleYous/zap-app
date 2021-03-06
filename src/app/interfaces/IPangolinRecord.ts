import { ILocation } from "./ILocations";

export interface IPangolinRecord{
    id: number,
    time: Date,
    imageUrl: string,
    isDead: boolean,
    deathName?: string,
    note? :string,
    location: ILocation
}