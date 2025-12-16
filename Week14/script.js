document.addEventListener('DOMContentLoaded', () => {
    const newsGrid = document.getElementById('news-grid');
    const DATA_URL = 'data.json';

    fetch(DATA_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            renderNews(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            newsGrid.innerHTML = '<p>載入新聞發生錯誤，請稍後再試。</p>';
        });

    function renderNews(newsItems) {
        newsGrid.innerHTML = '';
        newsItems.forEach(item => {
            const card = document.createElement('article');
            card.className = 'news-card';
            
            card.innerHTML = `
                <div class="card-image">
                    <img src="${item.image}" alt="${item.title}" loading="lazy">
                </div>
                <div class="card-content">
                    <div class="card-info">
                        <span class="category">${item.category}</span>
                        <span class="separator">|</span>
                        <span class="date">${item.date}</span>
                    </div>
                    <h3 class="card-title">${item.title}</h3>
                    <p class="card-desc">${item.description}</p>
                </div>
            `;
            
            newsGrid.appendChild(card);
        });
    }
});
