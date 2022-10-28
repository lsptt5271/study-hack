export const DateFormat = 'YYYY/MM/DD';
export const DateTimeFormat = 'YYYY/MM/DD HH:mm:ss';

export const SensorCategory = {
  Camera: '02',
  Weather: '03',
  InfoBoard: '04',
} as const;

export type SensorCategory = typeof SensorCategory[keyof typeof SensorCategory];

export const CameraImageType = {
  Image: 'image',
  Thumbnail: 'thumbnail',
} as const;

export type CameraImageType = typeof CameraImageType[keyof typeof CameraImageType];

export const InfoBoardImageType = {
  Image1: 'image1',
  Image2: 'image2',
  Image3: 'image3',
  Image4: 'image4',
} as const;

export type InfoBoardImageType = typeof InfoBoardImageType[keyof typeof InfoBoardImageType];
