// 共通のヘッダー・フッターを読み込む関数
async function loadComponent(elementId, filePath) {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with ID ${elementId} not found`);
    return;
  }
  
  // 既にコンテンツが読み込まれている場合はスキップ
  if (element.innerHTML.trim() !== '') {
    console.log(`Component ${elementId} already loaded, skipping...`);
    return;
  }

  try {
    // GitHub Pagesのパス解決
    let baseUrl;
    const currentPath = window.location.pathname;
    
    // GitHub Pagesのリポジトリ名を考慮したベースURL作成
    if (currentPath.includes('/temporary-web-page/')) {
      // GitHub Pagesの場合
      baseUrl = window.location.origin + currentPath.substring(0, currentPath.lastIndexOf('/') + 1);
    } else {
      // ローカル環境の場合
      baseUrl = window.location.origin + currentPath.replace(/\/[^\/]*$/, '/');
    }
    
    const fullUrl = new URL(filePath, baseUrl).href;
    
    console.log(`Loading component from: ${fullUrl}`);
    
    const response = await fetch(fullUrl);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    let html = await response.text();
    
    // サブディレクトリから読み込まれる場合、画像パスを修正
    const pagePath = window.location.pathname;
    if (pagePath.includes('/news/') || pagePath.includes('/programs/') || pagePath.includes('/sponsors/')) {
      html = html.replace(/src="images\//g, 'src="../images/');
      console.log('Fixed image paths for subdirectory');
    }
    
    element.innerHTML = html;
    console.log(`Successfully loaded ${filePath}`);
    
  } catch (error) {
    console.error(`Error loading component ${filePath}:`, error);
    
    // フォールバック: XHRを試す
    try {
      await loadComponentXHR(elementId, filePath);
    } catch (xhrError) {
      console.error(`XHR fallback failed for ${filePath}:`, xhrError);
      element.innerHTML = `<p style="color: red;">コンテンツの読み込みに失敗しました: ${filePath}</p>`;
    }
  }
}

// XHRを使用したフォールバック関数
function loadComponentXHR(elementId, filePath) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const element = document.getElementById(elementId);
    
    xhr.onload = function() {
      if (xhr.status === 200) {
        element.innerHTML = xhr.responseText;
        console.log(`XHR fallback succeeded for ${filePath}`);
        resolve();
      } else {
        reject(new Error(`XHR failed with status ${xhr.status}`));
      }
    };
    
    xhr.onerror = function() {
      reject(new Error('XHR network error'));
    };
    
    xhr.open('GET', filePath, true);
    xhr.send();
  });
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
  
  // パスから判定（ディレクトリベース）
  if (path === '/' || path.endsWith('/index.html') || path === '/index.html') {
    return 'index';
  } else if (path.includes('/news/')) {
    return 'news';
  } else if (path.includes('/programs/')) {
    return 'programs';
  } else if (path.includes('/sponsors/')) {
    return 'sponsors';
  }
  
  // フォールバック: 従来の方法
  const filename = path.split('/').pop();
  if (filename === 'index.html' || filename === '') {
    return 'index';
  }
  
  return filename.replace('.html', '');
}

// 読み込み済みフラグを追加
let componentsLoaded = false;

// ページ読み込み時にヘッダー・フッター・お問い合わせ先を読み込む
document.addEventListener('DOMContentLoaded', async function() {
  // 既に読み込み済みの場合はスキップ
  if (componentsLoaded) {
    console.log('Components already loaded, skipping...');
    return;
  }
  
  componentsLoaded = true;
  console.log('Starting component loading...');
  console.log('Current location:', window.location.href);
  console.log('Pathname:', window.location.pathname);
  
  // 現在のディレクトリ深度に基づいて相対パスを決定
  const currentPath = window.location.pathname;
  let pathPrefix = '';
  
  // サブディレクトリにいる場合は ../を付ける
  if (currentPath.includes('/news/') || currentPath.includes('/programs/') || currentPath.includes('/sponsors/')) {
    pathPrefix = '../';
  }
  
  console.log('Path prefix:', pathPrefix);
  
  // 順次読み込みでエラーを特定しやすくする
  try {
    console.log('Loading header...');
    await loadComponent('header-placeholder', pathPrefix + 'includes/header.html');
    
    console.log('Loading footer...');
    await loadComponent('footer-placeholder', pathPrefix + 'includes/footer.html');
    
    // お問い合わせ先プレースホルダーがある場合のみ読み込む
    const contactPlaceholder = document.getElementById('contact-placeholder');
    if (contactPlaceholder) {
      console.log('Loading contact...');
      await loadComponent('contact-placeholder', pathPrefix + 'includes/contact.html');
    } else {
      console.log('Contact placeholder not found on this page');
    }
    
    // ナビゲーションのアクティブ状態を設定
    console.log('Setting active navigation...');
    setActiveNavigation();
    
    console.log('All components loaded successfully');
    
    // 読み込み完了後の状態をチェック
    const headerEl = document.getElementById('header-placeholder');
    const footerEl = document.getElementById('footer-placeholder');
    const contactEl = document.getElementById('contact-placeholder');
    
    console.log('Header loaded:', headerEl && headerEl.innerHTML.trim() !== '');
    console.log('Footer loaded:', footerEl && footerEl.innerHTML.trim() !== '');
    console.log('Contact loaded:', contactEl && contactEl.innerHTML.trim() !== '');
    
  } catch (error) {
    console.error('Error during component loading:', error);
  }
});