export interface IPangolinInserterItem {
    time: string,
    pangolinImage: Blob,
    location: string,
    isDead: boolean,
    deathId?: number,
    note?: string,
    [index:string]: any
}