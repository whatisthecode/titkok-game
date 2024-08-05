export const LIST_RESULT = [
    { image: "/assets/tiktok-game/wishing-stick-without-bling.desk.png", type: "hạnh phúc", text1: "Hạnh phúc hút tới quanh ta", text2: "TikTok vui vẻ, bao la tiếng cười" },
    { image: "/assets/tiktok-game/que-so-2.desk.png", type: "may mắn", text1: "May mắn hút đến không ngờ", text2: "TikTok cơ hội, giấc mơ thành hình" },
    { image: "/assets/tiktok-game/que-so-3.desk.png", type: "tình yêu", text1: "TikTok thêu dệt mộng mơ", text2: "Yêu thương sâu đậm, chẳng mờ phai nhanh" },
    { image: "/assets/tiktok-game/que-so-4.desk.png", type: "sự nghiệp", text1: "TikTok dẫn lối vinh quang", text2: "Thăng hoa sự nghiệp, muôn vàn niềm vui" },
    { image: "/assets/tiktok-game/que-so-5.desk.png", type: "sức khỏe", text1: "Tinh thần phấn chấn mỗi ngày", text2: "TikTok lành mạnh, tương lai sáng ngời" },
    { image: "/assets/tiktok-game/que-so-6.desk.png", type: "tài lộc", text1: "Tài lộc hút đến không ngừng", text2: "TikTok thịnh vượng, vui mừng kinh doanh" },
    { image: "/assets/tiktok-game/que-so-7.desk.png", type: "sáng tạo", text1: "Sáng tạo hút đến thật nhiều", text2: "TikTok ý tưởng, thành công rạng ngời" },
    { image: "/assets/tiktok-game/que-so-8.desk.png", type: "kiến thức", text1: "TikTok khuyến khích siêng năng", text2: "Thành công vang dội, mục tiêu đạt thành" },
    { image: "/assets/tiktok-game/que-so-9.desk.png", type: '"deal" to', text1: "Deal to hút đến liền tay", text2: "TikTok lan tỏa, ngày ngày thăng hoa" },
    { image: "/assets/tiktok-game/que-may-man.desk.png", type: "gift", text1: "", text2: "" },
    { image: "/assets/tiktok-game/que-may-man.desk.png", type: "gift", text1: "", text2: "" },
    { image: "/assets/tiktok-game/que-may-man.desk.png", type: "gift", text1: "", text2: "" },
    { image: "/assets/tiktok-game/que-may-man.desk.png", type: "gift", text1: "", text2: "" }
];

export function random(min: number, max: number) {
    return Math.floor(Math.random() * max) + min;
}

export function getPlayTimes() {
    return Math.floor(random(1, 2));
}

export function getWishingResult() {
    return random(0, LIST_RESULT.length);
}

export function generateDefaultResult(playCount: number) {
    const result = [];
    for (let i = 0; i < playCount; i++) {
        result[i] = -1;
    }
    return result;
}