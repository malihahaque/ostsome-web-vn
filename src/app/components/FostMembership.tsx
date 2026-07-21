import fostSectionImg from '../../imports/FOST_section.jpg';

type Props = {
  onJoin?: () => void;
  onLearnMore?: () => void;
  onLogin?: () => void;
};

// Replaced the old version (hardcoded product cards + hardcoded list
// prices that its own comments flagged as needing manual verification
// against Shopify — a real staleness risk) with a single static banner
// image and two clickable hotspots layered on top. Coordinates below were
// measured directly from the actual banner image's pixels (1536x1024),
// not eyeballed, so they line up precisely with the button/link baked
// into the image. Positioned as percentages (not fixed px) so they stay
// aligned at any render width. Same hotspot-over-image pattern already
// used in ShoppableSetup.tsx.
//
// If this banner image is ever replaced with a different design, these
// hotspot coordinates will need to be re-measured against the new image.
export function FostMembership({ onJoin, onLogin }: Props) {
  return (
    <section className="bg-white">
      <div className="relative max-w-7xl mx-auto">
        <img
          src={fostSectionImg}
          alt="OSTSOME FOST Membership — Nhận Nhiều Hơn"
          className="w-full h-auto block"
        />

        {/* "Tham Gia Hoàn Toàn Miễn Phí" button — measured button bbox is
            30.1%–69.9% x / 88.8%–94.9% y; padded slightly for a
            comfortable tap target. */}
        <button
          onClick={onJoin}
          aria-label="Tham Gia Hoàn Toàn Miễn Phí"
          className="absolute cursor-pointer"
          style={{ left: '28%', top: '87.8%', width: '44%', height: '7.7%' }}
        />

        {/* "Đăng nhập" text link — measured text bbox is 51.2%–57.7% x /
            97.1%–97.9% y, which is only ~9px tall in the source image, so
            padded generously here since that's too small a target as-is. */}
        <button
          onClick={onLogin}
          aria-label="Đăng nhập"
          className="absolute cursor-pointer"
          style={{ left: '47%', top: '96%', width: '16%', height: '3%' }}
        />
      </div>
    </section>
  );
}