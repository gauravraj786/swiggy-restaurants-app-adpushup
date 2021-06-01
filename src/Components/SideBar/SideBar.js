import React from "react";
import './SideBar.scss';

function SideBar({ items, numItems, selectedCategory }) {
  return (
    <div className="sidebar">
      <div className="sidebar-container">
        {items.map((item, key) => (
          <a
            className={`sidebar-item ${
              item.toLowerCase() === selectedCategory.toLowerCase()
                ? "sidebar-selected"
                : ""
            }`}
            href={`#${item.replace(/ /g, "").toLowerCase()}`}
            key={key}
          >
            <div>
              <div className="sidebar-title">{item}</div>
              <div className="sidebar-subtitle">{numItems[key]} Options</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default SideBar;
