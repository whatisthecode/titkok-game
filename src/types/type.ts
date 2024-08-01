export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  isRewarded?: boolean;
  rewardedAt?: string;
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
  ruleBannerHeight: number;
  stuffWidths: number[];
  fireworks: number[];
  flowers: StuffConfig[];
  resultStickWidth: number;
  buttonHeight: number;
  phoneWidth: number;
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
}

export type Layout = 'mobile' | 'desktop';
