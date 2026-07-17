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
  Skullcandy:        { description: 'Audio gear built for the bold' },
  Sennheiser:        { description: 'Legendary German sound engineering' },
  Obsbot:            { description: 'AI-powered cameras & webcams' },
  Hohem:             { description: 'Pro gimbal stabilizers' },
  Polaroid:          { description: 'Instant cameras & nostalgia' },
  Kandao:            { description: '360° action cameras' },
  Kospet:            { description: 'Rugged smartwatches' },
  Arzopa:            { description: 'Portable monitors' },
  ROCCAT:            { description: 'Gaming peripherals' },
  Roccat:            { description: 'Gaming peripherals' },
  'Turtle Beach':    { description: 'Gaming controllers & headsets' },
  'Peak Design':     { description: 'Camera carry & mounting' },
  'Goal Zero':       { description: 'Off-grid portable power' },
  'SP Connect':      { description: 'Bike & moto phone mounts' },
  Insta360:          { description: '360° action cameras & accessories' },
  SWITCHBOT:         { description: 'Smart home automation' },
  Jackery:           { description: 'Portable power stations' },
  Edizard:           { description: 'Charging & power accessories' },
  BUTTONS:           { description: 'AI open-ear wearables' },
  LOONA:             { description: 'AI pet companion robots' },
  Looki:             { description: "OSTSOME's in-house robotics brand" },
  Cleer:             { description: 'Open-ear wireless audio' },
  'Mobile Pixels':   { description: 'Portable dual screens' },
  Enabot:            { description: 'Home companion robots' },
  LARQ:              { description: 'Self-cleaning water bottles' },
  Dometic:           { description: 'Portable cooling & outdoor gear' },
  Therabody:         { description: 'Percussive therapy & recovery tech' },
  Saramonic:         { description: 'Wireless mics for creators' },
  Satechi:           { description: 'Sleek accessories for Apple & beyond' },
};

// Longer "brand history" paragraphs — paraphrased from real sources (each
// brand's own site, Wikipedia, trade press) rather than invented. Therabody,
// Saramonic, and Satechi are paraphrased from ostsome.com.vn's own live
// brand sections; everything else is paraphrased from web research done
// July 2026. Worth a periodic sanity check against each brand's own current
// "About" page, since founding dates and positioning can shift.
export const brandHistory: Record<string, string> = {
  Skullcandy: "Founded in 2003 by Rick Alden in Park City, Utah, Skullcandy grew out of action-sports and youth culture, pairing bold designs with headphone technology to become one of the most recognizable audio brands in snowboarding, skating, and street style.",
  Sennheiser: 'Founded in 1945 in a farmhouse near Hanover, Germany, Sennheiser remains a family-run company across three generations, known for German engineering excellence in headphones, microphones, and professional audio.',
  Cleer: 'Founded in San Diego in 2012 by audio industry veterans, Cleer designs headphones, earbuds, and speakers with a minimalist, engineering-first approach — best known for pioneering the open-ear ARC series.',
  Obsbot: 'Founded in 2016, OBSBOT is an AI camera brand built around intelligent auto-tracking webcams and cameras that make video creation, live streaming, and virtual meetings effortless.',
  Hohem: 'Founded in Shenzhen in 2014, Hohem pioneered AI face-tracking gimbal stabilizers, debuting the world\u2019s first smartphone stabilizer with face tracking at CES in 2016, and has led the category ever since.',
  Polaroid: 'Founded in 1937 by Edwin Land, Polaroid invented instant photography in 1947 and remains the icon of the format today, blending nostalgic analog charm with modern instant camera technology.',
  Kospet: 'Founded in 2018, KOSPET specializes in rugged, outdoor-ready smartwatches built to handle extreme conditions while tracking sports and health.',
  'SP Connect': 'Founded in Germany in 1988 and headquartered in Vienna since the 1990s, SP Connect\u2019s twist-to-lock smartphone mounting system, launched in 2016, has become a go-to for motorcycle, bike, and outdoor riders worldwide.',
  Dometic: 'With roots in 1920s Swedish absorption-cooling technology, Dometic has grown into a global leader in portable refrigeration and outdoor comfort for RV, marine, and off-grid living.',
  Jackery: 'Founded in California in 2012 by a former Apple battery engineer, Jackery launched the world\u2019s first outdoor lithium portable power station in 2016, pioneering accessible solar generators for outdoor adventure and emergency backup.',
  Arzopa: 'Founded in 2020, Arzopa quickly became a leading portable monitor brand, shipping millions of lightweight, minimalist displays worldwide for remote work, gaming, and creators on the move.',
  Edizard: 'A 2024-founded travel-tech brand now part of Streamcast Asia\u2019s portfolio, Edizard designs charging accessories like the multi-device PowerCube organizer to simplify life for business travelers and digital nomads.',
  'Turtle Beach': 'With roots stretching back to 1975 in audio technology, Turtle Beach pioneered console gaming headsets in 2005 and has sold more than 85 million headsets to become one of the top names in gaming audio.',
  SWITCHBOT: 'Founded in Shenzhen around 2015\u20132016, SwitchBot began with a simple robotic button-pusher for existing light switches and has grown into a full smart home ecosystem of locks, curtains, sensors, and cleaning robots \u2014 all designed to retrofit onto homes without rewiring.',
  Enabot: 'Enabot designs the EBO family of mobile home camera robots, built around the idea of staying connected \u2014 keeping family and pets watched over and in touch from anywhere.',
  Kandao: 'Founded in Shenzhen in 2016, Kandao is a pioneer in 360-degree and 3D VR imaging, known for its QooCam and Obsidian camera lines and its intelligent 360\u00b0 video conferencing cameras.',
  LOONA: 'Made by KEYi Tech, Loona is an AI companion "petbot" that blends an expressive, pet-like personality with ChatGPT-powered conversation for interactive companionship and play.',
  LARQ: 'Founded in 2017\u20132018 by Justin Wang, LARQ created the world\u2019s first self-cleaning water bottle, using UV-C LED light to purify water and cut down on single-use plastic.',
  BUTTONS: 'BUTTONS is an audio brand exploring the meeting point of art, technology, and everyday life, creating lightweight open-ear earbuds that keep wearers connected to their music while staying aware of the world around them.',
  Therabody: 'Therabody believes everyone deserves to feel better and live life on their own terms \u2014 the philosophy behind their percussive therapy and recovery devices.',
  Saramonic: 'Great audio is the foundation of every podcast. Saramonic builds a range of wireless microphone solutions built to capture your voice at its best.',
  Satechi: 'Satechi was one of the first consumer electronics brands to design and manufacture USB-C products, and has since grown into an industry leader \u2014 today making sleek, well-crafted accessories for people worldwide.',
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