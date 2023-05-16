const postsContainer = document.getElementById('posts');
// apimizin url in bildiririk
const apiUrl = 'http://localhost:3000/posts';

// postlari cekmek ucun funksiyam
function fetchPosts() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(posts => {
      displayPosts(posts);
    })
    .catch(error => {
      console.error('Error fetching posts:', error);
    });
}


// postlari gostermek ucun funksiyam
function displayPosts(posts) {
  postsContainer.innerHTML = '';

  posts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.innerHTML = `
      <h2>${post.title}</h2>
      <p>Author: ${post.author}</p>
      <button onclick="updatePost(${post.id})">Update</button>
      <button onclick="deletePost(${post.id})">Delete</button>
    `;
    postsContainer.appendChild(postElement);
  });
}

// yeni post yaratmaq ucun funksiya
function createPost() {
  const titleInput = document.getElementById('title');
  const authorInput = document.getElementById('author');

  const title = titleInput.value;
  const author = authorInput.value;

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title,
      author
    })
  })
    .then(response => response.json())
    .then(newPost => {
      console.log('New post created:', newPost);
      fetchPosts();
      titleInput.value = '';
      authorInput.value = '';
    })
    .catch(error => {
      console.error('Error creating post:', error);
    });
}

// movcud postu update etmek
function updatePost(postId) {
  const newTitle = prompt('Enter new title:');
  const newAuthor = prompt('Enter new author:');

  fetch(`${apiUrl}/${postId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: newTitle,
      author: newAuthor
    })
  })
    .then(response => response.json())
    .then(updatedPost => {
      console.log('Post updated:', updatedPost);
      fetchPosts();
    })
    .catch(error => {
      console.error('Error updating post:', error);
    });
}

// post silmek
function deletePost(postId) {
  if (confirm('Are you sure you want to delete this post?')) {
    fetch(`${apiUrl}/${postId}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(deletedPost => {
        console.log('Post deleted:', deletedPost);
        fetchPosts();
      })
      .catch(error => {
        console.error('Error deleting post:', error);
      });
  }
}

// form tesdiqlendikde yenisin elave etmek
document.getElementById('postForm').addEventListener('submit', function (event) {
  event.preventDefault();
  createPost();
});


fetchPosts();
