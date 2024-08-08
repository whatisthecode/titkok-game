import { Stage, Layer, Image, Rect, Text } from 'react-konva';
import useImage from 'use-image';
import Cookies from 'js-cookie';
import './Game.css';
import {
  Children,
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import { GameConfig, GameData, IUser, Layout, Step, StuffConfig } from '../types/type';
import { GameContext, GameDispatchContext } from '../contexts';
import { GameReducer } from '../services/reducer';
import {
  GIFT_IN_LIST,
  LIST_RESULT,
  generateDefaultResult,
  getPlayTimes,
  getWishingResult,
} from '../util';
import GiftForm from './GiftForm';
import { getGift, getUser, updateUser } from '../services/apiClient';
import NewRegisterForm from './NewRegister';

// type Props = {
//   setStep: (step: Step) => void;
// };

const STUFFS = [
  [1225, 1362],
  [1497, 1621],
  [1481, 1185],
  [265, 202],
  [359, 482],
  [739, 851],
  [413, 326],
  [1414, 907],
  [716, 322],
];

const NAME_LOGO = [702, 185];
const TITLE_BANNERS = [3974, 1459];
const RULE_BANNERS = [2318, 1117];
const LAST_BANNERS = [3974, 1622];
const NOT_REGISTERED_BANNERS = [2986, 1104];
const BUTTON = [327, 80];
const LARGE_BUTTON = [392, 104];
const CUP = [911, 1096];
const CUP_LOWER = [911, 282];

const BOX_LOWER = [2148, 1030];
const BOX_UPPER = [2154, 1288];

const FLOWERS = [
  [0, 0],
  [156, 135],
  [0, 0],
  [0, 0],
];

const SIZES = new Map<string, GameConfig>();

SIZES.set('<=320', {
  logoWidth: 100,
  nameLogoHeight: 40,
  font: {
    family: 'TikTokDisplayFont',
    size: 12,
    lineHeight: 16,
    style: 'normal',
  },
  titleBannerHeight: 110,
  otherBanner: 120,
  ruleBannerHeight: 140,
  resultStickWidth: 70,
  buttonHeight: 24,
  phoneWidth: 100,
  giftBoxWidth: 100,
  giftWidth: 100,
  pathY: 100,
  stuffWidths: [50, 50, 50, 40, 40, 40, 40, 50, 40],
  fireworks: [30, 60, 90],
  flowers: [
    {
      x: 0,
      y: 0,
      w: 0,
      h: 0,
    },
    {
      x: 65,
      y: window.innerHeight - 75,
      w: 25,
      h: (FLOWERS[1][1] * 25) / FLOWERS[1][0],
    },
    {
      x: 0,
      y: 0,
      w: 0,
      h: 0,
    },
    {
      x: 0,
      y: 0,
      w: 0,
      h: 0,
    },
  ],
});

SIZES.set('<=375', {
  logoWidth: 200,
  nameLogoHeight: 60,
  font: {
    family: 'TikTokDisplayFont',
    size: 12,
    lineHeight: 18,
    style: 'normal',
  },
  titleBannerHeight: 120,
  otherBanner: 130,
  ruleBannerHeight: 160,
  stuffWidths: [70, 70, 70, 70, 60, 70, 60, 70, 70],
  fireworks: [30, 60, 90],
  flowers: [
    {
      x: 0,
      y: 0,
      w: 0,
      h: 0,
    },
    {
      x: 75,
      y: window.innerHeight - 155,
      w: 25,
      h: (FLOWERS[1][1] * 25) / FLOWERS[1][0],
    },
    {
      x: 0,
      y: 0,
      w: 0,
      h: 0,
    },
    {
      x: 0,
      y: 0,
      w: 0,
      h: 0,
    },
  ],
  giftWidth: 100,
  resultStickWidth: 80,
  buttonHeight: 24,
  phoneWidth: 100,
  giftBoxWidth: 100,
  pathY: 50,
});

SIZES.set('<=525', {
  logoWidth: 200,
  nameLogoHeight: 60,
  font: {
    family: 'TikTokDisplayFont',
    size: 16,
    lineHeight: 20,
    style: 'normal',
  },
  giftWidth: 120,
  titleBannerHeight: 120,
  otherBanner: 150,
  ruleBannerHeight: 180,
  stuffWidths: [100, 100, 100, 100, 60, 100, 60, 100, 100],
  fireworks: [30, 60, 90],
  flowers: [
    {
      x: 0,
      y: 0,
      w: 0,
      h: 0,
    },
    {
      x: 75,
      y: window.innerHeight - 155,
      w: 25,
      h: (FLOWERS[1][1] * 25) / FLOWERS[1][0],
    },
    {
      x: 0,
      y: 0,
      w: 0,
      h: 0,
    },
    {
      x: 0,
      y: 0,
      w: 0,
      h: 0,
    },
  ],
  resultStickWidth: 90,
  buttonHeight: 32,
  phoneWidth: 120,
  giftBoxWidth: 120,
  pathY: 50,
});

SIZES.set('<=768', {
  logoWidth: 200,
  nameLogoHeight: 60,
  font: {
    family: 'TikTokDisplayFont',
    size: 16,
    lineHeight: 20,
    style: 'normal',
  },
  giftWidth: 160,
  titleBannerHeight: 160,
  otherBanner: 200,
  ruleBannerHeight: 240,
  stuffWidths: [120, 120, 120, 100, 70, 100, 70, 120, 100],
  fireworks: [30, 60, 90],
  flowers: [
    {
      x: 0,
      y: 0,
      w: 0,
      h: 0,
    },
    {
      x: 75,
      y: window.innerHeight - 155,
      w: 25,
      h: (FLOWERS[1][1] * 25) / FLOWERS[1][0],
    },
    {
      x: 0,
      y: 0,
      w: 0,
      h: 0,
    },
    {
      x: 0,
      y: 0,
      w: 0,
      h: 0,
    },
  ],
  resultStickWidth: 100,
  buttonHeight: 32,
  phoneWidth: 200,
  giftBoxWidth: 300,
  pathY: 100,
});

SIZES.set('<=1366', {
  logoWidth: 200,
  nameLogoHeight: 60,
  font: {
    family: 'TikTokDisplayFont',
    size: 16,
    lineHeight: 20,
    style: 'normal',
  },
  titleBannerHeight: 160,
  otherBanner: 200,
  ruleBannerHeight: 240,
  stuffWidths: [180, 180, 180, 120, 90, 120, 90, 180, 120],
  fireworks: [50, 100, 140],
  flowers: [],
  giftWidth: 240,
  resultStickWidth: 100,
  buttonHeight: 40,
  phoneWidth: 180,
  giftBoxWidth: 500,
  pathY: 100,
});

SIZES.set('<=1440', {
  logoWidth: 200,
  nameLogoHeight: 60,
  font: {
    family: 'TikTokDisplayFont',
    size: 20,
    lineHeight: 24,
    style: 'normal',
  },
  giftWidth: 300,
  titleBannerHeight: 160,
  otherBanner: 200,
  ruleBannerHeight: 240,
  stuffWidths: [200, 200, 200, 140, 90, 140, 90, 200, 140],
  fireworks: [50, 100, 140],
  flowers: [],
  resultStickWidth: 110,
  buttonHeight: 48,
  phoneWidth: 200,
  giftBoxWidth: 300,
  pathY: 100,
});

SIZES.set('<=1720', {
  logoWidth: 200,
  nameLogoHeight: 60,
  font: {
    family: 'TikTokDisplayFont',
    size: 20,
    lineHeight: 24,
    style: 'normal',
  },
  giftWidth: 300,
  titleBannerHeight: 160,
  otherBanner: 200,
  ruleBannerHeight: 240,
  stuffWidths: [260, 260, 260, 160, 100, 160, 100, 260, 160],
  fireworks: [50, 100, 140],
  flowers: [],
  resultStickWidth: 110,
  buttonHeight: 48,
  phoneWidth: 200,
  giftBoxWidth: 300,
  pathY: 100,
});

SIZES.set('>1720', {
  logoWidth: 200,
  nameLogoHeight: 60,
  font: {
    family: 'TikTokDisplayFont',
    size: 20,
    lineHeight: 24,
    style: 'normal',
  },
  giftWidth: 300,
  titleBannerHeight: 160,
  otherBanner: 200,
  ruleBannerHeight: 280,
  stuffWidths: [300, 300, 300, 160, 100, 160, 100, 300, 160],
  fireworks: [50, 100, 140],
  flowers: [],
  resultStickWidth: 110,
  buttonHeight: 48,
  phoneWidth: 200,
  giftBoxWidth: 400,
  pathY: 100,
});

function getGameConfig(): GameConfig {
  const keys = Array.from(SIZES.keys());
  const length = keys.length;

  for (let i = 0; i < length; i++) {
    const screenWidth = window.innerWidth;
    const valid = eval(`${screenWidth}${keys[i]}`);
    if (valid) return SIZES.get(keys[i]) as GameConfig;
  }

  return SIZES.get('<=1366') as GameConfig;
}

function Cup({ onShakeEnd }: { onShakeEnd: () => void }) {
  const gameData = useContext(GameContext);
  const dispatch = useContext(GameDispatchContext);
  const screen = gameData.screen;
  const [imageBack] = useImage('/assets/tiktok-game/cup-back.desk.png');
  const [imageFront] = useImage('/assets/tiktok-game/cup-front.desk.png');
  const [imageStick] = useImage('/assets/tiktok-game/stick.desk.png');

  const [shaking, shake] = useState(false);

  const width = gameData.phoneWidth;
  const upperHeight = (width * 104) / 909;
  const layout = gameData.layout as Layout;

  const { height: pathHeight, rawHeight: rawPathHeight } = getPathSize(layout, gameData.screen);
  const pathY = pathHeight - rawPathHeight;

  const cupLowerHeight = (width * CUP_LOWER[1]) / CUP_LOWER[0];
  const height = (width * CUP[1]) / CUP[0];

  const stickWidth = width / 5;
  const stickHeight = (stickWidth * 1586) / 215;

  const x = screen.width / 2 - width / 2;

  const frontY = screen.height - height - rawPathHeight / 4 + pathY / 4 + cupLowerHeight;
  const stickY = screen.height - height - stickHeight / 3 - rawPathHeight / 4 + pathY / 4;
  const topY = frontY - upperHeight / 2;

  const [config, setConfig] = useState({
    x: x,
    giftWidth: 100,
    y: frontY,
    minX: x - 10,
    maxX: x + 10,
    direction: 'right',
    step: 5,
    shakeCount: 0,
    maxShake: 40,
  });

  const update = () => {
    const currentConfig = { ...config };
    currentConfig.shakeCount += 1;
    if (currentConfig.direction == 'right') {
      currentConfig.x += currentConfig.step;
      if (currentConfig.x > currentConfig.maxX) {
        currentConfig.x = currentConfig.maxX - currentConfig.step;
        currentConfig.direction = 'left';
      }
    } else {
      currentConfig.x -= currentConfig.step;
      if (currentConfig.x < currentConfig.minX) {
        currentConfig.x = currentConfig.minX + currentConfig.step;
        currentConfig.direction = 'right';
      }
    }

    if (currentConfig.shakeCount == currentConfig.maxShake + 1) {
      currentConfig.x = currentConfig.minX + 10;
      currentConfig.shakeCount += 1;
      updateUser({
        ...gameData.userInfo,
        isPlayed: true,
      }).then(() => {
        currentConfig.shakeCount = 0;
        setConfig(currentConfig);
        shake(false);
        onShakeEnd && onShakeEnd();
      });
    }

    setConfig(currentConfig);
  };

  const audioRef = useRef<HTMLAudioElement>();

  useEffect(() => {
    const audioElement = document.createElement('audio');
    audioElement.src = '/assets/tiktok-game/kau-cim.mp3';
    document.documentElement.append(audioElement);
    audioRef.current = audioElement;

    return () => {
      audioRef.current && audioRef.current.remove();
      audioRef.current = undefined;
    };
  }, []);

  useEffect(() => {
    if (shaking) {
      getWishingResult();
      if (audioRef.current) {
        audioRef.current.play();
      }

      setTimeout(() => {
        window.requestAnimationFrame(update);
      }, 1000 / 120);
    } else if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.pause();
    }
  }, [shaking, config]);

  useEffect(() => {
    if (shaking) {
      const result = [...gameData.result];
      const current = gameData.current;
      const playCount = gameData.playCount;
      if (current < playCount) {
        result[current] = getWishingResult();
        if (GIFT_IN_LIST.includes(result[current])) {
          getGift().then(async(giftId) => {
            if (giftId) {
              try {
                await updateUser({
                  ...gameData.userInfo,
                  isRewarded: true,
                  isPlayed: true,
                  giftId: giftId
                })
              }
              catch(_){}
              result[current] = 9 + giftId - 1;
            }
            else result[current] = getWishingResult(0, 9);
            dispatch({
              ...gameData,
              type: 'UPDATE',
              result,
              current: current + 1,
            });
          });
        } else {
          dispatch({
            ...gameData,
            type: 'UPDATE',
            result,
            current: current + 1,
          });
        }
      } else {
        result[current] = getWishingResult();

        dispatch({
          ...gameData,
          type: 'UPDATE',
          result,
          current: current,
        });
      }
    }
  }, [shaking]);

  return (
    <>
      <Layer
        imageSmoothingEnabled
        onTap={() => {
          shake(true);
        }}
        onClick={() => {
          // console.log(gameData);
          shake(true);
        }}
      >
        <Image image={imageBack} x={config.x} y={topY} width={width} height={upperHeight} />
        <Image
          image={imageStick}
          x={config.x + 10}
          y={stickY}
          width={stickWidth}
          height={stickHeight}
        />
        <Image
          image={imageStick}
          x={config.x + (2 * stickWidth) / 2}
          y={stickY}
          width={stickWidth}
          height={stickHeight}
          rotation={-20}
        />
        <Image
          image={imageStick}
          x={config.x + (3 * stickWidth) / 2}
          y={stickY}
          width={stickWidth}
          height={stickHeight}
        />
        <Image
          image={imageStick}
          x={config.x + (4 * stickWidth) / 2}
          y={stickY}
          width={stickWidth}
          height={stickHeight}
        />
        <Image
          image={imageStick}
          x={config.x + (5 * stickWidth) / 2}
          y={stickY}
          width={stickWidth}
          height={stickHeight}
          rotation={-10}
        />
        <Image
          image={imageStick}
          x={config.x + (6 * stickWidth) / 2}
          y={stickY}
          width={stickWidth}
          height={stickHeight}
        />
        <Image
          image={imageStick}
          x={config.x + (7 * stickWidth) / 2}
          y={stickY}
          width={stickWidth}
          height={stickHeight}
        />
        <Image
          image={imageStick}
          x={config.x + (9 * stickWidth) / 2}
          y={stickY}
          width={stickWidth}
          height={stickHeight}
          rotation={20}
        />
        <Image
          image={imageStick}
          x={config.x + stickWidth / 2}
          y={stickY}
          width={stickWidth}
          height={stickHeight}
        />
        <Image image={imageFront} x={config.x} y={frontY} width={width} height={height} />
      </Layer>
    </>
  );
}

function Firework({
  src,
  width,
  height,
  x,
  y,
}: {
  src: string;
  width: number;
  height: number;
  x: number;
  y: number;
}) {
  const [image] = useImage(src);

  return <Image image={image} x={x} y={y} width={width} height={height} />;
}
function Stuff({
  src,
  width,
  height,
  x,
  y,
  rotation = 0,
}: {
  src: string;
  width: number;
  height: number;
  x: number;
  y: number;
  rotation?: number;
}) {
  const gameData = useContext(GameContext);
  const screen = gameData.screen;
  const [image] = useImage(src);

  const {
    height: pathHeight,
    width: pathWidth,
    rawHeight: rawPathHeight,
  } = getPathSize(gameData.layout as Layout, gameData.screen);
  const pathX = (screen.width - pathWidth) / 2;
  const pathY = screen.height - rawPathHeight / 4 - pathHeight / 4 - height / 3;

  const _x = pathX + x;
  const _y = pathY + y;

  const [config, setConfig] = useState({
    x: _x,
    y: _y,
    w: width,
    h: height,
    step: 0.35,
    minY: y,
    maxY: y + 10,
    direction: 'down',
  });

  useEffect(() => {
    setConfig({ ...config, x: _x, y: _y, w: width, h: height });
  }, [_x, _y, width, height]);

  // const update = () => {
  //   const currentConfig = { ...config };
  //   if (currentConfig.direction == "down") {
  //     currentConfig.y += currentConfig.step;
  //     if (currentConfig.y > currentConfig.maxY) {
  //       currentConfig.y = currentConfig.maxY - currentConfig.step;
  //       currentConfig.direction = "up";
  //     }
  //   }
  //   else {
  //     currentConfig.y -= currentConfig.step;
  //     if (currentConfig.y < currentConfig.minY) {
  //       currentConfig.y = currentConfig.minY + currentConfig.step;
  //       currentConfig.direction = "down";
  //     }
  //   }

  //   setConfig(currentConfig);
  // }

  // useEffect(() => {
  //   setTimeout(() => {
  //     window.requestAnimationFrame(update);
  //   }, 1000 / 60);
  // }, [config]);

  return (
    <Image
      image={image}
      x={config.x}
      y={config.y}
      width={config.w}
      height={config.h}
      rotation={rotation}
    />
  );
}

function getPathSize(layout: Layout, screen: GameData['screen']) {
  const rawHeight = screen.height;
  const rawWidth = layout === 'mobile' ? (rawHeight * 6) / 5 : (rawHeight * 16) / 9;
  let height = rawHeight;
  let width = rawWidth;
  if (width < screen.width) {
    width = screen.width;
    height = (width * 9) / 16;
  }
  return {
    height,
    width,
    rawHeight,
    rawWidth,
  };
}

function getPhoneSize(gameData: GameData) {
  let width = gameData.phoneWidth;
  let height = (width * 718) / 399;

  if (height > gameData.screen.height / 3) {
    height = gameData.screen.height / 3;
    width = (height * 399) / 718;
  }

  return {
    width,
    height,
  };
}

function Phone() {
  const gameData = useContext(GameContext);
  const screen = gameData.screen;
  const [image] = useImage('/assets/tiktok-game/phone.desk.png');

  const layout = gameData.layout as Layout;

  const { width, height } = getPhoneSize(gameData);
  const { height: pathHeight, rawHeight: rawPathHeight } = getPathSize(layout, screen);
  const pathY = pathHeight - rawPathHeight;

  const y = screen.height - height + height / 15 - rawPathHeight / 4 + pathY / 4;
  return (
    <Image image={image} x={screen.width / 2 - width / 2} y={y} width={width} height={height} />
  );
}

function Path() {
  const gameData = useContext(GameContext);
  const screen = gameData.screen;
  const layout = gameData.layout as Layout;
  const { width, height, rawHeight } = getPathSize(layout, screen);
  const x = Math.min(0, (-width + screen.width) / 2);
  const [image] = useImage(`/assets/tiktok-game/path.desk.png`);
  const y = height > rawHeight ? -(height - rawHeight) / 2 : 0;

  return <Image image={image} x={x} y={y} width={width} height={height} />;
}

function TitleBanner() {
  const gameData = useContext(GameContext);
  const screen = gameData.screen;
  const height = gameData.titleBannerHeight;
  const width = (height * TITLE_BANNERS[0]) / TITLE_BANNERS[1];
  const [image] = useImage('/assets/tiktok-game/full-title.desk.png');

  const { height: pathHeight, rawHeight: rawPathHeight } = getPathSize(
    gameData.layout as Layout,
    gameData.screen
  );
  const { height: phoneHeight } = getPhoneSize(gameData);

  const pathY = pathHeight - rawPathHeight;

  const x = screen.width / 2 - width / 2;
  const y =
    screen.height -
    (rawPathHeight / 4 + phoneHeight + gameData.buttonHeight + 40 + height) +
    pathY / 4;

  return <Image image={image} x={x} y={y} width={width} height={height} />;
}

function RuleBanner({ onBack }: { onBack: () => void }) {
  // const ratio = 3479 / 1459;
  const gameData = useContext(GameContext);
  const height = gameData.ruleBannerHeight;
  const width = (height * RULE_BANNERS[0]) / RULE_BANNERS[1];
  const [image] = useImage('/assets/tiktok-game/rule-banner.mobile.png');
  const screen = gameData.screen;
  const buttonHeight = gameData.buttonHeight;
  const buttonWidth = (buttonHeight * BUTTON[0]) / BUTTON[1];

  const { height: pathHeight, rawHeight: rawPathHeight } = getPathSize(
    gameData.layout as Layout,
    gameData.screen
  );
  const { height: phoneHeight } = getPhoneSize(gameData);

  const pathY = pathHeight - rawPathHeight;

  const x = screen.width / 2 - width / 2;
  const buttonX = screen.width / 2 - buttonWidth / 2;
  const y = screen.height - (rawPathHeight / 4 + phoneHeight + height) + pathY / 4;

  return (
    <>
      <Image image={image} x={x} y={y} width={width} height={height} />
      <Button
        src={'/assets/tiktok-game/back-button.desk.png'}
        x={buttonX}
        y={y + height - buttonHeight}
        w={buttonWidth}
        h={buttonHeight}
        onClick={onBack}
      />
    </>
  );
}

function RemindBanner({ onBack }: { onBack: () => void }) {
  // const ratio = 3479 / 1459;
  const gameData = useContext(GameContext);
  const height = gameData.otherBanner;
  const width = (height * NOT_REGISTERED_BANNERS[0]) / NOT_REGISTERED_BANNERS[1];
  const [image] = useImage('/assets/tiktok-game/not-registered-banner.desk.png');
  const screen = gameData.screen;
  const buttonHeight = gameData.buttonHeight;
  const buttonWidth = (buttonHeight * BUTTON[0]) / BUTTON[1];

  const { height: pathHeight, rawHeight: rawPathHeight } = getPathSize(
    gameData.layout as Layout,
    gameData.screen
  );
  const { height: phoneHeight } = getPhoneSize(gameData);

  const pathY = pathHeight - rawPathHeight;

  const x = screen.width / 2 - width / 2;
  const buttonX = screen.width / 2 - buttonWidth / 2;
  const y = screen.height - (rawPathHeight / 4 + phoneHeight + height) + pathY / 4;

  return (
    <>
      <Image image={image} x={x} y={y} width={width} height={height} />
      <Button
        src={'/assets/tiktok-game/back-button.desk.png'}
        x={buttonX}
        y={y + height - buttonHeight}
        w={buttonWidth}
        h={buttonHeight}
        onClick={onBack}
      />
    </>
  );
}

function LastBanner({}) {
  const gameData = useContext(GameContext);
  const height = gameData.otherBanner;
  const width = (height * LAST_BANNERS[0]) / LAST_BANNERS[1];
  const [image] = useImage('/assets/tiktok-game/last-banner.desk.png');
  const screen = gameData.screen;

  const { height: pathHeight, rawHeight: rawPathHeight } = getPathSize(
    gameData.layout as Layout,
    gameData.screen
  );
  const { height: phoneHeight } = getPhoneSize(gameData);

  const pathY = pathHeight - rawPathHeight;

  const x = screen.width / 2 - width / 2;
  const y = screen.height - (rawPathHeight / 4 + phoneHeight + height) + pathY / 4;

  return (
    <>
      <Image image={image} x={x} y={y} width={width} height={height} />
    </>
  );
}

function Mask() {
  const [config, setConfig] = useState({
    x: 0,
    w: window.innerWidth,
  });

  const update = () => {
    const currentConfig = { ...config };
    currentConfig.x += 4;
    currentConfig.w -= 8;
    if (currentConfig.w < 0) currentConfig.w = 0;
    if (config.w > 0) {
      setConfig(currentConfig);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      window.requestAnimationFrame(update);
    }, 1000 / 144);
  }, [config]);

  return <Rect fill="#000" x={config.x} y={0} width={config.w} height={window.innerHeight} />;
}

function StickResult({ onBack, onDropInfo }: { onBack: () => void; onDropInfo: () => void }) {
  const gameData = useContext(GameContext);
  const result = gameData.result;
  const current = gameData.current - 1 === -1 ? gameData.current : gameData.current - 1;
  // const playCount = gameData.playCount;

  const dataResult = LIST_RESULT[result[current]];
  const isSpecial = dataResult.type === 'gift';

  const [image] = useImage(dataResult.image);
  const [buttonImage] = useImage(
    isSpecial
      ? '/assets/tiktok-game/tha-nhe-thong-tin.desk.png'
      : '/assets/tiktok-game/back-button.desk.png'
  );
  const [show, showResult] = useState(false);
  const [display, displayResult] = useState(false);
  const [showDropInfoButonn, setShowDropInfoButton] = useState(false);
  const width = gameData.resultStickWidth;
  const height = (width * 1762) / 641;
  const screen = gameData.screen;

  const [config, setConfig] = useState({
    x: screen.width / 2 - width / 2,
    y: screen.height / 2 - height / 2,
    rotation: 0,
  });

  const update = () => {
    const currentConfig = { ...config };

    currentConfig.rotation += 1;
    currentConfig.x =
      window.innerWidth / 2 - width / 2 + (height / (2 * 70)) * currentConfig.rotation;
    currentConfig.y =
      window.innerHeight / 2 - height / 2 - (height / (6 * 70)) * currentConfig.rotation;

    if (currentConfig.y < 20) currentConfig.y = 20;

    if (currentConfig.rotation < 70) setConfig(currentConfig);
    else displayResult(true);
  };

  useEffect(() => {
    if (show)
      if (!isSpecial) window.requestAnimationFrame(update);
      else displayResult(true);
  }, [show, config]);

  const fontBase = gameData.font.size;
  const lineHeightBase = gameData.font.lineHeight;

  const measureText = (input: string) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillText(input, 0, 0);
      ctx.font = `bold ${gameData.font.size * 2}px ${gameData.font.family}`;
      return ctx.measureText(input).width;
    }
    return 0;
  };

  const yLines = [0, lineHeightBase + fontBase / 2];
  yLines[2] = yLines[1] + lineHeightBase + (fontBase + 4) + fontBase;
  yLines[3] = yLines[2] + 2 * lineHeightBase + (fontBase + 4) / 4;

  const buttonHeight = isSpecial ? gameData.buttonHeight * 2 : gameData.buttonHeight;
  const buttonWidth =
    (isSpecial ? LARGE_BUTTON[0] / LARGE_BUTTON[1] : BUTTON[0] / BUTTON[1]) * buttonHeight;

  const fullType = 'Hút ' + dataResult.type;

  const text2Width = Math.min(screen.width - 16, 800);

  const uwidth = gameData.giftBoxWidth + 2;
  const uheight = (uwidth * BOX_UPPER[1]) / BOX_UPPER[0];

  const _ly = screen.height / 2 + uheight + gameData.giftWidth / 2;

  const ly = _ly + buttonHeight > screen.height ? screen.height / 2 + uheight : _ly;

  return (
    <>
      {!isSpecial || !display ? (
        <Image
          image={image}
          x={config.x}
          y={config.y}
          width={width}
          height={height}
          rotation={config.rotation}
          onTap={() => showResult(true)}
          onClick={() => {
            showResult(true);
          }}
        />
      ) : null}
      {!isSpecial && display ? (
        <>
          <Text
            text={`Quẻ xăm số ${result[current] + 1}:`}
            fill={'#fff'}
            width={screen.width}
            align="center"
            y={screen.height / 2 + yLines[0]}
            fontSize={fontBase}
            fontFamily="TikTokDisplayFont"
          />
          <Text
            text={'Hút'}
            fill={'#fff'}
            x={-(measureText(fullType) / 2) + measureText('Hut') / 2}
            width={screen.width}
            align="center"
            y={screen.height / 2 + yLines[1]}
            fontSize={fontBase * 2}
            fontFamily="TikTokDisplayFont"
            fontStyle="bold"
          />
          <Text
            text={dataResult.type}
            fill={'#fd0048'}
            x={
              -(measureText(fullType) / 2) + measureText(dataResult.type) / 2 + measureText('Hút ')
            }
            width={screen.width}
            align="center"
            y={screen.height / 2 + yLines[1]}
            fontSize={fontBase * 2}
            fontFamily="TikTokDisplayFont"
            fontStyle="bold"
          />
          <Text
            text={dataResult.text1}
            fill={'#fff'}
            width={screen.width}
            align="center"
            y={screen.height / 2 + yLines[2]}
            fontSize={fontBase + 8}
            fontStyle="bold"
            fontFamily="TikTokDisplayFont"
          />
          <Text
            text={dataResult.text2}
            fill={'#fff'}
            x={screen.width / 2 - text2Width / 2}
            width={text2Width}
            align="center"
            y={screen.height / 2 + yLines[3]}
            lineHeight={1.3125}
            fontSize={fontBase + 4}
            fontFamily="TikTokDisplayFont"
          />
          <Image
            onTap={onBack}
            onClick={onBack}
            image={buttonImage}
            x={screen.width / 2 - buttonWidth / 2}
            y={screen.height / 2 + yLines[3] + 80 + fontBase * 3.3125}
            width={buttonWidth}
            height={gameData.buttonHeight}
          ></Image>
        </>
      ) : null}
      {isSpecial && display ? (
        <>
          <Text
            text={dataResult.text2}
            fill={'#fff'}
            x={screen.width / 2 - text2Width / 2}
            width={text2Width}
            align="center"
            y={screen.height / 2 - gameData.giftWidth * 1.5}
            lineHeight={1.3125}
            fontSize={fontBase + 4}
            fontFamily="TikTokDisplayFont"
          />
          <GiftBox
            onAnimateEnd={() => {
              setShowDropInfoButton(true);
            }}
          />
          {showDropInfoButonn ? (
            <Image
              onTap={onDropInfo}
              onClick={onDropInfo}
              image={buttonImage}
              x={screen.width / 2 - buttonWidth / 2}
              y={ly}
              width={buttonWidth}
              height={buttonHeight}
            ></Image>
          ) : null}
        </>
      ) : null}
    </>
  );
}

function GiftBox({ onAnimateEnd }: { onAnimateEnd: () => void }) {
  const gameData = useContext(GameContext);
  const current = gameData.current - 1;
  const result = gameData.result;
  const [upperImage] = useImage('/assets/tiktok-game/box-upper.desk.png');
  const [lowerImage] = useImage('/assets/tiktok-game/box-lower.desk.png');
  const [firstGiftImage] = useImage(`/assets/tiktok-game/qua-${result[current] + 1 - 9}.desk.png`);
  const [showGift, setShowGift] = useState(true);

  const screen = gameData.screen;
  const lwidth = gameData.giftBoxWidth;
  const lheight = (lwidth * BOX_LOWER[1]) / BOX_LOWER[0];

  const uwidth = gameData.giftBoxWidth + 2;
  const uheight = (uwidth * BOX_UPPER[1]) / BOX_UPPER[0];

  const lx = screen.width / 2 - lwidth / 2;
  const ux = screen.width / 2 - uwidth / 2 - uwidth / 16;

  const ly = screen.height / 2;
  const uy = ly - uheight / 20;

  const giftWitdh = gameData.giftWidth;
  const giftX = screen.width / 2 - giftWitdh / 2;
  const giftY = screen.height / 2 - (2 * giftWitdh) / 3;

  const [gift, setGift] = useState({
    width: giftWitdh,
    maxWidth: giftWitdh * 2,
    x: screen.width / 2 - giftWitdh / 2,
    y: screen.height / 2 - (2 * giftWitdh) / 3,
  });

  const [config, setConfig] = useState({
    x: ux,
    y: uy,
    r: -17,
  });

  const update = () => {
    const newConfig = { ...config };
    newConfig.r += 1;
    newConfig.y -= (giftWitdh * 1.25) / 17;
    newConfig.x += (giftWitdh * 1.25) / 17;
    setConfig(newConfig);
    const newGift = { ...gift };
    newGift.width += newGift.width / 17;
    newGift.x = screen.width / 2 - newGift.width / 2;
    newGift.y = screen.height / 2 - (2 * newGift.width) / 3 + newGift.width / 6;
    setGift(newGift);
  };

  useEffect(() => {
    if (config.r != 0 && showGift) {
      setTimeout(() => {
        window.requestAnimationFrame(update);
      }, 1000 / 30);
    } else onAnimateEnd && onAnimateEnd();
  }, [config, showGift]);

  return (
    <>
      <Image image={lowerImage} x={lx} y={ly} width={lwidth} height={lheight} />
      <Image image={firstGiftImage} width={gift.width} height={gift.width} x={gift.x} y={gift.y} />
      <Image
        image={upperImage}
        x={config.x}
        y={config.y}
        width={uwidth}
        height={uheight}
        rotation={config.r}
        onClick={() => {
          setShowGift(true);
        }}
        onTap={() => {
          setShowGift(true);
        }}
      />
    </>
  );
}

function Button({
  src,
  x,
  y,
  w,
  h,
  onClick,
}: {
  src: string;
  x: number;
  y: number;
  w: number;
  h: number;
  onClick: () => void;
}) {
  const [image] = useImage(src);
  return (
    <Image onClick={onClick} onTap={onClick} image={image} x={x} y={y} width={w} height={h}></Image>
  );
}

function Result({ onBack, onDropInfo }: { onBack: () => void; onDropInfo: () => void }) {
  const gameData = useContext(GameContext);
  const screen = gameData.screen;
  const [config, setConfig] = useState({
    x: 0,
    w: window.innerWidth,
    opacity: 0,
  });

  const update = () => {
    const currentConfig = { ...config };
    currentConfig.opacity += 0.05;
    if (config.opacity <= 0.8) {
      setConfig(currentConfig);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      window.requestAnimationFrame(update);
    }, 1000 / 144);
  }, [config]);

  return (
    <Layer imageSmoothingEnabled>
      <Rect
        fill="#000000"
        opacity={config.opacity}
        x={config.x}
        y={0}
        width={config.w}
        height={screen.height}
      />
      <StickResult onBack={onBack} onDropInfo={onDropInfo} />
    </Layer>
  );
}

function ActionGroup({ isRegistered }: { isRegistered: boolean }) {
  const gameData = useContext(GameContext);
  const dispatch = useContext(GameDispatchContext);

  const screen = gameData.screen;

  const buttonHeight = gameData.buttonHeight;
  const buttonWidth = (buttonHeight * BUTTON[0]) / BUTTON[1];

  const { height: pathHeight, rawHeight: rawPathHeight } = getPathSize(
    gameData.layout as Layout,
    gameData.screen
  );
  const { height: phoneHeight } = getPhoneSize(gameData);

  const pathY = pathHeight - rawPathHeight;

  const x = screen.width / 2;
  const y = screen.height - (rawPathHeight / 4 + phoneHeight + buttonHeight) + pathY / 4;

  return (
    <>
      <Button
        x={x - buttonWidth - 4}
        y={y}
        w={buttonWidth}
        h={buttonHeight}
        src="/assets/tiktok-game/bi-kip-xin-que.desk.png"
        onClick={() => {
          dispatch({
            ...gameData,
            step: 1,
            type: 'UPDATE',
          });
        }}
      />
      <Button
        x={x + 4}
        y={y}
        w={buttonWidth}
        h={buttonHeight}
        src="/assets/tiktok-game/xin-que.desk.png"
        onClick={() => {
          const _isRegistered = isRegistered || !!Cookies.get('tethut2025email');
          if (_isRegistered) {
            if (!gameData.userInfo) {
              getUser(Cookies.get('tethut2025email') as string).then(data => {
                const userData: any = data || {};
                if (!data)
                  Cookies.remove('tethut2025email', {
                    sameSite: 'None',
                    secure: true,
                  });
                dispatch({
                  ...gameData,
                  type: 'UPDATE',
                  userInfo: userData,
                  // step: 2,
                  step: _isRegistered ? (userData.isPlayed ? 3 : 2) : 4,
                });
              });
            } else {
              const userInfo = gameData.userInfo;
              dispatch({
                ...gameData,
                type: 'UPDATE',
                // step: 2,
                step: _isRegistered ? (userInfo.isPlayed ? 3 : 2) : 4,
              });
            }
          } else {
            dispatch({
              ...gameData,
              step: _isRegistered ? 2 : 4,
              type: 'UPDATE',
            });
          }
        }}
      />
    </>
  );
}

function TiktokLogo() {
  const gameData = useContext(GameContext);
  const [image] = useImage('/assets/tiktok-game/tiktok-logo.desk.png');
  const width = gameData.logoWidth;
  const height = (width * 39) / 160;
  const screen = gameData.screen;

  return (
    <Image
      image={image}
      x={screen.width / 2 - width / 2}
      y={20}
      width={width}
      height={height}
    ></Image>
  );
}

function NameLogo() {
  const gameData = useContext(GameContext);
  const [image] = useImage('/assets/tiktok-game/tet-hut.desk.png');
  const height = gameData.nameLogoHeight;
  const width = (height * NAME_LOGO[0]) / NAME_LOGO[1];
  const screen = gameData.screen;

  return (
    <Image
      image={image}
      x={screen.width / 2 - width / 2}
      y={screen.height - height - 10}
      width={width}
      height={height}
    ></Image>
  );
}

const Provider: FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [playCount] = useState(1);
  const result = useMemo(() => generateDefaultResult(playCount), [playCount]);

  const [gameData, dispatch] = useReducer(GameReducer, {
    ...getGameConfig(),
    layout: window.innerWidth < window.innerHeight ? 'mobile' : 'desktop',
    step: 0,
    orientation: window.screen.orientation.type.startsWith('landscape') ? 'landscape' : 'portrait',
    current: 0,
    playCount: playCount,
    result,
    screen: {
      dpr: window.devicePixelRatio,
      width: window.innerWidth,
      height: window.innerHeight / 2,
      bWidth: 1920,
      bHeight: 1080,
    },
    userInfo: null,
  });

  const isRegistered = !!Cookies.get('tethut2025email');

  useEffect(() => {
    if (isRegistered) {
      !gameData.userInfo &&
        getUser(Cookies.get('tethut2025email') as string).then(data => {
          const userData: any = data || {};
          if (!data)
            Cookies.remove('tethut2025email', {
              sameSite: 'None',
              secure: true,
            });
          dispatch({
            ...gameData,
            type: 'UPDATE',
            userInfo: data,
            step: userData && userData.isPlayed ? 3 : 0,
          });
        });
    }
  }, [isRegistered]);

  return (
    <GameContext.Provider value={gameData}>
      <GameDispatchContext.Provider value={dispatch}>{children}</GameDispatchContext.Provider>
    </GameContext.Provider>
  );
};

function GameInner({ isRegistered, userData }: { isRegistered: boolean; userData?: IUser }) {
  const dispatch = useContext(GameDispatchContext);
  const gameData = useContext(GameContext);
  const [showResult, setShowResut] = useState(false);
  const [showDropInfo, setShowDropInfo] = useState(false);
  const screen = gameData.screen;

  const userInfo = gameData && gameData.userInfo;

  const isLoading = isRegistered && !userInfo;
  const isPlayed = userInfo && userInfo.isPlayed;

  const cupWidth = gameData.phoneWidth;
  const cupHeight = (cupWidth * 1096) / 911;
  const cup = {
    x: screen.width / 2 - cupWidth / 2,
    y: (screen.height * 2) / 3 - cupHeight / 2,
    w: cupWidth,
    h: cupHeight,
  };

  const stuffWidths = gameData.stuffWidths;
  const fireworkWidths = gameData.fireworks;
  const flowers = gameData.flowers;

  useEffect(() => {
    if (userData)
      dispatch({
        ...gameData,
        type: 'UPDATE',
        userInfo: userData,
      });
  }, [userData]);

  useEffect(() => {
    const handleResize = () => {
      const newScreen = {
        width: window.innerWidth,
        height: window.innerHeight / 2,
        dpr: window.devicePixelRatio,
        bWidth: 1920,
        bHeight: 1080,
      };
      dispatch({
        ...gameData,
        ...getGameConfig(),
        orientation: window.screen.orientation.type.startsWith('landscape')
          ? 'landscape'
          : 'portrait',
        screen: {
          ...newScreen,
        },
        layout: newScreen.width < newScreen.height ? 'mobile' : 'desktop',
        type: 'UPDATE',
      });
    };

    window.addEventListener('resize', handleResize, {
      once: true,
    });
  }, [gameData]);

  const currentStep = gameData.step;
  const pathSize = getPathSize(gameData.layout as Layout, screen);
  const phoneSize = getPhoneSize(gameData);

  const stuffConfigs: StuffConfig[] = [
    { x: 0, y: 0, w: stuffWidths[0], h: (stuffWidths[0] * STUFFS[0][1]) / STUFFS[0][0] },
    {
      x: pathSize.width - stuffWidths[1],
      y: 0,
      w: stuffWidths[1],
      h: (stuffWidths[1] * STUFFS[1][1]) / STUFFS[1][0],
    },
    {
      x: -stuffWidths[2] / 2,
      y: pathSize.height / 4 + (stuffWidths[2] * STUFFS[2][1]) / STUFFS[2][0] / 2,
      w: stuffWidths[2],
      h: (stuffWidths[2] * STUFFS[2][1]) / STUFFS[2][0],
    },
    {
      x: pathSize.width / 2 + pathSize.width / 6 - stuffWidths[3] / 2,
      y: pathSize.height / 4 + (stuffWidths[3] * STUFFS[3][1]) / STUFFS[3][0] / 2,
      w: stuffWidths[3],
      h: (stuffWidths[3] * STUFFS[3][1]) / STUFFS[3][0],
    },
    {
      x: pathSize.width / 2 + pathSize.width / 6 - stuffWidths[4] / 2,
      y: pathSize.height / 4 - (stuffWidths[4] * STUFFS[4][1]) / STUFFS[4][0],
      w: stuffWidths[4],
      h: (stuffWidths[4] * STUFFS[4][1]) / STUFFS[4][0],
    },
    {
      x: pathSize.width - pathSize.width / 4,
      y: pathSize.height / 4 + (stuffWidths[5] * STUFFS[5][1]) / STUFFS[5][0],
      w: stuffWidths[5],
      h: (stuffWidths[5] * STUFFS[5][1]) / STUFFS[5][0],
    },
    {
      x: pathSize.width / 2 - pathSize.width / 6,
      y: pathSize.height / 4 - (stuffWidths[6] * STUFFS[6][1]) / STUFFS[6][0] / 4,
      w: stuffWidths[6],
      h: (stuffWidths[6] * STUFFS[6][1]) / STUFFS[6][0],
    },
    {
      x: pathSize.width - stuffWidths[7] / 2,
      y: pathSize.height / 3,
      w: stuffWidths[7],
      h: (stuffWidths[7] * STUFFS[7][1]) / STUFFS[7][0],
    },
    {
      x: pathSize.width / 5,
      y: pathSize.height / 4,
      w: stuffWidths[8],
      h: (stuffWidths[8] * STUFFS[8][1]) / STUFFS[8][0],
    },
  ];

  const pathY = (pathSize.width - pathSize.rawWidth) / 2;

  const screenHeight = (gameData.orientation === "landscape" ? screen.width * 9 / 16 : screen.width * 16 / 9) / 2;

  useEffect(() => {
    dispatch({
      ...gameData,
      screen: {
        ...gameData.screen,
        height: screenHeight
      }
    })
  }, [screenHeight]);

  const fireworks: StuffConfig[] = [
    {
      x: screen.width / 2 - screen.width / 8 - phoneSize.width / 2,
      y: screen.height / 2 + screen.height / 16,
      w: fireworkWidths[0],
      h: fireworkWidths[0],
    },
    {
      x: screen.width / 2 - screen.width / 5 - phoneSize.width / 2,
      y: screen.height / 2 - screen.height / 16,
      w: fireworkWidths[1],
      h: fireworkWidths[1],
    },
    {
      x: screen.width / 2 + screen.width / 8 + phoneSize.width / 2,
      y: screen.height / 2 - screen.height / 8,
      w: fireworkWidths[2],
      h: fireworkWidths[2],
    },
  ];

  const position = useRef({
    startY: 0,
    x: 0,
    y: 0,
    v: 0,
    time: 0,
    touching: false,
  });

  const upperRef = useRef<any>();

  return (
    <div
      id="game"
      className={`w-full h-[50dvh] justify-end flex flex-col relative overflow-x-hidden`}
      onTouchStart={() => {
        if(upperRef.current) {
          const element = (upperRef.current as HTMLDivElement);
          const current = element.style.pointerEvents;
          if(!current || current == "none") element.style.pointerEvents = "auto";
          else element.style.pointerEvents = "none";
        }
      //   const touch = e.touches[0];
      //   position.current.startY = window.scrollY;
      //   position.current.y = touch.clientY;
      //   position.current.time = performance.now();
      //   position.current.v = 0;
      //   position.current.touching = true;
      //   console.log("start", position);
      }}
      onTouchMove={() => {
        // if (!position.current.touching) return;

        // const touch = e.touches[0];
        // const currentY = touch.clientY;
        // const deltaY = position.current.y - currentY;
        // console.log("move", position.current.startY + deltaY);
        // window.scrollTo(0, position.current.startY + deltaY);

        // const currentTime = performance.now();
        // const deltaTime = currentTime - position.current.time;

        // position.current.v = (deltaY / deltaTime) * 1000;
        // position.current.time = currentTime;
        // // console.log("move", position);
      }}
      onTouchEnd={() => {
        // if(upperRef.current) (upperRef.current as HTMLDivElement).style.pointerEvents = "none";
        // position.current.touching = false;
        // const deceleration = 0.001;

        // function scrollStep(currentTime: number) {
        //   if (position.current.touching) return;

        //   const deltaTime = currentTime - position.current.time;
        //   position.current.time = currentTime;

        //   console.log(position.current.v);
        //   const distance = (position.current.v * deltaTime) / 1000;
        //   position.current.v *= 1 - deceleration * deltaTime;

        //   window.scrollBy(0, distance);
        //   // console.log(distance);
        //   if (Math.abs(position.current.v) > 0.1) {
        //     requestAnimationFrame(scrollStep);
        //   }
        // }
        // // console.log("end", position);

        // requestAnimationFrame(scrollStep);
      }}
    >
      <div className="absolute w-full h-full z-30 pointer-events-none" ref={upperRef}/>
      {isLoading ? (
        <div className="w-dvw h-dvh absolute top-0 left-0 z-30 bg-[#00000050]"></div>
      ) : null}
      <Stage width={screen.width} height={screen.height}>
        <Layer id="background" imageSmoothingEnabled>
          {currentStep === 0 || currentStep === 1 || currentStep === 3 || currentStep === 4 ? (
            <Phone />
          ) : null}
          <Path />
          <Stuff
            src="/assets/tiktok-game/stuff-1.desk.png"
            x={stuffConfigs[0].x}
            y={stuffConfigs[0].y}
            width={stuffConfigs[0].w}
            height={stuffConfigs[0].h}
          />
          <Stuff
            src="/assets/tiktok-game/stuff-2.desk.png"
            x={stuffConfigs[1].x}
            y={stuffConfigs[1].y}
            width={stuffConfigs[1].w}
            height={stuffConfigs[1].h}
          />
          <Stuff
            src="/assets/tiktok-game/stuff-3.desk.png"
            x={stuffConfigs[2].x}
            y={stuffConfigs[2].y}
            width={stuffConfigs[2].w}
            height={stuffConfigs[2].h}
          />
          <Stuff
            src="/assets/tiktok-game/stuff-4.desk.png"
            x={stuffConfigs[3].x}
            y={stuffConfigs[3].y}
            width={stuffConfigs[3].w}
            height={stuffConfigs[3].h}
            rotation={15}
          />
          <Stuff
            src="/assets/tiktok-game/stuff-5.desk.png"
            x={stuffConfigs[4].x}
            y={stuffConfigs[4].y}
            width={stuffConfigs[4].w}
            height={stuffConfigs[4].h}
          />
          <Stuff
            src="/assets/tiktok-game/stuff-6.desk.png"
            x={stuffConfigs[5].x}
            y={stuffConfigs[5].y}
            width={stuffConfigs[5].w}
            height={stuffConfigs[5].h}
          />
          <Stuff
            src="/assets/tiktok-game/stuff-7.desk.png"
            x={stuffConfigs[6].x}
            y={stuffConfigs[6].y}
            width={stuffConfigs[6].w}
            height={stuffConfigs[6].h}
          />
          <Stuff
            src="/assets/tiktok-game/stuff-8.desk.png"
            x={stuffConfigs[7].x}
            y={stuffConfigs[7].y}
            width={stuffConfigs[7].w}
            height={stuffConfigs[7].h}
          />
          <Stuff
            src="/assets/tiktok-game/stuff-9.desk.png"
            x={stuffConfigs[8].x}
            y={stuffConfigs[8].y}
            width={stuffConfigs[8].w}
            height={stuffConfigs[8].h}
          />
          {/* <Stuff src="/assets/tiktok-game/flower-1.desk.png" x={360} y={window.innerHeight / 2 - 160} width={180} height={80}/> */}
          {/* <Stuff src="/assets/tiktok-game/flower-2.desk.png" x={flowers[1].x} y={flowers[1].y} width={flowers[1].w} height={flowers[1].h} /> */}
          {/* <Stuff src="/assets/tiktok-game/flower-3.desk.png" x={360} y={window.innerHeight / 2 - 160} width={180} height={80}/> */}
          {/* <Stuff src="/assets/tiktok-game/flower-4.desk.png" x={360} y={window.innerHeight / 2 - 160} width={180} height={80}/> */}
          <Firework
            src="/assets/tiktok-game/red-firework.desk.png"
            x={fireworks[0].x}
            y={fireworks[0].y}
            width={fireworks[0].w}
            height={fireworks[0].h}
          />
          <Firework
            src="/assets/tiktok-game/yellow-firework.desk.png"
            x={fireworks[1].x}
            y={fireworks[1].y}
            width={fireworks[1].w}
            height={fireworks[1].h}
          />
          <Firework
            src="/assets/tiktok-game/blue-firework.desk.png"
            x={fireworks[2].x}
            y={fireworks[2].y}
            width={fireworks[2].w}
            height={fireworks[2].h}
          />
        </Layer>
        <Layer imageSmoothingEnabled>
          <TiktokLogo />
          {currentStep === 3 ? <LastBanner /> : null}
          {currentStep === 0 || currentStep == 2 ? <TitleBanner /> : null}
          {currentStep === 1 ? (
            <RuleBanner
              onBack={() => {
                dispatch({
                  ...gameData,
                  step: 0,
                  type: 'UPDATE',
                });
              }}
            />
          ) : null}
          {currentStep === 4 ? (
            <RemindBanner
              onBack={() => {
                dispatch({
                  ...gameData,
                  step: 0,
                  type: 'UPDATE',
                });
              }}
            />
          ) : null}
          {currentStep === 0 ? <ActionGroup isRegistered={isRegistered} /> : null}
          <NameLogo />
          {/* <Mask /> */}
        </Layer>
        {currentStep === 2 ? (
          <Cup
            onShakeEnd={() => {
              setShowResut(true);
            }}
          />
        ) : null}
      </Stage>
      {showResult && !showDropInfo ? (
        <div className="absolute top-0 left-0 w-full h-full z-10">
          <Stage width={window.innerWidth} height={window.innerHeight}>
            <Result
              onBack={() => {
                setShowResut(false);
                dispatch({
                  ...gameData,
                  type: 'UPDATE',
                  step: 3,
                });
              }}
              onDropInfo={() => {
                setShowResut(false);
                setShowDropInfo(true);
              }}
            />
          </Stage>
        </div>
      ) : null}
      {showDropInfo ? (
        <GiftForm
          onSendInfo={() => {
            setShowDropInfo(false);
            dispatch({
              ...gameData,
              type: 'UPDATE',
              step: 3,
            });
          }}
        />
      ) : null}
    </div>
  );
}

function Game() {
  const [userData, setUserData] = useState<IUser | undefined>();
  const isRegistered = !!userData || !!Cookies.get('tethut2025email');

  return (
    <Provider>
      <NewRegisterForm
        onRegistered={userData => {
          setUserData(userData);
        }}
        onClickScrollToGame={() => {
          const gameAnchor = document.querySelector("#game");
          if(gameAnchor) {
            gameAnchor.scrollIntoView({"behavior": "smooth"})
          }
        }}
      />
      <GameInner isRegistered={isRegistered} userData={userData} />
    </Provider>
  );
}

export default Game;
