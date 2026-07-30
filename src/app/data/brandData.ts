// ─── SHARED BRAND DATA ─────────────────────────────────────────────────────
// Pulled out of BrandsPage.tsx so BrandDetail.tsx (and anything else that
// needs a brand's logo, tagline, or product-photo fallback) uses the exact
// same source instead of a second, driftable copy.

export const normalize = (s: string) => s.toUpperCase().replace(/[^A-Z0-9]/g, '');

// ─── LOGOS via logo.dev ─────────────────────────────────────────────────────
const LOGO_DEV_TOKEN = 'pk_ekXNDhgbQjyVOn0e2m5GyQ';

function logoDevUrl(domain: string): string {
  return `https://img.logo.dev/${domain}?token=${LOGO_DEV_TOKEN}&size=200&format=png&fallback=404`;
}

const BRAND_LOGO_OVERRIDES: Record<string, string> = {
  Edizard: 'https://images-oss.2cshop.com/upload/customer_12995/upload/20250124/11cceb81ec64c930a4173d89c71d9621.png?p=image,q=100,f=auto',
};

const BRAND_DOMAINS: Record<string, string> = {
  Skullcandy:     'skullcandy.com',
  Sennheiser:     'sennheiser.com',
  Insta360:       'insta360.com',
  Jackery:        'jackery.com',
  'Peak Design':  'peakdesign.com',
  Otterbox:       'otterbox.com',
  SanDisk:        'sandisk.com',
  Apple:          'apple.com',
  Polaroid:       'polaroid.com',
  Obsbot:         'obsbot.com',
  Hohem:          'hohem.com',
  Arzopa:         'arzopa.com',
  Dometic:        'dometic.com',
  'Turtle Beach': 'turtlebeach.com',
  SWITCHBOT:      'switch-bot.com',
  Enabot:         'enabot.com',
  LARQ:           'livelarq.com',
  Cleer:          'cleeraudio.com',
  Kospet:         'kospet.com',
  'SP Connect':   'sp-connect.com',
  Kandao:         'kandaovr.com',
  Therabody:      'therabody.com',
  Saramonic:      'saramonic.com',
  Satechi:        'satechi.com',
};

const BRAND_PRODUCT_IMAGES: Record<string, string> = {
  'ATTO':            'https://cdn.shopify.com/s/files/1/0348/4948/9034/products/ATTO-Front-View-Left_5000x_2d2ea85f-e819-43b8-b1c6-715dcbb44cf2.webp?v=1653307813',
  'Acopower':        'https://cdn.shopify.com/s/files/1/0348/4948/9034/products/Untitleddesign_8_ce18e927-b69d-43d0-8e1c-494a7067abec.png?v=1587611786',
  'Aiptek':          'https://cdn.shopify.com/s/files/1/0348/4948/9034/products/DBFlicks.jpg?v=1587120688',
  'Apple':           'https://cdn.shopify.com/s/files/1/0348/4948/9034/products/MHXH3.jpg?v=1623129256',
  'Arzopa':          'https://cdn.shopify.com/s/files/1/0348/4948/9034/files/OSTsomeArzopaAR-E1Dual-screenmonitor15.6-9.webp?v=1771505808',
  'BUTTONS':         'https://cdn.shopify.com/s/files/1/0348/4948/9034/files/BUTTONSClipAIWirelessOpenEarWirelessEarphone-1.png?v=1767083152',
  'Boundary Supply': 'https://cdn.shopify.com/s/files/1/0348/4948/9034/files/Untitleddesign_1_59dccb1a-7da5-4d85-9034-ffee78f43335.png?v=1737599086',
  'Cleer':           'https://cdn.shopify.com/s/files/1/0348/4948/9034/files/CLEER_ARC_3_SPORT_PRO_1.png?v=1744706171',
  'Click & Grow':    'https://cdn.shopify.com/s/files/1/0348/4948/9034/files/SG3_Lamp_Arm.jpg?v=1728021278',
  'Colop':           'https://cdn.shopify.com/s/files/1/0348/4948/9034/products/e-mark_protectivecase_open_empty.jpg?v=1621492780',
  'Dometic':         'https://cdn.shopify.com/s/files/1/0348/4948/9034/files/Dometic_CFX3_95DZ_-_2_3696f963-f9fd-4ca9-940c-2696e5e36570.png?v=1759220826',
  'Edizard':         'https://cdn.shopify.com/s/files/1/0348/4948/9034/files/mp00756665-1-edizard-1758078604413.webp?v=1762503074',
  'Enabot':          'https://cdn.shopify.com/s/files/1/0348/4948/9034/files/EnabotEBOXMainPhoto-New.webp?v=1774505819',
  'GoPole':          'https://cdn.shopify.com/s/files/1/0348/4948/9034/products/34_8c5e239b-33ec-4b79-be92-9ecec281258f.png?v=1587441906',
  'Goal Zero':       'https://cdn.shopify.com/s/files/1/0348/4948/9034/files/d50771e12614d2079e51b973826d3934_1_1050x_44578dd8-150b-4bc3-8e31-979663c467a2.webp?v=1727321180',
  'Hohem':           'https://cdn.shopify.com/s/files/1/0348/4948/9034/files/MT3Pro_6851fbef-3a4a-4731-a005-d6a68f292946.jpg?v=1780906764',
  'Insta360':        'https://cdn.shopify.com/s/files/1/0348/4948/9034/files/Main_780w_be4c002f-5a3b-45c5-8041-4d44a6d5ba87.png?v=1692263015',
  'Jackery':         'https://cdn.shopify.com/s/files/1/0348/4948/9034/files/JackeryExplorer2000v2PortablePowerStation-MainPhoto.webp?v=1777009156',
  'Kandao':          'https://cdn.shopify.com/s/files/1/0348/4948/9034/files/E9_A9_AC_E5_B0_8F_E8_B7_AF_1_fcbc1dd3_thumbnail_4096.png?v=1743740796',
  'Kospet':          'https://cdn.shopify.com/s/files/1/0348/4948/9034/files/Kospet_Tank_M4_Product_Image_Black_-_1.webp?v=1779695820',
  'LARQ':            'https://cdn.shopify.com/s/files/1/0348/4948/9034/files/LARQBottleHandles-1.webp?v=1774430254',
  'LOONA':           'https://cdn.shopify.com/s/files/1/0348/4948/9034/files/LoonaOutfit-MerryChristmasReindeer-3_136f4081-fbc1-401c-8156-d71946d8537a.png?v=1765529448',
  'Looki':           'https://cdn.shopify.com/s/files/1/0348/4948/9034/files/Looki_L1_Main_Photo_-_Black.webp?v=1774946135',
  'Mabot':           'https://cdn.shopify.com/s/files/1/0348/4948/9034/products/Starter_main.png?v=1587628743',
  'Mirfak':          'https://cdn.shopify.com/s/files/1/0348/4948/9034/products/M1T-1.png?v=1624267662',
  'Mobile Pixels':   'https://cdn.shopify.com/s/files/1/0348/4948/9034/files/MagnetsPI01.png?v=1718852470',
  'Nite Ize':        'https://cdn.shopify.com/s/files/1/0348/4948/9034/products/1_e0eb164c-a091-43b5-bf5d-394060efe413.jpg?v=1590636979',
  'Nura':            'https://cdn.shopify.com/s/files/1/0348/4948/9034/files/2022-02-2809-59-3874.webp?v=1729234282',
  'Obsbot':          'https://cdn.shopify.com/s/files/1/0348/4948/9034/files/OST_Obsbot_Vox_SE-_Main_Image.webp?v=1770806420',
  'Octomask':        'https://cdn.shopify.com/s/files/1/0348/4948/9034/products/101_1024x1024_2af8b8ad-7917-442b-a2b3-59e5c8eb8cd4.jpg?v=1590639369',
  'Otterbox':        'https://cdn.shopify.com/s/files/1/0348/4948/9034/products/otr57-tumbler-16-xp-1.jpg?v=1587982542',
  'POLAROID':        'https://cdn.shopify.com/s/files/1/0348/4948/9034/files/006277_Shoulder_Holster_Polaroid_I-2_closed_664fde38-86e5-4c32-8f4a-730d4ce2c84a_png.png?v=1728023975',
  'Pale Blue':       'https://cdn.shopify.com/s/files/1/0348/4948/9034/products/2to1cable_2048x2048_4019a64b-ffa1-4212-ac22-ad80d61b018d.jpg?v=1675059568',
  'Peak Design':     'https://cdn.shopify.com/s/files/1/0348/4948/9034/products/1_be050ab4-130e-4525-a2bc-2cd998ab6968.jpg?v=1589442512',
  'Pictar':          'https://cdn.shopify.com/s/files/1/0348/4948/9034/products/2_433f2d9b-59e9-4a58-a7bb-80977045cad4.jpg?v=1590636210',
  'Pivo':            'https://cdn.shopify.com/s/files/1/0348/4948/9034/products/71_db86d28e-fc57-4d76-a453-e1b6b83aff5e.png?v=1630902072',
  'PolarPro':        'https://cdn.shopify.com/s/files/1/0348/4948/9034/products/Osmo-Pocket-ACTION-CAM-MOUNT_1024x1024_d4642f7b-d62d-436f-89a3-cc056c5b0b09.jpg?v=1587440894',
  'Polaroid':        'https://cdn.shopify.com/s/files/1/0348/4948/9034/files/Polaroid_Now_Instant_Camera_Gen3_-_Arctic_Blue.webp?v=1773219591',
  'RAM Mounts':      'https://cdn.shopify.com/s/files/1/0348/4948/9034/products/RAP-SB-224-2U.jpg?v=1588756496',
  'ROCCAT':          'https://cdn.shopify.com/s/files/1/0348/4948/9034/products/ROCCAT_Vulcan-Mini-BLK_Standard-Gallery_Front-Perspective_US-Layout_3000x3000_f79d209d-6fb0-4790-a40e-2cc5de026f2d.png?v=1668052453',
  'Roccat':          'https://cdn.shopify.com/s/files/1/0348/4948/9034/products/ROCCAT_Vulcan-Mini-WHT_Standard-Gallery_Front-Perspective_US-Layout_3000x3000_de47dabd-fb97-4645-b778-bb01a036cf09.jpg?v=1681961219',
  'Rubyoung':        'https://cdn.shopify.com/s/files/1/0348/4948/9034/files/ProductWithWhiteBackground_Cafe.jpg?v=1727245125',
  'SP Connect':      'https://cdn.shopify.com/s/files/1/0348/4948/9034/files/head_moto_stem_mount.jpg?v=1744703741',
  'SP Gadgets':      'https://cdn.shopify.com/s/files/1/0348/4948/9034/products/SU53008.jpg?v=1589526223',
  'SWITCHBOT':       'https://cdn.shopify.com/s/files/1/0348/4948/9034/files/OSTsomeSwitchBotSafetyAlarm_1_9cb7ccc6-4672-4305-83f5-b115fd314491.webp?v=1772182495',
  'SanDisk':         'https://cdn.shopify.com/s/files/1/0348/4948/9034/files/high-endurance-uhs-i-microsd-64g.png?v=1726718365',
  'Sennheiser':      'https://cdn.shopify.com/s/files/1/0348/4948/9034/files/MTWCopperBudsBack.jpg?v=1727144078',
  'Skullcandy':      'https://cdn.shopify.com/s/files/1/0348/4948/9034/files/25B_Aviator_900_ANC_True_Black_S6AVW-T740_Standard_01_Hero.png?v=1773291924',
  'Soundblade':      'https://cdn.shopify.com/s/files/1/0348/4948/9034/files/01_BlueAnt_SoundBlade_Charcoal_Hero.png?v=1716281992',
  'Tapplock':        'https://cdn.shopify.com/s/files/1/0348/4948/9034/products/82_0cedd276-29e0-4dc6-a412-10d445b98e70.png?v=1589877458',
  'Texenergy':       'https://cdn.shopify.com/s/files/1/0348/4948/9034/files/InfiniteSolar24onhand_480x480_4ea352c3-fd61-4e9b-a99f-cefbfb5fdd33.jpg?v=1738910550',
  'Turtle Beach':    'https://cdn.shopify.com/s/files/1/0348/4948/9034/files/1_RematchSuperMarioStarwithlogo.png?v=1779677865',
  'UGEE':            'https://cdn.shopify.com/s/files/1/0348/4948/9034/products/CustomBundles.png?v=1632907139',
  'VAGO':            'https://cdn.shopify.com/s/files/1/0348/4948/9034/files/30_57d8dc41-0e9f-4843-9770-31061f6af07f.png?v=1684133308',
  'Zagg':            'https://cdn.shopify.com/s/files/1/0348/4948/9034/products/8df4c7_587967dbc9f64ca0af2a8fc8deb42605_mv2_d_1236_1519_s_2.jpg?v=1634194370',
  'aXtion5':         'https://cdn.shopify.com/s/files/1/0348/4948/9034/files/6395ffb6d4e08c2da8b71543217d5027.png?v=1729234739',
};

// One-line taglines — used as the fallback description on BrandDetail's
// banner for any brand without a longer `brandHistory` entry below.
export const brandMeta: Record<string, { description: string }> = {
  Skullcandy:        { description: 'Thiết bị âm thanh dành cho người dám khác biệt' },
  Sennheiser:        { description: 'Kỹ thuật âm thanh Đức huyền thoại' },
  Obsbot:            { description: 'Camera & webcam tích hợp AI' },
  Hohem:             { description: 'Gimbal chống rung chuyên nghiệp' },
  Polaroid:          { description: 'Máy ảnh lấy liền & hoài niệm' },
  Kandao:            { description: 'Camera hành trình 360°' },
  Kospet:            { description: 'Đồng hồ thông minh bền bỉ' },
  Arzopa:            { description: 'Màn hình di động' },
  ROCCAT:            { description: 'Phụ kiện gaming' },
  Roccat:            { description: 'Phụ kiện gaming' },
  'Turtle Beach':    { description: 'Tay cầm & tai nghe gaming' },
  'Peak Design':     { description: 'Túi đựng & giá đỡ máy ảnh' },
  'Goal Zero':       { description: 'Nguồn điện di động ngoài trời' },
  'SP Connect':      { description: 'Giá đỡ điện thoại cho xe máy & xe đạp' },
  Insta360:          { description: 'Camera hành trình 360° & phụ kiện' },
  SWITCHBOT:         { description: 'Tự động hóa nhà thông minh' },
  Jackery:           { description: 'Trạm sạc điện di động' },
  Edizard:           { description: 'Phụ kiện sạc & nguồn điện' },
  BUTTONS:           { description: 'Thiết bị đeo mở tai tích hợp AI' },
  LOONA:             { description: 'Robot thú cưng AI' },
  Looki:             { description: 'Thương hiệu robot nội bộ của OSTSOME' },
  Cleer:             { description: 'Âm thanh không dây mở tai' },
  'Mobile Pixels':   { description: 'Màn hình đôi di động' },
  Enabot:            { description: 'Robot camera đồng hành gia đình' },
  LARQ:              { description: 'Bình nước tự làm sạch' },
  Dometic:           { description: 'Thiết bị làm lạnh & dã ngoại di động' },
  Therabody:         { description: 'Công nghệ trị liệu rung & phục hồi' },
  Saramonic:         { description: 'Micro không dây cho nhà sáng tạo' },
  Satechi:           { description: 'Phụ kiện tinh tế cho Apple & hơn thế nữa' },
};

// Longer "brand history" paragraphs — paraphrased from real sources (each
// brand's own site, Wikipedia, trade press) rather than invented. Therabody,
// Saramonic, and Satechi are paraphrased from ostsome.com.vn's own live
// brand sections; everything else is paraphrased from web research done
// July 2026. Worth a periodic sanity check against each brand's own current
// "About" page, since founding dates and positioning can shift.
export const brandHistory: Record<string, string> = {
  Skullcandy: 'Được thành lập năm 2003 bởi Rick Alden tại Park City, Utah, Skullcandy trưởng thành từ văn hóa thể thao mạo hiểm và giới trẻ, kết hợp thiết kế táo bạo với công nghệ tai nghe để trở thành một trong những thương hiệu âm thanh dễ nhận biết nhất trong trượt tuyết, trượt ván và phong cách đường phố.',
  Sennheiser: 'Được thành lập năm 1945 trong một trang trại gần Hanover, Đức, Sennheiser vẫn là công ty gia đình qua ba thế hệ, nổi tiếng với kỹ thuật Đức xuất sắc trong tai nghe, micro và thiết bị âm thanh chuyên nghiệp.',
  Cleer: 'Được thành lập tại San Diego năm 2012 bởi các chuyên gia kỳ cựu trong ngành âm thanh, Cleer thiết kế tai nghe, tai nghe nhét tai và loa theo phong cách tối giản, ưu tiên kỹ thuật — nổi bật với việc tiên phong dòng sản phẩm mở tai ARC.',
  Obsbot: 'Được thành lập năm 2016, OBSBOT là thương hiệu camera AI xây dựng xung quanh các webcam và camera tự động theo dõi thông minh, giúp việc quay video, livestream và họp trực tuyến trở nên dễ dàng.',
  Hohem: 'Được thành lập tại Thâm Quyến năm 2014, Hohem tiên phong gimbal chống rung nhận diện khuôn mặt bằng AI, ra mắt thiết bị chống rung điện thoại đầu tiên trên thế giới có nhận diện khuôn mặt tại CES năm 2016, và dẫn đầu ngành hàng này từ đó đến nay.',
  Polaroid: 'Được thành lập năm 1937 bởi Edwin Land, Polaroid phát minh ra nhiếp ảnh lấy liền năm 1947 và vẫn là biểu tượng của định dạng này ngày nay, kết hợp nét hoài niệm analog với công nghệ máy ảnh lấy liền hiện đại.',
  Kospet: 'Được thành lập năm 2018, KOSPET chuyên về đồng hồ thông minh bền bỉ, sẵn sàng cho ngoài trời, được chế tạo để chịu được điều kiện khắc nghiệt trong khi theo dõi thể thao và sức khỏe.',
  'SP Connect': 'Được thành lập tại Đức năm 1988 và đặt trụ sở tại Vienna từ những năm 1990, hệ thống giá đỡ điện thoại xoay khóa của SP Connect, ra mắt năm 2016, đã trở thành lựa chọn hàng đầu cho người đi xe máy, xe đạp và ngoài trời trên toàn thế giới.',
  Dometic: 'Bắt nguồn từ công nghệ làm lạnh hấp thụ của Thụy Điển những năm 1920, Dometic đã phát triển thành công ty hàng đầu thế giới về làm lạnh di động và tiện nghi ngoài trời cho xe RV, tàu thuyền và cuộc sống xa lưới điện.',
  Jackery: 'Được thành lập tại California năm 2012 bởi một cựu kỹ sư pin của Apple, Jackery ra mắt trạm sạc điện di động lithium ngoài trời đầu tiên trên thế giới năm 2016, tiên phong các máy phát điện năng lượng mặt trời dễ tiếp cận cho hoạt động ngoài trời và dự phòng khẩn cấp.',
  Arzopa: 'Được thành lập năm 2020, Arzopa nhanh chóng trở thành thương hiệu màn hình di động hàng đầu, cung cấp hàng triệu màn hình nhẹ, tối giản trên toàn thế giới cho làm việc từ xa, chơi game và nhà sáng tạo di chuyển nhiều.',
  Edizard: 'Là thương hiệu công nghệ du lịch được thành lập năm 2024, nay thuộc danh mục của Streamcast Asia, Edizard thiết kế các phụ kiện sạc như bộ tổ chức đa thiết bị PowerCube để đơn giản hóa cuộc sống cho người đi công tác và người làm việc di động.',
  'Turtle Beach': 'Với gốc rễ từ năm 1975 trong công nghệ âm thanh, Turtle Beach tiên phong tai nghe chơi game console năm 2005 và đã bán hơn 85 triệu tai nghe để trở thành một trong những tên tuổi hàng đầu về âm thanh gaming.',
  SWITCHBOT: 'Được thành lập tại Thâm Quyến khoảng năm 2015–2016, SwitchBot bắt đầu với một robot nhấn công tắc đơn giản cho công tắc đèn có sẵn và đã phát triển thành một hệ sinh thái nhà thông minh hoàn chỉnh gồm khóa cửa, rèm, cảm biến và robot dọn dẹp — tất cả được thiết kế để lắp đặt vào nhà mà không cần đi lại dây điện.',
  Enabot: 'Enabot thiết kế dòng robot camera gia đình di động EBO, xây dựng xung quanh ý tưởng luôn kết nối — theo dõi và giữ liên lạc với gia đình và thú cưng từ bất cứ đâu.',
  Kandao: 'Được thành lập tại Thâm Quyến năm 2016, Kandao là người tiên phong trong hình ảnh 360 độ và VR 3D, nổi tiếng với dòng camera QooCam và Obsidian cùng camera hội nghị video 360° thông minh.',
  LOONA: 'Được sản xuất bởi KEYi Tech, Loona là một "petbot" đồng hành AI kết hợp tính cách biểu cảm giống thú cưng với khả năng trò chuyện dựa trên ChatGPT để đồng hành và vui chơi tương tác.',
  LARQ: 'Được thành lập năm 2017–2018 bởi Justin Wang, LARQ tạo ra bình nước tự làm sạch đầu tiên trên thế giới, sử dụng đèn UV-C để lọc sạch nước và giảm thiểu nhựa dùng một lần.',
  BUTTONS: 'BUTTONS là thương hiệu âm thanh khám phá điểm giao thoa giữa nghệ thuật, công nghệ và cuộc sống hàng ngày, tạo ra tai nghe nhét tai mở nhẹ giúp người dùng kết nối với âm nhạc trong khi vẫn nhận biết được thế giới xung quanh.',
  Therabody: 'Therabody tin rằng ai cũng xứng đáng cảm thấy tốt hơn và sống theo cách riêng của mình — đó là triết lý đằng sau các thiết bị trị liệu rung và phục hồi của họ.',
  Saramonic: 'Âm thanh tuyệt vời là nền tảng của mọi podcast. Saramonic xây dựng loạt giải pháp micro không dây được chế tạo để ghi lại giọng nói của bạn ở trạng thái tốt nhất.',
  Satechi: 'Satechi là một trong những thương hiệu điện tử tiêu dùng đầu tiên thiết kế và sản xuất sản phẩm USB-C, và từ đó đã phát triển thành một thương hiệu dẫn đầu ngành — ngày nay sản xuất các phụ kiện tinh tế, chế tác tỉ mỉ cho người dùng trên toàn thế giới.',
};

function getBrandImage(vendor: string): string {
  if (BRAND_LOGO_OVERRIDES[vendor]) return BRAND_LOGO_OVERRIDES[vendor];
  const domain = BRAND_DOMAINS[vendor];
  if (domain) return logoDevUrl(domain);
  return BRAND_PRODUCT_IMAGES[vendor] || '';
}

function hasVectorLogo(vendor: string): boolean {
  return !!BRAND_LOGO_OVERRIDES[vendor] || !!BRAND_DOMAINS[vendor];
}

function getBrandPhoto(vendor: string): string {
  // A real lifestyle/product photo for this brand, for use as a banner
  // background — deliberately NOT the logo (which is usually on a
  // transparent/white background and looks bad stretched full-width).
  return BRAND_PRODUCT_IMAGES[vendor] || '';
}

export { getBrandImage, hasVectorLogo, getBrandPhoto, BRAND_LOGO_OVERRIDES, BRAND_DOMAINS, BRAND_PRODUCT_IMAGES };