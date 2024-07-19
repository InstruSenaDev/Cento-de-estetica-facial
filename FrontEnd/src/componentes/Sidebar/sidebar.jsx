import React from 'react';
import './barside.css';
import  "./side";

const Sidebar = () => {
 
    useEffect(() => {
      const btnCollapse = document.getElementById('btn-collapse');
      btnCollapse.addEventListener('click', () => {
        SIDEBAR_EL.classList.toggle('collapsed');
        PoppersInstance.closePoppers();
        if (SIDEBAR_EL.classList.contains('collapsed'))
          FIRST_SUB_MENUS_BTN.forEach((element) => {
            element.parentElement.classList.remove('open');
          });
        updatePoppersTimeout();
      });
  
      const btnToggle = document.getElementById('btn-toggle');
      btnToggle.addEventListener('click', () => {
        SIDEBAR_EL.classList.toggle('toggled');
        updatePoppersTimeout();
      });
  
      // Add event listeners for top-level submenu clicks
      FIRST_SUB_MENUS_BTN.forEach((element) => {
        element.addEventListener('click', () => {
          if (SIDEBAR_EL.classList.contains('collapsed'))
            PoppersInstance.togglePopper(element.nextElementSibling);
          else {
            const parentMenu = element.closest('.menu.open-current-submenu');
            if (parentMenu)
              parentMenu
                .querySelectorAll(':scope > ul > .menu-item.sub-menu > a')
                .forEach(
                  (el) =>
                    window.getComputedStyle(el.nextElementSibling).display !==
                      'none' && slideUp(el.nextElementSibling)
                );
            slideToggle(element.nextElementSibling);
          }
        });
      });
  
      // Add event listeners for inner submenu clicks
      INNER_SUB_MENUS_BTN.forEach((element) => {
        element.addEventListener('click', () => {
          slideToggle(element.nextElementSibling);
        });
      });
    }, []);

  return (
    

      <div className="layout has-sidebar fixed-sidebar fixed-header">
        <aside id="sidebar" className="sidebar break-point-sm has-bg-image">
          <a id="btn-collapse" className="sidebar-collapser">
            <i className="ri-arrow-left-s-line"></i>
          </a>
          <div className="image-wrapper">
            <img src="assets/images/sidebar-bg.jpg" alt="sidebar background" />
          </div>
          <div className="sidebar-layout">
            <div className="sidebar-header">
              <div className="pro-sidebar-logo">
                <div>P</div>
                <h5>Pro Sidebar</h5>
              </div>
            </div>
            <div className="sidebar-content">
              <nav className="menu open-current-submenu">
                <ul>
                  <li className="menu-header"><span> GENERAL </span></li>
                  <li className="menu-item sub-menu">
                    <a href="#">
                      <span className="menu-icon">
                        <i className="ri-vip-diamond-fill"></i>
                      </span>
                      <span className="menu-title">Components</span>
                      <span className="menu-suffix">
                        <span className="badge primary">Hot</span>
                      </span>
                    </a>
                    <div className="sub-menu-list">
                      <ul>
                        <li className="menu-item">
                          <a href="#">
                            <span className="menu-title">Grid</span>
                          </a>
                        </li>
                        <li className="menu-item">
                          <a href="#">
                            <span className="menu-title">Layout</span>
                          </a>
                        </li>
                        <li className="menu-item sub-menu">
                          <a href="#">
                            <span className="menu-title">Forms</span>
                          </a>
                          <div className="sub-menu-list">
                            <ul>
                              <li className="menu-item">
                                <a href="#">
                                  <span className="menu-title">Input</span>
                                </a>
                              </li>
                              <li className="menu-item">
                                <a href="#">
                                  <span className="menu-title">Select</span>
                                </a>
                              </li>
                              <li className="menu-item sub-menu">
                                <a href="#">
                                  <span className="menu-title">More</span>
                                </a>
                                <div className="sub-menu-list">
                                  <ul>
                                    <li className="menu-item">
                                      <a href="#">
                                        <span className="menu-title">CheckBox</span>
                                      </a>
                                    </li>
                                    <li className="menu-item">
                                      <a href="#">
                                        <span className="menu-title">Radio</span>
                                      </a>
                                    </li>
                                    <li className="menu-item sub-menu">
                                      <a href="#">
                                        <span className="menu-title">Want more ?</span>
                                        <span className="menu-suffix">&#x1F914;</span>
                                      </a>
                                      <div className="sub-menu-list">
                                        <ul>
                                          <li className="menu-item">
                                            <a href="#">
                                              <span className="menu-prefix">&#127881;</span>
                                              <span className="menu-title">You made it </span>
                                            </a>
                                          </li>
                                        </ul>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </li>

                  <li className="menu-item sub-menu">
                    <a href="#">
                      <span className="menu-icon">
                        <i className="ri-bar-chart-2-fill"></i>
                      </span>
                      <span className="menu-title">Charts</span>
                    </a>
                    <div className="sub-menu-list">
                      <ul>
                        <li className="menu-item">
                          <a href="#">
                            <span className="menu-title">Pie chart</span>
                          </a>
                        </li>
                        <li className="menu-item">
                          <a href="#">
                            <span className="menu-title">Line chart</span>
                          </a>
                        </li>
                        <li className="menu-item">
                          <a href="#">
                            <span className="menu-title">Bar chart</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>

                  <li className="menu-item sub-menu">
                    <a href="#">
                      <span className="menu-icon">
                        <i className="ri-shopping-cart-fill"></i>
                      </span>
                      <span className="menu-title">E-commerce</span>
                    </a>
                    <div className="sub-menu-list">
                      <ul>
                        <li className="menu-item">
                          <a href="#">
                            <span className="menu-title">Products</span>
                          </a>
                        </li>
                        <li className="menu-item">
                          <a href="#">
                            <span className="menu-title">Orders</span>
                          </a>
                        </li>
                        <li className="menu-item">
                          <a href="#">
                            <span className="menu-title">credit card</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>

                  <li className="menu-item sub-menu">
                    <a href="#">
                      <span className="menu-icon">
                       <i className="ri-global-fill"></i>
                      </span>
                      <span className="menu-title">Maps</span>
                    </a>
                    <div className="sub-menu-list">
                      <ul>
                        <li className="menu-item">
                          <a href="#">
                            <span className="menu-title">Google maps</span>
                          </a>
                        </li>
                        <li className="menu-item">
                          <a href="#">
                            <span className="menu-title">Open street map</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>

                  <li className="menu-item sub-menu">
                    <a href="#">
                      <span className="menu-icon">
                       <i className="ri-paint-brush-fill"></i>
                      </span>
                      <span className="menu-title">Theme</span>
                    </a>
                    <div className="sub-menu-list">
                      <ul>
                        <li className="menu-item">
                          <a href="#">
                            <span className="menu-title">Dark</span>
                          </a>
                        </li>
                        <li className="menu-item">
                          <a href="#">
                            <span className="menu-title">Light</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>

                  <li className="menu-header" style={{ paddingTop: '20px' }}> <span> EXTRA </span></li>
                  <li className="menu-item">
                    <a href="#">
                      <span className="menu-icon">
                        <i className="ri-book-2-fill"></i>
                      </span>
                      <span className="menu-title">Documentation</span>
                      <span className="menu-suffix">
                        <span className="badge secondary">Beta</span>
                      </span>
                    </a>
                  </li>

                  <li className="menu-item">
                    <a href="#">
                      <span className="menu-icon">
                        <i className="ri-calendar-fill"></i>
                      </span>
                      <span className="menu-title">Calendar</span>
                    </a>
                  </li>

                  <li className="menu-item">
                    <a href="#">
                      <span className="menu-icon">
                        <i className="ri-service-fill"></i>
                      </span>
                      <span className="menu-title">Examples</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </aside>

        <div id="overlay" className="overlay"></div>
        <div className="layout">
          <main className="content">
            <div>
              <a id="btn-toggle" href="#" className="sidebar-toggler break-point-sm">
                <i className="ri-menu-line ri-xl"></i>
              </a>
            </div>
          </main>
          <div className="overlay"></div>
        </div>
      </div>

    );
  };


export default Sidebar;
