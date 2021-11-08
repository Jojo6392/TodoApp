window.addEventListener("load", function() {
    const btn_display_form = document.querySelector(".display-form")
    const elForm = document.querySelector(".form")

    btn_display_form.addEventListener("click",() => {
    var isActive = elForm.getAttribute("isActive")
    if(isActive == "false") isActive = false

    if(!isActive) {
        elForm.style.setProperty('--display','block')
    elForm.setAttribute("isActive", true)
    }
    else {
        elForm.style.setProperty('--display','none')
        elForm.setAttribute("isActive", false)
    }
})
    
});
