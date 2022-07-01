const btn = document.querySelector('.color-box');
const colorGrid = document.querySelector('.color-grid');

btn.addEventListener('click', async() => {
    // const color = chrome.storage.sync.get('color', ({color}) => {
    //     console.log(color);
    // });  //background.js
    let [tab] = await chrome.tabs.query({active:true, currentWindow: true});
    // console.log(tab);

    chrome.scripting.executeScript({
        target: {tabId:tab.id},
        function: pickColor,
    }, 
    
    async(injectionResults) => {
        const [data] = injectionResults;
        if(data.result) {
            const color = data.result.sRGBHex;
            colorGrid.style.backgroundColor = color;
            colorGrid.innerHTML = color;
            try{
                await navigator.clipboard.writeText(color);
            }
            catch(e){
                console.error(e);
            }
        }
    }

    );
});


async function pickColor() {
    try {
        const eyeDropper = new EyeDropper();
        return await eyeDropper.open();
    }
    catch(e) {
        console.error(e);
    }
}