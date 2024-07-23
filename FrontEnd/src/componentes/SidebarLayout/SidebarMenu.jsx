import React from 'react';
import SidebarMenuItem from './SidebarMenuItem';

const SidebarMenu = () => {
  return (
    <nav className="menu open-current-submenu">
      <ul>
        <li className="menu-header"><span> GENERAL </span></li>
        <SidebarMenuItem
          title="Components"
          icon="ri-vip-diamond-fill"
          badge="Hot"
          subMenuItems={[
            { title: 'Grid' },
            { title: 'Layout' },
            {
              title: 'Forms',
              subMenuItems: [
                { title: 'Input' },
                { title: 'Select' },
                {
                  title: 'More',
                  subMenuItems: [
                    { title: 'CheckBox' },
                    { title: 'Radio' },
                    {
                      title: 'Want more ?',
                      subMenuItems: [{ title: 'You made it', prefix: '🎉' }],
                    },
                  ],
                },
              ],
            },
          ]}
        />
        <SidebarMenuItem
          title="Charts"
          icon="ri-bar-chart-2-fill"
          subMenuItems={[
            { title: 'Pie chart' },
            { title: 'Line chart' },
            { title: 'Bar chart' },
          ]}
        />
        <SidebarMenuItem
          title="E-commerce"
          icon="ri-shopping-cart-fill"
          subMenuItems={[
            { title: 'Products' },
            { title: 'Orders' },
            { title: 'Credit card' },
          ]}
        />
        <SidebarMenuItem
          title="Maps"
          icon="ri-global-fill"
          subMenuItems={[
            { title: 'Google maps' },
            { title: 'Open street map' },
          ]}
        />
        <SidebarMenuItem
          title="Theme"
          icon="ri-paint-brush-fill"
          subMenuItems={[
            { title: 'Dark' },
            { title: 'Light' },
          ]}
        />
        <li className="menu-header" style={{ paddingTop: '20px' }}><span> EXTRA </span></li>
        <SidebarMenuItem title="Documentation" icon="ri-book-2-fill" badge="Beta" />
        <SidebarMenuItem title="Calendar" icon="ri-calendar-fill" />
        <SidebarMenuItem title="Examples" icon="ri-service-fill" />
      </ul>
    </nav>
  );
};

export default SidebarMenu;
