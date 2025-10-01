// 共通のヘッダー・フッターを読み込む関数
async function loadComponent(elementId, filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to load ${filePath}: ${response.status}`);
    }
    const html = await response.text();
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = html;
    }
  } catch (error) {
    console.error('Error loading component:', error);
  }
}

// 現在のページに基づいてナビゲーションをアクティブ状態にする
function setActiveNavigation() {
  const currentPage = getCurrentPageName();
  const navLinks = document.querySelectorAll('nav a[data-page]');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('data-page');
    if (linkPage === currentPage) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

// 現在のページ名を取得する
function getCurrentPageName() {
  const path = window.location.pathname;
  const filename = path.split('/').pop();
  
  // ファイル名から拡張子を除去してページ名を取得
  if (filename === 'index.html' || filename === '') {
    return 'index';
  }
  
  return filename.replace('.html', '');
}

// ページ読み込み時にヘッダー・フッター・お問い合わせ先を読み込む
document.addEventListener('DOMContentLoaded', async function() {
  await loadComponent('header-placeholder', 'includes/header.html');
  await loadComponent('footer-placeholder', 'includes/footer.html');
  
  // お問い合わせ先プレースホルダーがある場合のみ読み込む
  const contactPlaceholder = document.getElementById('contact-placeholder');
  if (contactPlaceholder) {
    await loadComponent('contact-placeholder', 'includes/contact.html');
  }
  
  // ナビゲーションのアクティブ状態を設定
  setActiveNavigation();
});