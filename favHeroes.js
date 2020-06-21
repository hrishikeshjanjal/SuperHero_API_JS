const favHeroContainer = document.getElementById("fav-hero-container");
const body = document.getElementsByTagName("body")[0];
var favHeroes = JSON.parse(localStorage.getItem("favHeroes"));

if(favHeroes.length == 0){
    let div = document.createElement('div');
    div.innerHTML = '<h2>No Favourite Super Heroes</h2><a href="./index.html">Add Favourite Super Heroes</a>';
    favHeroContainer.appendChild(div);
}else{
    for(let i of favHeroes){
        let div = document.createElement('div');
        div.innerHTML = '<h4>'+i.name+'</h4><button id="remove" data-id="'+i.id+'">remove</button><img src="'+i.photoUrl+'" alt="" class="favImage">';
        favHeroContainer.appendChild(div);
    }
    
    const removeButtons = document.getElementsByTagName("button");
    for(let i of removeButtons){
        i.addEventListener("click", function(){
            function remove(value){
                return this.dataset.id != value.id;
            }
            favHeroes = favHeroes.filter(remove.bind(i));
            localStorage.setItem('favHeroes', JSON.stringify(favHeroes));
            location.reload();
        });
    }
    
    let link = document.createElement("a");
    link.setAttribute("href", "./index.html");
    link.innerHTML = "Add More Super Heroes To My Favourite List";
    body.appendChild(link);
}
