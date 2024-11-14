// populate the articles page

document.addEventListener("DOMContentLoaded", () => {
    const newsContainer = document.querySelector(".news-container");

    // Function to fetch articles from the backend
    async function fetchArticles() {
        try {
            const response = await fetch("http://localhost:3000/api/news");
			console.log(response);
            if (response.ok) {
                const articles = await response.json();
                displayArticles(articles);
            } else {
                newsContainer.innerHTML = "<p>Error loading articles.</p>";
            }
        } catch (error) {
            newsContainer.innerHTML = "<p>Error loading articles.</p>";
            console.error("Fetch error:", error);
        }
    }

// Function to display articles in the DOM
function displayArticles(articles) {
    const newsContainer = document.querySelector(".news-container");
    newsContainer.innerHTML = ""; // Clear any previous content

    articles.forEach(article => {
        const articleCard = document.createElement("div");
        articleCard.classList.add("article-card");

        // Title
        const title = document.createElement("h2");
        title.classList.add("article-title");
        title.textContent = article.title;

        // Author and Date
        const meta = document.createElement("p");
        meta.classList.add("article-meta");
        const date = new Date(article.date).toLocaleDateString();
        meta.textContent = `By ${article.author} | ${date}`;

        // Category
        const category = document.createElement("span");
        category.classList.add("article-category");
        category.textContent = article.category;

        // Description
        const description = document.createElement("p");
        description.classList.add("article-description");
        description.textContent = article.description;

        // Append elements to card
        articleCard.appendChild(title);
        articleCard.appendChild(meta);
        articleCard.appendChild(category);
        articleCard.appendChild(description);

        // Append card to container
        newsContainer.appendChild(articleCard);
    });
}


    // Call the fetchArticles function on page load
    fetchArticles();
});
