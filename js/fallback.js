// GitHub Pages用の代替読み込みスクリプト
// もし main の common.js が動作しない場合、このファイルを使用してください

// 静的なコンテンツを直接埋め込む方法
function loadStaticComponents() {
  // ヘッダーの静的コンテンツ
  const headerContent = `
    <header>
      <div class="header-inner">
        <div class="header-logo">
          <img src="images/committee-logo.jpg" alt="岐阜大学祭実行委員会ロゴ" class="committee-logo" />
          <h1 class="site-title">第77回 岐阜大学祭</h1>
        </div>
        <nav aria-label="サイト内ナビゲーション">
          <ul>
            <li><a href="index.html" data-page="index">トップ</a></li>
            <li><a href="sponsors.html" data-page="sponsors">ご協賛</a></li>
            <li><a href="programs.html" data-page="programs">企画一覧</a></li>
            <li><a href="news.html" data-page="news">お知らせ</a></li>
          </ul>
        </nav>
      </div>
    </header>
  `;

  // フッターの静的コンテンツ
  const footerContent = `
    <footer>
      <p>&copy; 2025 岐阜大学祭実行委員会</p>
      <p>岐阜大学 〒501-1193 岐阜県岐阜市柳戸1-1</p>
    </footer>
  `;

  // お問い合わせ先の静的コンテンツ
  const contactContent = `
    <section class="section" aria-labelledby="contact-heading">
      <h2 id="contact-heading">お問い合わせ先</h2>
      <p>ご不明点がございましたら、各担当までお気軽にお問い合わせください。（★ を <span aria-label="アットマーク gmail ドットコム">@gmail.com</span> に置き換えてください）</p>
      <div class="contact-grid">
        <div class="contact-card">
          <h3>模擬店企画</h3>
          <p>有志局 模擬店部<br />77gidaisai+mogiten★</p>
        </div>
        <div class="contact-card">
          <h3>有志ステージ企画</h3>
          <p>有志局 有志ステージ部<br />77gidaisai+stage★</p>
        </div>
        <div class="contact-card">
          <h3>屋内企画</h3>
          <p>有志局 屋内部<br />77gidaisai+okunai★</p>
        </div>
        <div class="contact-card">
          <h3>ご協賛・ご協力</h3>
          <p>渉外局 連携推進部<br /><a href="sponsors.html">こちらのページをご確認ください</a></p>
        </div>
        <div class="contact-card">
          <h3>その他・渉外</h3>
          <p>渉外局 連携推進部<br />77gidaisai+ext★</p>
        </div>
      </div>
      <dl>
        <dt>主催</dt>
        <dd>全学行事団体 岐阜大学祭実行委員会</dd>
        <dt>所在地</dt>
        <dd>〒501-1193 岐阜県岐阜市柳戸1-1 岐阜大学 大学会館内</dd>
      </dl>
    </section>
  `;

  // 要素に挿入
  const headerEl = document.getElementById('header-placeholder');
  if (headerEl) headerEl.innerHTML = headerContent;

  const footerEl = document.getElementById('footer-placeholder');
  if (footerEl) footerEl.innerHTML = footerContent;

  const contactEl = document.getElementById('contact-placeholder');
  if (contactEl) contactEl.innerHTML = contactContent;

  // ナビゲーションのアクティブ状態を設定
  setActiveNavigation();
}

// 現在のページ名を取得する
function getCurrentPageName() {
  const path = window.location.pathname;
  const filename = path.split('/').pop();
  
  if (filename === 'index.html' || filename === '') {
    return 'index';
  }
  
  return filename.replace('.html', '');
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

// フォールバック読み込み
document.addEventListener('DOMContentLoaded', function() {
  console.log('Fallback static loading initiated');
  loadStaticComponents();
});