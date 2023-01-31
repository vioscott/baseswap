const authLogin = document.querySelector('#authLogin')
const authRegsiter = document.querySelector('#authRegsiter')
const authTitle = document.querySelector('#authTitle')

const registerForm = document.querySelector('#registerForm')
const loginForm = document.querySelector('#loginForm')

var toggleReferral = document.querySelector('#toggleReferral')
var referral = document.querySelector('#referral')

var singnInPassword = document.querySelector('#singnInPassword')
var singnUpPassword = document.querySelector('#singnUpPassword')

var pTrigger = document.querySelector('#pTrigger')
var pTrigger2 = document.querySelector('#pTrigger2')

var coinListToggle = document.querySelector('#coinListToggle')
var coinList = document.querySelector('#coinList')

authLogin.addEventListener('click', () => {
    authLogin.classList.add('activeAuthBtn')
    authRegister.classList.remove('activeAuthBtn')

    registerForm.classList.add('hide')
    loginForm.classList.remove('hide')

    authTitle.innerHTML = `
    <h4 class="align-center mainWhite">
        Login
    </h4>
    `
});

authRegister.addEventListener('click', () => {
    authLogin.classList.remove('activeAuthBtn')
    $(authRegister).addClass('activeAuthBtn')

    registerForm.classList.remove('hide')
    loginForm.classList.add('hide')
    authTitle.innerHTML = `
    <h4 class="align-center mainWhite">
        Create account
    </h4>
    `
})


function showReferralInput() {
    referral.classList.remove('hide')
    toggleReferral.onclick = hidereferralInput
}

function hidereferralInput() {
    referral.classList.add('hide')
    toggleReferral.onclick = showReferralInput
}


function showPassword() {
    singnInPassword.type = 'text'
    pTrigger.onclick = hidePassword
    pTrigger.innerHTML = '<i class="fa fa-check-square f-icon"> </i> Hide password'
}

function hidePassword() {
    singnInPassword.type = 'password'
    pTrigger.onclick = showPassword
    pTrigger.innerHTML = '<i class="fa fa-square f-icon"> </i> Show password'
}

function showPassword2() {
    singnUpPassword.type = 'text'
    pTrigger2.onclick = hidePassword2
    pTrigger2.innerHTML = '<i class="fa fa-check-square f-icon"> </i> Hide password'
}

function hidePassword2() {
    singnUpPassword.type = 'password'
    pTrigger2.onclick = showPassword2
    pTrigger2.innerHTML = '<i class="fa fa-square f-icon"> </i> Show password'
}


function showCoinList() {
    // console.log('clicked')
    $(coinList).show('slide', { direction: "down" }, 400)
}

function hideCoinList() {
    // console.log('clicked')
    $(coinList).hide('slide', { direction: "down" }, 400)
}

function setCoin(e) {
    var coinListToggle = document.querySelector('#coinListToggle')
    var tokenToSend = document.querySelector('#token_to_send')
    var tokenToSendName = document.querySelector('#tokenToSendName')
    ttSN = $(e).find('small')[0]
    tokenToSendName.value = ttSN.id
    id = e.id
    tokenToSend.value = e.id
    coinListToggle.innerHTML = id + ' <i class="fi fi-rr-caret-down"></i>'
    $(coinList).hide('slide', { direction: "down" }, 400)
}

// for Send
function showCoinList2() {
    // console.log('clicked')
    $('#coinList2').show('slide', { direction: "down" }, 400)
}

function hideCoinList2() {
    // console.log('clicked')
    $('#coinList2').hide('slide', { direction: "down" }, 400)
}

function setCoin2(e) {
    var coinListToggle2 = document.querySelector('#coinListToggle2')
    var tokenToRecieve = document.querySelector('#token_to_recieve')
    var tokenToRecieveName = document.querySelector('#tokenToRecieveName')
    ttRN = $(e).find('small')[0]
    tokenToRecieveName.value = ttRN.id
    id = e.id
    tokenToRecieve.value = e.id
    coinListToggle2.innerHTML = id + ' <i class="fi fi-rr-caret-down"></i>'
    $('#coinList2').hide('slide', { direction: "down" }, 400)
}

function fundToken(e) {
    var fundTokenSelected = document.querySelector('.fundTokenSelected')
    var tokenInput = document.querySelector('#tokenInput')
    var tokenNameInput = document.querySelector('#tokenNameInput')

    $('.fundTokenInner').each(function() {
        a = $(this).find('i');
        a.not($(e)).removeClass('fi-rr-check')
    })
    current = $(e).find('i')
    tokenName = $(e).find('input')[0]
    fundTokenSelected.innerHTML = '&nbsp; ' + e.id
    $(current).addClass('fi-rr-check')

    tokenInput.value = e.id
    tokenNameInput.value = tokenName.id
}

function toggleNavSmall() {
    var toggleDropdownNavSmall = document.querySelector('#toggleDropdownNavSmall')
    var toggleOverlay = document.querySelector('.toggleOverlay')
    $('.sm-nav-drop-down').show('slide', { direction: 'right' }, 400)
    toggleDropdownNavSmall.onclick = untoggleNavSmall
    $(toggleOverlay).show()
}

function untoggleNavSmall() {
    var toggleDropdownNavSmall = document.querySelector('#toggleDropdownNavSmall')
    $('.sm-nav-drop-down').hide('slide', { direction: 'right' }, 400)
    toggleDropdownNavSmall.onclick = toggleNavSmall
    $(toggleOverlay).hide()
}

function removeToggleOverlay() {
    var toggleOverlay = document.querySelector('.toggleOverlay')
    $('.sm-nav-drop-down').hide('slide', { direction: 'right' }, 400)
    $(toggleOverlay).hide()
    toggleDropdownNavSmall.onclick = toggleNavSmall
}

function dismissMessage() {
    var message = document.querySelector('#msg-notify');
    // message.style.display = 'none';
    $(message).hide("slide", { direction: "right" }, 500);
};



function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

var csrftoken = getCookie('csrftoken');


// =========================================================================================>
function createBuyOrder() {
    var tokenToSend = document.querySelector("#token_to_send");
    var tokenToRecieve = document.querySelector("#token_to_recieve");


    var tokenToSendName = document.querySelector('#tokenToSendName')
    var tokenToRecieveName = document.querySelector('#tokenToRecieveName')

    var intervalLg = document.querySelector('#intervalLg')
    var intervalValueLg = document.querySelector('#intervalValueLg')


    var amountToSend = document.querySelector(".amount_to_send");
    var amountToRecieve = document.querySelector(".amount_to_recieve");
    var role = document.querySelector("#role");
    var csrftoken = getCookie("csrftoken");

    if (amountToSend.value.length == 0 || amountToRecieve.value.length == 0) {
        amountToSend.placeholder = "provide amount";
        amountToRecieve.placeholder = "provide amount";
    } else if (amountToSend.value.length > 0 && amountToRecieve.value.length > 0) {
        $("#createTxn").show();

        role.value = "Buyer";

        fd = new FormData();
        fd.append("amount_to_send", amountToSend.value);
        fd.append("amount_to_recieve", amountToRecieve.value);

        fd.append("amount_to_send_name", tokenToSendName.value);
        fd.append("amount_to_recieve_name", tokenToRecieveName.value);

        fd.append("interval", intervalLg.value);
        fd.append("interval_value", intervalValueLg.value);

        fd.append("token_to_send", tokenToSend.value);
        fd.append("token_to_recieve", tokenToRecieve.value);
        fd.append("role", role.value);

        $.ajax({
            type: "POST",
            headers: {
                "X-CSRFToken": csrftoken,
            },
            url: "/exchange/create_txn",
            data: fd,
            // dataType: "dataType",
            success: function(response) {
                if (response === 'cannotcreate') {
                    $("#createTxn").html(
                        `
                        <div class="dialogContent mainWhite" id="createTxnInner">
                            <div class="align-center">
                                <i class="fi fi-rr-info dColour" style="font-size: 24px;"></i>
                            </div>
                            <h5>
                                You have reached the maximum number of transaction you can create at a time. Please complete or delete outstanding trades to create new ones.
                            </h5>
                            <small>
                                The maximum number of transaction you can create at a time is 5.
                            </small>
                            <div class="mt-4">
                                <button class="defaultBtn2" style="width: 50%;" onclick="closeDialog()">Dismiss</button>
                            </div>
                        </div>
                        `
                    )
                } else {
                    $("#createTxn").html(
                        `
                            <div class="dialogContent mainWhite" id="createTxnInner">
                                <div class="" style="font-size: 13px;">
                                    <center>
                                        <p class="mt-2" style="text-align: center;">
                                            <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                                                <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                                                <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                                            </svg>
                                        </p>
                                        <p class="mt-2 dColour">
                                            Trade Created Successfully
                                        </p>
                                    </center>
                                </div>
                                <div class="row border-b pb-2 px-2">
                                    <div class="col-12 post-box" style="border-radius: 20px; padding: 4px;">
                                        <small class="mainWhite xsmall">Transaction ID: ${response.txn_id}</small>
                                    </div>
                                    <div class="col-12">
                                        <small></small>
                                    </div>
                                </div>
                                <div class="mt-4">
                                    <a href="/exchange/txn/${(response.id).replace("#", "%23")}">
                                    <button type="button" class="Btn" onclick="dismissMessage()" style="width: 50%;">Proceed</button>
                                    </a>
                                </div>
                
                                <div class="stepper-wrapper mt-4">
                                    <div class="stepper-item completed">
                                    <div class="step-counter" style="color: #000;">
                                        <i class="fi fi-rr-check fixIcon2" style="color:#000"></i>
                                    </div>
                                    <small class="step-name">created</small>
                                    </div>
                                    <div class="stepper-item">
                                    <div class="step-counter" style="color: #000;">2</div>
                                    <small class="step-name">Pay</small>
                                    </div>
                                    <div class="stepper-item">
                                    <div class="step-counter" style="color: #000;">3</div>
                                    <small class="step-name">Withdraw</small>
                                    </div>
                                </div>
                            </div>
                        `
                    );
                }


            },

            cache: false,
            contentType: false,
            processData: false,
        });
    }
}


// ====================================================================================>
function createSellOrder() {
    var tokenToSend = document.querySelector("#token_to_send");
    var tokenToRecieve = document.querySelector("#token_to_recieve");

    var tokenToSendName = document.querySelector('#tokenToSendName')
    var tokenToRecieveName = document.querySelector('#tokenToRecieveName')

    var intervalLg = document.querySelector('#intervalLg')
    var intervalValueLg = document.querySelector('#intervalValueLg')


    var amountToSend = document.querySelector(".amount_to_send");
    var amountToRecieve = document.querySelector(".amount_to_recieve");
    var role = document.querySelector("#role");
    var csrftoken = getCookie("csrftoken");

    if (amountToSend.value.length == 0 || amountToRecieve.value.length == 0) {
        amountToSend.placeholder = "provide amount";
        amountToRecieve.placeholder = "provide amount";
    } else if (amountToSend.value.length > 0 && amountToRecieve.value.length > 0) {
        $("#createTxn").show();

        role.value = "Seller";

        fd = new FormData();
        fd.append("amount_to_send", amountToSend.value);
        fd.append("amount_to_recieve", amountToRecieve.value);

        fd.append("amount_to_send_name", tokenToSendName.value);
        fd.append("amount_to_recieve_name", tokenToRecieveName.value);

        fd.append("interval", intervalLg.value);
        fd.append("interval_value", intervalValueLg.value);

        fd.append("token_to_send", tokenToSend.value);
        fd.append("token_to_recieve", tokenToRecieve.value);
        fd.append("role", role.value);

        $.ajax({
            type: "POST",
            headers: {
                "X-CSRFToken": csrftoken,
            },
            url: "/exchange/create_txn",
            data: fd,
            // dataType: "dataType",
            success: function(response) {
                if (response === 'cannotcreate') {
                    $("#createTxn").html(
                        `
                    <div class="dialogContent mainWhite" id="createTxnInner">
                        <div class="align-center">
                            <i class="fi fi-rr-info dColour" style="font-size: 24px;"></i>
                        </div>
                        <h5>
                        You have reached the maximum number of transaction you can create at a time. Please complete or delete outstanding trades to create new ones.
                        </h5>
                        <small>
                            The maximum number of transaction you can create at a time is 5.
                        </small>
                        <div class="mt-4">
                            <button class="defaultBtn2" style="width: 50%;" onclick="closeDialog()">Dismiss</button>
                        </div>
                    </div>
                    `
                    )
                } else {
                    $("#createTxn").html(
                        `
                        <div class="dialogContent mainWhite" id="createTxnInner">
                            <div class="" style="font-size: 13px;">
                                <center>
                                    <p class="mt-2" style="text-align: center;">
                                        <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                                            <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                                            <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                                        </svg>
                                    </p>
                                    <p class="mt-2 dColour">
                                        Trade Created Successfully
                                    </p>
                                </center>
                            </div>
                            <div class="row border-b pb-2 px-2">
                                <div class="col-12 post-box" style="border-radius: 20px; padding: 4px;">
                                    <small class="mainWhite xsmall">Transaction ID: ${response.txn_id}</small>
                                </div>
                                <div class="col-12">
                                    <small></small>
                                </div>
                            </div>
                            <div class="mt-4">
                                <a href="/exchange/txn/${(response.id).replace("#", "%23")}">
                                <button type="button" class="Btn" onclick="dismissMessage()" style="width: 50%;">Proceed</button>
                                </a>
                            </div>
            
                            <div class="stepper-wrapper mt-4">
                                <div class="stepper-item completed">
                                <div class="step-counter" style="color: #000;">1</div>
                                <small class="step-name">created</small>
                                </div>
                                <div class="stepper-item">
                                <div class="step-counter" style="color: #000;">2</div>
                                <small class="step-name">Pay</small>
                                </div>
                                <div class="stepper-item">
                                <div class="step-counter" style="color: #000;">3</div>
                                <small class="step-name">Withdraw</small>
                                </div>
                            </div>
                        </div>
                    `
                    );
                }


            },

            cache: false,
            contentType: false,
            processData: false,
        });
    }
}