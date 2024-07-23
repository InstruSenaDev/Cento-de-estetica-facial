import React, { useState } from 'react';

const SidebarMenuItem = ({ title, icon, badge, subMenuItems, prefix }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li className={`menu-item ${subMenuItems ? 'sub-menu' : ''} ${isOpen ? 'open' : ''}`}>
      <a href="#" onClick={handleClick}>
        {icon && <span className="menu-icon"><i className={icon}></i></span>}
        {prefix && <span className="menu-prefix">{prefix}</span>}
        <span className="menu-title">{title}</span>
        {badge && <span className="menu-suffix"><span className="badge primary">{badge}</span></span>}
      </a>
      {subMenuItems && (
        <div className="sub-menu-list" style={{ display: isOpen ? 'block' : 'none' }}>
          <ul>
            {subMenuItems.map((subItem, index) => (
              <SidebarMenuItem key={index} {...subItem} />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};

export default SidebarMenuItem;
