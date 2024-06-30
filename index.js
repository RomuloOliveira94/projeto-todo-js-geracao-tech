function novaTarefa() {
  overlay.classList.add("active");
  criarTarefa.classList.add("active");
}

function fecharTarefa() {
  overlay.classList.remove("active");
  criarTarefa.classList.remove("active");
}

async function buscarTarefas() {
  const response = await fetch("http://localhost:3000/tarefas");
  const data = await response.json();
  return atualizarTarefas(data);
}

async function excluirTarefa(id) {
  await fetch(`http://localhost:3000/tarefas/${id}`, {
    method: "DELETE",
  });
}

function atualizarTarefas(listaDeTarefas) {
  if (listaDeTarefas.length === 0) {
    lista.innerHTML = "<h6>Nenhuma tarefa registrada.</h6>";
    return;
  }

  lista.innerHtml = "";
  listaDeTarefas.forEach((tarefa) => {
    const data = formatDate(tarefa.data);

    lista.innerHTML += `<li>
    <h3>${tarefa.titulo}</h3>
    <p>
    ${tarefa.descricao}
    </p>
    <p>${data}</p>
    <div class="botoesTarefa">
    <button onclick="excluirTarefa(${tarefa.id})">Excluir</button>
    </div>
    </li>`;
  });
}

async function inserirTarefa() {
  event.preventDefault();
  let tarefa = {
    titulo: titulo.value,
    descricao: descricao.value,
    data: data.value,
  };

  await fetch("http://localhost:3000/tarefas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tarefa),
  });
}

function formatDate(data) {
  const dataFormatada = new Date(data);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  };
  return dataFormatada.toLocaleDateString("pt-BR", options);
}

function pesquisarTarefas() {
  const taskLi = document.querySelectorAll("ul li");
  
  if (busca.value.length > 0) {
    taskLi.forEach((li) => {
      if (li.children[1].innerText.toLowerCase().includes(busca.value.toLowerCase())) {
        li.classList.remove("oculto");
      } else {
        li.classList.add("oculto");
      }
    })
  } else {
    taskLi.forEach((li) => {
      li.classList.remove("oculto");
    })
  }
}

buscarTarefas();
