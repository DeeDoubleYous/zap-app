import { IPangolinRecord } from "./interfaces/IPangolinRecord"

export const exmplePangolin: IPangolinRecord[] = [
    {
      id: 23,
      time: new Date(Date.now()),
      imageUrl: './assets/images/defaultImage.png',
      isDead: true,
      deathType: 'car',
      location: {
        lat: 3,
        lon: 3
      }
    },
    {
      id:1,
      time: new Date('2021/10/2 13:30'),
      imageUrl: './assets/images/examplePangolin.jpg',
      isDead: false,
      location: {
        lat: 2,
        lon: 12
      }
    },
    {
      id:2,
      time: new Date('2/3/2020'),
      imageUrl: './assets/images/examplePangolin2.jpg',
      isDead: false,
      location: {
        lat: 2,
        lon: 12
      }
    },
    {
      id:2,
      time: new Date('2/3/2020'),
      imageUrl: './assets/images/examplePangolin2.jpg',
      isDead: false,
      location: {
        lat: 2,
        lon: 12
      }
    },
    {
      id: 23,
      time: new Date(Date.now()),
      imageUrl: './assets/images/defaultImage.png',
      isDead: true,
      deathType: 'car',
      location: {
        lat: 3,
        lon: 3
      }
    },
  ] 