const form = document.getElementById("memberForm");
const cardsContainer = document.getElementById("cardsContainer");
const printBtn = document.getElementById("printBtn");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const nom = document.getElementById("nom").value;
  const prenom = document.getElementById("prenom").value;
  const dob = document.getElementById("dob").value;
  const sexe = document.getElementById("sexe").value;
  const pays = document.getElementById("pays").value;
  const fonction = document.getElementById("fonction").value;

  const randomDigits = Math.floor(100 + Math.random() * 900);
  const id = "MEM" + Date.now().toString().slice(-5) + randomDigits;

  let photoURL = "";
  const photoInput = document.getElementById("photo");

  if(photoInput.files && photoInput.files[0]){
    const reader = new FileReader();
    reader.onload = function(event){
      photoURL = event.target.result;
      addCard();
    };
    reader.readAsDataURL(photoInput.files[0]);
  } else {
    addCard();
  }

  function addCard(){
    const card = document.createElement("div");
    card.className = "carte-membre";
    card.innerHTML = `
      <div class="carte-header">
        <img src="assets/logos/drapeau du sn.png" class="logo">
        <div class="header-text"><strong>KÉWÉRÉ - RÉPUBLIQUE DE GUINÉE</strong></div>
        <img src="assets/logos/carte gn.png" class="logo">
      </div>
      <div class="carte-body">
        <div class="photo"><img src="${photoURL}" alt="Photo du membre"></div>
        <div class="infos">
          <div class="info-row"><span class="label">Nom</span><span class="value">${nom}</span></div>
          <div class="info-row"><span class="label">Prénom</span><span class="value">${prenom}</span></div>
          <div class="info-row"><span class="label">ID</span><span class="value id-highlight">${id}</span></div>
          <div class="info-row"><span class="label">Naissance</span><span class="value">${dob}</span></div>
          <div class="info-row"><span class="label">Sexe</span><span class="value">${sexe}</span></div>
          <div class="info-row"><span class="label">Pays</span><span class="value">${pays}</span></div>
          <div class="info-row"><span class="label">Fonction</span><span class="value">${fonction}</span></div>
        </div>
      </div>
      <div class="qrcode" id="qrcode-${id}"></div>
    `;
    cardsContainer.appendChild(card);

    // Génération du QR Code (discret à droite)
    const qrcodeDiv = document.getElementById(`qrcode-${id}`);
    new QRCode(qrcodeDiv, {
      text: `https://kewere.vercel.app/membre/${id}`,
      width: 45,
      height: 45
    });

    form.reset();
  }
});

// Bouton imprimer
printBtn.addEventListener("click", function(){
  window.print();
});
