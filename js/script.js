jQuery("#js-drawer-icon").on("click", function (e) {
  e.preventDefault();
  jQuery("#js-drawer-icon").toggleClass("is-checked");
  jQuery("#js-drawer-content").toggleClass("is-checked");
});

//スムーススクロール（jQuery）SP+PC
jQuery('a[href^="#"]').on("click", function (e) {
  const speed = 300;
  const id = jQuery(this).attr("href");
  const target = jQuery("#" == id ? "html" : id);
  const position = jQuery(target).offset().top;
  jQuery("html,body").animate(
    {
      scrollTop: position,
    },
    speed,
    "linear", //swing or linear
  );
});

//ドロワーメニューを閉じる

jQuery('#js-drawer-content a[href^="#"]').on("click", function (e) {
  jQuery("#js-drawer-icon").removeClass("is-checked");
  jQuery("#js-drawer-content").removeClass("is-checked");
});

//無限スライダー実装（safari対策）
window.addEventListener("load", () => {
  const gallery = document.querySelector(".gallery_swiper");

  if (!gallery) return;

  //速度（px/frame）
  const SPEED = 1;

  //1セット分の枚数
  const itemConst = gallery.children.length / 2;

  //1セット分の横幅
  let move = 0;

  function calcMove() {
    move = 0;

    for (let i = 0; i < itemConst; i++) {
      move += gallery.children[i].offsetWidth;
    }

    //gap分を追加
    move += (itemConst - 1) * 16;
  }

  calcMove();

  let x = 0;

  function animate() {
    x -= SPEED;
    if (Math.abs(x) >= move) {
      x = 0;
    }

    gallery.style.transform = `translate3d(${x}px,0,0)`;

    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener("resize", () => {
    calcMove();
  });
});

/**
 * viewport 最小幅制御（早期実行が必要）
 *
 * 目的:
 * - 極小画面（outerWidth ≤ VIEWPORT_MIN）で viewport を固定幅にする
 * - VIEWPORT_MIN 以上ではレスポンシブ動作（device-width）に戻す
 * - CSS の --viewport-min と値を同期し、レイアウト崩れを防ぐ
 *
 * なぜ head で blocking 実行か:
 * - 描画開始前に viewport の content を確定する必要がある
 * - defer / async にすると初回レンダリング後に viewport が変わり CLS が発生する
 * - window の resize イベントで追従するため、初期値だけでなく継続的に更新
 *
 * CUSTOMIZE:
 * - VIEWPORT_MIN の値は token/structure.css の --viewport-min と必ず一致させる
 * - 最小幅制限が不要なサイト（全幅でレスポンシブ対応済み）は
 *   <script src="/assets/scripts/viewport.js"> および resize リスナーごと削除可
 */

// CUSTOMIZE: must match --viewport-min in token/structure.css
const VIEWPORT_MIN = 400;
const meta = document.querySelector('meta[name="viewport"]');

function updateViewport() {
  const value =
    window.outerWidth > VIEWPORT_MIN ? "device-width" : String(VIEWPORT_MIN);
  // 固定幅指定時は initial-scale を併記しない（一部端末で横スクロールを誘発するため）
  const content =
    value === "device-width"
      ? `width=${value},initial-scale=1`
      : `width=${value};`;
  if (meta.content !== content) {
    meta.content = content;
  }
}

updateViewport();
// ResizeObserver(documentElement) は使わない: 固定幅 viewport 適用中は layout 幅が
// VIEWPORT_MIN のまま変わらず発火しない（device-width へ復帰不能になる）。
// window の resize はウィンドウ操作で常に発火するため、こちらで追従する。
window.addEventListener("resize", updateViewport);
