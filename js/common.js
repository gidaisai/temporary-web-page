// ���ʂ̃w�b�_�[�E�t�b�^�[��ǂݍ��ފ֐�
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

// ���݂̃y�[�W�Ɋ�Â��ăi�r�Q�[�V�������A�N�e�B�u��Ԃɂ���
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

// ���݂̃y�[�W�����擾����
function getCurrentPageName() {
  const path = window.location.pathname;
  const filename = path.split('/').pop();
  
  // �t�@�C��������g���q���������ăy�[�W�����擾
  if (filename === 'index.html' || filename === '') {
    return 'index';
  }
  
  return filename.replace('.html', '');
}

// �y�[�W�ǂݍ��ݎ��Ƀw�b�_�[�E�t�b�^�[�E���₢���킹���ǂݍ���
document.addEventListener('DOMContentLoaded', async function() {
  await loadComponent('header-placeholder', 'includes/header.html');
  await loadComponent('footer-placeholder', 'includes/footer.html');
  
  // ���₢���킹��v���[�X�z���_�[������ꍇ�̂ݓǂݍ���
  const contactPlaceholder = document.getElementById('contact-placeholder');
  if (contactPlaceholder) {
    await loadComponent('contact-placeholder', 'includes/contact.html');
  }
  
  // �i�r�Q�[�V�����̃A�N�e�B�u��Ԃ�ݒ�
  setActiveNavigation();
});