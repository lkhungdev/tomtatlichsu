# Lịch sử Việt Nam – từ tiền sử đến Đổi Mới

Trang web tương tác tóm tắt lịch sử Việt Nam trên một dòng thời gian: 51 sự kiện, mỗi sự kiện có **Bối cảnh – Diễn biến – Kết thúc – Ý nghĩa**, và giải thích **vì sao** nhà nước, triều đại thay đổi.

**Xem trực tuyến:** https://lkhungdev.github.io/tomtatlichsu/

## Cách dùng
- Bấm vào mốc trên timeline để xem sự kiện; kéo chuột hoặc lăn chuột để cuộn timeline.
- Phím `←` `→` chuyển sự kiện, `Space` bật/tắt tự động chạy.
- Mốc từ 700 TCN trở đi đặt đúng tỉ lệ số năm; trước đó dùng thang rút gọn (nét đứt).

## Chạy trên máy
Chỉ là HTML/CSS/JS tĩnh, mở `index.html` là chạy được (cần mạng để tải font Google Fonts).

## Cấu trúc
| File | Nội dung |
|---|---|
| `index.html` | Khung trang |
| `style.css` | Giao diện, hiệu ứng |
| `data.js` | Dữ liệu sự kiện, thời kỳ, **icon theo loại** (`TYPES`) |
| `scenes.js` | Ảnh nền SVG tự sinh (hoặc dùng ảnh thật qua trường `img` trong `data.js`) |
| `app.js` | Timeline, chuyển cảnh, hạt sáng, tự động phát |
