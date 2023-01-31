// for recieve
function showCoinListSm(){
    // console.log('clicked')
    $('#coinListSm').show('slide', { direction: "left" }, 300)
}
function hideCoinListSm(){
    // console.log('clicked')
    $('#coinListSm').hide('slide', { direction: "left" }, 400)
}

function setCoinSm(e){
    var coinListToggleSm = document.querySelector('#coinListToggleSm')
    var tokenToSendSm = document.querySelector('#tokenToSendSm')
    var tokenToSendNameSm = document.querySelector('#tokenToSendNameSm')
    ttSN = $(e).find('small')[0]
    tokenToSendNameSm.value = ttSN.id
    id = e.id
    tokenToSendSm.value = e.id
    coinListToggleSm.innerHTML = id + ' <i class="fi fi-rr-caret-down"></i>'
    $('#coinListSm').hide('slide', { direction: "left" }, 400)
}

// for Send
function showCoinListSm2(){
    // console.log('clicked')
    $('#coinListSm2').show('slide', { direction: "left" }, 300)
}
function hideCoinListSm2(){
    // console.log('clicked')
    $('#coinListSm2').hide('slide', { direction: "left" }, 400)
}

function setCoinSm2(e){
    var coinListToggleSm2 = document.querySelector('#coinListToggleSm2')
    var tokenToRecieveSm = document.querySelector('#tokenToRecieveSm')
    var tokenToRecieveNameSm = document.querySelector('#tokenToRecieveNameSm')
    ttRN = $(e).find('small')[0]
    tokenToRecieveNameSm.value = ttRN.id
    id = e.id
    tokenToRecieveSm.value = e.id
    coinListToggleSm2.innerHTML = id + ' <i class="fi fi-rr-caret-down"></i>'
    $('#coinListSm2').hide('slide', { direction: "left" }, 400)
}

function dismissCoinlist(){
    $('#coinListSm2').hide('slide', { direction: "left" }, 400)
    $('#coinListSm').hide('slide', { direction: "left" }, 400)

    $('#coinList').hide('slide', { direction: "left" }, 400)
    $('#coinList2').hide('slide', { direction: "left" }, 400)
}


// pages swap
function startTradePanel(){
    var panelTwo = document.querySelector('#panelTwo')
    var panelOne = document.querySelector('#panelOne')
    panelOne.classList.add('hide')
    panelTwo.classList.remove('hide')

}
function joinTradePanel(){
    var panelThree = document.querySelector('#panelThree')
    var panelOne = document.querySelector('#panelOne')
    panelOne.classList.add('hide')
    panelThree.classList.remove('hide')

}

function backToDashboard(){
    var panelTwo = document.querySelector('#panelTwo')
    var panelThree = document.querySelector('#panelThree')
    var panelOne = document.querySelector('#panelOne')
    panelOne.classList.remove('hide')
    panelTwo.classList.add('hide')
    panelThree.classList.add('hide')
}



// get cokee
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

    // ====================================================================================>
    function createBuyOrderSm() {
        var tokenToSendSm = document.querySelector("#tokenToSendSm");
        var tokenToRecieveSm = document.querySelector("#tokenToRecieveSm");

        var tokenToSendNameSm = document.querySelector('#tokenToSendNameSm')
        var tokenToRecieveNameSm = document.querySelector('#tokenToRecieveNameSm')
        
        var interval = document.querySelector('#interval')
        var intervalValue = document.querySelector('#intervalValue')


        var amountToSendSm = document.querySelector(".amount_to_send_sm");
        var amountToRecieveSm = document.querySelector(".amount_to_recieve_sm");
        var roleSm = document.querySelector("#roleSm");
        var csrftoken = getCookie("csrftoken");
      
        if (amountToSendSm.value.length == 0 || amountToRecieveSm.value.length == 0) {
          amountToSendSm.placeholder = "provide amount";
          amountToRecieveSm.placeholder = "provide amount";
        } else if (amountToSendSm.value.length > 0 && amountToRecieveSm.value.length > 0) {
          $("#createTxn").show();
      
          roleSm.value = "Buyer";
      
          fd = new FormData();
          fd.append("amount_to_send", amountToSendSm.value);
          fd.append("amount_to_recieve", amountToRecieveSm.value);
          
          fd.append("amount_to_send_name", tokenToSendNameSm.value);
          fd.append("amount_to_recieve_name", tokenToRecieveNameSm.value);
          
          fd.append("interval", interval.value);
          fd.append("interval_value", intervalValue.value);
      
          fd.append("token_to_send", tokenToSendSm.value);
          fd.append("token_to_recieve", tokenToRecieveSm.value);
          fd.append("role", roleSm.value);
      
          $.ajax({
            type: "POST",
            headers: {
              "X-CSRFToken": csrftoken,
            },
            url: "/exchange/create_txn",
            data: fd,
            // dataType: "dataType",
            success: function (response){
                if(response === 'cannotcreate'){
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
                }
                else{
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


// ====================================================================================>
function createSellOrderSm() {
    var tokenToSendSm = document.querySelector("#tokenToSendSm");
    var tokenToRecieveSm = document.querySelector("#tokenToRecieveSm");

    var tokenToSendNameSm = document.querySelector('#tokenToSendNameSm')
    var tokenToRecieveNameSm = document.querySelector('#tokenToRecieveNameSm')
    
    var interval = document.querySelector('#interval')
    var intervalValue = document.querySelector('#intervalValue')


    var amountToSendSm = document.querySelector(".amount_to_send_sm");
    var amountToRecieveSm = document.querySelector(".amount_to_recieve_sm");
    var roleSm = document.querySelector("#roleSm");
    var csrftoken = getCookie("csrftoken");
  
    if (amountToSendSm.value.length == 0 || amountToRecieveSm.value.length == 0) {
      amountToSendSm.placeholder = "provide amount";
      amountToRecieveSm.placeholder = "provide amount";
    } else if (amountToSendSm.value.length > 0 && amountToRecieveSm.value.length > 0) {
      $("#createTxn").show();
  
      roleSm.value = "Seller";
  
      fd = new FormData();
      fd.append("amount_to_send", amountToSendSm.value);
      fd.append("amount_to_recieve", amountToRecieveSm.value);
      
      fd.append("amount_to_send_name", tokenToSendNameSm.value);
      fd.append("amount_to_recieve_name", tokenToRecieveNameSm.value);
      
      fd.append("interval", interval.value);
      fd.append("interval_value", intervalValue.value);
  
      fd.append("token_to_send", tokenToSendSm.value);
      fd.append("token_to_recieve", tokenToRecieveSm.value);
      fd.append("role", roleSm.value);
  
      $.ajax({
        type: "POST",
        headers: {
          "X-CSRFToken": csrftoken,
        },
        url: "/exchange/create_txn",
        data: fd,
        // dataType: "dataType",
        success: function (response){
            if(response === 'cannotcreate'){
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
            }
            else{
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




const closeDialog = ()=>{
    $('.dialog').each(function (){
        $(this).hide('slide', {direction: 'right'}, 400)
    })
}