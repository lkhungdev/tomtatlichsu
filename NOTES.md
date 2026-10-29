# Ghi chú làm việc – Lịch sử Việt Nam (tomtatlichsu)

Tài liệu bàn giao cho phiên làm việc sau. Cập nhật lần cuối: 29/10/2026.

- **Repo:** https://github.com/lkhungdev/tomtatlichsu (public, nhánh `main`)
- **Trang chạy:** https://lkhungdev.github.io/tomtatlichsu/ (GitHub Pages, deploy từ `main` / root)
- **Công nghệ:** HTML + CSS + JS thuần, không build, không thư viện. Mở `index.html` là chạy.

## 1. Yêu cầu gốc của người dùng
1. Trang web tóm tắt lịch sử Việt Nam, có html/css/js và hiệu ứng.
2. Hai phần: (a) nội dung lịch sử, ẩn mờ bên dưới là ảnh nền; (b) thanh timeline ở dưới cùng, các nút tròn là mốc sự kiện, **khoảng cách mốc tính tương đối đúng với số năm**.
3. Khóa cứng chiều cao và chiều rộng bằng màn hình (không cuộn trang).
4. Phạm vi: từ Tiền sử & Dựng nước đến Đổi Mới do Đảng Cộng sản Việt Nam khởi xướng.
5. Yêu cầu bổ sung (lượt 2): không chỉ các thời kỳ lập nước mà phải có **trận đánh, khởi nghĩa, cướp ngôi…**; mỗi sự kiện phải rõ **Bối cảnh – Diễn biến – Kết thúc – Ý nghĩa**; rõ **vì sao** từ nhà nước này chuyển sang nhà nước khác; **icon timeline theo loại** (lập nước = tòa thành, trận đánh = hai kiếm chéo… vẽ tạm, người dùng sẽ tự sửa).

## 2. Đã làm
- 51 sự kiện (xem `data.js`), 7 thời kỳ (màu theo thời kỳ), 7 loại sự kiện (icon + làn timeline).
- Thẻ nội dung: huy hiệu loại, thời kỳ, địa điểm, năm lớn (hiệu ứng "giải mã" chữ số), tiêu đề, khung **"Vì sao chuyển đổi?"** (chỉ hiện khi có `shift` + `why`), 1 câu tóm tắt, lưới 4 phần.
- Timeline 2 làn (làn 0: nhà nước/chính biến/cột mốc; làn 1: chiến sự/khởi nghĩa), mốc gần nhau tự xếp thêm hàng, thước năm, dải thời kỳ có nhãn dính khi cuộn, vạch đứng theo mốc đang chọn, tooltip, chú thích icon.
- Ảnh nền: SVG tự sinh bằng code (12 kiểu cảnh × 8 tông màu), chuyển cảnh chéo, Ken Burns, parallax chuột, hạt sáng canvas đổi màu theo thời kỳ, flash chuyển cảnh, grain.
- Điều khiển: bấm mốc, kéo/lăn chuột trên timeline, phím ←/→/↑/↓, Home/End, Space (tự động phát, 20 giây/mốc), hash URL (`#bach-dang-1288`).
- Responsive: ≥1100px lưới 4 cột; 760–1100px 2 cột; <760px 1 cột (thẻ tự cuộn bên trong). Có `prefers-reduced-motion`.
- Đã đưa lên GitHub, bật Pages, đã kiểm tra link chạy (51 mốc, không lỗi console).

## 3. Cấu trúc file
| File | Vai trò |
|---|---|
| `index.html` | Khung trang: nền, header, thẻ nội dung (`#card`), timeline (`#timeline`, `#tlView`, `#legend`) |
| `style.css` | Toàn bộ giao diện, hiệu ứng, responsive |
| `data.js` | `window.VN_DATA` = `{ TYPES, ERAS, EVENTS }` – **nơi sửa nội dung và icon** |
| `scenes.js` | `window.Scenes.render(kind, tone, seed)` → data-URI SVG làm ảnh nền |
| `app.js` | Dựng timeline, bố cục làn, render thẻ, nền, hạt sáng, tự động phát |
| `README.md` | Giới thiệu ngắn + link Pages |
| `NOTES.md` | File này |
| `.gitignore` | Bỏ `.claude/`, file hệ điều hành/trình soạn thảo |

## 4. Cấu trúc dữ liệu (`data.js`)
Mỗi phần tử của `EVENTS`:
```js
{
  id, y, ys, sfx, tl,        // id (hash URL); y = năm (âm = TCN) quyết định vị trí; ys = chữ số lớn; sfx = hậu tố; tl = nhãn dưới nút
  era,                       // id trong ERAS (quyết định màu)
  type,                      // khóa trong TYPES (quyết định icon + làn)
  scene, tone,               // ảnh nền SVG (hoặc thêm img: 'images/x.jpg' để dùng ảnh thật)
  place,                     // địa điểm (tuỳ chọn)
  title, lead,               // tiêu đề, 1 câu tóm tắt
  shift: [từ, sang],         // (tuỳ chọn) chỉ khi đổi nhà nước/triều đại
  why,                       // (cần đi kèm shift) vì sao chuyển đổi
  ctx, course, end, sig      // Bối cảnh / Diễn biến / Kết thúc / Ý nghĩa
}
```
- `TYPES[k] = { label, lane, icon }` – `icon` là phần ruột SVG (viewBox 24×24, nét đường, `stroke=currentColor`). **Muốn đổi icon chỉ cần thay chuỗi này.** `lane` 0 hoặc 1 = làn trên/dưới.
- Các loại hiện có: `nation` (tòa thành), `usurp` (vương miện), `scroll` (cuộn giấy), `origin` (ngọn lửa), `star` (ngôi sao) → làn 0; `battle` (hai kiếm chéo), `uprising` (lá cờ) → làn 1.
- `ERAS[i] = { id, short, name, from, color, range }`. Ranh giới dải = `from` của thời kỳ kế tiếp. `short` dùng khi dải hẹp (<300px).
- `app.js` tự sắp `EVENTS` theo `y`, nên thêm sự kiện ở đâu trong mảng cũng được.

## 4b. Thang thời gian (quan trọng khi sửa)
- Từ 700 TCN trở đi: **tuyến tính 3,2 px/năm** (`PPY` trong `app.js`) → khoảng cách mốc đúng tỉ lệ.
- Trước 700 TCN (30.000 – 300.000 năm): **không thể** vẽ tuyến tính, dùng thang log (`LOG_K`), vẽ nét đứt có ký hiệu `//`. Đây là thỏa hiệp có chủ ý, đã nói rõ với người dùng.
- `MIN_GAP = 40px`: hai mốc cùng làn gần hơn mức này sẽ bị đẩy xuống hàng 2/3. Khi thêm mốc dày đặc (ví dụ 1945–1976), kiểm tra không phát sinh quá 2 hàng mỗi làn, nếu không timeline sẽ cao hơn.
- Chiều cao timeline là `--tl-h` trong `style.css` (`clamp(176px, 29vh, 250px)`); `layout()` trong `app.js` co giãn bước hàng và cỡ nút theo chiều cao thật.

## 5. Lưu ý / bẫy đã gặp
- **Độ chính xác lịch sử:** toàn bộ nội dung do AI viết từ kiến thức sẵn có, **chưa đối chiếu sách giáo khoa**. Cần người dùng hoặc phiên sau rà lại các mốc năm, tên người, số liệu trước khi dùng chính thức.
- **Âu Lạc:** đặt ở **208 TCN** (quan điểm hiện đại, sau kháng Tần 214 TCN) để thứ tự nhân quả hợp lý; sử cũ chép **257 TCN** (đã ghi chú trong `why` của thẻ). Phiên đầu từng dùng 257.
- **Năm 1009 vs 1010:** mốc nhà Lý đặt `y: 1010` (dời đô) nhưng hiển thị `ys/tl: '1009'` (lên ngôi). Có chủ ý.
- **Khung xem trước:** Browser pane của Claude mở `file://` chỉ cho bản tĩnh (không nạp CSS/JS). Phải chạy server cục bộ: `.claude/launch.json` cấu hình `python -m http.server 5173` (tên `vn-history`). Thư mục `.claude/` bị `.gitignore` bỏ qua, không đưa lên repo.
- **Chụp màn hình bị tối:** trang fade-in 1,2 giây (`#app.ready`); chụp ngay sau khi tải sẽ thấy đen. Chờ vài giây rồi chụp lại. Emulation viewport của pane bị reset khi tải lại trang.
- **Ảnh nền là SVG vẽ bằng code**, không phải ảnh thật (không tải được ảnh ngoài nếu chưa được phép). Muốn ảnh thật: thêm `img: 'images/ten.jpg'` cho sự kiện, đặt ảnh vào thư mục `images/` rồi commit.
- **Font** Playfair Display + Be Vietnam Pro tải từ Google Fonts → cần mạng, offline sẽ dùng font hệ thống.
- **GitHub Pages cần repo public** (gói miễn phí). Repo từng private nên mục Pages không hiện; đã chuyển public và bật Pages (nhánh `main`, root).
- Bản người dùng upload lần đầu nằm trong thư mục con `New folder/`; đã chuyển ra gốc (commit `b139586`). Cảnh báo CRLF/LF của git trên Windows là bình thường.
- Thẻ nội dung có thể tràn 2–3px ở 810px cao (đã giảm khoảng cách, chưa kiểm lại); màn thấp hoặc hẹp thì thẻ tự cuộn bên trong, trang vẫn khóa cứng.

## 6. Việc có thể làm tiếp
- [ ] Người dùng tự thay icon trong `TYPES` (đã nói "sẽ sửa sau").
- [ ] Rà soát và hiệu chỉnh nội dung/ngày tháng từng sự kiện; bổ sung nguồn.
- [ ] Thay ảnh nền SVG bằng ảnh/tranh thật cho các mốc quan trọng.
- [ ] Bổ sung sự kiện còn thiếu nếu muốn: Triệu Quang Phục – Dạ Trạch, Văn Miếu 1070, Tết Mậu Thân 1968, chiến tranh biên giới 1979, khoán 10 1988…
- [ ] Tính năng gợi ý: tìm kiếm/lọc theo loại sự kiện (bấm chú thích để ẩn/hiện), chế độ in/PDF, đa ngôn ngữ.
- [ ] Kiểm tra kỹ trên thiết bị thật (điện thoại, màn hình thấp, trình duyệt khác); tối ưu hiệu năng lớp blur + canvas trên máy yếu.
- [ ] Commit `NOTES.md` này lên repo (hiện mới tạo cục bộ, chưa commit/push).

## 7. Quy trình cập nhật
1. Sửa `data.js` / `style.css` / `app.js`…
2. Chạy thử: `python -m http.server 5173` trong thư mục dự án rồi mở http://localhost:5173/.
3. `git add -A && git commit && git push origin main` → Pages tự cập nhật sau 1–2 phút.
