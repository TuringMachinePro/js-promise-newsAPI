// Search Bar
find.addEventListener('input', function () {
    function showMessage(msg) {
        return `<h1>${msg}</h1>`;
    }

    news.innerHTML = showMessage('Loading...');

    const url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=cd4f5553bb0b481e8fb1c779b9e4540a'
    const urlSearch = `https://newsapi.org/v2/everything?q=${this.value}&from=2022-02-19&sortBy=popularity&apiKey=cd4f5553bb0b481e8fb1c779b9e4540a`
    
    if (this.value.length > 0) {
        fetch(urlSearch)
            .then(respone => respone.json())
            .then((result) => {
                if(result.totalResults === 0){
                    news.innerHTML = showMessage('There\'s no article for this keyword')
                } else {
                    news.innerHTML = render(result)
                }
            }).catch(() => {
                news.innerHTML = showMessage(new Error ('There\'s no article for this keyword'))
            }).finally(() => {

            })
    } else {
        fetch(url)
            .then(respone => respone.json())
            .then((result) => {
                news.innerHTML = render(result)
            }).catch(() => {
                news.innerHTML = showMessage(new Error ('Exceed Limit'))
            }).finally(() => {

            })
    }

    let render = (data) => {
        let newsAPI = '';
        data.articles.forEach((d) => {

            // Get Date
            let newsApiDate = d.publishedAt;
            let timeStamp = new Date(newsApiDate).getTime();
            let day = new Date(timeStamp).getDate();
            let month = new Date(timeStamp).getMonth();
            let year = new Date(timeStamp).getFullYear();
            // Get Date

                newsAPI += `
                        <div class="col-lg-4 col-md-4 col-sm-12">
                            <div class="card mt-2 p-2" style="width: 18rem;" id="cardEffect">
                                <img class="card-img-top" src="${d.urlToImage}" alt="Card image cap">
                                <div class="card-body">
                                    <h5 class="card-title">${d.title}</h5>
                                    <p><small>${d.author} - ${day}/${month}/${year}</small></p>
                                    <p class="card-text">${d.description}</p>
                                    <a href="${d.url}" class="btn btn-primary">Read More</a>
                                </div>
                            </div>
                        </div>
                        `
        });

        return newsAPI;
    }
})