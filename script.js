const API_KEY = "fb6879a211154767841e41d687d24134";
const URL = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("headlines"));

// Fetch news based on the category
async function fetchNews(category) {
    try {
        let res = await fetch(`${URL}${category}&from=2024-11-10&apiKey=${API_KEY}`);
        let data = await res.json();
        console.log(data);

        if (data.articles) {
            bindNews(data.articles);
        } else {
            console.error("No articles found");
        }
    } catch (error) {
        console.error("Error fetching news:", error);
    }
}

// Bind news articles to the DOM
const bindNews = (articles) => {
    const newsContainer = document.querySelector(".row");
    if (articles.length > 0) {
        let str = "";
        articles.filter(article => article.urlToImage && article.urlToImage !== "null").forEach((article) => {
            str += `
            <div class="col-xl-4 news-card">
                <div class="card">
                    <img src="${article.urlToImage}" class="card-img-top" alt="news-img" />
                    <div class="card-body">
                        <h4 class="card-title">${article.title}</h4>
                        <h6>${article.source.name} 📢 ${new Date(article.publishedAt).toLocaleDateString()}</h6>
                        <p class="card-text">${article.description || "Description not available."}</p>
                        <a href="${article.url}" target="_blank" class="btn btn-primary">Read More...</a>
                    </div>
                </div>
            </div>`;
        });
        newsContainer.innerHTML = str;
    } else {
        newsContainer.innerHTML = "<h4>No articles found</h4>";
    }
};

// Handle search form submission
const searchForm = document.querySelector("form");
searchForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent page reload
    const searchInput = document.querySelector("#search").value.trim();
    if (searchInput) {
        fetchNews(searchInput);
    } else {
        alert("Please enter a search term");
    }
});

const navLinks = document.querySelectorAll(".menus .nav-link");
navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent default link behavior
        const category = event.target.textContent.trim(); // Use the text of the link as the category
        fetchNews(category);
    });
});