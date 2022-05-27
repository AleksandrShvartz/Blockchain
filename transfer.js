let appId = "QHFa9R2ulpuwi80Ku5sHnv4ZWKOgZ2LcWOtMUadT";
let serverUrl ="https://hredtpurvh7t.usemoralis.com:2053/server";

const CONTRACT_ADDRESS = "0xd7a8ff9079ee23d41e265747021d17c964ef8975"

Moralis.start({ serverUrl, appId });

let web3;

async function init() {
    let currentUser = Moralis.User.current();
    if (!currentUser) {
        window.location.pathname = "/index.html";
    }

    web3 = await Moralis.Web3.enable();

    const urlParams = new URLSearchParams(window.location.search);
    const nftId = urlParams.get("nftId");
    document.getElementById("token_id_input").value = nftId;
}

async function transfer() {
    let tokenId = parseInt(document.getElementById("token_id_input").value);
    let address = document.getElementById("address_input").value;
    let amount = parseInt(document.getElementById("amount_input").value);

    const options = {type: "erc1155",
                     receiver: address,
                     contract_address: CONTRACT_ADDRESS,
                     token_id: tokenId.toString(),
                     amount: amount}
    let result = await Moralis.transfer(options);
    console.log(result);
}

document.getElementById("submit_transfer").onclick = transfer;

init();