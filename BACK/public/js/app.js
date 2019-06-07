// hamburger nav
$("nav #bars").on('click', function() {
    $("#navMenu").slideToggle("slow");
})
// end hamburger nav

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

$("input[type=file]").on('change', function(event) {
    filePath = event.target.value;
    filePathArray = filePath.split("\\");
    fileName = filePathArray.pop();
    $("#showImageName").text(fileName);
    $("#showImageName").css("display", "block");
    if (filePath == "") {
        $("#showImageName").css("display", "none");
    }
})
$(document).ready(function() {
    let navHeight = $("nav").innerHeight();
    $("main").css("top", navHeight);
    $("#navMenu").css("top", navHeight);

    $("input[type=text]").each(function() {
        if ($(this).val() !== "") {
            $(this).css("background", "white");
        } else {
            $(this).css("background", "none");
        }
    })
    $("input[type=number]").each(function() {
        if ($(this).val() != "") {
            $(this).css("background", "white");
        } else {
            $(this).css("background", "none");
        }
    })
    $("textarea").each(function() {
        if ($(this)[0].placeholder != "") {
            $(this).css("background", "white");
        } else {
            $(this).css("background", "none");
        }
    })
    $("select").each(function() {
        if ($(this).val() != "") {
            $(this).css("background", "white");
        } else {
            $(this).css("background", "none");
        }
    })
})

$("input[type=text]").on("blur", function() {
    if ($(this).val() !== "") {
        $(this).css("background", "white");
    } else {
        $(this).css("background", "none");
    }
})
$("input[type=number]").on("blur", function() {
    if ($(this).val() != "") {
        $(this).css("background", "white");
    } else {
        $(this).css("background", "none");
    }
})
$("textarea").on("blur", function() {
    if ($(this)[0].placeholder != "") {
        $(this).css("background", "white");
    } else {
        $(this).css("background", "none");
    }
})
$("select").on("blur", function() {
    if ($(this).val() != "") {
        $(this).css("background", "white");
    } else {
        $(this).css("background", "none");
    }
})

$(".updateProduct").on("submit", function(event) {
    if (confirm("Bent u zeker dat u de wijzigingen wilt opslaan?")) {
        $("textarea").removeAttr("required");
        console.log("send request");
    } else {
        event.preventDefault();
    }
})

$(".removeProduct").on("submit", function() {
    if (confirm("Bent u zeker dat u dit product wilt verwijderen?")) {
        console.log("send request");
    } else {
        event.preventDefault();
    }
})

// ------------------------ sticky nav on scroll up --------------------------------
let rememberedScrollTop = 0;
$(window).on("scroll", function() {
    let scrollTop = $(this).scrollTop();
    let navHeight = $("nav").innerHeight();
    if (scrollTop < rememberedScrollTop) {
        $("nav").css("top", "0");
    } else if(scrollTop > navHeight) {
        $("nav").css("top", "-50%")
        $("#navMenu").hide();
    }
    rememberedScrollTop = scrollTop;

})

$("nav #subnav a").on('click', function() {
    $("nav").css("top", "-50%");
})
