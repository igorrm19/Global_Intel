const search = document.getElementById("search");
const body = document.getElementById("cards");
const card = document.getElementById("card");

let res;
let http = "https://restcountries.com/v3.1/independent?status=true"
let data = [];


async function Paises() {

    try {

        res = await fetch(http);
        data = await res.json();
        console.log(data);

        Render();


    } catch (err) {

        console.error("Um erro interno aconteceu");
        card.textContent = "Erro interno";

    }

}


function Render() {

    data.forEach(pais => {

        const cardRender = card.cloneNode(true);

        cardRender.removeAttribute("id");
        cardRender.style.height = "400px";
        cardRender.style.width = "300px";
        cardRender.style.backgroundColor = "springgreen"
        cardRender.style.margin = "20px";

        const src = pais.flags.png;

        const nomePais = document.createElement("h3");
        const imagePais = document.createElement("img")
        imagePais.src = src;
        imagePais.style.height = "150px";
        imagePais.style.width = "80%";
        imagePais.style.borderRadius = "10px";


        if(nomePais){
            nomePais.textContent = pais.name.common;
            nomePais.style.padding = "20px";
            nomePais.style.color = "rgb(14, 90, 65)";
        }


        cardRender.appendChild(nomePais);
        cardRender.appendChild(imagePais);
        body.appendChild(cardRender);

    });


}


search.addEventListener("input", () => {
    const key = search.value.toLowerCase().trim();


    console.log(key);
});

Paises();