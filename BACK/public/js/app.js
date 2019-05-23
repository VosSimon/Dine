$(".editProduct").on('click', function(event) {
    event.preventDefault();
    let index = event.target.dataset.index;
    index = parseInt(index);
    index += 1;
    let form = event.target.form;
    let formLength = form.length;
    for (let i = 0; i < formLength; i++ ) {
        form[i].disabled = !form[i].disabled;
    }
    console.log(form);
    form[formLength - 2].disabled = !form[formLength - 2].disabled;
})

$(".editCategories").on('click', function(event) {
    event.target.form[1].disabled = !event.target.form[1].disabled;
    event.target.form[3].disabled = !event.target.form[3].disabled;
})

$(".editAllergen").on('click', function(event) {
    event.target.form[1].disabled = !event.target.form[1].disabled;
    event.target.form[3].disabled = !event.target.form[3].disabled;
})
