/*
 * index.html と en/index.html の両方から読み込まれる共通スクリプト。
 * どちらのページにも存在しない要素があり得るので、取得結果は必ず null を確認する。
 *
 * 日本語・英語で文面が変わるものは HTML 側の data-* 属性に持たせ、
 * このファイルには文字列を書かない（2言語ぶんの分岐をここに持ち込まないため）。
 */
(() => {
  'use strict';

  /* ------------------------------------------------------------------
   * 著作権表記の年
   * ---------------------------------------------------------------- */
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  /* ------------------------------------------------------------------
   * ヒーロー動画
   * 「動きを減らす」設定の環境では自動再生を止める。
   * poster 画像が残るので、静止画として成立する。
   * ---------------------------------------------------------------- */
  const heroVideo = document.querySelector('[data-hero-video]');
  if (heroVideo && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    heroVideo.autoplay = false;
    heroVideo.pause();
    heroVideo.removeAttribute('autoplay');
  }

  /* ------------------------------------------------------------------
   * モバイルメニュー
   * ---------------------------------------------------------------- */
  const menuBtn = document.getElementById('menu-btn');
  const menu = document.getElementById('menu');

  if (menuBtn && menu) {
    const setMenuOpen = (open) => {
      menu.classList.toggle('hidden', !open);
      menuBtn.setAttribute('aria-expanded', String(open));
    };

    menuBtn.addEventListener('click', () => {
      setMenuOpen(menu.classList.contains('hidden'));
    });

    // メニュー内のリンクを踏んだら閉じる（同一ページ内アンカーなので遷移しない）。
    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMenuOpen(false));
    });

    // Escape で閉じ、フォーカスを開閉ボタンへ戻す。
    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape' || menu.classList.contains('hidden')) return;
      setMenuOpen(false);
      menuBtn.focus();
    });

    // lg 以上では開閉ボタンごと非表示になる。開いた状態のまま画面を広げると
    // aria-expanded="true" が取り残されるので、ブレークポイントに追従させる。
    const desktop = window.matchMedia('(min-width: 1024px)');
    const syncToBreakpoint = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    desktop.addEventListener('change', syncToBreakpoint);
    syncToBreakpoint();
  }

  /* ------------------------------------------------------------------
   * お問い合わせフォーム（Netlify Forms への非同期 POST）
   * ---------------------------------------------------------------- */
  const form = document.getElementById('contact-form');
  const statusEl = document.getElementById('form-status');

  if (form && statusEl) {
    // 成功は polite、失敗は assertive で読み上げさせる。
    // role を差し替えるより aria-live を切り替えるほうが支援技術に伝わりやすい。
    const setStatus = (text, isError) => {
      statusEl.setAttribute('aria-live', isError ? 'assertive' : 'polite');
      statusEl.textContent = text;
    };

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const button = form.querySelector('button[type="submit"]');
      if (button) button.disabled = true;
      setStatus(form.dataset.msgSending || '', false);

      try {
        const body = new URLSearchParams(new FormData(form));
        body.set('form-name', form.getAttribute('name'));

        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: body.toString(),
        });
        if (!response.ok) throw new Error(`Netlify Forms responded ${response.status}`);

        setStatus(form.dataset.msgSuccess || '', false);
        form.reset();
        // 送信成功後はボタンを無効のままにする。
        // 有効に戻すと、リセット済みの空フォームをそのまま再送信できてしまう。
      } catch {
        setStatus(form.dataset.msgError || '', true);
        // 失敗したときだけ再送信できるようにする。
        if (button) button.disabled = false;
      }
    });
  }
})();
