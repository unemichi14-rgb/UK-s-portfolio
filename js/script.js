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
