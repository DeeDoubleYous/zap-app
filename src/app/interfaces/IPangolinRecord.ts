import { ILocation } from "./ILocations";

export interface IPangolinRecord{
    imageUrl: string,
    isDead: boolean,
    deathType?: string,
    note? :string,
    location: ILocation
}