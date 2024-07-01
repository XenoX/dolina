const connectWalletButton = document.querySelector(
  ".invest__section__connect-wallet__button"
);

const disconnectWalletButton = document.querySelector(
  ".invest__section__buttons__disconnect"
);

async function fetchCryptoValue() {
  try {
    const [maticResponse, usdcResponse] = await Promise.all([
      fetch("https://api.coincap.io/v2/assets/polygon"),
      fetch("https://api.coincap.io/v2/assets/usd-coin"),
    ]);

    const matic = await maticResponse.json();
    const usdc = await usdcResponse.json();

    console.log(matic);
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
  }
}

connectWalletButton.addEventListener("click", async () => {
  if (typeof window.ethereum !== "undefined") {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length > 0) {
        const connectedAddress = accounts[0];
        console.log("Connected account:", connectedAddress);

        // Obtenir le solde du compte
        const balance = await getAccountBalance(connectedAddress);
        console.log("Account balance:", balance);

        updateUserInterface(connectedAddress, balance);
        addTokenPurchaseSection();
        addInputEventListeners();
        fetchCryptoValue();
      }
    } catch (error) {
      console.error("User denied account access:", error);
    }
  } else {
    console.error("MetaMask is not installed.");
  }
});

async function getAccountBalance(address) {
  try {
    // Assurez-vous que ethers est disponible globalement
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(address);
    // Convertir le solde de Wei en Ether
    const balanceInEth = ethers.utils.formatEther(balance);
    return balanceInEth;
  } catch (error) {
    console.error("Error fetching account balance:", error);
    return null;
  }
}

function updateUserInterface(address, balance) {
  const accountInfoDiv = document.getElementById("accountInfo");
  accountInfoDiv.innerHTML = `
    <p>Connected account: ${address}</p>
    <p>Account balance: ${balance} ETH</p>
  `;
}

function updateUserInterface() {
  const walletInvestSection = document.querySelector(
    ".invest__section__connect-wallet__text"
  );
  walletInvestSection.classList.remove("invest__section__connect-wallet__text");
  walletInvestSection.classList.add("invest__section__connected-wallet");

  const connectedWalletButtons = document.querySelector(
    ".invest__section__buttons"
  );
  connectedWalletButtons.style.visibility = "visible";

  connectWalletButton.textContent = "TICKET MINIMUM : 500$";
}

function addTokenPurchaseSection() {
  const walletInvestSection = document.querySelector(
    ".invest__section__connected-wallet"
  );
  walletInvestSection.innerHTML = `
   <div class="connected-wallet__token-purchase">
      <div class="connected-wallet__select-crypto__wrapper">
        <div class="select-crypto__input input">
          <div class="input">Matic</div>
          <ul class="select-crypto__input__dropdown-content">
            <li>Matic</li>
            <li>USDC</li>
          </ul>
        </div>
        <div class="select-crypto__input__wrapper">
          <div class="select-crypto__input__current-value__wrapper">
            <span>1921</span>
            <span class="select-crypto__input__current-value--size"
              >≈$1920</span
            >
          </div>
          <span class="line"></span>
          <span class="select-crypto__input__down-arrow">
            <img
              src="../../assets/images/down-arrow-img.png"
              alt="flèche blanche pointant vers le bas"
              class="select-crypto__input__dropdown-arrow"
          /></span>
        </div>
      </div>

      <div class="connected-wallet__money-to-invest__wrapper">
        <label for="money-to-invest">Montant investi :</label>
        <div class="money-to-invest__input input">
          <input
            type="number"
            value="0"
            id="money-to-invest"
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
        <img
          src="../../assets/images/TOKEN-color.png"
          alt="Logo du jeux Anazir sous forme d'une piece de monnaie"
        />
      </div>
      <div class="token-amount__max-amount__wrapper">
        <span class="token-amount__max-amount__line"></span>
        <p class="token-amount__max-amount">15 000 000</p>
        <p class="token-amount__max-amount__info">Token alloués pressed</p>
      </div>
    </div>
    </div>`;

  const cryptoDropdown = document.querySelector(
    ".connected-wallet__select-crypto__wrapper"
  );
  const cryptoInput = document.querySelector(".select-crypto__input");
  const dropdownContent = document.querySelector(
    ".select-crypto__input__dropdown-content"
  );
  const downArrow = document.querySelector(
    ".select-crypto__input__dropdown-arrow"
  );

  let isOpen = false; // Track dropdown visibility

  cryptoDropdown.addEventListener("click", function (event) {
    if (event.target === cryptoInput || event.target === downArrow) {
      isOpen = !isOpen;

      if (isOpen) {
        dropdownContent.classList.add("show");
        downArrow.classList.add("rotate");
      } else {
        dropdownContent.classList.remove("show");
        downArrow.classList.remove("rotate");
      }
    } else {
      if (isOpen) {
        isOpen = false;
        dropdownContent.classList.remove("show");
        downArrow.classList.remove("rotate");
      }
    }
  });

  dropdownContent.addEventListener("click", function (event) {
    const selectedOption = event.target.textContent;
    cryptoInput.textContent = selectedOption;
  });
}

function addInputEventListeners() {
  const moneyInvestInput = document.querySelector(".input__field");

  moneyInvestInput.addEventListener("input", () => {
    const inputValue = moneyInvestInput.value;

    if (!isNaN(inputValue) && inputValue >= 500) {
      connectWalletButton.textContent = "INVESTIR";
    } else {
      connectWalletButton.textContent = "TICKET MINIMUM : 500$";
    }
  });
}

function disconnectUserWallet() {
  // Remove event listener for account changes
  window.ethereum.removeListener("accountsChanged", handleAccountsChanged);

  // Reset connected address
  connectedAddress = null;

  // Reset user interface
  const walletInvestSection = document.querySelector(
    ".invest__section__connected-wallet"
  );
  walletInvestSection.classList.remove("invest__section__connected-wallet");
  walletInvestSection.classList.add("invest__section__connect-wallet__text");
  walletInvestSection.innerHTML = "Connectez votre wallet pour investir";

  const connectedWalletButtons = document.querySelector(
    ".invest__section__buttons"
  );
  connectedWalletButtons.style.visibility = "hidden";

  connectWalletButton.textContent = "Connectez votre wallet";

  // Force MetaMask a redemander un connexion
  connectWalletButton.addEventListener("click", async () => {
    window.ethereum
      .request({
        method: "wallet_requestPermissions",
        params: [{ eth_accounts: {} }],
      })
      .then(() => {
        console.log("Permissions updated");
      })
      .catch((error) => {
        console.error("Error updating permissions:", error);
      });
  });
}
