async function searchRepos() {
    const username = document.getElementById('searchInput').value.trim();
    const repoListContainer = document.getElementById('repoList');
    repoListContainer.innerHTML = '';

    if (username === '') {
        alert('Please enter a GitHub username.');
        return;
    }

    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        const data = await response.json();

        if (response.status === 200) {
            if (data.length === 0) {
                repoListContainer.innerHTML = '<p>No repositories found.</p>';
            } else {
                data.forEach(repo => {
                    const repoItem = document.createElement('div');
                    repoItem.classList.add('repoItem');
                    repoItem.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
                    repoListContainer.appendChild(repoItem);
                });
            }
        } else {
            repoListContainer.innerHTML = `<p>Error: ${data.message}</p>`;
        }
    } catch (error) {
        repoListContainer.innerHTML = '<p>Failed to fetch repositories. Please try again later.</p>';
        console.error(error);
    }
}
