// Your code here.
document.addEventListener('DOMContentLoaded', () => {
    const itemsContainer = document.querySelector('.items');
    const items = document.querySelectorAll('.item');
    
    let selectedItem = null;
    let offsetX = 0;
    let offsetY = 0;
    let initialX = 0;
    let initialY = 0;

    // Get container boundaries
    const containerRect = itemsContainer.getBoundingClientRect();
    const itemWidth = 200;  // Fixed width from CSS
    const itemHeight = itemsContainer.offsetHeight - 40; // Height from CSS calc

    // Add event listeners to each item
    items.forEach(item => {
        item.addEventListener('mousedown', startDragging);
    });

    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDragging);

    function startDragging(e) {
        selectedItem = e.target;
        itemsContainer.classList.add('active');
        
        // Convert to absolute positioning
        const rect = selectedItem.getBoundingClientRect();
        selectedItem.style.position = 'absolute';
        selectedItem.style.left = `${rect.left - containerRect.left}px`;
        selectedItem.style.top = `${rect.top - containerRect.top}px`;

        // Calculate offset
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        
        initialX = rect.left - containerRect.left;
        initialY = rect.top - containerRect.top;
        
        selectedItem.style.zIndex = 1000;
    }

    function drag(e) {
        if (!selectedItem) return;

        e.preventDefault();

        // Calculate new position
        let newX = e.clientX - offsetX - containerRect.left;
        let newY = e.clientY - offsetY - containerRect.top;

        // Apply boundary constraints
        newX = Math.max(0, Math.min(newX, containerRect.width - itemWidth));
        newY = Math.max(0, Math.min(newY, containerRect.height - itemHeight));

        // Update position
        selectedItem.style.left = `${newX}px`;
        selectedItem.style.top = `${newY}px`;
    }

    function stopDragging() {
        if (selectedItem) {
            itemsContainer.classList.remove('active');
            selectedItem.style.zIndex = 1;
            selectedItem = null;
        }
    }

    // Handle window resize to update container boundaries
    window.addEventListener('resize', () => {
        const newRect = itemsContainer.getBoundingClientRect();
        containerRect.left = newRect.left;
        containerRect.top = newRect.top;
        containerRect.width = newRect.width;
        containerRect.height = newRect.height;
    });
});