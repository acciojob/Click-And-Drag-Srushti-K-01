document.addEventListener('DOMContentLoaded', () => {
    const itemsContainer = document.querySelector('.items');
    const items = document.querySelectorAll('.item');
    
    let selectedItem = null;
    let initialX = 0;
    let initialScrollLeft = 0;

   
    items.forEach(item => {
        item.addEventListener('mousedown', startDragging);
    });

    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDragging);

    function startDragging(e) {
        selectedItem = e.target;
        itemsContainer.classList.add('active');
        
        
        const rect = selectedItem.getBoundingClientRect();
        selectedItem.style.position = 'absolute';
        selectedItem.style.left = `${rect.left - itemsContainer.getBoundingClientRect().left + itemsContainer.scrollLeft}px`;
        selectedItem.style.top = `${rect.top - itemsContainer.getBoundingClientRect().top}px`;

        initialX = e.clientX;
        initialScrollLeft = itemsContainer.scrollLeft;
        
        selectedItem.style.zIndex = 1000;
    }

    function drag(e) {
        if (!selectedItem) return;

        e.preventDefault();

 
        const deltaX = e.clientX - initialX;
        
        
        const newScrollLeft = initialScrollLeft - deltaX;
        itemsContainer.scrollLeft = Math.max(0, newScrollLeft);

        
        const containerRect = itemsContainer.getBoundingClientRect();
        const itemWidth = selectedItem.offsetWidth;
        let newX = e.clientX - containerRect.left - (itemWidth / 2) + itemsContainer.scrollLeft;
        
        
        newX = Math.max(0, Math.min(newX, itemsContainer.scrollWidth - itemWidth));
        
        selectedItem.style.left = `${newX}px`;
    }

    function stopDragging() {
        if (selectedItem) {
            itemsContainer.classList.remove('active');
            selectedItem.style.zIndex = 1;
            selectedItem = null;
        }
    }

    
    window.addEventListener('resize', () => {
        if (selectedItem) {
            const rect = itemsContainer.getBoundingClientRect();
            selectedItem.style.left = `${Math.min(
                parseFloat(selectedItem.style.left),
                itemsContainer.scrollWidth - selectedItem.offsetWidth
            )}px`;
        }
    });
});