import React, { useState } from "react";
import catalogue from "../algorithms.json";

const pathsEqual = (a, b) => a.length === b.length && a.every((segment, i) => segment === b[i]);

const DropdownItem = ({ item, onItemSelect, level = 0, path = [], currentPath }) => {
  const fullPath = [...path, item.title];
  const hasChildren = Boolean(item.children);
  const isSelected = !hasChildren && pathsEqual(fullPath, currentPath);
  // Open categories that contain the selected algorithm by default
  const containsSelection = hasChildren && fullPath.every((segment, i) => currentPath[i] === segment);
  const [isOpen, setIsOpen] = useState(containsSelection);

  const containerStyle = {
    paddingLeft: `${10 + level * 20}px`,
    ...(isOpen && hasChildren ? { backgroundColor: "#393939" } : {}),
  };

  return (
    <div className="dropdown-container">
      <div
        className={`dropdown-title-container ${isSelected ? "dropdown-selected" : ""}`}
        style={containerStyle}
        onClick={() => {
          if (hasChildren) setIsOpen(!isOpen);
          else onItemSelect(fullPath);
        }}
      >
        <div className="dropdown-title">{item.title}</div>
        {hasChildren && (
          <i className={`fa-solid ${isOpen ? "fa-caret-down" : "fa-caret-right"} fa-xs`}></i>
        )}
      </div>
      {isOpen && hasChildren && (
        <div className="dropdown-content">
          <div className="dropdown-inner-content">
            {item.children.map((child) => (
              <DropdownItem
                key={child.title}
                item={child}
                level={level + 1}
                path={fullPath}
                onItemSelect={onItemSelect}
                currentPath={currentPath}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ListPane = ({ onItemSelect, currentPath }) => (
  <div className="list-pane">
    {catalogue.map((item) => (
      <DropdownItem
        key={item.title}
        item={item}
        onItemSelect={onItemSelect}
        currentPath={currentPath}
      />
    ))}
  </div>
);

export default ListPane;
