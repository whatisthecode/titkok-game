import { Stage, Layer, Image, Rect, Text } from 'react-konva';
import useImage from 'use-image';

import './Game.css';
import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import { GameConfig, GameData, Layout, Step, StuffConfig } from '../types/type';
import { GameContext, GameDispatchContext } from '../contexts';
import { GameReducer } from '../services/reducer';
import { generateDefaultResult, getPlayTimes, getWishingResult } from '../util';

type Props = {
  setStep: (step: Step) => void;
};

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
const RULE_BANNERS = [2348, 1175];
const BUTTON = [327, 80];
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

SIZES.set("<=320", {
  logoWidth: 100,
  nameLogoHeight: 40,
  font: {
    family: "TikTokDisplayFont",
    size: 12,
    lineHeight: 16,
    style: "normal"
  },
  titleBannerHeight: 110,
  ruleBannerHeight: 150,
  resultStickWidth: 30,
  buttonHeight: 32,
  phoneWidth: 100,
  giftBoxWidth: 100,
  pathY: 100,
  stuffWidths: [50, 50, 50, 40, 40, 40, 40, 50, 40],
  fireworks: [30, 60, 90],
  flowers: [{
    x: 0, y: 0, w: 0, h: 0
  }, {
    x: 65, y: window.innerHeight - 75, w: 25, h: FLOWERS[1][1] * 25 / FLOWERS[1][0]
  }, {
    x: 0, y: 0, w: 0, h: 0
  }, {
    x: 0, y: 0, w: 0, h: 0
  }]
});

SIZES.set("<=375", {
  logoWidth: 200,
  nameLogoHeight: 60,
  font: {
    family: "TikTokDisplayFont",
    size: 16,
    lineHeight: 20,
    style: "normal"
  },
  titleBannerHeight: 120,
  ruleBannerHeight: 180,
  stuffWidths: [70, 70, 70, 70, 60, 70, 60, 70, 70],
  fireworks: [30, 60, 90],
  flowers: [{
    x: 0, y: 0, w: 0, h: 0
  }, {
    x: 75, y: window.innerHeight - 155, w: 25, h: FLOWERS[1][1] * 25 / FLOWERS[1][0]
  }, {
    x: 0, y: 0, w: 0, h: 0
  }, {
    x: 0, y: 0, w: 0, h: 0
  }],
  resultStickWidth: 40,
  buttonHeight: 40,
  phoneWidth: 100,
  giftBoxWidth: 100,
  pathY: 50
});

SIZES.set("<=525", {
  logoWidth: 200,
  nameLogoHeight: 60,
  font: {
    family: "TikTokDisplayFont",
    size: 16,
    lineHeight: 20,
    style: "normal"
  },
  titleBannerHeight: 120,
  ruleBannerHeight: 180,
  stuffWidths: [100, 100, 100, 100, 60, 100, 60, 100, 100],
  fireworks: [30, 60, 90],
  flowers: [{
    x: 0, y: 0, w: 0, h: 0
  }, {
    x: 75, y: window.innerHeight - 155, w: 25, h: FLOWERS[1][1] * 25 / FLOWERS[1][0]
  }, {
    x: 0, y: 0, w: 0, h: 0
  }, {
    x: 0, y: 0, w: 0, h: 0
  }],
  resultStickWidth: 40,
  buttonHeight: 40,
  phoneWidth: 120,
  giftBoxWidth: 120,
  pathY: 50
});

SIZES.set("<=768", {
  logoWidth: 200,
  nameLogoHeight: 60,
  font: {
    family: "TikTokDisplayFont",
    size: 16,
    lineHeight: 20,
    style: "normal"
  },
  titleBannerHeight: 160,
  ruleBannerHeight: 240,
  stuffWidths: [120, 120, 120, 100, 70, 100, 70, 120, 100],
  fireworks: [30, 60, 90],
  flowers: [{
    x: 0, y: 0, w: 0, h: 0
  }, {
    x: 75, y: window.innerHeight - 155, w: 25, h: FLOWERS[1][1] * 25 / FLOWERS[1][0]
  }, {
    x: 0, y: 0, w: 0, h: 0
  }, {
    x: 0, y: 0, w: 0, h: 0
  }],
  resultStickWidth: 40,
  buttonHeight: 40,
  phoneWidth: 200,
  giftBoxWidth: 300,
  pathY: 100
});

SIZES.set("<=1366", {
  logoWidth: 200,
  nameLogoHeight: 60,
  font: {
    family: "TikTokDisplayFont",
    size: 16,
    lineHeight: 20,
    style: "normal"
  },
  titleBannerHeight: 160,
  ruleBannerHeight: 240,
  stuffWidths: [180, 180, 180, 120, 90, 120, 90, 180, 120],
  fireworks: [50, 100, 140],
  flowers: [],
  resultStickWidth: 40,
  buttonHeight: 40,
  phoneWidth: 180,
  giftBoxWidth: 500,
  pathY: 100
});

SIZES.set("<=1440", {
  logoWidth: 200,
  nameLogoHeight: 60,
  font: {
    family: "TikTokDisplayFont",
    size: 20,
    lineHeight: 24,
    style: "normal"
  },
  titleBannerHeight: 160,
  ruleBannerHeight: 240,
  stuffWidths: [200, 200, 200, 140, 90, 140, 90, 200, 140],
  fireworks: [50, 100, 140],
  flowers: [],
  resultStickWidth: 50,
  buttonHeight: 48,
  phoneWidth: 200,
  giftBoxWidth: 300,
  pathY: 100
});

SIZES.set("<=1720", {
  logoWidth: 200,
  nameLogoHeight: 60,
  font: {
    family: "TikTokDisplayFont",
    size: 20,
    lineHeight: 24,
    style: "normal"
  },
  titleBannerHeight: 160,
  ruleBannerHeight: 240,
  stuffWidths: [260, 260, 260, 160, 100, 160, 100, 260, 160],
  fireworks: [50, 100, 140],
  flowers: [],
  resultStickWidth: 50,
  buttonHeight: 48,
  phoneWidth: 200,
  giftBoxWidth: 300,
  pathY: 100
});

SIZES.set(">1720", {
  logoWidth: 200,
  nameLogoHeight: 60,
  font: {
    family: "TikTokDisplayFont",
    size: 20,
    lineHeight: 24,
    style: "normal"
  },
  titleBannerHeight: 160,
  ruleBannerHeight: 280,
  stuffWidths: [300, 300, 300, 160, 100, 160, 100, 300, 160],
  fireworks: [50, 100, 140],
  flowers: [],
  resultStickWidth: 50,
  buttonHeight: 48,
  phoneWidth: 200,
  giftBoxWidth: 400,
  pathY: 100
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

function Cup({
  onShakeEnd
}: {
  onShakeEnd: () => void;
}) {
  const gameData = useContext(GameContext);
  const dispatch = useContext(GameDispatchContext);
  const screen = gameData.screen
  const [imageBack] = useImage("/assets/tiktok-game/cup-back.desk.png");
  const [imageFront] = useImage("/assets/tiktok-game/cup-front.desk.png");
  const [imageStick] = useImage("/assets/tiktok-game/stick.desk.png");

  const [shaking, shake] = useState(false);

  const width = gameData.phoneWidth;
  const upperHeight = width * 104 / 909;
  const layout = gameData.layout as Layout;
  
  const {height: pathHeight, rawHeight: rawPathHeight} = getPathSize(layout, gameData.screen);
  const pathY = pathHeight - rawPathHeight;

  const cupLowerHeight = width * CUP_LOWER[1] / CUP_LOWER[0];
  const height = width * CUP[1] / CUP[0];

  const stickWidth = width / 5;
  const stickHeight = stickWidth * 1586 / 215;

  const x = screen.width / 2 - width / 2;

  const frontY = screen.height - height - rawPathHeight / 4 + pathY / 4 + cupLowerHeight;
  const stickY = screen.height - height - stickHeight / 3 - rawPathHeight / 4 + pathY / 4;
  const topY = frontY - upperHeight / 2;

  const [config, setConfig] = useState({
    x: x,
    y: frontY,
    minX: x - 10,
    maxX: x + 10,
    direction: "right",
    step: 5,
    shakeCount: 0,
    maxShake: 100,
  });

  const update = () => {
    const currentConfig = { ...config };
    currentConfig.shakeCount += 1;
    if (currentConfig.direction == "right") {
      currentConfig.x += currentConfig.step;
      if (currentConfig.x > currentConfig.maxX) {
        currentConfig.x = currentConfig.maxX - currentConfig.step;
        currentConfig.direction = "left";
      }
    }
    else {
      currentConfig.x -= currentConfig.step;
      if (currentConfig.x < currentConfig.minX) {
        currentConfig.x = currentConfig.minX + currentConfig.step;
        currentConfig.direction = "right";
      }
    }

    if (currentConfig.shakeCount == currentConfig.maxShake + 1) {
      currentConfig.x = currentConfig.minX + 10;
      currentConfig.shakeCount = 0;
      shake(false);
      onShakeEnd && onShakeEnd();
    }

    setConfig(currentConfig);
  }

  const audioRef = useRef<HTMLAudioElement>();

  useEffect(() => {
    const audioElement = document.createElement("audio");
    audioElement.src = "/assets/tiktok-game/kau-cim.mp3";
    document.documentElement.append(audioElement);
    audioRef.current = audioElement;

    return () => {
      audioRef.current && audioRef.current.remove();
      audioRef.current = undefined;
    }
  }, []);

  useEffect(() => {

    if (shaking){
      getWishingResult();
      if(audioRef.current){
        audioRef.current.play();
      }
        
      setTimeout(() => {
        window.requestAnimationFrame(update);
      }, 1000 / 120);
    }
    else if(audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.pause();
    }

  }, [shaking, config]);

  useEffect(() => {
    if(shaking){
      const result = [...gameData.result];
      const current = gameData.current;

      result[current] = getWishingResult();
      
      dispatch({
        ...gameData,
        type: "UPDATE",
        result,
        current: current + 1
      });
    }
  }, [shaking])

  return <>
    <Layer imageSmoothingEnabled onTap={() => {
      shake(true);
    }} onClick={() => {
      shake(true);
    }}>
      <Image image={imageBack} x={config.x} y={topY} width={width} height={upperHeight} />
      <Image image={imageStick} x={config.x + 10} y={stickY} width={stickWidth} height={stickHeight} />
      <Image image={imageStick} x={config.x + 2 * stickWidth / 2} y={stickY} width={stickWidth} height={stickHeight} rotation={-20} />
      <Image image={imageStick} x={config.x + 3 * stickWidth / 2} y={stickY} width={stickWidth} height={stickHeight} />
      <Image image={imageStick} x={config.x + 4 * stickWidth / 2} y={stickY} width={stickWidth} height={stickHeight} />
      <Image image={imageStick} x={config.x + 5 * stickWidth / 2} y={stickY} width={stickWidth} height={stickHeight} rotation={-10} />
      <Image image={imageStick} x={config.x + 6 * stickWidth / 2} y={stickY} width={stickWidth} height={stickHeight} />
      <Image image={imageStick} x={config.x + 7 * stickWidth / 2} y={stickY} width={stickWidth} height={stickHeight} />
      <Image image={imageStick} x={config.x + 9 * stickWidth / 2} y={stickY} width={stickWidth} height={stickHeight} rotation={20} />
      <Image image={imageStick} x={config.x + stickWidth / 2} y={stickY} width={stickWidth} height={stickHeight}/>
      <Image image={imageFront} x={config.x} y={frontY} width={width} height={height} />
    </Layer>
  </>
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
  const [image] = useImage('/assets/tiktok-game/full-step.mobile.png');
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

const LIST_RESULT = [
  { image: "/assets/tiktok-game/wishing-stick-without-bling.desk.png", type: "hạnh phúc", text1: "Hạnh phúc hút tới quanh ta", text2: "TikTok vui vẻ, bao la tiếng cười"},
  { image: "/assets/tiktok-game/que-so-2.desk.png", type: "may mắn", text1: "May mắn hút đến không ngờ", text2: "TikTok cơ hội, giấc mơ thành hình"},
  { image: "/assets/tiktok-game/que-so-3.desk.png", type: "tình yêu", text1: "TikTok thêu dệt mộng mơ", text2: "Yêu thương sâu đậm, chẳng mờ phai nhanh"},
  { image: "/assets/tiktok-game/que-so-4.desk.png", type: "sự nghiệp", text1: "TikTok dẫn lối vinh quang", text2: "Thăng hoa sự nghiệp, muôn vàn niềm vui"},
  { image: "/assets/tiktok-game/que-so-5.desk.png", type: "sức khỏe", text1: "Tinh thần phấn chấn mỗi ngày", text2: "TikTok lành mạnh, tương lai sáng ngời"},
  { image: "/assets/tiktok-game/que-so-6.desk.png", type: "tài lộc", text1: "Tài lộc hút đến không ngừng", text2: "TikTok thịnh vượng, vui mừng kinh doanh"},
  { image: "/assets/tiktok-game/que-so-7.desk.png", type: "sáng tạo", text1: "Sáng tạo hút đến thật nhiều", text2: "TikTok ý tưởng, thành công rạng ngời"},
  { image: "/assets/tiktok-game/que-so-8.desk.png", type: "kiến thức", text1: "TikTok khuyến khích siêng năng", text2: "Thành công vang dội, mục tiêu đạt thành"},
  { image: "/assets/tiktok-game/que-so-9.desk.png", type: '"deal" to', text1: "Deal to hút đến liền tay", text2: "TikTok lan tỏa, ngày ngày thăng hoa"}
];

const SPECIAL_RESULT = [
  {image: "/assets/tiktok-game/que-may-man.desk.png", type: "", text1: "", text2: ""}
]

function StickResult({
  onBack
}: {
  onBack: () => void;
}) {
  const gameData  = useContext(GameContext)
  const result = gameData.result;
  const current = gameData.current - 1;
  const playCount = gameData.playCount;
  
  // console.log(gameData);

  const dataResult = current < playCount - 1 ? LIST_RESULT[result[current === -1 ? 0 : current]] : SPECIAL_RESULT[0];
  const [image] = useImage(dataResult.image);
  const [backButtonImage] = useImage("/assets/tiktok-game/back-button.desk.png");
  const [show, showResult] = useState(false);
  const [display, displayResult] = useState(false);
  const width = gameData.resultStickWidth;
  const height = width * 1586 / 215;

  const [config, setConfig] = useState({
    x: window.innerWidth / 2 - width / 2,
    y: window.innerHeight / 2 - height / 2,
    rotation: 0
  })

  const update = () => {
    const currentConfig = { ...config }


    currentConfig.rotation += 1;
    currentConfig.x = window.innerWidth / 2 - width / 2 + (height / (2 * 70)) * currentConfig.rotation;
    currentConfig.y = window.innerHeight / 2 - height / 2 - (height / (6 * 70)) * currentConfig.rotation;

    if (currentConfig.y < 20) currentConfig.y = 20;

    if (currentConfig.rotation < 70) setConfig(currentConfig);
    else displayResult(true);
  }

  useEffect(() => {
    if (show) 
      if(current < playCount - 1) window.requestAnimationFrame(update);
      else displayResult(true);
  }, [show, config])

  const fontBase = gameData.font.size;
  const lineHeightBase = gameData.font.lineHeight;

  const measureText = (input: string) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillText(input, 0, 0);
      ctx.font = `bold ${gameData.font.size * 2}px ${gameData.font.family}`;
      return ctx.measureText(input).width;
    }
    return 0;
  }

  const yLines = [
    0,
    lineHeightBase + fontBase / 2
  ]
  yLines[2] = yLines[1] + lineHeightBase + (fontBase + 4) + fontBase;
  yLines[3] = yLines[2] + lineHeightBase + (fontBase + 4) / 4;

  const buttonWidth = 1308 / 319 * gameData.buttonHeight;

  const fullType = "Hút " + dataResult.type;

  return (
    <>
      {current < playCount - 1 || !display ? <Image image={image} x={config.x} y={config.y} width={width} height={height} rotation={config.rotation} onTap={() => showResult(true)} onClick={() => {
        showResult(true);
      }} /> : null}
      {(current < playCount - 1 && display) ? <>
        <Text text={`Quẻ săm số ${result[current] + 1}:`} fill={"#fff"} width={window.innerWidth} align="center" y={window.innerHeight / 2 + yLines[0]} fontSize={fontBase} fontFamily="TikTokDisplayFont" />
        <Text text={"Hút"} fill={"#fff"} x={- (measureText(fullType) / 2) + measureText("Hut") / 2} width={window.innerWidth} align="center" y={window.innerHeight / 2 + yLines[1]} fontSize={fontBase * 2} fontFamily="TikTokDisplayFont" fontStyle="bold" />
        <Text text={dataResult.type} fill={"#fd0048"} x={- (measureText(fullType) / 2) + measureText(dataResult.type) / 2 + measureText("Hút ")} width={window.innerWidth} align="center" y={window.innerHeight / 2 + yLines[1]} fontSize={fontBase * 2} fontFamily="TikTokDisplayFont" fontStyle="bold" />
        <Text text={dataResult.text1} fill={"#fff"} width={window.innerWidth} align="center" y={window.innerHeight / 2 + yLines[2]} fontSize={fontBase + 4} fontFamily="TikTokDisplayFont" />
        <Text text={dataResult.text2} fill={"#fff"} width={window.innerWidth} align="center" y={window.innerHeight / 2 + yLines[3]} fontSize={fontBase + 4} fontFamily="TikTokDisplayFont" />
        <Image onTap={onBack} onClick={onBack} image={backButtonImage} x={window.innerWidth / 2 - buttonWidth / 2} y={window.innerHeight / 2 + yLines[3] + 40} width={buttonWidth} height={gameData.buttonHeight}></Image>
      </> : null}
      {(current == playCount - 1 && display) ? <GiftBox /> : null}
    </>
  )
}


function GiftBox() {
  const gameData = useContext(GameContext);

  const [upperImage] = useImage("/assets/tiktok-game/box-upper.desk.png");
  const [lowerImage] = useImage("/assets/tiktok-game/box-lower.desk.png");
  const [firstGiftImage] = useImage("/assets/tiktok-game/qua-1.desk.png");
  const [showGift, setShowGift] = useState(false);

  const screen = gameData.screen;
  const lwidth = gameData.giftBoxWidth;
  const lheight = lwidth * BOX_LOWER[1] / BOX_LOWER[0];

  const uwidth = gameData.giftBoxWidth + 2;
  const uheight = uwidth * BOX_UPPER[1] / BOX_UPPER[0];

  const lx = screen.width / 2 - lwidth / 2;
  const ux = screen.width / 2 - uwidth / 2 - uwidth / 16;

  const ly = screen.height / 2;
  const uy = ly - uheight / 20;

  const [gift, setGift] = useState({
    width: 100,
    x: screen.width / 2 - 50,
    y: screen.height / 2 - 2 * 100 / 3
  })
  
  const giftWitdh = 100;
  const giftX = screen.width / 2 - giftWitdh / 2;
  const giftY = screen.height / 2 - 2 * giftWitdh / 3;

  const [config, setConfig] = useState({
    x: ux,
    y: uy,
    r: -17
  })

  const update = () => {
    const newConfig = {...config};
    newConfig.r += 1;
    newConfig.y -= 15;
    newConfig.x += 10;
    setConfig(newConfig);
    const newGift = {...gift};
    newGift.width += 25;
    newGift.x = screen.width / 2 - newGift.width / 2;
    newGift.y = screen.height / 2 - 2 * newGift.width / 3 + newGift.width / 6;
    setGift(newGift);
  }

  useEffect(() => {
    if(config.r != 0 && showGift) {
      setTimeout(() => {
        window.requestAnimationFrame(update);
      }, 1000 / 30);
    }
  }, [config, showGift]);

  return <>
    <Image image={lowerImage} x={lx} y={ly} width={lwidth} height={lheight}/>
    <Image image={firstGiftImage} width={gift.width} height={gift.width} x={gift.x} y={gift.y} />
    <Image image={upperImage} x={config.x} y={config.y} width={uwidth} height={uheight} rotation={config.r} onClick={() => { setShowGift(true) }} onTap={() => { setShowGift(true) }}/>
  </>
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

function Result({ onBack }: { onBack: () => void }) {
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
        height={window.innerHeight}
      />
      <StickResult onBack={onBack} />
    </Layer>
  );
}

function ActionGroup() {
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
          dispatch({
            ...gameData,
            step: 2,
            type: 'UPDATE',
          });
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

function Game() {
  const playCount = getPlayTimes();
  const [gameData, dispatch] = useReducer(GameReducer, {
    ...getGameConfig(),
    layout: window.innerWidth < window.innerHeight ? 'mobile' : 'desktop',
    step: 0,
    orientation: window.screen.orientation.type.startsWith('landscape') ? 'landscape' : 'portrait',
    current: 0,
    playCount,
    result: generateDefaultResult(playCount),
    screen: {
      dpr: window.devicePixelRatio,
      width: window.innerWidth,
      height: window.innerHeight,
      bWidth: 1920,
      bHeight: 1080,
    },
  });
  const [showResult, setShowResut] = useState(false);
  const screen = gameData.screen;

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
    const handleResize = () => {
      console.log('resizing...');
      const newScreen = {
        width: window.innerWidth,
        height: window.innerHeight,
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

  // console.log("updating...", gameData);

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

  return (
    <GameContext.Provider value={gameData}>
      <GameDispatchContext.Provider value={dispatch}>
        <div
          className="w-full min-h-dvh justify-end flex flex-col relative overflow-x-hidden"
          onClick={() => {}}
        >
          <Stage width={screen.width} height={screen.height}>
            <Layer id="background" imageSmoothingEnabled>
              {currentStep === 0 || currentStep === 1 ? <Phone /> : null}
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
              {currentStep === 0 ? <ActionGroup /> : null}
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
          {showResult ? (
            <div className="absolute top-0 left-0 w-full h-full z-10">
              <Stage width={window.innerWidth} height={window.innerHeight}>
                <Result onBack={() => setShowResut(false)} />
              </Stage>
            </div>
          ) : null}
        </div>
      </GameDispatchContext.Provider>
    </GameContext.Provider>
  );
}

export default Game;
