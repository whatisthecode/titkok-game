export interface IUser {
  firstName?: string;
  lastName: string;
  fullName: string;
  email: string;
  company: string;
  isRewarded?: boolean;
  isPlayed?: boolean;
  device?: string;
  giftId?: number;
  phone?: string;
  address?: string;
  title?: string;
}

export interface UserContextProps {
  userData: IUser | null;
  setUserData: (user: IUser | null) => void;
}

export interface StuffConfig {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface GameFontConfig {
  family: string;
  size: number;
  lineHeight: number;
  style: string;
}

export interface GameConfig {
  logoWidth: number;
  nameLogoHeight: number;
  font: GameFontConfig;
  titleBannerHeight: number;
  otherBanner: number;
  ruleBannerHeight: number;
  stuffWidths: number[];
  fireworks: number[];
  flowers: StuffConfig[];
  resultStickWidth: number;
  buttonHeight: number;
  phoneWidth: number;
  giftBoxWidth: number;
  giftWidth: number;
  pathY: number;
}


export interface GameData extends GameConfig {
  step: number;
  layout: string;
  orientation: string;
  screen: {
    width: number;
    height: number;
    dpr: number;
    bWidth: number;
    bHeight: number;
  };
  current: number;
  playCount: number;
  result: number[];
  userInfo: any;
  device?: string;
}

export type Layout = 'mobile' | 'desktop';

export type Step = 'register' | 'game' | 'result' | 'letter';

export type RegisterUserRequest = Pick<IUser, 'firstName' | 'lastName' | 'email' | 'company'>;

export type UpdateUserRequest = Pick<
  IUser,
  'fullName' | 'phone' | 'address' | 'email' | 'company' | 'title' | 'isRewarded' | 'isPlayed' | 'giftId'
>;
