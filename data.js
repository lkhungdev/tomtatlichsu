/* ==========================================================
   DỮ LIỆU LỊCH SỬ VIỆT NAM
   Mỗi sự kiện:
   - y / ys / sfx / tl : năm (âm = TCN), chuỗi năm lớn, hậu tố, nhãn timeline
   - type   : loại sự kiện → quyết định ICON và LÀN trên timeline (xem TYPES)
   - era    : thời kỳ (màu)
   - scene, tone : ảnh nền SVG tự sinh (scenes.js); hoặc dùng img: "images/x.jpg"
   - lead   : 1 câu tóm tắt
   - shift  : [từ, sang] – chỉ có khi đổi nhà nước / triều đại
   - why    : vì sao có sự chuyển đổi đó
   - ctx / course / end / sig : Bối cảnh / Diễn biến / Kết thúc / Ý nghĩa
   ========================================================== */
window.VN_DATA = {
  /* icon vẽ tạm (viewBox 24x24, nét đường) – thay bằng icon của bạn ở đây */
  TYPES: {
    nation:   { label: 'Lập nước · Triều đại',   lane: 0, icon: '<path d="M3 21V6h2.5v2H8V6h2v4h4V6h2v2h2.5V6H21v15z"/><path d="M10 21v-4a2 2 0 0 1 4 0v4"/>' },
    usurp:    { label: 'Cướp ngôi · Chính biến', lane: 0, icon: '<path d="M3 7l4.5 5L12 5l4.5 7L21 7l-2 12H5z"/><path d="M5.5 16h13"/>' },
    scroll:   { label: 'Hiệp ước · Cải cách',    lane: 0, icon: '<path d="M6 4h12v14a2 2 0 0 0 2 2H8a2 2 0 0 1-2-2z"/><path d="M6 4a2 2 0 0 0-2 2v2h2M10 9h6M10 13h6"/>' },
    origin:   { label: 'Tiền sử',                lane: 0, icon: '<path d="M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-9z"/>' },
    star:     { label: 'Cột mốc cách mạng',      lane: 0, icon: '<path d="M12 3l2.7 5.9 6.3.7-4.7 4.3 1.3 6.3L12 17l-5.6 3.2 1.3-6.3L3 9.6l6.3-.7z"/>' },
    battle:   { label: 'Trận đánh',              lane: 1, icon: '<path d="M4 4l11 11M12.5 17.5l5-5M15 15l5 5M20 4L9 15M6.5 12.5l5 5M9 15l-5 5"/>' },
    uprising: { label: 'Khởi nghĩa · Kháng chiến', lane: 1, icon: '<path d="M6 21V4"/><path d="M6 5h12l-3 4 3 4H6"/>' }
  },

  ERAS: [
    { id: 'tiensu', short: 'Tiền sử',  name: 'Tiền sử & Dựng nước',          from: -300000, color: '#d4a64a', range: 'đến 179 TCN' },
    { id: 'bacthuoc', short: 'Bắc thuộc', name: 'Bắc thuộc & giành độc lập',   from: -179,    color: '#d4573f', range: '179 TCN – 938' },
    { id: 'tuchu', short: 'Đại Việt',   name: 'Tự chủ & Đại Việt hưng thịnh', from: 939,     color: '#3fb3a8', range: '939 – 1400' },
    { id: 'lemac', short: 'Hồ – Lê – Mạc – Tây Sơn',   name: 'Hồ – Lê – Mạc – Tây Sơn',      from: 1400,    color: '#a283e0', range: '1400 – 1802' },
    { id: 'nguyen', short: 'Nhà Nguyễn & Pháp thuộc',  name: 'Nhà Nguyễn & Pháp thuộc',      from: 1802,    color: '#5b95dc', range: '1802 – 1945' },
    { id: 'khangchien', short: 'Kháng chiến', name: 'Cách mạng & Kháng chiến',   from: 1945,    color: '#e5483c', range: '1945 – 1975' },
    { id: 'doimoi', short: 'Đổi Mới',  name: 'Thống nhất & Đổi Mới',         from: 1976,    color: '#f2b13d', range: '1976 – nay' }
  ],

  EVENTS: [
    /* ======================= TIỀN SỬ ======================= */
    {
      id: 'nui-do', y: -300000, ys: '300.000', sfx: 'năm trước', tl: '~300.000 năm', era: 'tiensu', type: 'origin', scene: 'cave', tone: 'night',
      place: 'Thanh Hóa, Lạng Sơn',
      title: 'Dấu chân đầu tiên trên đất Việt',
      lead: 'Những dấu tích đầu tiên của con người trên đất Việt, cách nay khoảng 300.000 năm.',
      ctx: 'Khí hậu nóng ẩm, rừng núi và hang động đá vôi trải rộng ở miền Bắc và Bắc Trung Bộ, nhiều thú săn và hoa quả – điều kiện thuận lợi cho người nguyên thủy kiếm sống.',
      course: 'Người tối cổ sống thành bầu đàn, săn bắt, hái lượm; chế tác công cụ đá ghè đẽo thô sơ ở Núi Đọ (Thanh Hóa), để lại răng hóa thạch trong hang Thẩm Khuyên, Thẩm Hai (Lạng Sơn).',
      end: 'Qua hàng trăm nghìn năm, người tối cổ tiến hóa thành người tinh khôn (Homo sapiens), kết thúc giai đoạn đồ đá cũ sơ kỳ.',
      sig: 'Chứng tỏ Việt Nam là một trong những cái nôi của loài người ở Đông Nam Á, với lịch sử cư trú vô cùng lâu đời.'
    },
    {
      id: 'son-vi', y: -30000, ys: '30.000', sfx: 'năm trước', tl: '~30.000 năm', era: 'tiensu', type: 'origin', scene: 'cave', tone: 'dusk',
      place: 'Phú Thọ, trung du Bắc Bộ',
      title: 'Văn hóa Sơn Vi – người tinh khôn',
      lead: 'Người tinh khôn xuất hiện và lan rộng khắp trung du và miền núi Bắc Bộ.',
      ctx: 'Cuối thời kỳ băng hà khí hậu biến động; trung du Bắc Bộ có nhiều thềm sông, mái đá, hang động để cư trú.',
      course: 'Cư dân Sơn Vi (Phú Thọ) dùng công cụ đá cuội ghè một mặt, sống ở mái đá, hang động và ngoài trời ven sông, chủ yếu săn bắt – hái lượm.',
      end: 'Khoảng 11.000 năm trước, văn hóa Sơn Vi chuyển sang các văn hóa đá mới tinh xảo hơn như Hòa Bình – Bắc Sơn.',
      sig: 'Người Việt cổ đã có mặt rộng khắp; đặt nền móng cho các nền văn hóa đá mới sau này.'
    },
    {
      id: 'hoa-binh', y: -10000, ys: '10.000', sfx: 'năm trước', tl: '~10.000 năm', era: 'tiensu', type: 'origin', scene: 'cave', tone: 'jade',
      place: 'Hòa Bình, Bắc Sơn',
      title: 'Văn hóa Hòa Bình – Bắc Sơn',
      lead: 'Bước chuyển từ hái lượm sang sản xuất lương thực: “cuộc cách mạng đá mới”.',
      ctx: 'Băng hà tan, khí hậu ấm lên, rừng nhiệt đới phát triển, nguồn thực phẩm phong phú, con người định cư lâu hơn trong các hang động.',
      course: 'Cư dân Hòa Bình – Bắc Sơn dùng công cụ đá cuội ghè, rìu mài lưỡi; làm gốm thô; trồng rau củ, cây ăn quả, có thể cả lúa; chôn người chết có nghi thức.',
      end: 'Khoảng 6.000 – 5.000 năm trước, nông nghiệp ổn định hơn, cư dân tiến xuống đồng bằng ven sông, ven biển và bước vào thời đại kim khí.',
      sig: 'Một trong những trung tâm nông nghiệp sơ khai của Đông Nam Á; cuộc sống con người thay đổi căn bản.'
    },
    {
      id: 'phung-nguyen', y: -2000, ys: '2000', sfx: 'TCN (khoảng)', tl: '~2000 TCN', era: 'tiensu', type: 'origin', scene: 'drum', tone: 'gold',
      place: 'Lâm Thao, Phú Thọ',
      title: 'Phùng Nguyên – bình minh của kim khí',
      lead: 'Khoảng 4.000 năm trước, cư dân sông Hồng trồng lúa nước và bắt đầu biết luyện đồng.',
      ctx: 'Cư dân tiến xuống trung du và đồng bằng sông Hồng – vùng đất phù sa màu mỡ, sông ngòi dày đặc, rất hợp trồng lúa nước.',
      course: 'Văn hóa Phùng Nguyên (Phú Thọ): trồng lúa nước, làm gốm hoa văn khắc vạch tinh xảo, đồ trang sức đá, những sản phẩm đồng đầu tiên.',
      end: 'Phát triển liên tục qua Đồng Đậu, Gò Mun rồi thành văn hóa Đông Sơn rực rỡ – cơ sở của nhà nước Văn Lang.',
      sig: 'Nền tảng của nền văn minh sông Hồng; mở đầu chuỗi văn hóa dẫn đến sự ra đời nhà nước đầu tiên.'
    },

    /* ======================= DỰNG NƯỚC ======================= */
    {
      id: 'van-lang', y: -700, ys: '~700', sfx: 'TCN', tl: '700 TCN', era: 'tiensu', type: 'nation', scene: 'drum', tone: 'dusk',
      place: 'Phong Châu, Phú Thọ',
      title: 'Nhà nước Văn Lang – các vua Hùng',
      lead: 'Nhà nước đầu tiên của người Việt, do các vua Hùng đứng đầu, kinh đô Phong Châu.',
      ctx: 'Nghề lúa nước và đúc đồng phát triển, của cải dư thừa, xã hội phân hóa; nhu cầu trị thủy và chống ngoại xâm thúc đẩy các bộ lạc Lạc Việt liên kết. Truyền thuyết ghi từ 2879 TCN; khảo cổ cho thấy nhà nước hình thành khoảng thế kỷ VII TCN.',
      course: 'Thủ lĩnh bộ Văn Lang thống nhất 15 bộ, xưng Hùng Vương, đóng đô Phong Châu. Bộ máy còn sơ khai: vua – lạc hầu, lạc tướng – bồ chính đứng đầu làng xã.',
      end: 'Cuối thời Hùng Vương, nước Văn Lang suy yếu và được hợp nhất với Âu Việt dưới quyền Thục Phán, thành nước Âu Lạc.',
      sig: 'Mở đầu lịch sử dựng nước; trống đồng Đông Sơn, truyền thuyết Con Rồng cháu Tiên và Giỗ Tổ Hùng Vương (10/3 âm lịch) là cội nguồn tinh thần dân tộc.'
    },
    {
      id: 'khang-tan', y: -214, ys: '214', sfx: 'TCN', tl: '214 TCN', era: 'tiensu', type: 'battle', scene: 'war', tone: 'jade',
      place: 'Lĩnh Nam',
      title: 'Kháng chiến chống quân Tần',
      lead: 'Người Việt đánh bại đạo quân của Tần Thủy Hoàng, giết chủ tướng Đồ Thư.',
      ctx: 'Tần Thủy Hoàng thống nhất Trung Hoa (221 TCN) rồi sai hàng chục vạn quân xuống chiếm đất Bách Việt ở Lĩnh Nam.',
      course: 'Người Âu Việt – Lạc Việt rút vào rừng núi, cử Thục Phán làm thủ lĩnh, đánh du kích ban đêm, liên tục tập kích; chủ tướng Đồ Thư bị giết.',
      end: 'Quân Tần tổn thất nặng, tiếp tế đứt đoạn; khi nhà Tần sụp đổ (207 TCN) người Việt giành lại quyền tự chủ.',
      sig: 'Thắng lợi trước đế chế mạnh nhất đương thời; nâng uy tín Thục Phán, mở đường cho sự ra đời của nước Âu Lạc.'
    },
    {
      id: 'au-lac', y: -208, ys: '208', sfx: 'TCN', tl: '208 TCN', era: 'tiensu', type: 'nation', scene: 'spiral', tone: 'night',
      place: 'Cổ Loa, Hà Nội',
      title: 'Âu Lạc – thành Cổ Loa',
      lead: 'Thục Phán hợp nhất Âu Việt và Lạc Việt, lập nước Âu Lạc, xây thành Cổ Loa.',
      shift: ['Văn Lang (Hùng Vương)', 'Âu Lạc (An Dương Vương)'],
      why: 'Văn Lang cuối thời Hùng Vương suy yếu, trong khi Thục Phán – thủ lĩnh Âu Việt – có uy tín lớn nhờ chống Tần; hai cộng đồng Âu Việt – Lạc Việt gần gũi nên hợp nhất để tự vệ. (Sử cũ chép sự kiện này vào năm 257 TCN.)',
      ctx: 'Sau kháng chiến chống Tần, Thục Phán nắm quyền lực thực tế; ở Văn Lang vua Hùng không còn đủ sức giữ thế cân bằng.',
      course: 'Thục Phán xưng An Dương Vương, đặt tên nước Âu Lạc, dời đô xuống Cổ Loa, xây thành ba vòng hình xoáy ốc và chế tạo nỏ Liên Châu bắn nhiều mũi tên một lúc.',
      end: 'Âu Lạc tồn tại khoảng 30 năm rồi bị Triệu Đà (Nam Việt) thôn tính năm 179 TCN.',
      sig: 'Củng cố và mở rộng nhà nước Việt cổ; thành Cổ Loa là kinh đô và công trình quân sự độc đáo.'
    },
    {
      id: 'trieu-da', y: -179, ys: '179', sfx: 'TCN', tl: '179 TCN', era: 'bacthuoc', type: 'nation', scene: 'war', tone: 'storm',
      place: 'Cổ Loa – Phiên Ngung',
      title: 'Triệu Đà chiếm Âu Lạc',
      lead: 'Âu Lạc mất vào tay Nam Việt của Triệu Đà – lần đầu đất Việt bị phương Bắc thôn tính.',
      shift: ['Âu Lạc (An Dương Vương)', 'Nam Việt (Triệu Đà)'],
      why: 'An Dương Vương chủ quan, mất cảnh giác trước mưu kế của Triệu Đà (truyền thuyết Mỵ Châu – Trọng Thủy: bí mật nỏ thần bị lộ); Nam Việt lại mạnh hơn về lực lượng.',
      ctx: 'Nhà Tần sụp đổ, Triệu Đà chiếm Quế Lâm, Tượng Quận, lập nước Nam Việt (kinh đô Phiên Ngung) rồi nhiều lần đem quân đánh Âu Lạc.',
      course: 'Các cuộc tấn công đầu bị nỏ thần, thành Cổ Loa chặn đứng; Triệu Đà xin hòa, cho con là Trọng Thủy sang làm rể để dò bí mật quân sự, rồi đem quân đánh úp, An Dương Vương thất bại.',
      end: 'Năm 179 TCN Âu Lạc bị sáp nhập vào Nam Việt, chia thành hai quận Giao Chỉ và Cửu Chân.',
      sig: 'Bài học đắt giá về cảnh giác trong dựng nước và giữ nước; mở đầu thời kỳ Bắc thuộc.'
    },
    {
      id: 'han-diet-nam-viet', y: -111, ys: '111', sfx: 'TCN', tl: '111 TCN', era: 'bacthuoc', type: 'nation', scene: 'war', tone: 'storm',
      place: 'Giao Chỉ, Cửu Chân, Nhật Nam',
      title: 'Nhà Hán đô hộ – 1000 năm Bắc thuộc',
      lead: 'Nhà Hán diệt Nam Việt, đặt ách đô hộ trực tiếp lên đất Việt.',
      shift: ['Nam Việt (nhà Triệu)', 'Nhà Hán đô hộ'],
      why: 'Hán Vũ Đế hùng mạnh muốn mở rộng xuống phương Nam; nội bộ nhà Triệu lục đục sau khi Triệu Đà mất nên không cự được.',
      ctx: 'Nhà Triệu suy yếu vì tranh chấp quyền lực; nhà Hán đã thống nhất, đủ sức mở rộng bờ cõi.',
      course: 'Năm 111 TCN Hán Vũ Đế sai Lộ Bác Đức đánh Nam Việt, chiếm Phiên Ngung; đất Âu Lạc cũ được chia thành các quận Giao Chỉ, Cửu Chân, Nhật Nam thuộc Giao Chỉ bộ.',
      end: 'Thời Bắc thuộc kéo dài hơn một nghìn năm, chỉ gián đoạn bởi những giai đoạn độc lập ngắn, đến chiến thắng Bạch Đằng năm 938.',
      sig: 'Chính sách đồng hóa và bóc lột khiến người Việt càng quyết giữ tiếng nói, phong tục; hàng loạt cuộc khởi nghĩa nổ ra.'
    },
    {
      id: 'hai-ba-trung', y: 40, ys: '40', sfx: '', tl: '40', era: 'bacthuoc', type: 'uprising', scene: 'war', tone: 'blood',
      place: 'Mê Linh, Hát Môn',
      title: 'Khởi nghĩa Hai Bà Trưng',
      lead: 'Cuộc khởi nghĩa lớn đầu tiên, do hai chị em phụ nữ lãnh đạo, giành độc lập ba năm.',
      ctx: 'Nhà Hán cai trị trực tiếp; thái thú Tô Định tham bạo, thuế nặng, đồng hóa; Thi Sách – chồng Trưng Trắc – bị giết hại.',
      course: 'Mùa xuân năm 40, Trưng Trắc và Trưng Nhị dựng cờ ở cửa sông Hát, nhanh chóng chiếm Mê Linh, Luy Lâu, giải phóng 65 thành; Trưng Trắc xưng vương, đóng đô Mê Linh.',
      end: 'Năm 42 – 43 nhà Hán sai Mã Viện đem quân sang; sau các trận Lãng Bạc, Cấm Khê, Hai Bà thất thủ rồi tuẫn tiết ở sông Hát (43).',
      sig: 'Mở đầu truyền thống đấu tranh bất khuất; khẳng định ý chí độc lập và vai trò to lớn của phụ nữ Việt.'
    },
    {
      id: 'ba-trieu', y: 248, ys: '248', sfx: '', tl: '248', era: 'bacthuoc', type: 'uprising', scene: 'war', tone: 'jade',
      place: 'Núi Nưa, Thanh Hóa',
      title: 'Khởi nghĩa Bà Triệu',
      lead: 'Triệu Thị Trinh cưỡi voi ra trận, làm quân Đông Ngô nhiều phen khiếp sợ.',
      ctx: 'Nhà Ngô cai trị Giao Châu hà khắc, thu thuế nặng, bắt cống nạp sản vật quý; dân chúng khốn khổ.',
      course: 'Triệu Thị Trinh cùng anh là Triệu Quốc Đạt dựng cờ ở núi Nưa (Thanh Hóa), nghĩa quân làm chủ Cửu Chân rồi tiến đánh Giao Chỉ.',
      end: 'Nhà Ngô sai Lục Dận sang đàn áp; sau vài tháng chiến đấu, Bà thất thủ và tự vẫn ở Bồ Điền khi tuổi còn rất trẻ.',
      sig: 'Biểu tượng tinh thần bất khuất của phụ nữ Việt; được tôn là Lệ Hải Bà Vương, thờ ở nhiều nơi.'
    },
    {
      id: 'ly-bi', y: 544, ys: '544', sfx: '', tl: '544', era: 'bacthuoc', type: 'nation', scene: 'citadel', tone: 'dawn',
      place: 'Long Biên (Hà Nội)',
      title: 'Lý Bí lập nước Vạn Xuân',
      lead: 'Lý Bí đánh đuổi quân Lương, xưng đế, đặt quốc hiệu Vạn Xuân – nước độc lập gần 60 năm.',
      shift: ['Đô hộ nhà Lương', 'Nhà nước Vạn Xuân (Lý Nam Đế)'],
      why: 'Quan lại nhà Lương (Tiêu Tư) tham bạo gây phẫn nộ, nhà Lương lại suy yếu vì nội loạn; hào trưởng bản địa Lý Bí tập hợp lực lượng nổi dậy.',
      ctx: 'Giữa thế kỷ VI, thứ sử Tiêu Tư của nhà Lương hà khắc; các hào trưởng bản địa ngày càng có thế lực.',
      course: 'Năm 542 Lý Bí dấy binh đuổi Tiêu Tư; năm 544 xưng Nam Việt Đế, đặt quốc hiệu Vạn Xuân, đóng đô Long Biên, lập triều đình văn – võ, dựng chùa Khai Quốc.',
      end: 'Quân Lương phản công; Lý Nam Đế lui, Triệu Quang Phục kháng chiến ở Dạ Trạch, rồi Lý Phật Tử kế nghiệp; năm 602 nhà Tùy chiếm Vạn Xuân.',
      sig: 'Lần đầu tiên người Việt xưng đế, lập quốc hiệu riêng, khẳng định ngang hàng phương Bắc; ước vọng xã tắc bền vững muôn đời.'
    },
    {
      id: 'mai-thuc-loan', y: 722, ys: '722', sfx: '', tl: '722', era: 'bacthuoc', type: 'uprising', scene: 'war', tone: 'dusk',
      place: 'Hoan Châu (Nghệ An)',
      title: 'Mai Thúc Loan – Mai Hắc Đế',
      lead: 'Khởi nghĩa của nông dân Hoan Châu, làm chủ nhiều châu quận.',
      ctx: 'Nhà Đường đặt An Nam đô hộ phủ, bóc lột nặng nề, bắt cống nạp, dân phu cực khổ.',
      course: 'Mai Thúc Loan dấy binh ở Hoan Châu, xưng Mai Hắc Đế, đóng ở Vạn An; hàng chục vạn người hưởng ứng, nghĩa quân hạ nhiều châu, tiến ra chiếm Tống Bình.',
      end: 'Nhà Đường cử đại quân sang đàn áp (năm 722 – 723); khởi nghĩa thất bại.',
      sig: 'Phong trào quần chúng rộng lớn ở miền Hoan Châu, nối tiếp truyền thống chống Bắc thuộc.'
    },
    {
      id: 'phung-hung', y: 791, ys: '791', sfx: '', tl: '791', era: 'bacthuoc', type: 'uprising', scene: 'war', tone: 'gold',
      place: 'Đường Lâm, Tống Bình',
      title: 'Phùng Hưng – Bố Cái Đại Vương',
      lead: 'Hào trưởng Đường Lâm chiếm phủ thành Tống Bình, làm chủ đất nước một thời gian.',
      ctx: 'Cuối thế kỷ VIII nhà Đường suy yếu; quan đô hộ Cao Chính Bình thu thuế nặng, lòng dân oán thán.',
      course: 'Phùng Hưng cùng em Phùng Hải khởi binh ở Đường Lâm (Sơn Tây), tiến vây phủ thành Tống Bình; Cao Chính Bình lo sợ mà chết, nghĩa quân làm chủ phủ thành.',
      end: 'Phùng Hưng mất ít lâu sau; con là Phùng An không giữ nổi, nhà Đường chiếm lại thành.',
      sig: 'Được nhân dân tôn xưng Bố Cái Đại Vương – “cha mẹ” của dân; thể hiện sức mạnh các hào trưởng bản địa.'
    },
    {
      id: 'khuc-thua-du', y: 905, ys: '905', sfx: '', tl: '905', era: 'bacthuoc', type: 'nation', scene: 'citadel', tone: 'jade',
      place: 'Tống Bình (Đại La)',
      title: 'Họ Khúc dựng nền tự chủ',
      lead: 'Khúc Thừa Dụ giành quyền tự chủ không đổ máu, mở đầu nền độc lập thực tế.',
      shift: ['Đô hộ nhà Đường', 'Họ Khúc tự chủ'],
      why: 'Nhà Đường suy tàn (loạn Hoàng Sào, cuối Đường), không còn kiểm soát nổi Giao Châu; hào trưởng bản địa có uy tín như Khúc Thừa Dụ nhân đó nắm quyền.',
      ctx: 'Cuối thế kỷ IX – đầu thế kỷ X nhà Đường sụp đổ, Trung Quốc rơi vào thời Ngũ đại thập quốc hỗn loạn.',
      course: 'Năm 905 Khúc Thừa Dụ, hào trưởng Hồng Châu, vào Tống Bình tự xưng Tiết độ sứ; con là Khúc Hạo cải cách hành chính, định lại thuế, lập sổ hộ khẩu.',
      end: 'Đến đời Khúc Thừa Mỹ, năm 930 Nam Hán chiếm lại; Dương Đình Nghệ khôi phục tự chủ (931), rồi Ngô Quyền kế tục.',
      sig: 'Giành quyền tự chủ không đổ máu; chuẩn bị tiền đề cho chiến thắng Bạch Đằng năm 938.'
    },
    {
      id: 'bach-dang-938', y: 938, ys: '938', sfx: '', tl: '938', era: 'bacthuoc', type: 'battle', scene: 'river', tone: 'night',
      place: 'Sông Bạch Đằng',
      title: 'Ngô Quyền và chiến thắng Bạch Đằng',
      lead: 'Trận thủy chiến lịch sử chấm dứt hơn nghìn năm Bắc thuộc.',
      ctx: 'Năm 937 Kiều Công Tiễn giết Dương Đình Nghệ, cầu viện Nam Hán; Ngô Quyền (con rể Đình Nghệ) từ Ái Châu ra đánh Công Tiễn để giữ nền tự chủ.',
      course: 'Ngô Quyền giết Công Tiễn, rồi cho đóng cọc nhọn ngầm ở cửa sông Bạch Đằng; lợi dụng thủy triều nhử thuyền Nam Hán do Lưu Hoằng Tháo chỉ huy vào bãi cọc rồi phản công.',
      end: 'Quân Nam Hán đại bại, Hoằng Tháo tử trận; vua Nam Hán đành rút quân về nước.',
      sig: 'Chấm dứt thời Bắc thuộc, mở kỷ nguyên độc lập; nghệ thuật dùng địa hình và thủy triều trở thành mẫu mực.'
    },

    /* ======================= TỰ CHỦ – ĐẠI VIỆT ======================= */
    {
      id: 'ngo', y: 939, ys: '939', sfx: '', tl: '939', era: 'tuchu', type: 'nation', scene: 'citadel', tone: 'dawn',
      place: 'Cổ Loa, Hà Nội',
      title: 'Ngô Quyền xưng vương',
      lead: 'Nhà nước độc lập của người Việt được dựng lại sau chiến thắng Bạch Đằng.',
      shift: ['Đô hộ phương Bắc', 'Nhà Ngô'],
      why: 'Chiến thắng Bạch Đằng loại bỏ ách đô hộ của Nam Hán; đất nước cần một chính quyền thống nhất của người Việt.',
      ctx: 'Sau năm 938 đất nước sạch bóng quân xâm lược, nhưng chưa có triều đình riêng.',
      course: 'Năm 939 Ngô Quyền xưng vương, đóng đô Cổ Loa, đặt bách quan, định triều nghi, lập chính quyền trung ương độc lập.',
      end: 'Ngô Quyền mất (944); Dương Tam Kha cướp ngôi, Ngô Xương Văn khôi phục nhưng yếu thế; sau 965 các hào trưởng cát cứ – loạn 12 sứ quân.',
      sig: 'Mở đầu thời kỳ độc lập tự chủ lâu dài; bài học: thiếu thống nhất sẽ dẫn đến loạn lạc.'
    },
    {
      id: 'dinh', y: 968, ys: '968', sfx: '', tl: '968', era: 'tuchu', type: 'nation', scene: 'citadel', tone: 'jade',
      place: 'Hoa Lư, Ninh Bình',
      title: 'Đinh Bộ Lĩnh – Đại Cồ Việt',
      lead: 'Dẹp loạn 12 sứ quân, thống nhất đất nước, lập nước Đại Cồ Việt.',
      shift: ['Loạn 12 sứ quân', 'Nhà Đinh – Đại Cồ Việt'],
      why: 'Các sứ quân cát cứ làm đất nước chia rẽ, dân khổ; cần một thế lực đủ mạnh để thống nhất, chống nội loạn và ngoại xâm.',
      ctx: 'Sau khi Ngô Quyền mất, Dương Tam Kha cướp ngôi (944); năm 965 Ngô Xương Văn chết, các hào trưởng nổi lên cát cứ khắp nơi.',
      course: 'Đinh Bộ Lĩnh cùng con Đinh Liễn đánh dẹp lần lượt các sứ quân (966 – 967); năm 968 lên ngôi hoàng đế (Đinh Tiên Hoàng), đặt quốc hiệu Đại Cồ Việt, đóng đô Hoa Lư, đúc tiền Thái Bình.',
      end: 'Năm 979 Đinh Tiên Hoàng và Đinh Liễn bị Đỗ Thích giết; Đinh Toàn mới 6 tuổi nối ngôi, triều đình rối ren dẫn đến việc Lê Hoàn thay thế.',
      sig: 'Thống nhất lại đất nước; khẳng định nhà nước độc lập ngang hàng Trung Hoa; đặt nền móng bộ máy nhà nước trung ương.'
    },
    {
      id: 'tien-le', y: 980, ys: '980', sfx: '', tl: '980', era: 'tuchu', type: 'usurp', scene: 'war', tone: 'dusk',
      place: 'Hoa Lư, Ninh Bình',
      title: 'Lê Hoàn lên ngôi – nhà Tiền Lê',
      lead: 'Triều thần suy tôn Lê Hoàn thay vua Đinh còn nhỏ để cứu nguy trước họa quân Tống.',
      shift: ['Nhà Đinh', 'Nhà Tiền Lê'],
      why: 'Vua Đinh mới 6 tuổi, triều đình chia rẽ sau vụ ám sát năm 979, quân Tống chuẩn bị xâm lược; Thái hậu Dương Vân Nga cùng tướng sĩ trao ngôi cho Lê Hoàn – người đủ tài chỉ huy để giữ nước.',
      ctx: 'Năm 979 Đinh Tiên Hoàng bị giết, Đinh Toàn còn nhỏ; nhà Tống coi là thời cơ thôn tính Đại Cồ Việt; trong triều có phe chống đối.',
      course: 'Năm 980, khi tin quân Tống sắp sang, các tướng và Thái hậu Dương Vân Nga đưa áo long cổn lên Lê Hoàn (Thập đạo tướng quân); Lê Hoàn lên ngôi (Lê Đại Hành), giữ quốc hiệu Đại Cồ Việt.',
      end: 'Nhà Tiền Lê tồn tại 29 năm (980 – 1009); sau khi Lê Long Đĩnh mất, triều đình chuyển sang nhà Lý.',
      sig: 'Chuyển giao quyền lực ít đổ máu, đặt lợi ích quốc gia lên trước; kịp thời tổ chức kháng chiến chống Tống.'
    },
    {
      id: 'khang-tong-981', y: 981, ys: '981', sfx: '', tl: '981', era: 'tuchu', type: 'battle', scene: 'river', tone: 'storm',
      place: 'Bạch Đằng, Chi Lăng',
      title: 'Lê Hoàn đại phá quân Tống',
      lead: 'Đại Cồ Việt đánh bại cuộc xâm lược đầu tiên của nhà Tống.',
      ctx: 'Nhà Tống thống nhất Trung Quốc, muốn thôn tính Đại Cồ Việt, năm 981 chia hai đường thủy – bộ tiến sang.',
      course: 'Lê Hoàn trực tiếp chỉ huy: thủy quân Tống bị chặn đánh ở Bạch Đằng, quân bộ bị đánh bại ở Chi Lăng (Lạng Sơn), tướng Hầu Nhân Bảo bị giết.',
      end: 'Quân Tống rút chạy về nước; Lê Hoàn sau đó giữ quan hệ ngoại giao mềm dẻo với nhà Tống.',
      sig: 'Bảo vệ nền độc lập còn non trẻ; củng cố uy tín của nhà Tiền Lê.'
    },
    {
      id: 'ly', y: 1010, ys: '1009', sfx: '', tl: '1009', era: 'tuchu', type: 'usurp', scene: 'pagoda', tone: 'gold',
      place: 'Hoa Lư → Thăng Long',
      title: 'Lý Công Uẩn lên ngôi, dời đô Thăng Long',
      lead: 'Nhà Lý thay nhà Tiền Lê, dời đô ra Đại La – Thăng Long, mở đầu triều đại hưng thịnh.',
      shift: ['Nhà Tiền Lê', 'Nhà Lý'],
      why: 'Vua Lê Long Đĩnh bạo ngược, ham chơi, mất lòng dân, mất sớm khi con còn nhỏ; triều thần – có sư Vạn Hạnh ủng hộ – suy tôn Lý Công Uẩn, viên quan có đức có tài, lên ngôi.',
      ctx: 'Lê Long Đĩnh (1005 – 1009) tàn bạo, triều chính suy sụp, dân oán thán. Lý Công Uẩn là Điện tiền chỉ huy sứ, được các nhà sư ở chùa Cổ Pháp nuôi dạy.',
      course: 'Khi Lê Long Đĩnh mất (1009), triều thần suy tôn Lý Công Uẩn (Lý Thái Tổ); mùa thu 1010 ban Chiếu dời đô từ Hoa Lư ra Đại La, đổi tên Thăng Long. Năm 1054 quốc hiệu thành Đại Việt.',
      end: 'Nhà Lý tồn tại 216 năm (1009 – 1225); cuối thời Lý vua yếu, triều đình suy, họ Trần thay thế.',
      sig: 'Chuyển đổi triều đại êm thấm; Thăng Long thành kinh đô nghìn năm; Phật giáo, Văn Miếu, khoa cử, luật pháp phát triển.'
    },
    {
      id: 'nhu-nguyet', y: 1077, ys: '1077', sfx: '', tl: '1077', era: 'tuchu', type: 'battle', scene: 'river', tone: 'dawn',
      place: 'Sông Như Nguyệt (Cầu)',
      title: 'Lý Thường Kiệt – “Nam quốc sơn hà”',
      lead: 'Chủ động tiến công trước để phòng ngự, rồi chặn đứng quân Tống trên sông Như Nguyệt.',
      ctx: 'Nhà Tống (Vương An Thạch) chuẩn bị xâm lược Đại Việt, dùng Ung Châu làm căn cứ tích trữ lương thảo, quân lính.',
      course: 'Năm 1075 Lý Thường Kiệt đem quân đánh Ung, Khâm, Liêm phá căn cứ; năm 1076 – 1077 quân Tống sang, bị chặn ở phòng tuyến sông Như Nguyệt, bài thơ “Nam quốc sơn hà” vang lên; quân Tống thất bại.',
      end: 'Lý Thường Kiệt chủ động đề nghị giảng hòa, quân Tống rút về nước.',
      sig: '“Nam quốc sơn hà” được xem là bản tuyên ngôn độc lập đầu tiên; chiến lược “tiên phát chế nhân” độc đáo.'
    },
    {
      id: 'tran', y: 1225, ys: '1225', sfx: '', tl: '1225', era: 'tuchu', type: 'usurp', scene: 'pagoda', tone: 'jade',
      place: 'Thăng Long',
      title: 'Nhà Trần thay nhà Lý',
      lead: 'Lý Chiêu Hoàng nhường ngôi cho chồng là Trần Cảnh, do Trần Thủ Độ sắp đặt.',
      shift: ['Nhà Lý', 'Nhà Trần'],
      why: 'Cuối thời Lý vua yếu đuối (Lý Huệ Tông bệnh), quan lại tranh quyền, nông dân nổi dậy; họ Trần – có thế lực kinh tế và quân sự – nắm thực quyền, Trần Thủ Độ sắp đặt cuộc nhường ngôi.',
      ctx: 'Đầu thế kỷ XIII triều Lý suy yếu, đói kém, loạn lạc khắp nơi; họ Trần ở vùng Hải Thanh (Nam Định) có thực lực mạnh.',
      course: 'Trần Thủ Độ thao túng triều đình; Lý Huệ Tông nhường ngôi cho con gái là Lý Chiêu Hoàng (1224); tháng 12/1225 Chiêu Hoàng nhường ngôi cho chồng là Trần Cảnh (Trần Thái Tông), Thủ Độ củng cố quyền lực.',
      end: 'Nhà Trần tồn tại 175 năm (1225 – 1400); đến cuối thế kỷ XIV suy yếu và bị họ Hồ thay thế.',
      sig: 'Chuyển giao ít đổ máu; nhà Trần củng cố đê điều, quân đội, sau đó ba lần đánh thắng quân Mông – Nguyên.'
    },
    {
      id: 'dong-bo-dau', y: 1258, ys: '1258', sfx: '', tl: '1258', era: 'tuchu', type: 'battle', scene: 'river', tone: 'storm',
      place: 'Đông Bộ Đầu, Thăng Long',
      title: 'Kháng chiến Mông Cổ lần thứ nhất',
      lead: 'Lần đầu Đại Việt đương đầu với đạo quân Mông Cổ bách chiến bách thắng.',
      ctx: 'Mông Cổ làm chủ Á – Âu; năm 1257 Ngột Lương Hợp Thai từ Vân Nam đem quân đánh Đại Việt.',
      course: 'Tháng 1/1258 quân Mông Cổ vào Thăng Long; nhà Trần rút lui chiến lược (“vườn không nhà trống”) rồi phản công ở Đông Bộ Đầu, đánh bại giặc.',
      end: 'Quân Mông Cổ thiếu lương, ốm đau, phải rút khỏi Thăng Long chỉ sau chín ngày.',
      sig: 'Lần đầu chặn đứng Mông Cổ; chiến lược “vườn không nhà trống” được dùng lại ở hai lần kháng chiến sau.'
    },
    {
      id: 'ham-tu-1285', y: 1285, ys: '1285', sfx: '', tl: '1285', era: 'tuchu', type: 'battle', scene: 'river', tone: 'dusk',
      place: 'Hàm Tử, Chương Dương',
      title: 'Kháng chiến chống Nguyên lần hai',
      lead: 'Hội nghị Diên Hồng quyết “Đánh”, Hàm Tử – Chương Dương giải phóng Thăng Long.',
      ctx: 'Nhà Nguyên (Hốt Tất Liệt) đòi mượn đường đánh Chiêm Thành; năm 1285 Thoát Hoan đem 50 vạn quân sang; Hội nghị Diên Hồng (1284) thống nhất quyết tâm kháng chiến.',
      course: 'Quân Nguyên chiếm Thăng Long, quân Trần rút lui chiến lược, tập kích tiêu hao; tháng 5 – 6/1285 thắng lớn ở Hàm Tử, Tây Kết, Chương Dương, giải phóng Thăng Long.',
      end: 'Thoát Hoan phải chạy về Trung Quốc; quân Nguyên thất bại lần hai.',
      sig: 'Tinh thần đoàn kết toàn dân; “Hịch tướng sĩ” và tài thao lược Trần Hưng Đạo.'
    },
    {
      id: 'bach-dang-1288', y: 1288, ys: '1288', sfx: '', tl: '1288', era: 'tuchu', type: 'battle', scene: 'river', tone: 'night',
      place: 'Sông Bạch Đằng',
      title: 'Bạch Đằng 1288 – Trần Hưng Đạo',
      lead: 'Trận Bạch Đằng lần hai, kết thúc ba lần thắng Mông – Nguyên.',
      ctx: 'Năm 1287 Nguyên phát động lần thứ ba để báo thù: Thoát Hoan đem quân bộ, Ô Mã Nhi chỉ huy thủy quân; đoàn thuyền lương bị Trần Khánh Dư đánh phá.',
      course: 'Tháng 4/1288 Trần Hưng Đạo cho cắm cọc ngầm ở Bạch Đằng, nhử thuyền giặc vào khi thủy triều lên rồi đánh tan lúc triều rút.',
      end: 'Ô Mã Nhi bị bắt, hàng trăm thuyền bị đánh đắm, Thoát Hoan tháo chạy; cuộc xâm lược thất bại hoàn toàn.',
      sig: 'Nhà Trần ba lần đánh thắng đế quốc Mông – Nguyên; tài thao lược Trần Hưng Đạo được ghi vào sử sách.'
    },

    /* ======================= HỒ – LÊ – MẠC – TÂY SƠN ======================= */
    {
      id: 'ho', y: 1400, ys: '1400', sfx: '', tl: '1400', era: 'lemac', type: 'usurp', scene: 'citadel', tone: 'storm',
      place: 'Tây Đô, Thanh Hóa',
      title: 'Hồ Quý Ly cướp ngôi nhà Trần',
      lead: 'Hồ Quý Ly phế vua Trần, lập nhà Hồ, quốc hiệu Đại Ngu, tiến hành nhiều cải cách táo bạo.',
      shift: ['Nhà Trần', 'Nhà Hồ'],
      why: 'Nhà Trần suy: vua yếu kém, quý tộc chiếm ruộng đất, nông dân nổi dậy, đói kém, Chiêm Thành tấn công; Hồ Quý Ly (ngoại thích) nắm quyền, cải cách rồi phế vua Trần để tự lên ngôi.',
      ctx: 'Giữa thế kỷ XIV chế độ Trần khủng hoảng: ruộng đất tập trung vào quý tộc, nông dân sa sút, khởi nghĩa nổ ra; năm 1371 Chiêm Thành đánh vào Thăng Long.',
      course: 'Hồ Quý Ly nắm binh quyền, thi hành cải cách (hạn điền, hạn nô, phát hành tiền giấy, xây thành Tây Đô); năm 1400 phế Trần Thiếu Đế lên ngôi, đặt quốc hiệu Đại Ngu.',
      end: 'Nhà Hồ chỉ tồn tại 7 năm; năm 1407 thua quân Minh, Hồ Quý Ly bị bắt.',
      sig: 'Cải cách mạnh dạn nhưng thiếu ủng hộ của quý tộc và dân; việc cướp ngôi trở thành cái cớ cho nhà Minh can thiệp.'
    },
    {
      id: 'minh-thuoc', y: 1407, ys: '1407', sfx: '', tl: '1407', era: 'lemac', type: 'nation', scene: 'war', tone: 'storm',
      place: 'Đông Quan (Thăng Long)',
      title: 'Nhà Minh xâm lược, đô hộ',
      lead: 'Nhà Hồ thất bại trước quân Minh; đất nước lại rơi vào ách đô hộ 20 năm.',
      shift: ['Nhà Hồ', 'Nhà Minh đô hộ'],
      why: 'Nhà Minh lấy cớ “phù Trần diệt Hồ” để xâm lược; nhà Hồ chưa được lòng dân, lực lượng kháng chiến thiếu đoàn kết nên thất bại nhanh chóng.',
      ctx: 'Năm 1406 nhà Minh sai Trương Phụ đem hàng chục vạn quân sang, lấy cớ giúp con cháu họ Trần.',
      course: 'Quân Hồ thua ở các trận Đa Bang, Hàm Tử quan; tháng 6/1407 Hồ Quý Ly và Hồ Hán Thương bị bắt ở Hà Tĩnh.',
      end: 'Nhà Minh sáp nhập nước ta thành quận Giao Chỉ, đô hộ 20 năm (1407 – 1427) với chính sách đồng hóa tàn bạo.',
      sig: 'Mất độc lập lần thứ tư; chính sách áp bức của nhà Minh làm bùng nổ phong trào kháng chiến, đỉnh cao là Lam Sơn.'
    },
    {
      id: 'lam-son', y: 1418, ys: '1418', sfx: '', tl: '1418', era: 'lemac', type: 'uprising', scene: 'war', tone: 'jade',
      place: 'Lam Sơn, Thanh Hóa',
      title: 'Khởi nghĩa Lam Sơn',
      lead: 'Lê Lợi và Nguyễn Trãi dựng cờ ở Lam Sơn, 10 năm kháng chiến đánh đuổi quân Minh.',
      ctx: 'Nhà Minh đốt sách, bắt thợ giỏi, thu thuế nặng, đồng hóa; các khởi nghĩa của Trần Ngỗi, Trần Quý Khoáng lần lượt thất bại.',
      course: 'Tháng 2/1418 Lê Lợi dựng cờ ở Lam Sơn; những năm đầu rất gian khổ, nhiều lần phải rút lên núi Chí Linh; năm 1424 tiến vào Nghệ An, năm 1426 mở rộng ra Bắc, thắng lớn ở Tốt Động – Chúc Động.',
      end: 'Sau các thắng lợi liên tiếp, nghĩa quân vây thành Đông Quan; trận quyết định diễn ra ở Chi Lăng – Xương Giang (1427).',
      sig: 'Kết hợp quân sự – chính trị – ngoại giao; chiến lược “tâm công”, “mưu phạt công tâm” của Nguyễn Trãi.'
    },
    {
      id: 'chi-lang-1427', y: 1427, ys: '1427', sfx: '', tl: '1427', era: 'lemac', type: 'battle', scene: 'war', tone: 'dusk',
      place: 'Chi Lăng, Xương Giang',
      title: 'Chi Lăng – Xương Giang',
      lead: 'Trận quyết định: nghĩa quân Lam Sơn tiêu diệt đạo viện binh 15 vạn của nhà Minh.',
      ctx: 'Tháng 10/1427 nhà Minh cử Liễu Thăng (10 vạn quân) và Mộc Thạnh (5 vạn quân) sang cứu Vương Thông đang bị vây ở Đông Quan.',
      course: 'Nghĩa quân phục kích ở ải Chi Lăng (Lạng Sơn), giết Liễu Thăng (10/10/1427); tiếp tục đánh tan viện binh ở Xương Giang; Mộc Thạnh hoảng sợ rút chạy.',
      end: 'Vương Thông xin hòa, rút khỏi Đông Quan (12/1427); cuộc kháng chiến 10 năm thắng lợi.',
      sig: 'Chấm dứt 20 năm đô hộ; tư tưởng nhân nghĩa: cấp thuyền, ngựa, lương thực cho giặc về nước, “mở đường hiếu sinh”.'
    },
    {
      id: 'hau-le', y: 1428, ys: '1428', sfx: '', tl: '1428', era: 'lemac', type: 'nation', scene: 'citadel', tone: 'gold',
      place: 'Đông Kinh (Thăng Long)',
      title: 'Nhà Hậu Lê – Bình Ngô đại cáo',
      lead: 'Lê Lợi lên ngôi, quốc hiệu Đại Việt, nguyên tắc “nhân nghĩa, yên dân”.',
      shift: ['Nhà Minh đô hộ', 'Nhà Hậu Lê (Lê sơ)'],
      why: 'Cuộc kháng chiến Lam Sơn thắng lợi, đánh đuổi nhà Minh; Lê Lợi – người lãnh đạo – được nhân dân suy tôn làm vua.',
      ctx: 'Cuối năm 1427 giặc đã rút, đất nước tan hoang sau 20 năm chiến tranh và đô hộ, cần dựng lại chính quyền.',
      course: 'Tháng 4/1428 Lê Lợi lên ngôi (Lê Thái Tổ), đặt quốc hiệu Đại Việt, đóng đô Đông Kinh; Nguyễn Trãi soạn Bình Ngô đại cáo; chia ruộng, khuyến khích sản xuất, củng cố quân đội.',
      end: 'Thời Lê sơ hưng thịnh đến cuối thế kỷ XV rồi suy yếu; năm 1527 Mạc Đăng Dung cướp ngôi.',
      sig: 'Khôi phục độc lập, mở thời Lê sơ; “Bình Ngô đại cáo” – áng thiên cổ hùng văn, bản tuyên ngôn độc lập thứ hai.'
    },
    {
      id: 'le-thanh-tong', y: 1460, ys: '1460', sfx: '', tl: '1460', era: 'lemac', type: 'scroll', scene: 'pagoda', tone: 'dusk',
      place: 'Đông Kinh (Thăng Long)',
      title: 'Lê Thánh Tông – cải cách Hồng Đức',
      lead: 'Cải cách toàn diện đưa Đại Việt tới đỉnh cao thịnh trị.',
      ctx: 'Sau Lê Thái Tổ, triều đình chịu nhiều biến cố (vụ án Lệ Chi Viên, Lê Nghi Dân cướp ngôi 1459 rồi bị lật đổ); năm 1460 Lê Thánh Tông lên ngôi khi mới 18 tuổi.',
      course: 'Chia nước thành 13 đạo thừa tuyên, hoàn chỉnh bộ máy hành chính; ban Bộ luật Hồng Đức; mở rộng khoa cử, dựng bia tiến sĩ; năm 1471 đánh Chăm Pa, mở rộng bờ cõi về phương Nam.',
      end: 'Sau khi Thánh Tông mất (1497) các vua Uy Mục, Tương Dực ăn chơi xa hoa, triều đình rối loạn (1505 – 1527).',
      sig: 'Nhà nước tập quyền hoàn chỉnh nhất thời phong kiến; Luật Hồng Đức có nhiều điểm tiến bộ về quyền phụ nữ.'
    },
    {
      id: 'mac', y: 1527, ys: '1527', sfx: '', tl: '1527', era: 'lemac', type: 'usurp', scene: 'citadel', tone: 'storm',
      place: 'Thăng Long',
      title: 'Mạc Đăng Dung cướp ngôi nhà Lê',
      lead: 'Nhà Mạc thay nhà Lê, mở đầu cuộc chiến Nam – Bắc triều gần 60 năm.',
      shift: ['Nhà Lê sơ', 'Nhà Mạc'],
      why: 'Đầu thế kỷ XVI vua Lê ham chơi, quan tranh quyền, nông dân nổi dậy khắp nơi; Mạc Đăng Dung – tướng giỏi nắm binh quyền – phế vua Lê Cung Hoàng và tự lên ngôi.',
      ctx: 'Triều Lê sơ suy tàn: vua Uy Mục, Tương Dực tàn bạo, phe phái tranh giành, khởi nghĩa nông dân khắp nơi (Trần Cảo, Phùng Chương…).',
      course: 'Mạc Đăng Dung đánh dẹp loạn, nắm toàn bộ binh quyền, được phong tước cao; năm 1527 ép vua Lê Cung Hoàng nhường ngôi, lập nhà Mạc.',
      end: 'Năm 1533 Nguyễn Kim lập Lê Trang Tông ở Thanh Hóa, Nam triều (Lê) đánh Bắc triều (Mạc) hơn 50 năm; 1592 Trịnh Tùng chiếm Thăng Long, nhà Mạc lui lên Cao Bằng.',
      sig: 'Kinh tế hàng hóa và đô thị phát triển dưới thời Mạc, nhưng chiến tranh liên miên làm đất nước chia rẽ, mở đầu thời kỳ phân tranh.'
    },
    {
      id: 'trinh-nguyen', y: 1627, ys: '1627', sfx: '', tl: '1627', era: 'lemac', type: 'nation', scene: 'river', tone: 'dusk',
      place: 'Sông Gianh (Quảng Bình)',
      title: 'Trịnh – Nguyễn phân tranh',
      lead: 'Đất nước bị chia đôi: Đàng Ngoài (chúa Trịnh) – Đàng Trong (chúa Nguyễn).',
      shift: ['Lê Trung Hưng thống nhất', 'Chia cắt Đàng Ngoài – Đàng Trong'],
      why: 'Quyền lực thực tế nằm trong tay chúa Trịnh (Đàng Ngoài); chúa Nguyễn ở Đàng Trong không chịu phục tùng, mâu thuẫn lợi ích dẫn đến chiến tranh kéo dài.',
      ctx: 'Năm 1592 Lê – Trịnh về Thăng Long, vua Lê chỉ còn hư vị; Nguyễn Hoàng vào trấn Thuận Hóa (1558) và xây dựng thế lực riêng ở phương Nam.',
      course: 'Năm 1627 chiến tranh bùng nổ; trong 45 năm (1627 – 1672) hai bên đánh nhau bảy lần; cuối cùng lấy sông Gianh làm giới tuyến. Chúa Nguyễn đẩy mạnh Nam tiến, lập phủ Gia Định (1698).',
      end: 'Chiến tranh chấm dứt năm 1672; hai bên tồn tại song song đến cuối thế kỷ XVIII, khi phong trào Tây Sơn nổ ra.',
      sig: 'Đất nước chia cắt gần 200 năm, nhưng Đàng Trong khai phá phương Nam, mở rộng lãnh thổ đến Cà Mau; thương cảng Hội An, Phố Hiến sầm uất.'
    },
    {
      id: 'tay-son', y: 1771, ys: '1771', sfx: '', tl: '1771', era: 'lemac', type: 'uprising', scene: 'war', tone: 'blood',
      place: 'Tây Sơn, Bình Định',
      title: 'Khởi nghĩa Tây Sơn',
      lead: 'Ba anh em Nguyễn Nhạc, Nguyễn Huệ, Nguyễn Lữ dấy binh, lật đổ cả chúa Nguyễn lẫn chúa Trịnh.',
      ctx: 'Thế kỷ XVIII chính quyền Trịnh – Nguyễn mục nát: tô thuế nặng, ruộng đất tập trung, nhân dân khốn khổ; ở Đàng Trong quyền thần Trương Phúc Loan lộng hành.',
      course: 'Năm 1771 ba anh em dựng cờ ở Tây Sơn (Bình Định) với khẩu hiệu “lấy của nhà giàu chia cho người nghèo”; 1777 lật đổ chúa Nguyễn; 1786 ra Bắc diệt chúa Trịnh.',
      end: 'Tây Sơn cơ bản thống nhất đất nước; sau đó phải đương đầu với quân Xiêm và quân Thanh.',
      sig: 'Phong trào nông dân lớn nhất lịch sử phong kiến Việt Nam; xóa bỏ cát cứ Trịnh – Nguyễn.'
    },
    {
      id: 'rach-gam', y: 1785, ys: '1785', sfx: '', tl: '1785', era: 'lemac', type: 'battle', scene: 'river', tone: 'jade',
      place: 'Rạch Gầm – Xoài Mút',
      title: 'Rạch Gầm – Xoài Mút',
      lead: 'Nguyễn Huệ phục kích tiêu diệt 5 vạn quân Xiêm trên sông Tiền.',
      ctx: 'Nguyễn Ánh thua Tây Sơn, chạy sang Xiêm cầu viện; năm 1784 Xiêm đem 5 vạn quân vào Gia Định.',
      course: 'Đầu năm 1785 Nguyễn Huệ bố trí trận địa ở khúc sông Rạch Gầm – Xoài Mút (Tiền Giang), nhử thuyền Xiêm vào rồi tiêu diệt.',
      end: 'Hầu hết quân Xiêm bị diệt, tàn quân chạy về nước; Nguyễn Ánh phải sang Xiêm lánh nạn.',
      sig: 'Bảo vệ độc lập trước ngoại xâm; chứng tỏ tài thao lược của Nguyễn Huệ.'
    },
    {
      id: 'quang-trung', y: 1788, ys: '1788', sfx: '', tl: '1788', era: 'lemac', type: 'nation', scene: 'war', tone: 'gold',
      place: 'Núi Bân, Phú Xuân',
      title: 'Nguyễn Huệ lên ngôi Quang Trung',
      lead: 'Triều Tây Sơn thay nhà Lê, đối mặt cuộc xâm lược của quân Thanh.',
      shift: ['Nhà Hậu Lê', 'Triều Tây Sơn (Quang Trung)'],
      why: 'Vua Lê Chiêu Thống cầu viện nhà Thanh để chống Tây Sơn – “rước voi giày mả tổ” – mất lòng dân; Nguyễn Huệ lên ngôi hoàng đế để lãnh đạo toàn dân chống xâm lược.',
      ctx: 'Sau khi Nguyễn Huệ diệt Trịnh (1786), Lê Chiêu Thống chống đối, chạy sang Trung Quốc cầu cứu; Tôn Sĩ Nghị đem quân Thanh sang.',
      course: 'Tháng 11/1788 Nguyễn Huệ lên ngôi hoàng đế ở núi Bân (Huế), lấy niên hiệu Quang Trung, tế cáo trời đất rồi xuất quân ra Bắc.',
      end: 'Tây Sơn đại phá quân Thanh (1789); năm 1792 Quang Trung mất đột ngột, con còn nhỏ (Quang Toản), triều đình suy yếu, đến 1802 bị Nguyễn Ánh lật đổ.',
      sig: 'Giữ vững độc lập, thống nhất đất nước; đề cao chữ Nôm, khuyến khích sản xuất và giáo dục.'
    },
    {
      id: 'dong-da', y: 1789, ys: '1789', sfx: '', tl: '1789', era: 'lemac', type: 'battle', scene: 'war', tone: 'gold',
      place: 'Ngọc Hồi – Đống Đa',
      title: 'Ngọc Hồi – Đống Đa',
      lead: 'Quang Trung thần tốc đại phá 29 vạn quân Thanh trong dịp Tết Kỷ Dậu.',
      ctx: 'Tôn Sĩ Nghị chiếm Thăng Long (12/1788), phục Lê Chiêu Thống, cho quân ăn chơi, chủ quan.',
      course: 'Quang Trung hành quân thần tốc từ Phú Xuân ra Bắc, tới Tam Điệp ăn Tết trước; đêm 30 Tết tiến quân, thắng Hà Hồi, Ngọc Hồi; sáng mồng 5 Tết đánh Đống Đa, giải phóng Thăng Long.',
      end: 'Quân Thanh đại bại, Tôn Sĩ Nghị bỏ chạy; Lê Chiêu Thống chạy theo, triều Hậu Lê chấm dứt.',
      sig: 'Một trong những chiến thắng oanh liệt nhất lịch sử; khẳng định độc lập dân tộc trước đế chế phương Bắc.'
    },

    /* ======================= NHÀ NGUYỄN & PHÁP THUỘC ======================= */
    {
      id: 'nguyen', y: 1802, ys: '1802', sfx: '', tl: '1802', era: 'nguyen', type: 'nation', scene: 'citadel', tone: 'dusk',
      place: 'Phú Xuân – Huế',
      title: 'Nhà Nguyễn thay Tây Sơn',
      lead: 'Nguyễn Ánh lên ngôi Gia Long, thống nhất lãnh thổ từ Bắc đến Nam.',
      shift: ['Triều Tây Sơn', 'Nhà Nguyễn'],
      why: 'Sau khi Quang Trung mất (1792), triều Tây Sơn suy yếu vì nội bộ chia rẽ và vua nhỏ tuổi; Nguyễn Ánh – được Pháp, Xiêm giúp đỡ và có căn cứ Gia Định vững chắc – phản công thành công.',
      ctx: 'Nguyễn Ánh thua chạy nhiều lần, nhờ Bá Đa Lộc cầu viện Pháp, củng cố căn cứ Gia Định, xây dựng lực lượng quân sự mạnh.',
      course: 'Năm 1801 chiếm Phú Xuân, năm 1802 chiếm Thăng Long, diệt Tây Sơn; lên ngôi Gia Long, đóng đô Huế; 1804 đặt quốc hiệu Việt Nam; 1838 Minh Mạng đổi Đại Nam.',
      end: 'Triều Nguyễn bảo thủ, đóng cửa; năm 1884 ký hiệp ước bảo hộ với Pháp; năm 1945 vua Bảo Đại thoái vị.',
      sig: 'Thống nhất lãnh thổ rộng nhất từ trước; để lại di sản như Kinh thành Huế, Mộc bản triều Nguyễn.'
    },
    {
      id: 'phap-xam-luoc', y: 1858, ys: '1858', sfx: '', tl: '1858', era: 'nguyen', type: 'battle', scene: 'sea', tone: 'storm',
      place: 'Đà Nẵng, Gia Định',
      title: 'Pháp nổ súng xâm lược',
      lead: 'Ngày 1/9/1858 liên quân Pháp – Tây Ban Nha tấn công Đà Nẵng, mở đầu cuộc xâm lược Việt Nam.',
      ctx: 'Giữa thế kỷ XIX tư bản Pháp cần thị trường, thuộc địa; triều Nguyễn bảo thủ, cấm đạo, đóng cửa; Pháp lấy cớ bảo vệ giáo sĩ để xâm lược.',
      course: 'Pháp nổ súng ở Đà Nẵng (1/9/1858) nhưng bị chặn ở bán đảo Sơn Trà; chuyển vào đánh Gia Định (2/1859); năm 1862 Hiệp ước Nhâm Tuất cắt 3 tỉnh miền Đông Nam Kỳ.',
      end: 'Năm 1867 Pháp chiếm nốt ba tỉnh miền Tây; Nam Kỳ trở thành thuộc địa của Pháp.',
      sig: 'Mở đầu thời kỳ thực dân Pháp thuộc; nhân dân anh dũng kháng chiến (Trương Định, Nguyễn Trung Trực…) dù triều đình dần nhượng bộ.'
    },
    {
      id: 'hiep-uoc-1884', y: 1884, ys: '1884', sfx: '', tl: '1884', era: 'nguyen', type: 'scroll', scene: 'sea', tone: 'night',
      place: 'Huế',
      title: 'Hiệp ước Giáp Thân (Patenôtre)',
      lead: 'Triều Nguyễn công nhận quyền bảo hộ của Pháp – Việt Nam mất độc lập.',
      shift: ['Nhà Nguyễn độc lập (danh nghĩa)', 'Bảo hộ của Pháp'],
      why: 'Sau khi Pháp chiếm Bắc Kỳ (1873, 1882) và đánh vào Huế (1883), triều đình yếu kém, thua trận liên tiếp, đành ký hiệp ước.',
      ctx: 'Hiệp ước Hácmăng (1883) đã buộc triều Nguyễn chịu bảo hộ; nhà Thanh cũng thua Pháp trong chiến tranh Pháp – Thanh.',
      course: 'Ngày 6/6/1884 ký Hiệp ước Patenôtre: triều Nguyễn thừa nhận quyền bảo hộ của Pháp ở Bắc Kỳ và Trung Kỳ; Nam Kỳ đã là thuộc địa.',
      end: 'Việt Nam hoàn toàn mất độc lập; năm 1887 Pháp lập Liên bang Đông Dương.',
      sig: 'Chấm dứt vai trò quốc gia độc lập của nhà Nguyễn; chuyển sang thời kỳ chống Pháp.'
    },
    {
      id: 'can-vuong', y: 1885, ys: '1885', sfx: '', tl: '1885', era: 'nguyen', type: 'uprising', scene: 'war', tone: 'blood',
      place: 'Huế, Hương Khê, Ba Đình',
      title: 'Phong trào Cần Vương',
      lead: 'Vua Hàm Nghi hạ chiếu Cần Vương, văn thân, sĩ phu và nông dân cả nước nổi dậy.',
      ctx: 'Phe chủ chiến (Tôn Thất Thuyết) phản công Pháp ở Huế đêm 4 – 5/7/1885 thất bại; vua Hàm Nghi xuất bôn ra Tân Sở (Quảng Trị).',
      course: 'Ngày 13/7/1885 Hàm Nghi ban chiếu Cần Vương; các cuộc khởi nghĩa Ba Đình, Bãi Sậy, Hương Khê (Phan Đình Phùng)… nổ ra khắp Bắc, Trung Kỳ.',
      end: 'Hàm Nghi bị bắt (1888), Phan Đình Phùng mất (1895); phong trào tan rã.',
      sig: 'Thể hiện lòng yêu nước của sĩ phu và nhân dân; thất bại cho thấy hạn chế của hệ tư tưởng phong kiến.'
    },
    {
      id: 'tim-duong-cuu-nuoc', y: 1911, ys: '1911', sfx: '', tl: '1911', era: 'nguyen', type: 'star', scene: 'harbor', tone: 'dawn',
      place: 'Bến Nhà Rồng, Sài Gòn',
      title: 'Ra đi tìm đường cứu nước',
      lead: 'Nguyễn Tất Thành rời bến Nhà Rồng, bắt đầu hành trình tìm con đường giải phóng dân tộc.',
      ctx: 'Đầu thế kỷ XX các phong trào yêu nước (Đông Du, Duy Tân, Đông Kinh Nghĩa Thục…) lần lượt thất bại; cách mạng Việt Nam khủng hoảng đường lối.',
      course: 'Ngày 5/6/1911 Nguyễn Tất Thành xuống tàu Amiral Latouche-Tréville ra đi, qua nhiều nước; năm 1919 gửi Bản yêu sách; năm 1920 đọc Luận cương của Lênin, tìm thấy con đường cứu nước.',
      end: 'Năm 1925 lập Hội Việt Nam Cách mạng Thanh niên ở Quảng Châu, chuẩn bị về tổ chức, tư tưởng cho việc thành lập Đảng.',
      sig: 'Tìm ra con đường cứu nước mới – cách mạng vô sản – mở ra bước ngoặt cho cách mạng Việt Nam.'
    },
    {
      id: 'thanh-lap-dang', y: 1930, ys: '1930', sfx: '', tl: '1930', era: 'nguyen', type: 'star', scene: 'flag', tone: 'red',
      place: 'Hương Cảng (Hồng Kông)',
      title: 'Đảng Cộng sản Việt Nam ra đời',
      lead: 'Hợp nhất ba tổ chức cộng sản, chấm dứt khủng hoảng về đường lối và lãnh đạo.',
      shift: ['Ba tổ chức cộng sản riêng rẽ', 'Đảng Cộng sản Việt Nam'],
      why: 'Ba tổ chức cộng sản hoạt động riêng rẽ, tranh chấp, làm phân tán lực lượng; phong trào cách mạng cần một đảng thống nhất lãnh đạo.',
      ctx: 'Năm 1929 ba tổ chức ra đời: Đông Dương Cộng sản Đảng, An Nam Cộng sản Đảng, Đông Dương Cộng sản liên đoàn; khủng hoảng kinh tế 1929 – 1933 làm phong trào đấu tranh dâng cao.',
      course: 'Từ 6/1 đến 7/2/1930 hội nghị hợp nhất tại Hương Cảng do Nguyễn Ái Quốc chủ trì, thông qua Chính cương vắn tắt, Sách lược vắn tắt; ngày 3/2/1930 Đảng ra đời.',
      end: 'Tháng 10/1930 đổi tên Đảng Cộng sản Đông Dương; 1930 – 1931 cao trào Xô viết Nghệ – Tĩnh.',
      sig: 'Cách mạng Việt Nam có đường lối đúng đắn và một đảng lãnh đạo thống nhất; bước ngoặt lịch sử dẫn đến thắng lợi 1945.'
    },

    /* ======================= CÁCH MẠNG & KHÁNG CHIẾN ======================= */
    {
      id: 'cach-mang-thang-8', y: 1945, ys: '1945', sfx: '', tl: '1945', era: 'khangchien', type: 'star', scene: 'flag', tone: 'red',
      place: 'Hà Nội, Huế, Sài Gòn',
      title: 'Cách mạng Tháng Tám & Quốc khánh 2/9',
      lead: 'Tổng khởi nghĩa giành chính quyền; chế độ quân chủ chấm dứt, nước Việt Nam Dân chủ Cộng hòa ra đời.',
      shift: ['Nhà Nguyễn – Pháp, Nhật', 'Việt Nam Dân chủ Cộng hòa'],
      why: 'Nhật đầu hàng Đồng minh (15/8/1945), Pháp – Nhật suy yếu tạo thời cơ; Mặt trận Việt Minh đã chuẩn bị lực lượng chu đáo nên nhanh chóng giành chính quyền.',
      ctx: 'Chiến tranh thế giới thứ hai; Nhật đảo chính Pháp (3/1945); nạn đói năm 1945 làm hơn 2 triệu người chết; Việt Minh (1941) xây dựng căn cứ và lực lượng.',
      course: 'Tháng 8/1945 tổng khởi nghĩa: 19/8 Hà Nội, 23/8 Huế, 25/8 Sài Gòn; 30/8 vua Bảo Đại thoái vị; 2/9 Hồ Chí Minh đọc Tuyên ngôn Độc lập ở Quảng trường Ba Đình.',
      end: 'Chế độ quân chủ chấm dứt, ra đời nước Việt Nam Dân chủ Cộng hòa; chính quyền non trẻ đối mặt “giặc đói, giặc dốt, giặc ngoại xâm”.',
      sig: 'Lật đổ ách thực dân và phong kiến; nhà nước dân chủ nhân dân đầu tiên ở Đông Nam Á.'
    },
    {
      id: 'toan-quoc-1946', y: 1946, ys: '1946', sfx: '', tl: '1946', era: 'khangchien', type: 'uprising', scene: 'war', tone: 'blood',
      place: 'Hà Nội, Việt Bắc',
      title: 'Toàn quốc kháng chiến',
      lead: 'Tối 19/12/1946 Hà Nội nổ súng, Chủ tịch Hồ Chí Minh ra Lời kêu gọi toàn quốc kháng chiến.',
      ctx: 'Pháp quay lại xâm lược Nam Bộ (9/1945); hai bên ký Hiệp định Sơ bộ (6/3/1946), Tạm ước (14/9/1946) nhưng Pháp gây hấn Hải Phòng, Lạng Sơn rồi Hà Nội (11 – 12/1946).',
      course: 'Tối 19/12/1946 quân dân Hà Nội nổ súng, chiến đấu 60 ngày đêm trong thành phố; cơ quan đầu não rút lên Việt Bắc, mở đầu cuộc kháng chiến toàn quốc.',
      end: 'Thu – Đông 1947 đánh bại cuộc tiến công lên Việt Bắc; 1950 chiến thắng Biên giới, chuyển sang phản công.',
      sig: '“Thà hy sinh tất cả chứ nhất định không chịu mất nước”; mở đầu cuộc kháng chiến chống Pháp chín năm.'
    },
    {
      id: 'dien-bien-phu', y: 1954, ys: '1954', sfx: '', tl: '1954', era: 'khangchien', type: 'battle', scene: 'victory', tone: 'jade',
      place: 'Điện Biên Phủ',
      title: 'Chiến thắng Điện Biên Phủ',
      lead: '56 ngày đêm đập tan tập đoàn cứ điểm mạnh nhất của Pháp ở Đông Dương.',
      ctx: 'Pháp – Mỹ thực hiện kế hoạch Navarre (1953) nhằm kết thúc chiến tranh trong 18 tháng, xây tập đoàn cứ điểm Điện Biên Phủ làm “pháo đài bất khả xâm phạm”.',
      course: '13/3 – 7/5/1954 ba đợt tiến công; Đại tướng Võ Nguyên Giáp đổi phương châm từ “đánh nhanh, thắng nhanh” sang “đánh chắc, tiến chắc”; ngày 7/5 bắt tướng De Castries.',
      end: 'Pháp thất bại; 21/7/1954 Hiệp định Giơnevơ chấm dứt chiến tranh, miền Bắc hoàn toàn giải phóng, đất nước tạm chia ở vĩ tuyến 17.',
      sig: 'Chấm dứt ách thực dân Pháp; “lừng lẫy năm châu, chấn động địa cầu”, cổ vũ phong trào giải phóng dân tộc trên thế giới.'
    },
    {
      id: 'paris-1973', y: 1973, ys: '1973', sfx: '', tl: '1973', era: 'khangchien', type: 'scroll', scene: 'victory', tone: 'dawn',
      place: 'Paris',
      title: 'Hiệp định Paris',
      lead: 'Mỹ cam kết rút hết quân, tôn trọng độc lập, chủ quyền, thống nhất của Việt Nam.',
      shift: ['Chiến tranh chống Mỹ', 'Giai đoạn chuẩn bị giải phóng miền Nam'],
      why: 'Mỹ thất bại sau cuộc Tổng tiến công Mậu Thân 1968 và trận “Hà Nội – Điện Biên Phủ trên không” cuối năm 1972, buộc phải đàm phán.',
      ctx: 'Chiến tranh cục bộ của Mỹ (từ 1965) thất bại; sau Mậu Thân 1968, Mỹ phải “Mỹ hóa” rồi “Việt Nam hóa” chiến tranh; 12 ngày đêm cuối 1972 máy bay B-52 bị đánh bại.',
      course: 'Ngày 27/1/1973 Hiệp định Paris được ký; Mỹ cam kết rút hết quân, chấm dứt dính líu quân sự ở Việt Nam.',
      end: 'Tháng 3/1973 Mỹ rút hết quân; chính quyền Sài Gòn vi phạm hiệp định, ta chuẩn bị tổng tiến công.',
      sig: 'Tạo thời cơ thuận lợi để giải phóng hoàn toàn miền Nam.'
    },
    {
      id: 'ho-chi-minh-1975', y: 1975, ys: '1975', sfx: '', tl: '1975', era: 'khangchien', type: 'battle', scene: 'victory', tone: 'dawn',
      place: 'Sài Gòn',
      title: 'Chiến dịch Hồ Chí Minh – 30/4/1975',
      lead: 'Xe tăng húc cổng Dinh Độc Lập, miền Nam hoàn toàn giải phóng.',
      ctx: 'Sau Hiệp định Paris, quân Sài Gòn lấn chiếm, Mỹ viện trợ ngày càng ít; năm 1975 ta mở cuộc tổng tiến công chiến lược.',
      course: 'Chiến dịch Tây Nguyên (3/1975) → giải phóng Huế, Đà Nẵng → Chiến dịch Hồ Chí Minh (26 – 30/4) với 5 cánh quân tiến vào Sài Gòn; 11h30 ngày 30/4 cờ cắm trên Dinh Độc Lập.',
      end: 'Tổng thống Dương Văn Minh tuyên bố đầu hàng không điều kiện; miền Nam hoàn toàn giải phóng.',
      sig: 'Kết thúc 21 năm chiến tranh chống Mỹ, 30 năm chiến tranh giải phóng dân tộc; non sông thu về một mối.'
    },

    /* ======================= THỐNG NHẤT & ĐỔI MỚI ======================= */
    {
      id: 'thong-nhat-1976', y: 1976, ys: '1976', sfx: '', tl: '1976', era: 'doimoi', type: 'nation', scene: 'victory', tone: 'gold',
      place: 'Hà Nội',
      title: 'Thống nhất đất nước về mặt nhà nước',
      lead: 'Quốc hội chung cả nước quyết định quốc hiệu Cộng hòa Xã hội Chủ nghĩa Việt Nam.',
      shift: ['Hai nhà nước ở hai miền', 'Nước Cộng hòa Xã hội Chủ nghĩa Việt Nam'],
      why: 'Sau 30/4/1975 đất nước đã thống nhất về lãnh thổ nhưng còn hai chính quyền; cần thống nhất về nhà nước để quản lý và xây dựng chung.',
      ctx: 'Sau giải phóng miền Nam, hai miền còn hai chính quyền khác nhau; nhân dân mong muốn sớm thống nhất.',
      course: 'Hội nghị hiệp thương chính trị (11/1975); Tổng tuyển cử cả nước 25/4/1976; Quốc hội khóa VI họp (24/6 – 3/7/1976) quyết định tên nước, quốc kỳ, quốc ca, Thủ đô Hà Nội; Sài Gòn đổi tên TP. Hồ Chí Minh.',
      end: 'Cả nước cùng xây dựng chủ nghĩa xã hội; nhưng gặp nhiều khó khăn: hậu quả chiến tranh, cấm vận, chiến tranh biên giới 1978 – 1979, khủng hoảng kinh tế – xã hội.',
      sig: 'Hoàn thành thống nhất đất nước về mặt nhà nước, tạo điều kiện chung cho phát triển.'
    },
    {
      id: 'doi-moi', y: 1986, ys: '1986', sfx: '', tl: '1986', era: 'doimoi', type: 'star', scene: 'city', tone: 'dawn',
      place: 'Hà Nội – Đại hội VI',
      title: 'Đổi Mới – Đại hội VI của Đảng',
      lead: 'Đảng Cộng sản Việt Nam khởi xướng công cuộc Đổi Mới toàn diện.',
      shift: ['Kế hoạch hóa tập trung, bao cấp', 'Kinh tế thị trường định hướng xã hội chủ nghĩa'],
      why: 'Khủng hoảng kinh tế – xã hội trầm trọng cuối thập niên 1970 – đầu 1980: lạm phát ba con số, thiếu lương thực, bị bao vây cấm vận; cần đổi mới tư duy để tìm lối thoát.',
      ctx: 'Kinh tế kiệt quệ, lạm phát hơn 700% năm 1986; một số địa phương “phá rào” thử nghiệm khoán sản phẩm trong nông nghiệp và cho thấy hiệu quả.',
      course: 'Đại hội VI (15 – 18/12/1986) bầu Nguyễn Văn Linh làm Tổng Bí thư, khởi xướng Đổi Mới: phát triển kinh tế nhiều thành phần, xóa bao cấp, mở cửa. Năm 1988 Khoán 10; 1995 bình thường hóa quan hệ với Mỹ, gia nhập ASEAN.',
      end: 'Đổi Mới là quá trình liên tục: Việt Nam từ nước thiếu ăn thành nước xuất khẩu gạo hàng đầu; năm 2007 gia nhập WTO.',
      sig: 'Mở ra thời kỳ phát triển và hội nhập quốc tế; đời sống nhân dân được cải thiện rõ rệt.'
    }
  ]
};
