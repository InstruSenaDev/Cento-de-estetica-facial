import React, { useEffect } from 'react';
import './barside.css';
import Chart from 'chart.js';

const Sidebar = () => {
  useEffect(() => {
    const $ = (selector) => document.querySelector(selector);
    const find = (el, selector) => el.querySelector(selector);
    const siblings = (el) => [...el.parentNode.children].filter((sibling) => sibling !== el);

    const showAsideBtn = $('.show-side-btn');
    const sidebar = $('.sidebar');
    const wrapper = $('#wrapper');

    if (showAsideBtn) {
      showAsideBtn.addEventListener('click', function () {
        $(`#${this.dataset.show}`).classList.toggle('show-sidebar');
        wrapper.classList.toggle('fullwidth');
      });
    }

    if (window.innerWidth < 767) {
      sidebar.classList.add('show-sidebar');
    }

    window.addEventListener('resize', function () {
      if (window.innerWidth > 767) {
        sidebar.classList.remove('show-sidebar');
      }
    });

    const slideNavDropdown = $('.sidebar-dropdown');

    if (slideNavDropdown) {
      $('.sidebar .categories').addEventListener('click', function (event) {
        event.preventDefault();
        const item = event.target.closest('.has-dropdown');
        if (!item) return;

        item.classList.toggle('opened');
        siblings(item).forEach((sibling) => sibling.classList.remove('opened'));

        if (item.classList.contains('opened')) {
          const toOpen = find(item, '.sidebar-dropdown');
          if (toOpen) toOpen.classList.add('active');
          siblings(item).forEach((sibling) => {
            const toClose = find(sibling, '.sidebar-dropdown');
            if (toClose) toClose.classList.remove('active');
          });
        } else {
          find(item, '.sidebar-dropdown').classList.toggle('active');
        }
      });

      $('.sidebar .close-aside').addEventListener('click', function () {
        $(`#${this.dataset.close}`).classList.add('show-sidebar');
        wrapper.classList.remove('margin');
      });
    }

    // Chart.js global settings
    Chart.defaults.global.animation.duration = 2000;
    Chart.defaults.global.title.display = false;
    Chart.defaults.global.defaultFontColor = '#71748c';
    Chart.defaults.global.defaultFontSize = 13;
    Chart.defaults.global.tooltips.backgroundColor = '#111827';
    Chart.defaults.global.tooltips.borderColor = 'blue';
    Chart.defaults.scale.gridLines.zeroLineColor = '#3b3d56';
    Chart.defaults.scale.gridLines.color = '#3b3d56';
    Chart.defaults.scale.gridLines.drawBorder = false;
    Chart.defaults.global.legend.labels.padding = 0;
    Chart.defaults.global.legend.display = false;
    Chart.defaults.scale.ticks.fontSize = 12;
    Chart.defaults.scale.ticks.fontColor = '#71748c';
    Chart.defaults.scale.ticks.beginAtZero = false;
    Chart.defaults.scale.ticks.padding = 10;
    Chart.defaults.global.elements.point.radius = 0;
    Chart.defaults.global.responsive = true;
    Chart.defaults.global.maintainAspectRatio = false;

    // Initialize charts
    new Chart(document.getElementById('myChart'), {
      type: 'bar',
      data: {
        labels: ["January", "February", "March", "April", 'May', 'June', 'August', 'September'],
        datasets: [{
          label: "Lost",
          data: [45, 25, 40, 20, 60, 20, 35, 25],
          backgroundColor: "#0d6efd",
          borderColor: 'transparent',
          borderWidth: 2.5,
          barPercentage: 0.4,
        }, {
          label: "Success",
          startAngle: 2,
          data: [20, 40, 20, 50, 25, 40, 25, 10],
          backgroundColor: "#dc3545",
          borderColor: 'transparent',
          borderWidth: 2.5,
          barPercentage: 0.4,
        }]
      },
      options: {
        scales: {
          yAxes: [{
            gridLines: {},
            ticks: { stepSize: 15 },
          }],
          xAxes: [{ gridLines: { display: false } }]
        }
      }
    });

    new Chart(document.getElementById('myChart2'), {
      type: 'line',
      data: {
        labels: ["January", "February", "March", "April", 'May', 'June', 'August', 'September'],
        datasets: [{
          label: "My First dataset",
          data: [4, 20, 5, 20, 5, 25, 9, 18],
          backgroundColor: 'transparent',
          borderColor: '#0d6efd',
          lineTension: .4,
          borderWidth: 1.5,
        }, {
          label: "Month",
          data: [11, 25, 10, 25, 10, 30, 14, 23],
          backgroundColor: 'transparent',
          borderColor: '#dc3545',
          lineTension: .4,
          borderWidth: 1.5,
        }, {
          label: "Month",
          data: [16, 30, 16, 30, 16, 36, 21, 35],
          backgroundColor: 'transparent',
          borderColor: '#f0ad4e',
          lineTension: .4,
          borderWidth: 1.5,
        }]
      },
      options: {
        scales: {
          yAxes: [{
            gridLines: { drawBorder: false },
            ticks: { stepSize: 12 },
          }],
          xAxes: [{ gridLines: { display: false } }]
        }
      }
    });

    new Chart(document.getElementById('chart3'), {
      type: 'line',
      data: {
        labels: ["One", "Two", "Three", "Four", "Five", 'Six', "Seven", "Eight"],
        datasets: [{
          label: "Lost",
          lineTension: 0.2,
          borderColor: '#d9534f',
          borderWidth: 1.5,
          showLine: true,
          data: [3, 30, 16, 30, 16, 36, 21, 40, 20, 30],
          backgroundColor: 'transparent'
        }, {
          label: "Lost",
          lineTension: 0.2,
          borderColor: '#5cb85c',
          borderWidth: 1.5,
          data: [6, 20, 5, 20, 5, 25, 9, 18, 20, 15],
          backgroundColor: 'transparent'
        }, {
          label: "Lost",
          lineTension: 0.2,
          borderColor: '#f0ad4e',
          borderWidth: 1.5,
          data: [12, 20, 15, 20, 5, 35, 10, 15, 35, 25],
          backgroundColor: 'transparent'
        }, {
          label: "Lost",
          lineTension: 0.2,
          borderColor: '#337ab7',
          borderWidth: 1.5,
          data: [16, 25, 10, 25, 10, 30, 14, 23, 14, 29],
          backgroundColor: 'transparent'
        }]
      },
      options: {
        scales: {
          yAxes: [{
            gridLines: { drawBorder: false },
            ticks: { stepSize: 12 }
          }],
          xAxes: [{ gridLines: { display: false } }]
        }
      }
    });
  }, []);

  return (
    <div className="layout has-sidebar fixed-sidebar fixed-header">
      <aside id="sidebar" className="sidebar break-point-sm has-bg-image">
        <a id="btn-collapse" className="sidebar-collapser"><i className="ri-arrow-left-s-line"></i></a>
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
                    <span className="menu-suffix"><span className="badge primary">New</span></span>
                  </a>
                  <div className="sub-menu-list">
                    <ul>
                      <li className="sub-menu-item"><a href="#">General</a></li>
                      <li className="sub-menu-item"><a href="#">Dashboards</a></li>
                      <li className="sub-menu-item"><a href="#">Calendar</a></li>
                    </ul>
                  </div>
                </li>
                <li className="menu-item">
                  <a href="#">
                    <span className="menu-icon">
                      <i className="ri-pie-chart-box-fill"></i>
                    </span>
                    <span className="menu-title">Charts</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="sidebar-footer">
            <div className="footer-box">
              <div className="image">
                <img src="assets/images/logo.png" className="img-fluid" alt="logo" />
              </div>
              <div className="content">
                <h6>Your App</h6>
                <p>Simple & Beautiful admin template</p>
              </div>
            </div>
            <a href="https://github.com/azouaoui-med/pro-sidebar-template" target="_blank" className="sidebar-footer-link">
              <i className="ri-github-fill"></i>
            </a>
          </div>
        </div>
      </aside>
      <div className="sidebar-overlay"></div>
    </div>
  );
};

export default Sidebar;
