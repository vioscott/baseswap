var timeBox = document.querySelector('#timeBox')

const eventDate = Date.parse(timeBox.textContent)
window.onload = ()=>{
    setInterval(()=>{
        const now = new Date().getTime();
        const dateDiff = eventDate-now;
        // console.log(dateDiff)
    
        const d = Math.floor((eventDate / (1000 * 60 * 60 *24)) - (now / (1000 * 60 * 60 *24)));
        const h = Math.floor(((eventDate / (1000 * 60 * 60)) - (now / (1000 * 60 * 60))) % 24);
        const m = Math.floor(((eventDate / (1000 * 60)) - (now / (1000 * 60))) % 60);
        const s = Math.floor(((eventDate / (1000)) - (now / (1000))) % 60);

        if(dateDiff >= 0){
            timeBox.innerHTML = d + ' Days, ' + h + ' Hours, ' + m + ' Minutes, ' + s + ' Seconds';
        }else{
            timeBox.innerHTML = 'Time ellapsed. Reload page to activate cancellation';
        }

    },1000);
    
};

