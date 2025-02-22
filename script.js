document.addEventListener('DOMContentLoaded', () => {
    const itemsContainer = document.querySelector('.items');
    const items = document.querySelectorAll('.item');
    
    let isDragging = false;
    let initialX = 0;
    let initialScrollLeft = 0;

    // Add event listeners to the container instead of individual items
    itemsContainer.addEventListener('mousedown', startDragging);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDragging);

    function startDragging(e) {
        // Only start dragging if clicking on an item
        if (!e.target.classList.contains('item')) return;

        isDragging = true;
        itemsContainer.classList.add('active');
        
        initialX = e.pageX;
        initialScrollLeft = itemsContainer.scrollLeft;
    }

    function drag(e) {
        if (!isDragging) return;

        e.preventDefault();
        
        // Calculate the distance moved
        const deltaX = e.pageX - initialX;
        
        // Update container scroll position
        const newScrollLeft = initialScrollLeft - deltaX;
        itemsContainer.scrollLeft = Math.max(0, newScrollLeft);
        
        // If you still want individual item movement (optional)
        const clickedItem = itemsContainer.querySelector('.item:hover') || e.target;
        if (clickedItem) {
            const rect = clickedItem.getBoundingClientRect();
            clickedItem.style.position = 'absolute';
            clickedItem.style.left = `${rect.left - itemsContainer.getBoundingClientRect().left + itemsContainer.scrollLeft}px`;
            clickedItem.style.zIndex = 1000;
        }
    }

    function stopDragging() {
        if (isDragging) {
            itemsContainer.classList.remove('active');
            isDragging = false;
            
            // Reset z-index for all items
            items.forEach(item => {
                item.style.zIndex = 1;
            });
        }
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        itemsContainer.scrollLeft = Math.min(
            itemsContainer.scrollLeft,
            itemsContainer.scrollWidth - itemsContainer.clientWidth
        );
    });
});