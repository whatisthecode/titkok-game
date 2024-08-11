import { Stage, Layer, Image, Rect, Text, Circle, Ring } from 'react-konva';
import useImage from 'use-image';
import Cookies from 'js-cookie';
import './Game.css';
import {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import { GameConfig, GameData, IUser, Layout, StuffConfig } from '../types/type';
import { GameContext, GameDispatchContext } from '../contexts';
import { GameReducer } from '../services/reducer';
import {
  GIFT_IN_LIST,
  LIST_RESULT,
  generateDefaultResult,
  getWishingResult,
  random,
} from '../util';
import GiftForm from './GiftForm';
import { getGift, getUser, updateUser } from '../services/apiClient';
import NewRegisterForm from './NewRegister';

// type Props = {
//   setStep: (step: Step) => void;
// };

const STUFFS = [
  [742, 412],
  [1088, 550]
];

const CLOUDS = [684, 363];
const EVENT_TIME = [2014, 244];
const GIFTS = [
  [1628, 1752],
  [1799, 1280],
  [1645, 1593],
  [1323, 1529]
]

const NAME_LOGO = [702, 185];
const TITLE_BANNERS = [1948, 700];
const RULE_BANNERS = [4348, 1274];
const LAST_BANNERS = [3102, 337];
const NOT_REGISTERED_BANNERS = [4348, 658];
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
  logoWidth: 80,
  nameLogoHeight: 40,
  font: {
    family: 'TikTokDisplayFont',
    size: 12,
    lineHeight: 16,
    style: 'normal',
  },
  titleBannerHeight: 110,
  cloudHeight: 40,
  otherBanner: 30,
  eventTimeHeight: 20,
  ruleBannerWidth: 300,
  resultStickWidth: 70,
  buttonHeight: 24,
  phoneWidth: 100,
  giftBoxWidth: 100,
  giftWidth: 100,
  pathY: 100,
  stuffWidths: [80, 80],
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
  logoWidth: 80,
  nameLogoHeight: 40,
  font: {
    family: 'TikTokDisplayFont',
    size: 12,
    lineHeight: 18,
    style: 'normal',
  },
  titleBannerHeight: 120,
  cloudHeight: 40,
  otherBanner: 40,
  eventTimeHeight: 20,
  ruleBannerWidth: 320,
  stuffWidths: [80, 80],
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

SIZES.set('<=425', {
  logoWidth: 100,
  nameLogoHeight: 50,
  font: {
    family: 'TikTokDisplayFont',
    size: 16,
    lineHeight: 20,
    style: 'normal',
  },
  giftWidth: 120,
  cloudHeight: 60,
  titleBannerHeight: 120,
  otherBanner: 50,
  eventTimeHeight: 30,
  ruleBannerWidth: 375,
  stuffWidths: [100, 100],
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

SIZES.set('<=525', {
  logoWidth: 100,
  nameLogoHeight: 50,
  font: {
    family: 'TikTokDisplayFont',
    size: 16,
    lineHeight: 20,
    style: 'normal',
  },
  giftWidth: 120,
  cloudHeight: 60,
  titleBannerHeight: 120,
  otherBanner: 50,
  eventTimeHeight: 30,
  ruleBannerWidth: 425,
  stuffWidths: [100, 100],
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

SIZES.set('<=645', {
  logoWidth: 100,
  nameLogoHeight: 60,
  font: {
    family: 'TikTokDisplayFont',
    size: 16,
    lineHeight: 20,
    style: 'normal',
  },
  giftWidth: 160,
  cloudHeight: 80,
  titleBannerHeight: 160,
  otherBanner: 60,
  eventTimeHeight: 40,
  ruleBannerWidth: 525,
  stuffWidths: [180, 180],
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
  phoneWidth: 120,
  giftBoxWidth: 300,
  pathY: 100,
});

SIZES.set('<=768', {
  logoWidth: 100,
  nameLogoHeight: 60,
  font: {
    family: 'TikTokDisplayFont',
    size: 16,
    lineHeight: 20,
    style: 'normal',
  },
  giftWidth: 160,
  cloudHeight: 80,
  titleBannerHeight: 160,
  otherBanner: 60,
  eventTimeHeight: 40,
  ruleBannerWidth: 645,
  stuffWidths: [180, 180],
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
  phoneWidth: 120,
  giftBoxWidth: 300,
  pathY: 100,
});

SIZES.set('<=1024', {
  logoWidth: 100,
  nameLogoHeight: 60,
  font: {
    family: 'TikTokDisplayFont',
    size: 16,
    lineHeight: 20,
    style: 'normal',
  },
  giftWidth: 160,
  cloudHeight: 80,
  titleBannerHeight: 160,
  otherBanner: 60,
  eventTimeHeight: 40,
  ruleBannerWidth: 800,
  stuffWidths: [180, 180],
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
  phoneWidth: 120,
  giftBoxWidth: 300,
  pathY: 100,
});

SIZES.set('<=1366', {
  logoWidth: 100,
  nameLogoHeight: 60,
  font: {
    family: 'TikTokDisplayFont',
    size: 16,
    lineHeight: 20,
    style: 'normal',
  },
  titleBannerHeight: 160,
  cloudHeight: 100,
  otherBanner: 100,
  eventTimeHeight: 50,
  ruleBannerWidth: 800,
  stuffWidths: [180, 180],
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
  logoWidth: 100,
  nameLogoHeight: 60,
  font: {
    family: 'TikTokDisplayFont',
    size: 20,
    lineHeight: 24,
    style: 'normal',
  },
  giftWidth: 300,
  cloudHeight: 100,
  titleBannerHeight: 160,
  otherBanner: 100,
  eventTimeHeight: 60,
  ruleBannerWidth: 800,
  stuffWidths: [200, 200],
  fireworks: [50, 100, 140],
  flowers: [],
  resultStickWidth: 110,
  buttonHeight: 48,
  phoneWidth: 200,
  giftBoxWidth: 300,
  pathY: 100,
});

SIZES.set('<=1720', {
  logoWidth: 100,
  nameLogoHeight: 60,
  font: {
    family: 'TikTokDisplayFont',
    size: 20,
    lineHeight: 24,
    style: 'normal',
  },
  giftWidth: 300,
  cloudHeight: 100,
  titleBannerHeight: 160,
  otherBanner: 100,
  eventTimeHeight: 60,
  ruleBannerWidth: 800,
  stuffWidths: [260, 260],
  fireworks: [50, 100, 140],
  flowers: [],
  resultStickWidth: 110,
  buttonHeight: 48,
  phoneWidth: 200,
  giftBoxWidth: 300,
  pathY: 100,
});

SIZES.set('>1720', {
  logoWidth: 100,
  nameLogoHeight: 60,
  font: {
    family: 'TikTokDisplayFont',
    size: 20,
    lineHeight: 24,
    style: 'normal',
  },
  giftWidth: 250,
  cloudHeight: 100,
  titleBannerHeight: 160,
  otherBanner: 100,
  eventTimeHeight: 60,
  ruleBannerWidth: 800,
  stuffWidths: [300, 300],
  fireworks: [70, 120, 200],
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

function Cup({ shakable = false, onShakeEnd }: { shakable?: boolean, onShakeEnd: () => void }) {
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

  // const { height: pathHeight, rawHeight: rawPathHeight } = getPathSize(layout, gameData.screen);
  // const pathY = pathHeight - rawPathHeight;

  const buttonY = screen.height / 2;

  const cupLowerHeight = (width * CUP_LOWER[1]) / CUP_LOWER[0];
  const height = (width * CUP[1]) / CUP[0];

  const stickWidth = width / 5;
  const stickHeight = (stickWidth * 1586) / 215;

  const x = screen.width / 2 - width / 2;

  const frontY = buttonY + cupLowerHeight;
  const stickY = buttonY - stickHeight * 1 / 5;
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

  useEffect(() => {
    setConfig({
      ...config,
      x: x,
      y: frontY
    })
  }, [x, frontY]);

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
      const executor = gameData.userInfo.giftId ? updateUser({
        email: gameData.userInfo.email,
        isRewarded: true,
        giftId: gameData.userInfo.giftId,
        isPlayed: true,
      } as any) : updateUser({
        email: gameData.userInfo.email,
        isPlayed: true
      } as any);

      // const executor = Promise.all([])

      executor.then(() => {
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
      // dispatch({
      //   ...gameData,
      //   type: 'UPDATE',
      //   result: [12],
      //   current: 1,
      // });
      if (current < playCount) {
        result[current] = getWishingResult();
        if (GIFT_IN_LIST.includes(result[current])) {
          getGift().then(async (giftId) => {
            if (giftId) {
              gameData.userInfo = {
                ...gameData.userInfo,
                isRewarded: true,
                isPlayed: true,
                giftId: giftId
              }
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

  const stuffWidths = gameData.stuffWidths;
  const stuffConfigs: StuffConfig[] = [
    { x: screen.width / 2 - width / 2 - stuffWidths[0] + stuffWidths[0] / 10, y: frontY + height - cupLowerHeight * 3 / 2, w: stuffWidths[0], h: (stuffWidths[0] * STUFFS[0][1]) / STUFFS[0][0] },
    {
      x: screen.width / 2 + width / 2 - stuffWidths[1] / 10,
      y: frontY + height - cupLowerHeight * 3 / 2,
      w: stuffWidths[1],
      h: (stuffWidths[1] * STUFFS[1][1]) / STUFFS[1][0],
    }
  ];

  return (
    <>
      <Layer
        imageSmoothingEnabled
        onTap={() => {
          shakable && shake(true);
        }}
        onClick={() => {
          // console.log(gameData);
          shakable && shake(true);
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
      <Layer imageSmoothingEnabled>
        <Stuff
          src="/assets/materials/stuffs-1.png"
          x={stuffConfigs[0].x}
          y={stuffConfigs[0].y}
          width={stuffConfigs[0].w}
          height={stuffConfigs[0].h}
        />
        <Stuff
          src="/assets/materials/stuffs-2.png"
          x={stuffConfigs[1].x}
          y={stuffConfigs[1].y}
          width={stuffConfigs[1].w}
          height={stuffConfigs[1].h}
        />
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

  const [config, setConfig] = useState({
    innerRadius: 0,
    end: false,
    outerRadius: width / 2 + 2,
    maxRadius: width / 2 + 2,
    step: (width / 2 + 2) / 30
  });


  const update = () => {
    if(config.innerRadius < config.maxRadius) {
      config.innerRadius += config.step;
    }
    else {
      config.innerRadius = 0;
      config.outerRadius = 0;
    }

    if(config.innerRadius === 0 && config.end && config.outerRadius === 0) {
      config.innerRadius = 0;
      config.end = false;
      config.outerRadius = width / 2 + 2
    }

    if(config.innerRadius === 0 && config.outerRadius === 0) config.end = true;

    setConfig({...config})
  }

  useEffect(() => {
    setTimeout(() => {
      window.requestAnimationFrame(update);
    }, 1000 / 244);
  }, [config]);

  return <>
    <Image image={image} x={x} y={y} width={width} height={height} />
    <Ring x={x + width / 2} y={y + height / 2} innerRadius={config.innerRadius} outerRadius={config.outerRadius} fill={"#000000"} />
  </>;
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
  const [image] = useImage(src);

  const [config, setConfig] = useState({
    x: x,
    y: y,
    w: width,
    h: height,
    step: 0.35,
    minY: y,
    maxY: y + 10,
    direction: 'down',
  });

  useEffect(() => {
    setConfig({ ...config, x: x, y: y, w: width, h: height });
  }, [x, y, width, height]);

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

function Cloud({
  src,
  // width,
  height,
  // x,
  y,
  direction = "left",
  delay
}: {
  src: string;
  // width: number;
  height: number;
  // x: number;
  y: number;
  direction?: "left" | "right";
  delay: number;
}) {
  const [image] = useImage(src);

  const gameData = useContext(GameContext);
  const width = height * CLOUDS[0] / CLOUDS[1];
  const screen = gameData.screen;

  const [config, setConfig] = useState({
    x: direction === "left" ? -width : screen.width,
    y: y,
    w: width,
    h: height,
    stepX: 3,
    stepY: 0.5,
    minY: y,
    maxY: y + 10,
    minX: -width,
    maxX: screen.width,
    directionX: direction,
    directionY: "up"
  });

  useEffect(() => {
    setConfig({ ...config, y: y, w: width, h: height });
  }, [y, width, height]);

  const update = () => {
    const currentConfig = { ...config };
    if (currentConfig.directionX === "left") {
      if (currentConfig.x > currentConfig.maxX) currentConfig.x = currentConfig.minX;
      else currentConfig.x += currentConfig.stepX;
    }
    else {
      if (currentConfig.x < currentConfig.minX) currentConfig.x = currentConfig.maxX;
      currentConfig.x -= currentConfig.stepX;
    }

    if (currentConfig.directionY == "up") {
      currentConfig.y += currentConfig.stepY;
      if (currentConfig.y > currentConfig.maxY) {
        currentConfig.directionY = "down";
        currentConfig.y = currentConfig.maxY - currentConfig.stepY;
      }
    }
    else {
      currentConfig.y -= currentConfig.stepY;
      if (currentConfig.y < currentConfig.minY) {
        currentConfig.directionY = "up";
        currentConfig.y = currentConfig.minY + currentConfig.stepY;
      }
    }

    setConfig(currentConfig);
  }

  useEffect(() => {
    setTimeout(() => {
      window.requestAnimationFrame(update);
    }, 1000 / (50 - delay));
  }, [config]);

  return (
    <Image
      image={image}
      x={config.x}
      y={config.y}
      width={config.w}
      height={config.h}
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
  const [image] = useImage('/assets/materials/title.png');

  // const { height: pathHeight, rawHeight: rawPathHeight } = getPathSize(
  //   gameData.layout as Layout,
  //   gameData.screen
  // );
  // const { height: phoneHeight } = getPhoneSize(gameData);

  // const pathY = pathHeight - rawPathHeight;

  const x = screen.width / 2 - width / 2;
  const buttonY = screen.height * 1 / 3;
  const y = buttonY - gameData.buttonHeight / 2 - height;

  return <Image image={image} x={x} y={y} width={width} height={height} />;
}

function RuleBanner({ onBack }: { onBack: () => void }) {
  // const ratio = 3479 / 1459;
  const gameData = useContext(GameContext);
  const width = gameData.ruleBannerWidth;
  const height = (width * RULE_BANNERS[1]) / RULE_BANNERS[0];
  const [image] = useImage('/assets/materials/bi-kip-xin-que-banner.png');
  const screen = gameData.screen;
  const buttonHeight = gameData.buttonHeight;
  const buttonWidth = (buttonHeight * BUTTON[0]) / BUTTON[1];

  const x = screen.width / 2 - width / 2;
  const buttonX = screen.width / 2 - buttonWidth / 2;
  const y = screen.height / 2 - height / 2;

  const [opacity, setOpacity] = useState(0);

  const update = () => {
    if(opacity < 1) setOpacity(opacity + 0.05);
  }

  useEffect(() => {
    setTimeout(() => {
      window.requestAnimationFrame(update);
    }, 1000 / 60);
  }, [opacity]);

  return (
    <>
      <Rect
        fill="#000000"
        opacity={0.8}
        x={0}
        y={0}
        width={screen.width}
        height={screen.height}
      />
      <Image opacity={opacity} image={image} x={x} y={y} width={width} height={height} />
      <Button
        opacity={opacity}
        src={'/assets/tiktok-game/back-button.desk.png'}
        x={buttonX}
        y={y + height + buttonHeight}
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
  const [image] = useImage('/assets/materials/dang-ky-banner.png');
  const screen = gameData.screen;
  const buttonHeight = gameData.buttonHeight;
  const buttonWidth = (buttonHeight * BUTTON[0]) / BUTTON[1];


  const x = screen.width / 2 - width / 2;
  const buttonX = screen.width / 2 - buttonWidth / 2;
  const y = screen.height / 2 - height;

  const [opacity, setOpacity] = useState(0);

  const update = () => {
    if(opacity < 1) setOpacity(opacity + 0.05);
  }

  useEffect(() => {
    setTimeout(() => {
      window.requestAnimationFrame(update);
    }, 1000 / 60);
  }, [opacity]);

  return (
    <>
      <Rect
        fill="#000000"
        opacity={0.8}
        x={0}
        y={0}
        width={screen.width}
        height={screen.height}
      />
      <Image opacity={opacity} image={image} x={x} y={y} width={width} height={height} />
      <Button
        opacity={opacity}
        src={'/assets/tiktok-game/back-button.desk.png'}
        x={buttonX}
        y={y + height + buttonHeight}
        w={buttonWidth}
        h={buttonHeight}
        onClick={onBack}
      />
    </>
  );
}

function LastBanner({ }) {
  const gameData = useContext(GameContext);

  const height = gameData.otherBanner;
  const width = (height * LAST_BANNERS[0]) / LAST_BANNERS[1];
  
  const [image] = useImage('/assets/materials/game-description.png');
  
  const eventHeight = gameData.eventTimeHeight;
  const eventWidth = (eventHeight * EVENT_TIME[0] / EVENT_TIME[1]);
  const [eventImage] = useImage("/assets/materials/event-time.png");
  
  const screen = gameData.screen;

  const cupWidth = gameData.phoneWidth;
  const stickWidth = cupWidth / 5;
  const stickHeight = (stickWidth * 1586) / 215;
  const eventX = screen.width / 2 - eventWidth / 2;
  const eventY = screen.height / 2 - eventHeight - stickHeight * 2 / 5 + gameData.buttonHeight - 10;

  const x = screen.width / 2 - width / 2;
  const y = eventY - height - gameData.font.size;

  const nameLogoHeight = gameData.nameLogoHeight;

  return (
    <>
      <TiktokLogo y={y - nameLogoHeight - gameData.font.size * 3 / 2}/>
      <NameLogo y={y - gameData.font.size}/>
      <Image image={image} x={x} y={y} width={width} height={height} />
      <Image image={eventImage} x={eventX} y={eventY} width={eventWidth} height={eventHeight}/>
    </>
  );
}

function StickResult({ onBack, onDropInfo }: { onBack: () => void; onDropInfo: () => void }) {
  const gameData = useContext(GameContext);
  const result = gameData.result;
  const current = gameData.current - 1 === -1 ? gameData.current : gameData.current - 1;
  // const playCount = gameData.playCount;

  const dataResult = LIST_RESULT[result[current]] || LIST_RESULT[getWishingResult(0, 9)];
  const isSpecial = dataResult.type === 'gift';

  const [image] = useImage(dataResult.image);
  const [buttonImage] = useImage(
    isSpecial
      ? '/assets/materials/tha-nhe-thong-tin.png'
      : '/assets/tiktok-game/back-button.desk.png'
  );
  const [show, showResult] = useState(false);
  const [display, displayResult] = useState(false);
  const [showingGuide, showGuide] = useState(true);
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
      screen.width / 2 - width / 2 + (height / (2 * 70)) * currentConfig.rotation;
    currentConfig.y =
      screen.height / 2 - height / 2 - (height / (6 * 70)) * currentConfig.rotation;

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
          onTap={() => {
            showGuide(false);
            showResult(true)
          }}
          onClick={() => {
            showGuide(false);
            showResult(true);
          }}
        />
      ) : null}
      {showingGuide ? (
          <Text
            text={"Nhấp vào quẻ xăm để xem luận giải"}
            fill={'#fff'}
            width={screen.width}
            align="center"
            y={config.y + height + fontBase * 4}
            fontSize={fontBase * 3 / 2}
            fontFamily="TikTokDisplayFont"
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
            y={screen.height * 1 / 5}
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
  const resultIndex = result[current] + 1 - 9;
  const [firstGiftImage] = useImage(`/assets/tiktok-game/qua-${resultIndex}.desk.png`);
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
  const giftHeight = giftWitdh * GIFTS[resultIndex - 1][1] / GIFTS[resultIndex - 1][0];

  const [gift, setGift] = useState({
    width: giftWitdh,
    height: giftHeight,
    maxWidth: giftWitdh * 2,
    maxHeight: giftHeight * 2,
    x: screen.width / 2 - giftWitdh / 2,
    y: screen.height / 2 - (2 * giftWitdh) / 3,
  });

  const [config, setConfig] = useState({
    x: ux,
    y: uy,
    r: -24,
  });

  const update = () => {
    const newConfig = { ...config };
    newConfig.r += 1;
    newConfig.y -= (giftWitdh * 0.55) / 24;
    newConfig.x += (giftWitdh * 1.45) / 24;
    setConfig(newConfig);
    const newGift = { ...gift };
    newGift.width += newGift.width / 24;
    newGift.height += newGift.height / 24;
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
      <Image image={firstGiftImage} width={gift.width} height={gift.height} x={gift.x} y={gift.y} />
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
  opacity = 1,
  onClick,
}: {
  src: string;
  x: number;
  y: number;
  w: number;
  h: number;
  opacity?: number;
  onClick: () => void;
}) {
  const [image] = useImage(src);
  return (
    <Image opacity={opacity} onClick={onClick} onTap={onClick} image={image} x={x} y={y} width={w} height={h}></Image>
  );
}

function Result({ onBack, onDropInfo }: { onBack: () => void; onDropInfo: () => void }) {
  const gameData = useContext(GameContext);
  const screen = gameData.screen;
  const [config, setConfig] = useState({
    x: 0,
    w: screen.width,
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

  // const { height: pathHeight, rawHeight: rawPathHeight } = getPathSize(
  //   gameData.layout as Layout,
  //   gameData.screen
  // );
  // const { height: phoneHeight } = getPhoneSize(gameData);

  // const pathY = pathHeight - rawPathHeight;

  const x = screen.width / 2;
  const y = screen.height * 1 / 3;

  return (
    <>
      <Button
        x={x - buttonWidth - 4}
        y={y}
        w={buttonWidth}
        h={buttonHeight}
        src="/assets/materials/bi-kip-xin-que.png"
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
        src="/assets/materials/xin-que.png"
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

function TiktokLogo({
  y
} : {
  y : number
}) {
  const gameData = useContext(GameContext);
  const [image] = useImage('/assets/tiktok-game/tiktok-logo.desk.png');
  const width = gameData.logoWidth;
  const height = (width * 39) / 160;
  const screen = gameData.screen;

  return (
    <Image
      image={image}
      x={screen.width / 2 - width / 2}
      y={y - height}
      width={width}
      height={height}
    ></Image>
  );
}

function NameLogo({
  y
}: {
  y: number;
}) {
  const gameData = useContext(GameContext);
  const [image] = useImage('/assets/tiktok-game/tet-hut.desk.png');
  const height = gameData.nameLogoHeight;
  const width = (height * NAME_LOGO[0]) / NAME_LOGO[1];
  const screen = gameData.screen;

  return (
    <Image
      image={image}
      x={screen.width / 2 - width / 2}
      y={y - height}
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
      ...generateScreenSize(),
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

function findGCD(a: number, b: number) {
  if (a == b) return a;

  let greater = a > b ? a : b;
  let lessthan = a > b ? b : a;

  const temp = lessthan;

  lessthan = greater - lessthan;
  greater = temp;

  return findGCD(greater, lessthan);
}

function generateScreenSize() {

  const currentWidth = window.innerWidth;
  const currentHeight = window.innerHeight / 2;
  // const isWeird = currentWidth / currentHeight >= 21 / 9;
  // const orientation = window.screen.orientation.type.startsWith('landscape') ? "landscape" : "portrait";
  // const gcd = findGCD(currentWidth, currentHeight);
  // const w = currentWidth / gcd;
  // const h = Math.ceil(9 * w / 16);


  return {
    width: currentWidth,
    height: currentHeight
  }
}

function GameInner({ isRegistered, userData }: { isRegistered: boolean; userData?: IUser }) {
  const dispatch = useContext(GameDispatchContext);
  const gameData = useContext(GameContext);
  const [showResult, setShowResut] = useState(false);
  const [showDropInfo, setShowDropInfo] = useState(false);
  const screen = gameData.screen;

  // console.log(screen);

  const userInfo = gameData && gameData.userInfo;

  const isLoading = isRegistered && !userInfo;

  const fireworkWidths = gameData.fireworks;

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
        ...generateScreenSize(),
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

  // useEffect(() => {
  //   dispatch({
  //     ...gameData,
  //     screen: {
  //       ...gameData.screen,
  //       height: screenHeight
  //     }
  //   })
  // }, [screenHeight]);

  const fireworks: StuffConfig[] = [
    {
      x: screen.width / 2 + phoneSize.width,
      y: screen.height / 2 + screen.height / 16,
      w: fireworkWidths[0],
      h: fireworkWidths[0],
    },
    {
      x: random(screen.width / 2 + screen.width / 4, screen.width - fireworkWidths[1]),
      y: screen.height / 2 + fireworkWidths[1] / 2,
      w: fireworkWidths[1],
      h: fireworkWidths[1],
    },
    {
      x: random(screen.width / 2 + screen.width / 4, screen.width),
      y: screen.height * 1 / 4,
      w: fireworkWidths[2],
      h: fireworkWidths[2],
    },
    {
      x: random(screen.width / 2 + screen.width / 4 + fireworkWidths[1], screen.width - fireworkWidths[1]),
      y: screen.height / 1.5 + fireworkWidths[1],
      w: fireworkWidths[1],
      h: fireworkWidths[1],
    },
    {
      x: screen.width / 2 - phoneSize.width - fireworkWidths[0],
      y: screen.height / 2 + screen.height / 16,
      w: fireworkWidths[0],
      h: fireworkWidths[0],
    },
    {
      x: random(screen.width / 2 - screen.width / 4 - phoneSize.width, screen.width / 2 - fireworkWidths[1] * 2 - phoneSize.width),
      y: screen.height / 2 - screen.height / 8,
      w: fireworkWidths[1],
      h: fireworkWidths[1],
    }
  ];

  // const position = useRef({
  //   startY: 0,
  //   x: 0,
  //   y: 0,
  //   v: 0,
  //   time: 0,
  //   touching: false,
  // });

  const upperRef = useRef<any>();

  const pathY = (pathSize.width - pathSize.rawWidth) / 2;
  const isWeird = 2 * window.innerWidth / window.innerHeight >= 21 / 9;

  // console.log(screen);

  return (
    <div
      id="game"
      className={`w-full justify-end flex flex-col relative overflow-x-hidden`}
      style={{
        ...isWeird ? { "height": "fit-content" } : { "height": "50vh" }
      }}
      onTouchStart={() => {
        if (upperRef.current) {
          const element = (upperRef.current as HTMLDivElement);
          const current = element.style.pointerEvents;
          if (!current || current == "none") element.style.pointerEvents = "auto";
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
      <div className="absolute w-full h-full z-30 pointer-events-none" ref={upperRef} />
      {isLoading ? (
        <div className="w-dvw h-full absolute top-0 left-0 z-30 bg-[#00000050]"></div>
      ) : null}
      <Stage width={screen.width} height={screen.height}>
        <Layer id="background" imageSmoothingEnabled>
          <Firework
            src="/assets/materials/red-firework.png"
            x={fireworks[0].x}
            y={fireworks[0].y}
            width={fireworks[0].w}
            height={fireworks[0].h}
          />
          <Firework
            src="/assets/materials/yellow-firework.png"
            x={fireworks[1].x}
            y={fireworks[1].y}
            width={fireworks[1].w}
            height={fireworks[1].h}
          />
          <Firework
            src="/assets/materials/blue-firework.png"
            x={fireworks[2].x}
            y={fireworks[2].y}
            width={fireworks[2].w}
            height={fireworks[2].h}
          /> 
          <Firework
            src="/assets/materials/red-firework.png"
            x={fireworks[3].x}
            y={fireworks[3].y}
            width={fireworks[3].w}
            height={fireworks[3].h}
          />
          <Firework
            src="/assets/materials/yellow-firework.png"
            x={fireworks[4].x}
            y={fireworks[4].y}
            width={fireworks[4].w}
            height={fireworks[4].h}
          />
          <Firework
            src="/assets/materials/blue-firework.png"
            x={fireworks[5].x}
            y={fireworks[5].y}
            width={fireworks[5].w}
            height={fireworks[5].h}
          /> 
          <Cloud y={screen.height * 1 / 4} src="/assets/materials/cloud-1.png" height={gameData.cloudHeight} direction="right" delay={5} />
          <Cloud y={screen.height * 1 / 3} src="/assets/materials/cloud-2.png" height={gameData.cloudHeight * 1.2} direction="left" delay={10} />
          <Cloud y={screen.height * 3 / 5} src="/assets/materials/cloud-1.png" height={gameData.cloudHeight * 1.4} direction="right" delay={15} />
          {/* {currentStep === 0 || currentStep === 1 || currentStep === 3 || currentStep === 4 ? (
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
        */}
        </Layer>
        <Cup
          shakable={currentStep === 2}
          onShakeEnd={() => {
            setShowResut(true);
          }}
        />
        <Layer imageSmoothingEnabled>
          {currentStep === 3 ? <LastBanner /> : null}
          {currentStep !== 3 ? <TitleBanner /> : null}

          {currentStep != 2 && currentStep != 3 && currentStep != 5 ? <ActionGroup isRegistered={isRegistered} /> : null}
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
          {/* <Mask /> */}
        </Layer>
      </Stage>
      {showResult && !showDropInfo ? (
        <div className="absolute top-0 left-0 w-full h-full z-10">
          <Stage width={screen.width} height={screen.height}>
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
          if (gameAnchor) {
            gameAnchor.scrollIntoView({ "behavior": "smooth" })
          }
        }}
      />
      <GameInner isRegistered={isRegistered} userData={userData} />
    </Provider>
  );
}

export default Game;
