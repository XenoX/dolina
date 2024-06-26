const connectWalletButton = document.querySelector(".wallet-connexion_button");

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

        // Changement du texte du bouton
        connectWalletButton.textContent = "investir";

        // Chanchement du nom de la class pour plus de compréhension
        const walletInvestSection = document.querySelector(
          ".wallet-connexion_text"
        );
        walletInvestSection.classList.remove("wallet-connexion_text");
        walletInvestSection.classList.add("wallet_invest-section");

        //apparition des boutons de transaction et déconnection
        const connectedWalletButtons = document.querySelector(
          ".connected-wallet_buttons"
        );
        connectedWalletButtons.style.visibility = "visible";

        //----------- Ajout de la section d'achat
        walletInvestSection.innerHTML = `
       <div class="wallet-transaction_investment">
        <div class="choose-crypto_wrapper">
          <p>Vous investissez en :</p>
          <div class="choose-crypto-input input">
            <p>Matic</p>
            <div class="choose-crypto-input_right-side_wrapper">
              <div class="current-crypto-value">
                <span>1921</span>
                <span class="current-crypto-value_value-font-style">≈$1920</span>
              </div>
              <span class="line"></span>
              <span class="down-arrow-img">
                <img
                  src="../../assets/images/down-arrow-img.png"
                  alt="flèche blanche pointant vers le bas"
              /></span>
            </div>
          </div>
        </div>
        <div class="choose-amount_wrapper">
          <p>Montant investi :</p>
          <div class="choose-amount_input input">
            <p>0</p>
            <div class="choose-amount_input_right-side_wrapper">
              <span>≈150</span>
              <span>MAX</span>
            </div>
          </div>
        </div>
      </div>`;

        //-----------
      } else {
        console.warn("No accounts found.");
      }
    } catch (error) {
      console.error("User denied account access:", error);
    }
  } else {
    console.error("MetaMask is not installed."); // message d'erreur si Metamask n'est pas installé
  }
});
