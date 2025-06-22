const resultadoDiv = document.getElementById("resultado");
const sorteadosDiv = document.getElementById("sorteados");

let numeros = [];
const maxSorteios = 20;

function sortear() {
  if (numeros.length >= maxSorteios) {
    resultadoDiv.innerHTML = `<strong>Limite de ${maxSorteios} sorteios atingido.</strong>`;
    return;
  }

  fetch("sorteador.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ usados: numeros }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.numero === null) {
        resultadoDiv.innerHTML = `<strong>Todos os números já foram sorteados.</strong>`;
        return;
      }

      const numero = data.numero;
      numeros.push(numero);
      resultadoDiv.innerHTML = `Número sorteado: <strong>${numero}</strong>`;

      atualizarSorteados();
    })
    .catch((err) => {
      resultadoDiv.innerHTML = "Erro ao sortear número.";
      console.error(err);
    });
}

function atualizarSorteados() {
  sorteadosDiv.innerHTML = "";
  numeros.forEach((n) => {
    const span = document.createElement("span");
    span.textContent = n;
    sorteadosDiv.appendChild(span);
  });
}

function resetar() {
  numeros = [];
  resultadoDiv.innerHTML = "";
  sorteadosDiv.innerHTML = "";
}
