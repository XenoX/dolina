const connectWalletButton = document.querySelector(
  ".invest__section__connect-wallet__button"
);

connectWalletButton.addEventListener("click", async () => {
  if (typeof window.ethereum !== "undefined") {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length > 0) {
        // vérification si au moins un compte est connecté
        const accountAddress = accounts[0];
        console.log("Connected account:", accountAddress);

        // Chanchement du nom de la class pour plus de compréhension
        const walletInvestSection = document.querySelector(
          ".invest__section__connect-wallet__text"
        );
        walletInvestSection.classList.remove(
          "invest__section__connect-wallet__text"
        );
        walletInvestSection.classList.add("invest__section__connected-wallet");

        // apparition des boutons de transaction et déconnection
        const connectedWalletButtons = document.querySelector(
          ".invest__section__buttons"
        );
        connectedWalletButtons.style.visibility = "visible";

        //----------- Ajout de la section d'achat de token
        walletInvestSection.innerHTML = `
       <div class="connected-wallet__token-purchase">
      <div class="connected-wallet__select-crypto__wrapper">
        <p>Vous investissez en :</p>
        <div class="select-crypto__input input">
          <p>Matic</p>
          <div class="select-crypto__input__wrapper">
            <div class="select-crypto__input__current-value__wrapper">
              <span>1921</span>
              <span class="select-crypto__input__current-value--size">≈$1920</span>
            </div>
            <span class="line"></span>
            <span class="select-crypto__input__down-arrow">
              <img
                src="../../assets/images/down-arrow-img.png"
                alt="flèche blanche pointant vers le bas"
            /></span>
          </div>
        </div>
      </div>
      <div class="money-to-invest__input input">
          <input
            type="number"
            value="0"
            class="input__field"
          />
          <div class="money-to-invest__input__wrapper">
            <span class="money-to-invest__input__wrapper--size">≈150</span>
            <button class="money-to-invest__input__wrapper__button">MAX</button>
          </div>
        </div>
</div>
    </div>
    <div class="connected-wallet__token-amount">
      <p>Vous recevez en $ANZ</p>
      <div class="token-amount__wrapper">
        <p>0</p>
        <img src="../../assets/images/TOKEN-color.png" alt="Logo du jeux Anazir sous forme d'une piece de monnaie" />
      </div>
      <div class="token-amount__max-amount__wrapper">
       <span class="token-amount__max-amount__line"></span>     
        <p class="token-amount__max-amount">15 000 000</p>
        <p class="token-amount__max-amount__info">Token alloués pressed</p>
      </div>
    </div>`;

        //-----------

        // Changement du texte du bouton
        connectWalletButton.textContent = "Ticket minimum : 500$";
        const moneyInvestInput = document.querySelector(".input__field");

        moneyInvestInput.addEventListener("input", () => {
          const inputValue = moneyInvestInput.value;

          if (!isNaN(inputValue) && inputValue >= 500) {
            connectWalletButton.textContent = "investir";
          } else {
            connectWalletButton.textContent = "Ticket minimum : 500$";
          }
        });
      }
      //------------

      //------------ Déconnection de l'utilisateur ??
    } catch (error) {
      console.error("User denied account access:", error);
    }
  } else {
    console.error("MetaMask is not installed."); // message d'erreur si Metamask n'est pas installé
  }
});
