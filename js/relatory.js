function copiarParaClipboard(texto) {
  navigator.clipboard
    .writeText(texto)
    .then(() => {
      alert("Dados copiados para a área de transferência!");
    })
    .catch((err) => {
      console.error("Erro ao copiar: ", err);
    });
}

function obterTextoCompleto() {
  const campos = document.querySelectorAll(
    "form input, form select, form textarea"
  );
  let texto = "";
  campos.forEach((campo) => {
    if (campo.type === "checkbox") {
      texto += `${campo.previousElementSibling?.innerText || campo.id}: ${
        campo.checked ? "Sim" : "Não"
      }\n`;
    } else if (campo.tagName === "SELECT") {
      texto += `${campo.previousElementSibling?.innerText || campo.id}: ${
        campo.options[campo.selectedIndex].text
      }\n`;
    } else {
      texto += `${campo.previousElementSibling?.innerText || campo.id}: ${
        campo.value
      }\n`;
    }
  });
  return texto;
}

function obterTextoValidado() {
  const ids = ["userId", "ordemServico", "os", "tecnico", "cidade"];
  let texto = "";
  ids.forEach((id) => {
    let campo = document.getElementById(id);
    if (campo) {
      if (campo.type === "checkbox") {
        texto += `${campo.previousElementSibling.innerText}: ${
          campo.checked ? "Sim" : "Não"
        }\n`;
      } else if (campo.tagName === "SELECT") {
        texto += `${campo.previousElementSibling.innerText}: ${
          campo.options[campo.selectedIndex].text
        }\n`;
      } else {
        texto += `${campo.previousElementSibling.innerText}: ${campo.value}\n`;
      }
    }
  });
  return texto;
}

function gerarPDF(event) {
  if (typeof window.jspdf === "undefined") {
    console.error("jsPDF não foi carregado corretamente.");
    return;
  }
  event.preventDefault();

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src =
    "https://raw.githubusercontent.com/VictorBaFreitas/ActivationSiteConnect/refs/heads/main/LogoConnect.png";

  img.onload = function () {
    doc.addImage(img, "PNG", 10, 10, 140, 30);
    adicionarTextoAoPDF(doc);
  };
}

function adicionarTextoAoPDF(doc) {
  let y = 70;
  const campos = document.querySelectorAll(
    "form input, form select, form textarea"
  );

  campos.forEach((campo) => {
    let label = campo.previousElementSibling?.innerText || campo.id;
    let valor = campo.value;

    if (campo.type === "checkbox") {
      valor = campo.checked ? "Sim" : "Não";
    } else if (campo.tagName === "SELECT") {
      valor = campo.options[campo.selectedIndex].text;
    }

    doc.text(`${label}: ${valor}`, 10, y);
    y += 10;
  });

  let userId = document.getElementById("userId")?.value || "Ativacao";
  let nomeArquivo = `${userId}.pdf`;

  doc.save(nomeArquivo);
  alert("PDF gerado e salvo!");
}

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("gerarValidado")
    .addEventListener("click", function (event) {
      event.preventDefault();
      copiarParaClipboard(obterTextoValidado());
    });

  document
    .getElementById("gerarAtendimento")
    .addEventListener("click", function (event) {
      event.preventDefault();
      copiarParaClipboard(obterTextoCompleto());
    });

  document.getElementById("gerarPDF").addEventListener("click", gerarPDF);
});
