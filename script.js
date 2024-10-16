const selecttag = document.querySelectorAll("select");    //select tag access

const transbtn = document.querySelector(".trans-btn");
const fromtext = document.querySelector(".fromtext");
const totext = document.querySelector(".totext");

const icons = document.querySelectorAll("i");  



selecttag.forEach((tag , id) =>
{
    for(const countriesCode in countries)
        {

            let selected;

               
           if(id==0 && countriesCode=="en-US")
            {
             selected= "selected";
            }
            if(id==1 && countriesCode=="hi-IN")
             {
              selected= "selected";
             }
           let option = `<option value="${countriesCode}" ${selected}>${countries[countriesCode]}</option>`;
           tag.insertAdjacentHTML('beforeend',option);
        
           
        }
        
});

transbtn.addEventListener('click', () =>
{
    let text = fromtext.value;

    Translatefrom = selecttag[0].value;
    Translateto = selecttag[1].value;

    const apiurl = `https://api.mymemory.translated.net/get?q=${text}!&langpair=${Translatefrom}|${Translateto}`;

    fetch(apiurl).then(response=> response.json()).then(data =>
    {
        totext.value = data.responseData.translatedText; 
    }
    )
});
icons.forEach(icon =>
{
    icon.addEventListener('click', ({target}) =>{

        if (target.classList.contains("copy"))
        {
           

            if(target.id=="from")
            {
                navigator.clipboard.writeText(fromtext.value);    // used to copy text
            }
            else{
                navigator.clipboard.writeText(totext.value);
            }
        }
        else{
           let utterance;
           
           if(target.id=="from")
            {
              utterance = new speechSynthesisUtterance(fromtext.value);
              utterance.lang = selecttag[0].value;

            }
            else
            {
                utterance = new speechSynthesisUtterance(totext.value);
                utterance.lang = selecttag[1].value;
        }
        speechSynthesis.speak(utterance);
    }
        
        
        });
    
        
});
