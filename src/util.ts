// import {} from "react-device-detect";

export const LIST_RESULT = [
    { image: "/assets/tiktok-game/que-so-1.desk.png", type: "dự án", text1: "Khách mới tới tấp, dự án dồi dào", text2: "Quẻ \"Hút Dự Án\" cho thấy năm nay bạn sẽ gặp nhiều may mắn và thuận lợi trong việc tìm kiếm và thu hút các dự án mới. Các dự án dồi dào sẽ liên tiếp đến với bạn, giúp công việc phát triển mạnh mẽ và bền vững." },
    { image: "/assets/tiktok-game/que-so-2.desk.png", type: "tăng lương", text1: "Công sức bù đắp, lương thưởng xứng đáng", text2: "Quẻ \"Hút Tăng Lương\" cho thấy năm nay bạn sẽ được đền đáp xứng đáng cho những nỗ lực và cống hiến trong công việc. Khi bạn làm việc chăm chỉ và đạt được những kết quả ấn tượng, bạn sẽ được cấp trên công nhận và tưởng thưởng xứng đáng." },
    { image: "/assets/tiktok-game/que-so-3.desk.png", type: "thăng tiến", text1: "Công việc suôn sẻ, được đánh giá cao", text2: "Quẻ \"Hút Thăng Tiến\" cho thấy năm nay bạn sẽ phát triển và tiến bộ trong sự nghiệp. Khi công việc diễn ra suôn sẻ và bạn được đánh giá cao, cơ hội thăng tiến sẽ đến gần hơn." },
    { image: "/assets/tiktok-game/que-so-4.desk.png", type: "khách hàng", text1: "Khách hàng dồi dào, công việc thuận lợi", text2: "Quẻ \"Hút Khách Hàng\" cho thấy năm nay bạn sẽ thu hút và phát triển mối quan hệ với khách hàng. Khi bạn có nhiều khách hàng tiềm năng, công việc kinh doanh sẽ phát triển thuận lợi." },
    { image: "/assets/tiktok-game/que-so-5.desk.png", type: "ý tưởng", text1: "Sáng tạo không ngừng, ý tưởng phong phú", text2: "Quẻ \"Hút Ý Tưởng\" cho thấy năm nay bạn sẽ sáng tạo và đổi mới không ngừng. Khi bạn luôn có những ý tưởng mới mẻ, công việc và cuộc sống của bạn sẽ trở nên phong phú và đa dạng." },
    { image: "/assets/tiktok-game/que-so-6.desk.png", type: "doanh số", text1: "Bán hàng thuận lợi, doanh số tăng cao", text2: "Quẻ \"Hút Doanh Số\" cho thấy năm nay bạn sẽ phát triển và tăng trưởng trong hoạt động kinh doanh. Khi bạn hút những deal \"to\" thuận lợi, doanh số sẽ tăng cao." },
    { image: "/assets/tiktok-game/que-so-7.desk.png", type: "kiến thức", text1: "Học hỏi không ngừng, tri thức rộng mở", text2: "Quẻ \"Hút Kiến Thức\" cho thấy năm nay bạn sẽ học hỏi và phát triển không ngừng. Khi bạn luôn tìm kiếm và hấp thụ kiến thức mới, bạn sẽ trở nên thông thái và tự tin hơn trong công việc và cuộc sống." },
    { image: "/assets/tiktok-game/que-so-8.desk.png", type: "gắn kết", text1: "Đoàn kết một lòng, thành công bền vững", text2: "Quẻ \"Hút Gắn Kết\" cho thấy tổ chức nơi bạn gắn bó sẽ có một môi trường làm việc đoàn kết và hợp tác. Khi bạn và đồng nghiệp làm việc cùng nhau một cách đoàn kết và hiệu quả, công việc sẽ tiến triển thuận lợi và thành công." },
    { image: "/assets/tiktok-game/que-so-9.desk.png", type: "cân bằng", text1: "Công việc và cuộc sống, cân bằng hạnh phúc", text2: "Quẻ \"Hút Cân Bằng\" cho thấy năm nay bạn sẽ hài hòa giữa công việc và cuộc sống cá nhân. Khi bạn đạt được sự cân bằng này, bạn sẽ có sức khỏe tốt, tinh thần thoải mái và hiệu suất công việc cao." },
    { image: "/assets/tiktok-game/que-may-man.desk.png", type: "gift", text1: "", text2: "1 chăn Tiktok" },
    { image: "/assets/tiktok-game/que-may-man.desk.png", type: "gift", text1: "", text2: "1 túi Tiktok" },
    { image: "/assets/tiktok-game/que-may-man.desk.png", type: "gift", text1: "", text2: "1 túi đeo Tiktok màu bất kỳ (đen/trắng)" },
    { image: "/assets/tiktok-game/que-may-man.desk.png", type: "gift", text1: "", text2: "1 sổ Tiktok" },
];

export const GIFT_IN_LIST = [9, 10, 11, 12];

export const validateEmail = (email: string) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

export function random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export function getPlayTimes() {
    return Math.floor(random(1, 2));
}

export function getWishingResult(from: number = 0, to: number = 0) {
    return random(from || 0, to || LIST_RESULT.length);
}

export function generateDefaultResult(playCount: number) {
    const result = [];
    for (let i = 0; i < playCount; i++) {
        result[i] = -1;
    }
    return result;
}

export async function requestStorageAccess() {
    try {
      const hasStorageAccess = await document.hasStorageAccess();
      if(hasStorageAccess) {
        await document.requestStorageAccess()
        return true;
      }
      return false;
    }
    catch(e) {
      console.error(e);
      return false;
    }
  }