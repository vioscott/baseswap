Moralis.initialize("7qy2OZ8SOR5vbKO9HHXSCQVaF15ZA1zusiDISZiW", "", "vyCca5w26JRWvl4ljmUU4kfrhVeLNT0j4J4xkKSe");
Moralis.serverURL = 'https://fizzckanxrdp.moralisweb3.com:2053/server'

async function loginMoralisMM() {
    $('#connectNotify').show()
    try {
        web3 = await Moralis.Web3.enable();
        var currentUser = Moralis.User.current();
        if (currentUser) {
            var balances = await Moralis.Web3.getAllERC20();
            userAddr = currentUser.get('ethAddress')
        }
        if (!currentUser) {
            const currentUser = await Moralis.Web3.authenticate()
            var balances = await Moralis.Web3.getAllERC20();
            userAddr = currentUser.get('ethAddress')
        }

        provider = web3.currentProvider
            // console.log(provider)

        $('#moralisFeedbackMM').html(
            `
            <i class="fi fi-rr-circle-small dColourGreen fixIcon3"></i>  Connected
            `
        )
        $('#MMConnectBtn').html(
            `
            <button class="defaultBtnGreen" onclick="logOutMoralis()" style="background: red; color:#fff">
            Disconnect
            </button>
            `
        )
        $('#sendTransactionBtn').show()
        $('#metaMaskWalet').show()
        for (var i = 0; i < balances.length; i++) {
            tokens = balances[i]
            $(tokens).each(function() {
                $('#metaMaskWalet').append(
                    `
                    <p class="mainWhite">Token: ${web3.utils.fromWei(tokens.balance)} ${tokens.name}</p>
                    `
                )
            })
        }
        $('#connectNotify').hide()
    } catch (e) {
        if (e.message == 'Non ethereum enabled browser') {
            alert('Bipswap cannot detect metamask. Please make sure it is installed. Use walletConnect if you are on a mobile device!')
            $('#connectNotify').hide()
        } else {
            alert(e.message)
            $('#connectNotify').hide()
        }

    }
}


// ==========================================================>

async function loginMoralisWithWalletConnect() {
    $('#connectNotify').show()
    try {
        web3 = await Moralis.Web3.enable({ provider: "walletconnect" });
        var currentUser = Moralis.User.current();
        if (currentUser) {
            var balances = await Moralis.Web3.getAllERC20();
            userAddr = currentUser.get('ethAddress')
        }
        if (!currentUser) {
            const currentUser = await Moralis.Web3.authenticate({ provider: "walletconnect" })
            var balances = await Moralis.Web3.getAllERC20();
            userAddr = currentUser.get('ethAddress')
        }
        provider = web3.currentProvider
            // console.log(provider)

        $('#moralisFeedbackWC').html(
            `
            <i class="fi fi-rr-circle-small dColourGreen fixIcon3"></i>  Connected
            `
        )
        $('#WConnectBtn').html(
            `
            <button class="defaultBtnGreen" onclick="logOutMoralis()" style="background: red; color:#fff">
            Disconnect
            </button>
            `
        )
        $('#sendTransactionBtn2').show()
        $('#WCWalet').show()
        for (var i = 0; i < balances.length; i++) {
            tokens = balances[i]
            $(tokens).each(function() {
                $('#WCWalet').append(
                    `
                    <p class="mainWhite">Token: ${web3.utils.fromWei(tokens.balance)} ${tokens.name}</p>
                    `
                )
            })
        }
        $('#connectNotify').hide()

    } catch (e) {
        if (e.message == 'Non ethereum enabled browser') {
            alert('Bipswap cannot detect metamask. Please make sure it is installed. Use walletConnect if you are on a mobile device!')
            $('#connectNotify').hide()
        } else {
            alert(e.message)
            $('#connectNotify').hide()
        }
    }
}


async function logOutMoralis() {
    try {
        Moralis.User.logOut().then(() => {
            const currentUser = Moralis.User.current(); // this will now be null
        });
        location.reload()
    } catch (e) {
        alert(e)
    }
}

Moralis.Web3.onAccountsChanged(async(accounts) => {
    const confirmed = confirm("Link this address to your account?");
    if (confirmed) {
        await Moralis.Web3.link(accounts[0]);
        alert('account changed')
    }
});


function sendTransaction() {
    var toAddress = document.querySelector('#toAddress')
    var amount = document.querySelector('#amount')

    var t_hash_input = document.querySelector('#t_hash_success')

    fixAmount = amount.value
    fixAmount.toString()

    // addr = Moralis.User.current().get('ethAddress'),
    // provider = web3.currentProvider
    // console.log(addr)


    let txn = {
        from: Moralis.User.current().get('ethAddress'),
        to_address: toAddress.value,
        // amount: web3.utils.toWei('1', 'ether'), 
        amount: web3.utils.toWei(fixAmount, 'ether'),
    };
    try {
        const transactionObject = {
            from: txn.from,
            to: txn.to_address,
            value: txn.amount,
            // gasPrice: transaction_data.gas_price,
            // gas: transaction_data.gas_limit
        };
        web3.eth.sendTransaction(transactionObject, (error, result) => {
            // console.log("The sendTransaction error == ", error);
            // console.log("The sendTransaction result == ", result);
            if (result) {
                // console.log('Txn_hash:' + result)
                $('#metamaskSuccess').show()
                t_hash_input.value = result
            }
        });

    } catch (e) {
        alert(e)
    }

}