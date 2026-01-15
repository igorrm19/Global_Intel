const search = document.getElementById("search");
const body = document.getElementById("cards");
const card = document.getElementById("card");

let res;
let http = "https://restcountries.com/v3.1/independent?status=true";
let data = [];
let dataOriginal = [];


async function Paises() {

    try {

        res = await fetch(http);
        data = await res.json();
        dataOriginal = [...data];

        Render();


    } catch (err) {

        console.error("Um erro interno aconteceu");
        card.textContent = "Erro interno";

    }

}


function Render() {
    body.innerHTML = "";

    data.forEach(pais => {

        const cardRender = card.cloneNode(true);

        cardRender.removeAttribute("id");
        cardRender.style.height = "400px";
        cardRender.style.width = "300px";
        cardRender.style.backgroundColor = "springgreen"
        cardRender.style.margin = "20px";

        const src = pais.flags.png;

        const nomePais = document.createElement("h3");
        const imagePais = document.createElement("img");
        const divPais = document.createElement("div");



        if (nomePais) {
            nomePais.textContent = pais.name.common;
            nomePais.style.padding = "20px";
            nomePais.style.color = "rgb(14, 90, 65)";
        }


        if (imagePais) {
            imagePais.src = src;
            imagePais.style.height = "150px";
            imagePais.style.width = "80%";
            imagePais.style.borderRadius = "10px";

        }


        if (divPais) {

            let paisOrigin = pais.name.common;
            let moeda = Object.values(pais.currencies)[0].name;
            let capital = pais.capital?.[0];
            let regiao = pais.region;
            let populacao = pais.population.toLocaleString("pt-BR");

            divPais.style.display = "flex";
            divPais.style.flexDirection = "column";
            divPais.style.justifyContent = "end";
            divPais.style.alignItems = "start";
            divPais.style.padding = "10px";
            divPais.style.marginTop = "60px"
            

            const regiaoPais = document.createElement("p")
            const moedaPais = document.createElement("p")
            const caitalPais = document.createElement("p")
            const populacaoPais = document.createElement("p")

            regiaoPais.textContent = `PAIS:   ${paisOrigin}`;
            moedaPais.textContent = `MOEDA:  ${moeda}`;
            caitalPais.textContent = `CAPITAL:  ${capital}`;
            regiaoPais.textContent = `REGIAO:  ${regiao}`;
            populacaoPais.textContent = `POPULACAO:  ${populacao}`;

            divPais.appendChild(regiaoPais);
            divPais.appendChild(moedaPais);
            divPais.appendChild(caitalPais);
            divPais.appendChild(regiaoPais);
            divPais.appendChild(populacaoPais);
        }



        cardRender.appendChild(nomePais);
        cardRender.appendChild(imagePais);
        cardRender.appendChild(divPais);
        body.appendChild(cardRender);

    });


}


search.addEventListener("input", () => {
    const key = search.value.toLowerCase().trim();


    if (!key) {
        data = [...dataOriginal];
        Render();
        return;
    }

    data = dataOriginal.filter(pais =>
        pais.name.common.toLowerCase().includes(key) ||
        pais.region.toLowerCase().includes(key) ||
        pais.capital?.[0]?.toLowerCase().includes(key)
    );

    Render();
});

Paises();