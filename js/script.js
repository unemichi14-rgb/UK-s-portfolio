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

//スライダー実装（safari対策）
function setGalleryMove() {
  const track = document.querySelector(".gallery_swiper");

  if (!track) return;

  const move = track.scrollWidth / 2;

  track.style.setProperty("--move", `${move}px`);
}

window.addEventListener("load", setGalleryMove);
window.addEventListener("resize",setGalleryMove);
