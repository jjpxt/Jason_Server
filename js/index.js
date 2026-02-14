// npx json-server --watch data/db.json

//  Na versão 1.x (beta) do json-server o comportamento mudou de propósito:id sempre é 
// tratado como  string internamente.
// Quando você faz um POST sem fornecer um "id" no body, ele gera automaticamente 
// um ID aleatório curto (tipo 4 caracteres hexadecimais, como "54ae", "c917" etc.).
// Não existe mais autoincremento numérico (1 → 2 → 3...) nessa versão, mesmo se os
//  IDs existentes forem números. 
// É o design novo: "id is always a string and will be generated for you if missing" 

// Downgrade para a versão estável antiga (v0.17.x) — onde autoincremento numérico funciona
// Isso resolve 100% o que você quer (IDs sequenciais 7, 8, 9...).
// Passos: 1° npm uninstall json-server
//             2° npm install json-server@0.17.4



const container = document.querySelector(".blogs");

const renderPosts = async () => {
    let uri = 'http://localhost:3000/posts/';
    const res = await fetch(uri);
    const posts = await res.json();

    let template = '';
    posts.forEach(post => {
        template += `
        <div class="post">
            <h2>${post.title}</h2>
            <p><small>${post.likes} likes</small></p>
            <p>${post.body.slice(0, 200)}</p>
            <a href="/details.html?id=${post.id}"> read more </a>
        </div>
        `
    });

    container.innerHTML = template;

}

window.addEventListener("DOMContentLoaded", () => renderPosts());