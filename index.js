const searchHero = document.getElementById("searchHero");
const liveSearch = document.getElementById("liveSearch");
var favourite_buttons = [];

searchHero.addEventListener("keyup", function(){
    var xhttp = new XMLHttpRequest();
    var searchValue = this.value;
    if(searchValue.length === 0){
        liveSearch.innerHTML = "";
        return;
    }
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const response = JSON.parse(xhttp.responseText);
            if(response.response === "error"){
                liveSearch.innerHTML = "";
                return;
            }

            const results = response.results
            liveSearch.innerHTML = "";

            for(let i of results){
                var li = document.createElement("li");
                li.classList.add("search-item");
                li.innerHTML = '<a href="" class="searchResults" id="'+i.id+'">'+i.name+'<img src="'+i.image.url+'" alt="" class="image-size"></a></><button id="'+i.id+'" data-name="'+i.name+'" data-photo="'+i.image.url+'">Favourite</button>';
                liveSearch.appendChild(li);
            }

            let resultHeros = document.getElementsByClassName("searchResults");
                for(let j of resultHeros){
                    j.addEventListener("click", function(event){
                        event.preventDefault();
                        console.log(this.id);
                        localStorage.setItem('heroSelected', this.id);
                        location.replace("./heroDetails.html");
                    });
                }

            favourite_buttons = document.getElementsByTagName("button");
            for(let i of favourite_buttons){
                i.addEventListener("click", function(){
                    if(i.innerHTML === "Added"){
                        i.innerHTML = "Favourite"
                        function remove(value){
                            return this.id != value.id;
                        }
                        let oldItems = JSON.parse(localStorage.getItem("favHeroes")) || [];
                        newItems = oldItems.filter(remove.bind(i));
                        localStorage.setItem('favHeroes', JSON.stringify(newItems));
                        return;
                    }
                    i.innerHTML = "Added"
                    let favItem = {
                        id: this.id,
                        name: this.dataset.name,
                        photoUrl: this.dataset.photo
                    }
                    let oldItems = JSON.parse(localStorage.getItem("favHeroes")) || [];
                    oldItems.push(favItem);
                    localStorage.setItem('favHeroes', JSON.stringify(oldItems));
                });
            }
            
        }
    };
    xhttp.open("GET", "https://www.superheroapi.com/api.php/3383566708344630/search/"+searchValue, true);
    xhttp.send();
});



