import React, {useState} from 'react';

const DropdownItem = ({ title, children, onItemSelect, level = 0 }) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasChildren = Boolean(children);
    const paddingLeftIncrement = 10 + level * 20;
    const containerStyle = {
        paddingLeft: `${paddingLeftIncrement}px`, 
        ...(isOpen ? { backgroundColor: '#393939' } : {})
    };

    return (
        <div className="dropdown-container">
            <div className="dropdown-title-container" style={containerStyle} onClick={() => {
                if (hasChildren) {
                    setIsOpen(!isOpen);
                }
                onItemSelect(title);
            }}>

                <div className="dropdown-title">
                    {title}
                </div>
                {hasChildren && (
                    <i className={`fa-solid ${isOpen ? 'fa-caret-down' : 'fa-caret-right'} fa-xs`}></i>
                )}
            </div>
            {isOpen && hasChildren && (
                <div className="dropdown-content">
                    <div className="dropdown-inner-content">
                        {React.Children.map(children, child =>
                            React.cloneElement(child, { level: level + 1 })
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
            <DropdownItem title="Fundamentals" onItemSelect={onItemSelect}>
                <DropdownItem title="Introduction" onItemSelect={onItemSelect}/>
                <DropdownItem title="Basic Concepts" onItemSelect={onItemSelect}/>
            </DropdownItem>
            <DropdownItem title="Linear Data Structures" onItemSelect={onItemSelect}>
                <DropdownItem title="Arrays" onItemSelect={onItemSelect}>
                    <DropdownItem title="Operations" onItemSelect={onItemSelect}>
                        <DropdownItem title="Inserting" onItemSelect={onItemSelect}/>
                        <DropdownItem title="Deleting" onItemSelect={onItemSelect}/>
                        <DropdownItem title="Accessing" onItemSelect={onItemSelect}/>
                    </DropdownItem>
                    <DropdownItem title="Searching" onItemSelect={onItemSelect}>
                        <DropdownItem title="Linear Search" onItemSelect={onItemSelect}/>
                        <DropdownItem title="Binary Search" onItemSelect={onItemSelect}/>
                    </DropdownItem>
                    <DropdownItem title="Sorting" onItemSelect={onItemSelect}>
                        <DropdownItem title="Bubble Sort" onItemSelect={onItemSelect}/>
                        <DropdownItem title="Insertion Sort" onItemSelect={onItemSelect}/>
                        <DropdownItem title="Selection Sort" onItemSelect={onItemSelect}/>
                        <DropdownItem title="Merge Sort" onItemSelect={onItemSelect}/>
                        <DropdownItem title="Quick Sort" onItemSelect={onItemSelect}/>
                        <DropdownItem title="Bucket Sort" onItemSelect={onItemSelect}/>
                    </DropdownItem>
                </DropdownItem>
                <DropdownItem title="Linked Lists" onItemSelect={onItemSelect}>
                    <DropdownItem title="Singly Linked List" onItemSelect={onItemSelect}>
                        <DropdownItem title="Inserting" onItemSelect={onItemSelect}/>
                        <DropdownItem title="Deleting" onItemSelect={onItemSelect}/>
                    </DropdownItem>
                    <DropdownItem title="Doubly Linked List" onItemSelect={onItemSelect}>
                        <DropdownItem title="Inserting" onItemSelect={onItemSelect}/>
                        <DropdownItem title="Deleting" onItemSelect={onItemSelect}/>
                    </DropdownItem>
                </DropdownItem>
                <DropdownItem title="Stacks" onItemSelect={onItemSelect}>
                    <DropdownItem title="Push" onItemSelect={onItemSelect}/>
                    <DropdownItem title="Pop" onItemSelect={onItemSelect}/>
                </DropdownItem>
                <DropdownItem title="Queues">
                    <DropdownItem title="Enqueue" onItemSelect={onItemSelect}/>
                    <DropdownItem title="Dequeue" onItemSelect={onItemSelect}/>
                </DropdownItem>
            </DropdownItem>
            <DropdownItem title="Non-Linear Data Structures" onItemSelect={onItemSelect}>
                <DropdownItem title="Trees" onItemSelect={onItemSelect}>
                    <DropdownItem title="Binary Tree" onItemSelect={onItemSelect}>
                        <DropdownItem title="Inorder" onItemSelect={onItemSelect}/>
                        <DropdownItem title="Preorder" onItemSelect={onItemSelect}/>
                        <DropdownItem title="Postorder" onItemSelect={onItemSelect}/>
                        <DropdownItem title="Breadth First Search" onItemSelect={onItemSelect}/>
                    </DropdownItem>
                    <DropdownItem title="Binary Search Tree" onItemSelect={onItemSelect}>
                        <DropdownItem title="Inorder" onItemSelect={onItemSelect}/>
                        <DropdownItem title="Preorder" onItemSelect={onItemSelect}/>
                        <DropdownItem title="Postorder" onItemSelect={onItemSelect}/>
                        <DropdownItem title="Breadth First Search" onItemSelect={onItemSelect}/>
                    </DropdownItem>
                </DropdownItem>
                <DropdownItem title="Graphs" onItemSelect={onItemSelect}>
                    <DropdownItem title="Directed Graph" onItemSelect={onItemSelect}>
                        <DropdownItem title="Traversal" onItemSelect={onItemSelect}>
                            <DropdownItem title="Breadth First Search" onItemSelect={onItemSelect}/>
                            <DropdownItem title="Depth First Search" onItemSelect={onItemSelect}/>
                        </DropdownItem>
                        <DropdownItem title="Pathfinding" onItemSelect={onItemSelect}>
                            <DropdownItem title="Dijkstra's Algorithm" onItemSelect={onItemSelect}/>
                            <DropdownItem title="A* Search" onItemSelect={onItemSelect}/>
                        </DropdownItem>
                    </DropdownItem>
                    <DropdownItem title="Undirected Graph" onItemSelect={onItemSelect}>
                        <DropdownItem title="Traversal" onItemSelect={onItemSelect}>
                            <DropdownItem title="Breadth First Search" onItemSelect={onItemSelect}/>
                            <DropdownItem title="Depth First Search" onItemSelect={onItemSelect}/>
                        </DropdownItem>
                        <DropdownItem title="Pathfinding" onItemSelect={onItemSelect}>
                            <DropdownItem title="A* Search" onItemSelect={onItemSelect}/>
                            <DropdownItem title="Kruskal's Algorithm" onItemSelect={onItemSelect}/>
                            <DropdownItem title="Prim's Algorithm" onItemSelect={onItemSelect}/>
                        </DropdownItem>
                    </DropdownItem>
                    <DropdownItem title="Maze Generation" onItemSelect={onItemSelect}>
                        <DropdownItem title="Recursive Division" onItemSelect={onItemSelect}/>
                    </DropdownItem>
                </DropdownItem>
                <DropdownItem title="Hash Tables" onItemSelect={onItemSelect}>
                    <DropdownItem title="Operations" onItemSelect={onItemSelect}>
                        <DropdownItem title="Insert" onItemSelect={onItemSelect}/>
                        <DropdownItem title="Delete" onItemSelect={onItemSelect}/>
                        <DropdownItem title="Search" onItemSelect={onItemSelect}/>
                    </DropdownItem>
                    <DropdownItem title="Hash Functions" onItemSelect={onItemSelect}>
                        <DropdownItem title="Multiplication Method" onItemSelect={onItemSelect}/>
                        <DropdownItem title="Division Method" onItemSelect={onItemSelect}/>
                        <DropdownItem title="Universal Hashing" onItemSelect={onItemSelect}/>
                    </DropdownItem>
                </DropdownItem>
            </DropdownItem>
            <DropdownItem title="Other" onItemSelect={onItemSelect}>
                <DropdownItem title="Recursion" onItemSelect={onItemSelect}>
                    <DropdownItem title="Factorial" onItemSelect={onItemSelect}/>
                    <DropdownItem title="Fibonacci" onItemSelect={onItemSelect}/>
                </DropdownItem>
            </DropdownItem>
        </div>
    );
};

export default ListPane;





