let filtro = "";
let busca = "";
let index = 0;
const passo = 4;

const receitas = [
    { nome: "Pizza", tipo: "Tradicional", img: "img/culinaria.png", nota: "4.8" },
    { nome: "Spaghetti Carbonara", tipo: "Massa", img: "img/macarrao1.png", nota: "4.7" },
    { nome: "Lasanha", tipo: "Tradicional", img: "img/lasanha1.png", nota: "4.9" },
    { nome: "Bruschetta", tipo: "Entrada", img: "img/bruschetta1.png", nota: "4.4" },
    { nome: "Ravioli", tipo: "Massa", img: "img/ravioli1.png", nota: "4.6" },
    { nome: "Tiramisu", tipo: "Sobremesa", img: "img/tiramisu1.png", nota: "4.9" }
];

function getFiltradas() {
    return receitas
        .filter(r => !filtro || r.tipo === filtro)
        .filter(r => r.nome.toLowerCase().includes(busca));
}

function mostrarLoader() {
    let btn = document.getElementById("loadMore");

    btn.innerHTML = `
                <div class="spinner-border spinner-border-sm text-light me-2"></div>
                Carregando...
                `;

    btn.disabled = true;
}

function modoInfinitoFake() {
    let btn = document.getElementById("loadMore");

    btn.classList.remove("btn-danger");
    btn.classList.add("btn-secondary");

    btn.innerHTML = `
                <div class="spinner-border spinner-border-sm me-2"></div>
                Buscando mais receitas...
                `;

    btn.disabled = true;
}

function render(reset = false) {

    let c = document.getElementById("cards");

    if (reset) {
        c.innerHTML = "";
        index = 0;
    }

    let filtradas = getFiltradas();

    let bloco = filtradas.slice(index, index + passo);

    bloco.forEach(r => {
        c.innerHTML += `
                    <a href="receita.html?receita=${encodeURIComponent(r.nome)}" class="receita-card">
                    <img src="${r.img}">
                    <div class="receita-content">

                    <div class="receita-top">
                    <h5>${r.nome}</h5>
                    <span class="nota">⭐ ${r.nota}</span>
                    </div>

                    <small>${r.tipo}</small>
                    <p>Prato típico da culinária italiana.</p>

                    </div>
                    </a>
                    `;
    });

    index += passo;

    let btn = document.getElementById("loadMore");

    if (index < filtradas.length) {

        btn.innerHTML = "Carregar mais";
        btn.disabled = false;
        btn.classList.remove("btn-secondary");
        btn.classList.add("btn-danger");
    }

    else {
        modoInfinitoFake();
        /* efeito contínuo de “buscando mais” */
        setInterval(() => {
            if (btn.disabled) {
                btn.innerHTML = `
    <div class="spinner-border spinner-border-sm me-2"></div>
    Procurando mais receitas Da Itália...
    `;
            }
        }, 2500);

    }
}

/* FILTRO */
function setFiltro(btn, f) {
    filtro = f;
    document.querySelectorAll(".filtro-btn").forEach(b => {
        b.classList.remove("active");
    });
    btn.classList.add("active");
    render(true);
}

/* BUSCA */
document.getElementById("search").addEventListener("input", e => {
    busca = e.target.value.toLowerCase();
    render(true);
});


document.getElementById("loadMore").onclick = () => {
    render();
};

render(true);