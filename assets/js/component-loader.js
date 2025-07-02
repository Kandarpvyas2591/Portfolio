// Component Loader - Dynamically loads HTML components
document.addEventListener('DOMContentLoaded', function () {
  // Function to load HTML component
  async function loadComponent(elementId, filePath) {
    try {
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const html = await response.text();
      const element = document.getElementById(elementId);
      if (element) {
        element.innerHTML = html;
      } else {
        console.warn(`Element with ID '${elementId}' not found`);
      }
    } catch (error) {
      console.error(`Error loading component ${filePath}:`, error);
    }
  }

  // Load all components
  const components = [
    // Main components
    { id: 'sidebar-container', path: './components/sidebar.html' },
    { id: 'navbar-container', path: './components/navbar.html' },

    // Sections
    { id: 'about-container', path: './sections/about.html' },
    { id: 'resume-container', path: './sections/resume.html' },
    { id: 'projects-container', path: './sections/projects.html' },
    { id: 'experience-container', path: './sections/experience.html' },
    { id: 'contact-container', path: './sections/contact.html' },
  ];

  // Load all components
  Promise.all(
    components.map((component) => loadComponent(component.id, component.path))
  )
    .then(() => {
      // Load sub-components for About section
      return Promise.all([
        loadComponent(
          'certifications-container',
          './components/certifications.html'
        ),
        loadComponent(
          'about-projects-container',
          './components/about-projects.html'
        ),
      ]);
    })
    .then(() => {
      // Load skills component for Resume section
      return loadComponent('skills-container', './components/skills.html');
    })
    .then(() => {
      console.log('All components loaded successfully!');

      // Re-initialize any JavaScript functionality after components are loaded
      // This is important because the original script.js runs before components are loaded
      initializeComponentFunctionality();
    })
    .catch((error) => {
      console.error('Error loading components:', error);
    });

  // Function to re-initialize functionality after components load
  function initializeComponentFunctionality() {
    // Re-run all the JavaScript functionality from script.js

    // 1. Sidebar functionality
    const sidebar = document.querySelector('[data-sidebar]');
    const sidebarBtn = document.querySelector('[data-sidebar-btn]');
    if (sidebar && sidebarBtn) {
      sidebarBtn.addEventListener('click', function () {
        sidebar.classList.toggle('active');
      });
    }

    // 2. Testimonials modal functionality
    const testimonialsItem = document.querySelectorAll(
      '[data-testimonials-item]'
    );
    const modalContainer = document.querySelector('[data-modal-container]');
    const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
    const overlay = document.querySelector('[data-overlay]');

    if (modalContainer && modalCloseBtn && overlay) {
      const modalImg = document.querySelector('[data-modal-img]');
      const modalTitle = document.querySelector('[data-modal-title]');
      const modalText = document.querySelector('[data-modal-text]');

      const testimonialsModalFunc = function () {
        modalContainer.classList.toggle('active');
        overlay.classList.toggle('active');
      };

      // Add click event to all modal items
      for (let i = 0; i < testimonialsItem.length; i++) {
        testimonialsItem[i].addEventListener('click', function () {
          modalImg.src = this.querySelector('[data-testimonials-avatar]').src;
          modalImg.alt = this.querySelector('[data-testimonials-avatar]').alt;
          modalTitle.innerHTML = this.querySelector(
            '[data-testimonials-title]'
          ).innerHTML;
          modalText.innerHTML = this.querySelector(
            '[data-testimonials-text]'
          ).innerHTML;
          testimonialsModalFunc();
        });
      }

      // Add click event to modal close button
      modalCloseBtn.addEventListener('click', testimonialsModalFunc);
      overlay.addEventListener('click', testimonialsModalFunc);
    }

    // 3. Filter functionality
    const select = document.querySelector('[data-select]');
    const selectItems = document.querySelectorAll('[data-select-item]');
    const selectValue = document.querySelector('[data-selecct-value]');
    const filterBtn = document.querySelectorAll('[data-filter-btn]');

    if (select) {
      select.addEventListener('click', function () {
        this.classList.toggle('active');
      });
    }

    // Filter function
    const filterItems = document.querySelectorAll('[data-filter-item]');
    const filterFunc = function (selectedValue) {
      for (let i = 0; i < filterItems.length; i++) {
        if (selectedValue === 'all') {
          filterItems[i].classList.add('active');
        } else if (selectedValue === filterItems[i].dataset.category) {
          filterItems[i].classList.add('active');
        } else {
          filterItems[i].classList.remove('active');
        }
      }
    };

    // Add event to all select items
    for (let i = 0; i < selectItems.length; i++) {
      selectItems[i].addEventListener('click', function () {
        let selectedValue = this.innerText.toLowerCase();
        if (selectValue) selectValue.innerText = this.innerText;
        if (select) select.classList.toggle('active');
        filterFunc(selectedValue);
      });
    }

    // Add event to all filter button items for large screen
    let lastClickedBtn = filterBtn[0];
    for (let i = 0; i < filterBtn.length; i++) {
      filterBtn[i].addEventListener('click', function () {
        let selectedValue = this.innerText.toLowerCase();
        if (selectValue) selectValue.innerText = this.innerText;
        filterFunc(selectedValue);
        if (lastClickedBtn) lastClickedBtn.classList.remove('active');
        this.classList.add('active');
        lastClickedBtn = this;
      });
    }

    // 4. Contact form functionality
    const form = document.querySelector('[data-form]');
    const formInputs = document.querySelectorAll('[data-form-input]');
    const formBtn = document.querySelector('[data-form-btn]');

    if (form && formBtn) {
      // Form validation
      for (let i = 0; i < formInputs.length; i++) {
        formInputs[i].addEventListener('input', function () {
          if (form.checkValidity()) {
            formBtn.removeAttribute('disabled');
          } else {
            formBtn.setAttribute('disabled', '');
          }
        });
      }

      // Form submission with modern popup
      form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Show modern popup message
        showModernPopup();

        // Reset the form
        form.reset();

        // Re-disable the button since form is now empty
        formBtn.setAttribute('disabled', '');
      });
    }

    // 5. Page navigation functionality - MOST IMPORTANT
    const navigationLinks = document.querySelectorAll('[data-nav-link]');
    const pages = document.querySelectorAll('[data-page]');

    // Add event to all nav links
    for (let i = 0; i < navigationLinks.length; i++) {
      navigationLinks[i].addEventListener('click', function () {
        for (let j = 0; j < pages.length; j++) {
          if (this.innerHTML.toLowerCase() === pages[j].dataset.page) {
            pages[j].classList.add('active');
            navigationLinks[j].classList.add('active');
            window.scrollTo(0, 0);
          } else {
            pages[j].classList.remove('active');
            navigationLinks[j].classList.remove('active');
          }
        }
      });
    }

    // 6. Project detail functionality
    initializeProjectDetailNavigation();

    console.log('Component functionality initialized');
  }

  // Modern popup function
  function showModernPopup() {
    // Create popup HTML
    const popupHTML = `
      <div id="modern-popup-overlay" class="modern-popup-overlay">
        <div class="modern-popup">
          <div class="popup-content">
            <div class="popup-icon">
              <ion-icon name="checkmark-circle"></ion-icon>
            </div>
            <h3>Thank You!</h3>
            <p>Thanks for reaching out! I will get back to you soon.</p>
            <button class="popup-close-btn" onclick="closeModernPopup()">
              <span>Got it</span>
              <ion-icon name="arrow-forward"></ion-icon>
            </button>
          </div>
        </div>
      </div>
    `;

    // Add popup to body
    document.body.insertAdjacentHTML('beforeend', popupHTML);

    // Add styles if not already added
    if (!document.getElementById('modern-popup-styles')) {
      const styles = `
        <style id="modern-popup-styles">
          .modern-popup-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            opacity: 0;
            animation: fadeIn 0.3s ease-out forwards;
          }

          .modern-popup {
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            border: 1px solid #ffdb70;
            border-radius: 20px;
            padding: 0;
            max-width: 400px;
            width: 90%;
            box-shadow: 0 20px 60px rgba(255, 219, 112, 0.3);
            transform: scale(0.8) translateY(50px);
            animation: popupSlideIn 0.4s ease-out 0.1s forwards;
            overflow: hidden;
          }

          .popup-content {
            padding: 40px 30px 30px;
            text-align: center;
            color: white;
          }

          .popup-icon {
            margin-bottom: 20px;
          }

          .popup-icon ion-icon {
            font-size: 64px;
            color: #4ade80;
            filter: drop-shadow(0 0 20px rgba(74, 222, 128, 0.5));
          }

          .modern-popup h3 {
            margin: 0 0 15px 0;
            font-size: 24px;
            font-weight: 600;
            color: #ffdb70;
            text-shadow: 0 2px 10px rgba(255, 219, 112, 0.3);
          }

          .modern-popup p {
            margin: 0 0 30px 0;
            font-size: 16px;
            line-height: 1.6;
            color: #d4d4d8;
            opacity: 0.9;
          }

          .popup-close-btn {
            background: linear-gradient(135deg, #ffdb70, #fbbf24);
            color: #1a1a1a;
            border: none;
            padding: 12px 30px;
            border-radius: 50px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            box-shadow: 0 4px 15px rgba(255, 219, 112, 0.4);
          }

          .popup-close-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(255, 219, 112, 0.6);
          }

          .popup-close-btn ion-icon {
            font-size: 18px;
            transition: transform 0.3s ease;
          }

          .popup-close-btn:hover ion-icon {
            transform: translateX(3px);
          }

          @keyframes fadeIn {
            to {
              opacity: 1;
            }
          }

          @keyframes popupSlideIn {
            to {
              transform: scale(1) translateY(0);
            }
          }

          @keyframes fadeOut {
            to {
              opacity: 0;
            }
          }

          @keyframes popupSlideOut {
            to {
              transform: scale(0.8) translateY(50px);
              opacity: 0;
            }
          }

          /* Mobile responsiveness */
          @media (max-width: 480px) {
            .modern-popup {
              margin: 20px;
              width: calc(100% - 40px);
            }

            .popup-content {
              padding: 30px 20px 20px;
            }

            .popup-icon ion-icon {
              font-size: 48px;
            }

            .modern-popup h3 {
              font-size: 20px;
            }

            .modern-popup p {
              font-size: 14px;
            }

            .popup-close-btn {
              padding: 10px 25px;
              font-size: 14px;
            }
          }
        </style>
      `;
      document.head.insertAdjacentHTML('beforeend', styles);
    }

    // Auto close after 5 seconds
    setTimeout(() => {
      closeModernPopup();
    }, 5000);
  }

  // Global function to close popup
  window.closeModernPopup = function () {
    const overlay = document.getElementById('modern-popup-overlay');
    if (overlay) {
      const popup = overlay.querySelector('.modern-popup');

      // Add exit animations
      overlay.style.animation = 'fadeOut 0.3s ease-out forwards';
      popup.style.animation = 'popupSlideOut 0.3s ease-out forwards';

      // Remove from DOM after animation
      setTimeout(() => {
        overlay.remove();
      }, 300);
    }
  };

  // Function to handle project detail navigation
  function initializeProjectDetailNavigation() {
    const projectLinks = document.querySelectorAll('[data-project]');
    const projectDetailContainer = document.getElementById(
      'project-detail-container'
    );
    const projectsContainer = document.getElementById('projects-container');

    console.log('Project links found:', projectLinks.length);
    console.log('Project detail container:', projectDetailContainer);
    console.log('Projects container:', projectsContainer);

    // Add click event to all project cards
    for (let i = 0; i < projectLinks.length; i++) {
      projectLinks[i].addEventListener('click', function (e) {
        e.preventDefault();
        const projectId = this.getAttribute('data-project');
        console.log('Clicked project:', projectId);
        showProjectDetail(projectId);
      });
    }

    // Function to show project detail
    async function showProjectDetail(projectId) {
      console.log('Loading project detail for:', projectId);
      try {
        const response = await fetch(`./project-details/${projectId}.html`);
        console.log('Fetch response:', response.status, response.ok);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        console.log('HTML loaded, length:', html.length);

        // Hide projects section and show project detail
        if (projectsContainer) {
          projectsContainer.style.display = 'none';
          console.log('Projects container hidden');
        }
        if (projectDetailContainer) {
          projectDetailContainer.style.display = 'block';
          projectDetailContainer.classList.add('active');
          projectDetailContainer.innerHTML = html;
          console.log('Project detail container shown with content');

          // Initialize back button functionality
          initializeBackButton();

          // Scroll to top
          window.scrollTo(0, 0);
        }
      } catch (error) {
        console.error(`Error loading project detail for ${projectId}:`, error);
        // Show error message to user
        if (projectDetailContainer) {
          projectDetailContainer.style.display = 'block';
          projectDetailContainer.innerHTML = `
            <div style="color: white; padding: 20px; text-align: center;">
              <h2>Error Loading Project</h2>
              <p>Could not load project details for: ${projectId}</p>
              <p>Error: ${error.message}</p>
              <button onclick="history.back()" style="background: #ffdb70; color: #1a1a1a; padding: 10px 20px; border: none; border-radius: 8px; cursor: pointer;">
                Go Back
              </button>
            </div>
          `;
        }
      }
    }

    // Function to initialize back button
    function initializeBackButton() {
      const backBtn = document.querySelector('.back-btn');
      if (backBtn) {
        backBtn.addEventListener('click', function (e) {
          e.preventDefault();
          showProjectsSection();
        });
      }
    }

    // Function to show projects section and hide project detail
    function showProjectsSection() {
      if (projectDetailContainer) {
        projectDetailContainer.style.display = 'none';
        projectDetailContainer.classList.remove('active');
        projectDetailContainer.innerHTML = '';
      }
      if (projectsContainer) {
        projectsContainer.style.display = 'block';
      }
      // Scroll to top
      window.scrollTo(0, 0);
    }
  }
});

// Utility function to check if all components are loaded
function checkComponentsLoaded() {
  const containerIds = [
    'sidebar-container',
    'navbar-container',
    'about-container',
    'resume-container',
    'projects-container',
    'experience-container',
    'contact-container',
  ];

  return containerIds.every((id) => {
    const element = document.getElementById(id);
    return element && element.innerHTML.trim() !== '';
  });
}

// Export for use in other scripts
window.ComponentLoader = {
  checkComponentsLoaded,
};
