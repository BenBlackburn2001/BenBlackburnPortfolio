document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("theme-toggle");

    // Load theme from localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      document.documentElement.setAttribute("data-theme", savedTheme);
      if (toggleBtn) toggleBtn.textContent = savedTheme === "dark" ? "☀️" : "🌙";
    }

    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        const isDark = document.documentElement.getAttribute("data-theme") === "dark";
        const newTheme = isDark ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        toggleBtn.textContent = newTheme === "dark" ? "☀️" : "🌙";
      });
    }

    // Project modal logic
    const modal = document.getElementById('project-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalClose = document.getElementById('modal-close');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalVideoContainer = document.getElementById('modal-video-container');
    const modalLink = document.getElementById('modal-link');

    console.log('project modal init', { modal: !!modal, overlay: !!modalOverlay, close: !!modalClose });

    function openModalForCard(card) {
      const title = card.dataset.title || '';
      const desc = card.dataset.description || '';
      const video = card.dataset.video || '';

      modalTitle.textContent = title;
      modalDesc.textContent = desc;

      // Clear any previous video
      modalVideoContainer.innerHTML = '';
      modalLink.style.display = 'none';

      if (video) {
        const wrapper = document.createElement('div');
        wrapper.className = 'video-wrapper';
        const iframe = document.createElement('iframe');
        iframe.src = video;
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        wrapper.appendChild(iframe);
        modalVideoContainer.appendChild(wrapper);

        // Show external link
        modalLink.href = video.replace('/embed/', '/watch?v=');
        modalLink.style.display = 'inline-block';
      }

      if (modal) {
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
      }
    }

    function closeModal() {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      // remove iframe src to stop playback
      modalVideoContainer.innerHTML = '';
    }

    const cards = document.querySelectorAll('.image-card');
    console.log('found cards', cards.length);
    cards.forEach(card => {
      card.addEventListener('click', () => openModalForCard(card));
      card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModalForCard(card); } });
    });

    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
    if (modalClose) modalClose.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
  });
  