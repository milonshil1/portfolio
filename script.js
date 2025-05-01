// Dark Mode Toggle
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}

toggleSwitch.addEventListener('change', switchTheme, false);

// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

mobileMenu.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Blog Posts Data
const posts = [
    {
        title: "Blog Post Title 1",
        date: "March 21, 2025",
        content: "Summary of the blog post 1...",
        link: "post1.html"
    },
    {
        title: "Blog Post Title 2",
        date: "March 21, 2025",
        content: "Summary of the blog post 2...",
        link: "post2.html"
    },
    {
        title: "Advanced Data Analysis Techniques",
        date: "March 21, 2025",
        content: "Discover advanced techniques for data analysis.",
        link: "advanced-data-analysis.html"
    },
    {
        title: "Introduction to Machine Learning",
        date: "March 21, 2025",
        content: "Learn the basics of machine learning and its applications.",
        link: "introduction-to-machine-learning.html"
    }
];

const postsPerPage = 6; // Number of posts per page
let currentPage = 1;

// Load Posts
function loadPosts(page) {
    const blogPosts = document.getElementById('blogPosts');
    blogPosts.innerHTML = ''; // Clear previous posts

    const start = (page - 1) * postsPerPage;
    const end = start + postsPerPage;

    posts.slice(start, end).forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.setAttribute('data-title', post.title);
        postElement.setAttribute('data-content', post.content);
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>Date: ${post.date}</p>
            <p>${post.content}</p>
            <a href="${post.link}" class="btn">Read More</a>
        `;
        blogPosts.appendChild(postElement);
    });

    updatePagination();
}

// Update Pagination Buttons
function updatePagination() {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = ''; // Clear previous buttons

    const totalPages = Math.ceil(posts.length / postsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('a');
        button.href = '#';
        button.className = 'btn';
        button.innerText = i;
        if (i === currentPage) {
            button.classList.add('active');
        }
        button.addEventListener('click', () => {
            currentPage = i;
            loadPosts(currentPage);
        });
        pagination.appendChild(button);
    }
}

// Search Functionality
function searchPosts() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const filteredPosts = posts.filter(post => 
        post.title.toLowerCase().includes(input) || 
        post.content.toLowerCase().includes(input)
    );

    const blogPosts = document.getElementById('blogPosts');
    blogPosts.innerHTML = ''; // Clear previous posts

    filteredPosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.setAttribute('data-title', post.title);
        postElement.setAttribute('data-content', post.content);
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>Date: ${post.date}</p>
            <p>${post.content}</p>
            <a href="${post.link}" class="btn">Read More</a>
        `;
        blogPosts.appendChild(postElement);
    });
}

// Load First Page
loadPosts(currentPage);