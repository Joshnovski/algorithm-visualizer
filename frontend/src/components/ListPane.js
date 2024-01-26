import React, {useState} from 'react';

const DropdownItem = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const containerStyle = isOpen ? { backgroundColor: 'rgb(44, 44, 44)' } : {};

    return (
        <div className="dropdown-container">
            <div className="dropdown-title-container" style={containerStyle}>
                <div className="dropdown-title" onClick={() => setIsOpen(!isOpen)}>
                    {title}
                </div>
            </div>
            {isOpen && (
                <div className="dropdown-content">
                    <div className="dropdown-inner-content">
                        {children}
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
                {/* ... continue nesting DropdownItems here ... */}
            </DropdownItem>
            {/* ... more top-level DropdownItems ... */}
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





