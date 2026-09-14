import React, {useState} from 'react';

const DropdownItem = ({ title, children, onItemSelect, level = 0, path = [] }) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasChildren = Boolean(children);
    const paddingLeftIncrement = 10 + level * 20;
    const containerStyle = {
        paddingLeft: `${paddingLeftIncrement}px`, 
        ...(isOpen ? { backgroundColor: '#393939' } : {})
    };
    const fullPath = [...path, title];

    return (
        <div className="dropdown-container">
            <div 
                className="dropdown-title-container" 
                style={containerStyle} 
                onClick={() => {
                    setIsOpen(!isOpen);
                    if (!hasChildren) {
                        onItemSelect(fullPath);
                    }
                }}>

                <div className="dropdown-title">{title}</div>
                {hasChildren && (
                    <i className={`fa-solid ${isOpen ? 'fa-caret-down' : 'fa-caret-right'} fa-xs`}></i>
                )}

            </div>
            {isOpen && hasChildren && (
                <div className="dropdown-content">
                    <div className="dropdown-inner-content">
                        {React.Children.map(children, child =>
                            React.cloneElement(child, { 
                                level: level + 1,
                                onItemSelect: onItemSelect,
                                path: fullPath})
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

const ListPane = ({ onItemSelect }) => {

    return (
        <div className="list-pane">
            {/* <DropdownItem title="Fundamentals" onItemSelect={onItemSelect} path={[]}>
                <DropdownItem title="Introduction" onItemSelect={onItemSelect}/>
                <DropdownItem title="Basic Concepts" onItemSelect={onItemSelect}/>
            </DropdownItem> */}

            {/* <DropdownItem title="Array" onItemSelect={onItemSelect} path={[]}>
                <DropdownItem title="Sort" onItemSelect={onItemSelect}/>
                <DropdownItem title="Search" onItemSelect={onItemSelect}/>
            </DropdownItem> */}

            {/* <DropdownItem title="Linked List" onItemSelect={onItemSelect} path={[]}>
                <DropdownItem title="Insert" onItemSelect={onItemSelect}/>
                <DropdownItem title="Delete" onItemSelect={onItemSelect}/>
                <DropdownItem title="Traverse" onItemSelect={onItemSelect}/>
                <DropdownItem title="Reverse" onItemSelect={onItemSelect}/>
            </DropdownItem> */}

            {/* <DropdownItem title="Tree" onItemSelect={onItemSelect} path={[]}>
                <DropdownItem title="Insert" onItemSelect={onItemSelect}/>
                <DropdownItem title="Delete" onItemSelect={onItemSelect}/>
                <DropdownItem title="Search" onItemSelect={onItemSelect}/>
                <DropdownItem title="In-order Traversal" onItemSelect={onItemSelect}/>
                <DropdownItem title="Pre-order Traversal" onItemSelect={onItemSelect}/>
                <DropdownItem title="Post-order Traversal" onItemSelect={onItemSelect}/>
            </DropdownItem> */}

            <DropdownItem title="Graph" onItemSelect={onItemSelect} path={[]}>
                <DropdownItem title="Depth-First Search" onItemSelect={onItemSelect}/>
                <DropdownItem title="Breadth-First Search" onItemSelect={onItemSelect}/>
            </DropdownItem>

            {/* <DropdownItem title="Hash Table" onItemSelect={onItemSelect} path={[]}>
                <DropdownItem title="Hash" onItemSelect={onItemSelect}/>
                <DropdownItem title="Collision Resolution" onItemSelect={onItemSelect}/>
                <DropdownItem title="Insert" onItemSelect={onItemSelect}/>
                <DropdownItem title="Delete" onItemSelect={onItemSelect}/>
                <DropdownItem title="Search" onItemSelect={onItemSelect}/>
            </DropdownItem> */}

            {/* <DropdownItem title="Heap" onItemSelect={onItemSelect} path={[]}>
                <DropdownItem title="Insert" onItemSelect={onItemSelect}/>
                <DropdownItem title="Delete" onItemSelect={onItemSelect}/>
                <DropdownItem title="Sort" onItemSelect={onItemSelect}/>
            </DropdownItem> */}

            {/* <DropdownItem title="Stack and Queue" onItemSelect={onItemSelect} path={[]}>
                <DropdownItem title="Stack Operations" onItemSelect={onItemSelect}>
                    <DropdownItem title="Push" onItemSelect={onItemSelect}/>
                    <DropdownItem title="Pop" onItemSelect={onItemSelect}/>
                    <DropdownItem title="Top" onItemSelect={onItemSelect}/>
                </DropdownItem>
                <DropdownItem title="Queue Operations" onItemSelect={onItemSelect}>
                    <DropdownItem title="Enqueue" onItemSelect={onItemSelect}/>
                    <DropdownItem title="Dequeue" onItemSelect={onItemSelect}/>
                    <DropdownItem title="Front" onItemSelect={onItemSelect}/>
                </DropdownItem>
            </DropdownItem> */}
        </div>
    );
};

export default ListPane;





