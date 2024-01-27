import React, {useState} from 'react';

const DropdownItem = ({ title, children, level = 0 }) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasChildren = Boolean(children);
    const paddingLeftIncrement = 10 + level * 20;
    const containerStyle = {
        paddingLeft: `${paddingLeftIncrement}px`, 
        ...(isOpen ? { backgroundColor: '#393939' } : {})
    };

    return (
        <div className="dropdown-container">
            <div className="dropdown-title-container" style={containerStyle} onClick={() => hasChildren && setIsOpen(!isOpen)}>
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

const ListPane = () => {

    return (
        <div className="list-pane">
            <DropdownItem title="Fundamentals">
                <DropdownItem title="Introduction" />
                <DropdownItem title="Basic Concepts" />
            </DropdownItem>
            <DropdownItem title="Linear Data Structures">
                <DropdownItem title="Arrays">
                    <DropdownItem title="Operations">
                        <DropdownItem title="Inserting" />
                        <DropdownItem title="Deleting" />
                        <DropdownItem title="Accessing" />
                    </DropdownItem>
                    <DropdownItem title="Searching">
                        <DropdownItem title="Linear Search" />
                        <DropdownItem title="Binary Search" />
                    </DropdownItem>
                    <DropdownItem title="Sorting">
                        <DropdownItem title="Bubble Sort" />
                        <DropdownItem title="Insertion Sort" />
                        <DropdownItem title="Selection Sort" />
                        <DropdownItem title="Merge Sort" />
                        <DropdownItem title="Quick Sort" />
                        <DropdownItem title="Bucket Sort" />
                    </DropdownItem>
                </DropdownItem>
                <DropdownItem title="Linked Lists">
                    <DropdownItem title="Singly Linked List">
                        <DropdownItem title="Inserting" />
                        <DropdownItem title="Deleting" />
                    </DropdownItem>
                    <DropdownItem title="Doubly Linked List">
                        <DropdownItem title="Inserting" />
                        <DropdownItem title="Deleting" />
                    </DropdownItem>
                </DropdownItem>
                <DropdownItem title="Stacks">
                    <DropdownItem title="Push" />
                    <DropdownItem title="Pop" />
                </DropdownItem>
                <DropdownItem title="Queues">
                    <DropdownItem title="Enqueue" />
                    <DropdownItem title="Dequeue" />
                </DropdownItem>
            </DropdownItem>
            <DropdownItem title="Non-Linear Data Structures">
                <DropdownItem title="Trees">
                    <DropdownItem title="Binary Tree">
                        <DropdownItem title="Inorder" />
                        <DropdownItem title="Preorder" />
                        <DropdownItem title="Postorder" />
                        <DropdownItem title="Breadth First Search" />
                    </DropdownItem>
                    <DropdownItem title="Binary Search Tree">
                        <DropdownItem title="Inorder" />
                        <DropdownItem title="Preorder" />
                        <DropdownItem title="Postorder" />
                        <DropdownItem title="Breadth First Search" />
                    </DropdownItem>
                </DropdownItem>
                <DropdownItem title="Graphs">
                    <DropdownItem title="Directed Graph">
                        <DropdownItem title="Traversal">
                            <DropdownItem title="Breadth First Search" />
                            <DropdownItem title="Depth First Search" />
                        </DropdownItem>
                        <DropdownItem title="Pathfinding">
                            <DropdownItem title="Dijkstra's Algorithm" />
                            <DropdownItem title="A* Search" />
                        </DropdownItem>
                    </DropdownItem>
                    <DropdownItem title="Undirected Graph">
                        <DropdownItem title="Traversal">
                            <DropdownItem title="Breadth First Search" />
                            <DropdownItem title="Depth First Search" />
                        </DropdownItem>
                        <DropdownItem title="Pathfinding">
                            <DropdownItem title="A* Search" />
                            <DropdownItem title="Kruskal's Algorithm" />
                            <DropdownItem title="Prim's Algorithm" />
                        </DropdownItem>
                    </DropdownItem>
                    <DropdownItem title="Maze Generation">
                        <DropdownItem title="Recursive Division" />
                    </DropdownItem>
                </DropdownItem>
                <DropdownItem title="Hash Tables">
                    <DropdownItem title="Operations">
                        <DropdownItem title="Insert" />
                        <DropdownItem title="Delete" />
                        <DropdownItem title="Search" />
                    </DropdownItem>
                    <DropdownItem title="Hash Functions">
                        <DropdownItem title="Multiplication Method" />
                        <DropdownItem title="Division Method" />
                        <DropdownItem title="Universal Hashing" />
                    </DropdownItem>
                </DropdownItem>
            </DropdownItem>
            <DropdownItem title="Other">
                <DropdownItem title="Recursion">
                    <DropdownItem title="Factorial" />
                    <DropdownItem title="Fibonacci" />
                </DropdownItem>
            </DropdownItem>
        </div>
    );
};

export default ListPane;

// Fundamentals
    // Introduction
    // Basic Concepts
// Linear Data Structures
    // Arrays
        // Operations
            // Inserting
            // Deleting
            // Accessing
        // searching
            // Linear Search
            // Binary Search
        // Sorting
            // Bubble Sort
            // Insertion Sort
            // Selection Sort
            // Merge Sort
            // Quick Sort
            // Bucket Sort
    // Linked Lists
        // Singly Linked List
            // Inserting
            // Deleting
        // Doubly Linked List
            // Inserting
            // Deleting
    // Stacks
        // Push
        // Pop
    // Queues
        // Enqueue
        // Dequeue
// Non-Linear Data Structures
    // Trees
        // Binary Tree
            // Inorder
            // Preorder
            // Postorder
            // Breadth First Search
        // Binary Search Tree
            // Inorder
            // Preorder
            // Postorder
            // Breadth First Search
    // Graphs
        // Directed Graph
            // Traversal
                // Breadth First Search
                // Depth First Search
            // Pathfinding
                // Dijkstra's Algorithm
                // A* Search
        // Undirected Graph
            // Traversal
                // Breadth First Search
                // Depth First Search
            // Pathfinding
                // A* Search
                // Kruskal's Algorithm
                // Prim's Algorithm
        // Maze Generation
            // Recursive Division
    // Hash Tables
        // Operations
            // Insert
            // Delete
            // Search   
        // Hash Functions
            // Multiplication Method
            // Division Method
            // Universal Hashing
// Other
    // Recursion
        // Factorial
        // Fibonacci





