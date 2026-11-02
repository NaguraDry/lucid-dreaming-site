/* Native details remains usable when JavaScript is unavailable. */
(() => {
  const header = document.querySelector('.home-header');
  const menu = header?.querySelector('.home-menu');
  if (!header || !menu) return;
  const button = menu.querySelector('summary');
  const updateHeight = () => {
    document.documentElement.style.setProperty('--home-header-height', `${header.getBoundingClientRect().height}px`);
  };
  updateHeight();
  if ('ResizeObserver' in window) new ResizeObserver(updateHeight).observe(header);
  else window.addEventListener('resize', updateHeight);

  document.addEventListener('click', (event) => {
    if (menu.open && (!menu.contains(event.target) || event.target.closest('a'))) menu.open = false;
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.open) {
      menu.open = false;
      button.focus();
    }
  });
  menu.addEventListener('focusout', () => {
    requestAnimationFrame(() => {
      if (menu.open && !menu.contains(document.activeElement)) menu.open = false;
    });
  });
})();
