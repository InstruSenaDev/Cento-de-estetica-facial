import React, { useState, useEffect, useRef } from 'react';
import './style.css';
import SidebarMenu from './SidebarMenu';

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isToggled, setIsToggled] = useState(false);
    const sidebarRef = useRef(null);
    const firstSubMenusBtn = useRef([]);
    const innerSubMenusBtn = useRef([]);
    const subMenuPoppers = useRef([]);
  
    const handleCollapseClick = () => {
      setIsCollapsed(!isCollapsed);
      closePoppers();
      if (isCollapsed) {
        firstSubMenusBtn.current.forEach((element) => {
          element.parentElement.classList.remove('open');
        });
      }
      updatePoppersTimeout();
    };
  
    const handleToggleClick = () => {
      setIsToggled(!isToggled);
      updatePoppersTimeout();
    };
  
    const closePoppers = () => {
      subMenuPoppers.current.forEach((popper) => {
        popper.instance.state.elements.popper.style.visibility = 'hidden';
      });
    };
  
    const updatePoppersTimeout = () => {
      setTimeout(() => {
        subMenuPoppers.current.forEach((popper) => {
          popper.instance.state.elements.popper.style.display = 'none';
          popper.instance.update();
        });
      }, 300);
    };
  
    useEffect(() => {
      // Initialize poppers and add event listeners
      const initPoppers = () => {
        document.querySelectorAll('.menu > ul > .menu-item.sub-menu').forEach((element, index) => {
          const popper = new Popper(element, element.lastElementChild, {
            placement: 'right',
            strategy: 'fixed',
            modifiers: [
              {
                name: 'computeStyles',
                options: {
                  adaptive: false,
                },
              },
              {
                name: 'flip',
                options: {
                  fallbackPlacements: ['left', 'right'],
                },
              },
            ],
          });
          subMenuPoppers.current.push({ instance: popper });
        });
  
        firstSubMenusBtn.current = document.querySelectorAll('.menu > ul > .menu-item.sub-menu > a');
        innerSubMenusBtn.current = document.querySelectorAll('.menu > ul > .menu-item.sub-menu .menu-item.sub-menu > a');
  
        firstSubMenusBtn.current.forEach((element) => {
          element.addEventListener('click', () => {
            if (isCollapsed) {
              togglePopper(element.nextElementSibling);
            } else {
              const parentMenu = element.closest('.menu.open-current-submenu');
              if (parentMenu) {
                parentMenu
                  .querySelectorAll(':scope > ul > .menu-item.sub-menu > a')
                  .forEach((el) => {
                    if (window.getComputedStyle(el.nextElementSibling).display !== 'none') {
                      slideUp(el.nextElementSibling);
                    }
                  });
              }
              slideToggle(element.nextElementSibling);
            }
          });
        });
  
        innerSubMenusBtn.current.forEach((element) => {
          element.addEventListener('click', () => {
            slideToggle(element.nextElementSibling);
          });
        });
      };
  
      initPoppers();
    }, [isCollapsed]);

  return (
    <aside id="sidebar" className={`sidebar break-point-sm has-bg-image ${isCollapsed ? 'collapsed' : ''} ${isToggled ? 'toggled' : ''}`} ref={sidebarRef}>
      <button id="btn-collapse" className="sidebar-collapser" onClick={handleCollapseClick}>
        <i className="ri-arrow-left-s-line"></i>
      </button>
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
          <SidebarMenu />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
