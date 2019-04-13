var key = "55c220cb58mshee0f3639dbd0c90p1bb460jsn121fe9054ac1";
var keyFun = "test";


$("#newbtn").click(function (event) {
    event.preventDefault();
    //generate random to retrieve wiki frase
    var x = Math.floor((Math.random() * 3));
    console.log(x);
    $("#error").empty();
    $("#trans-text").val("");
    $("html").css({ "background-color": "black", "background-image": "url(assets/images/fiction.jpg)" });
    $(".jumbotron").show();
    $("#original-h1").empty();
    $("#original-h3").empty();
    $("#trans-h1").empty();
    $("#trans-h3").empty();
    $("#fact-h1").empty();
    $("#fact-h3").empty();

});

$("#yodabtn").click(function (event) {
    event.preventDefault();
    setTimeout(yodaCall(), 1500);
});

$("#sithbtn").click(function (event) {
    event.preventDefault();
    setTimeout(sithCall(), 1500);
});

$("#klinbtn").click(function (event) {
    event.preventDefault();
    setTimeout(klingonCall(), 1500);
});

$("#piratebtn").click(function (event) {
    event.preventDefault();
    setTimeout(pirateCall(), 1500);
});


$("#minionbtn").click(function (event) {
    event.preventDefault();
    setTimeout( minionCall(), 1500);
});

$("#gunganbtn").click(function (event) {
    event.preventDefault();
    setTimeout(gunganCall(), 1500);
});


$("#ferbbtn").click(function (event) {
    event.preventDefault();
    setTimeout(ferbCall(), 1500);
});

$("#morsebtn").click(function (event) {
    event.preventDefault();
    setTimeout(morseCall(), 1500);
});

//app  code's functions
function renderTranslation(result) {
    $('#translationModal').modal('toggle');
    $("#jumbotron").hide();
    $("#original-h1").text("Your text was:");
    $("#original-h3").text(result.contents.text);
    $("#trans-h1").text('In "' + result.contents.translation + '" You would say:');
    $("#trans-h3").text(result.contents.translated);

}

function facts(frase) {
    $.ajax({
        type: "GET",
        url: "http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=" + frase + "&callback=?",
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            var markup = data.parse.text["*"];
            //$("#response").text(JSON.stringify(data))
            var blurb = $('<div></div>').html(markup);
            // remove links as they will not work
            blurb.find('a').each(function () { $(this).replaceWith($(this).html()); });
            // remove any references
            blurb.find('sup').remove();
            // remove cite error
            blurb.find('.mw-ext-cite-error').remove();
            $("#fact-h1").text("Some Facts:");
            $('#fact-h3').html($(blurb).find('p'));
        },

        error: function (errorMessage) {
        }

    });
    ///back to top
    setTimeout(function () {
        $("html, body").animate({ scrollTop: 0 }, '10');
    }, 1000);
}

function yodaCall() {
    var newInput = $("#trans-text").val().trim();
    if (newInput == "") {
        $("#validation-text").text("Type something please");
        setTimeout(function () { $("#validation-text").empty(); }, 2000);
    }
    else {
        // Yoda translations
        $("html").css({ "background-color": "black", "background-image": "url(assets/images/yodabg.jpg)" });
        $.ajax({
            url: "https://yodish.p.rapidapi.com/yoda.json?text=" + newInput,
            method: 'POST',
            headers: {
                'cache-control': 'no-cache',
                'Content-Type': 'application/json',
                'X-RapidAPI-Key': key,
                'header1': 'header-value-1'
            },
        }).then(function (translation) {
            console.log(translation);
            console.log(translation.contents);

            renderTranslation(translation);
             //wikipwdia
        var frase = "yoda"
        facts(frase);
        });
    }

}

function sithCall() {
    var newInput = $("#trans-text").val().trim();
    if (newInput == "") {
        $("#validation-text").text("Type something please");
        setTimeout(function () { $("#validation-text").empty(); }, 2000);
    }
    else {
        // siith translations
        $("html").css({ "background-color": "black", "background-image": "url(assets/images/sithbg.jpg)" });
        $.ajax({
            url: "https://sith.p.rapidapi.com/sith.json?text=" + newInput,
            method: 'GET',
            headers: {
                'cache-control': 'no-cache',
                'Content-Type': 'application/json',
                'X-RapidAPI-Key': key,
                'header1': 'header-value-1'
            },
        }).then(function (translation) {
            console.log(translation);
            console.log(translation.contents);
            // console.log("length"+JSON.stringify(translation.success.total));
            renderTranslation(translation);
            //wikipwdia
        var frase = "Darth Maul: Shadow Hunter"
        facts(frase);
        });
    }
}

function klingonCall() {
    var newInput = $("#trans-text").val().trim();
    if (newInput == "") {
        $("#validation-text").text("Type something please");
        setTimeout(function () { $("#validation-text").empty(); }, 2000);
    }
    else {
        // kinglon translations
        $("html").css({ "background-color": "black", "background-image": "url(assets/images/klingonbg.jpg)" });
        $.ajax({
            url: "https://klingon.p.rapidapi.com/klingon?text=" + newInput,
            method: 'GET',
            headers: {
                "X-RapidAPI-Host": "klingon.p.rapidapi.com",
                'X-RapidAPI-Key': key,
                "X-FunTranslations-Api-Secret": keyFun,
            },
        }).then(function (translation) {
            console.log(translation);
            console.log(translation.contents);
            renderTranslation(translation);
             //wikipwdia
        var frase = "Klingon"
        facts(frase);
        }).catch(err => {
            $("#error").text(err.responseJSON.error.message + " Or try another language");
        });
    }
}

function pirateCall() {
    var newInput = $("#trans-text").val().trim();
    if (newInput == "") {
        $("#validation-text").text("Type something please");
        setTimeout(function () { $("#validation-text").empty(); }, 2000);
    }
    else {
        // Pirate translations
        $("html").css({ "background-color": "black", "background-image": "url(assets/images/piratebg.jpg)" });
        $.ajax({
            url: "https://rapidapi.p.rapidapi.com/pirate.json?text=" + newInput,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "X-RapidAPI-Host": "piratespeak.p.rapidapi.com",
                'X-RapidAPI-Key': key,
            },
        }).then(function (translation) {
            console.log(translation);
            console.log(translation.contents);
            renderTranslation(translation);
              //wikipwdia
        var frase = "Ahoy_(greeting)"
        facts(frase);
        });
    }
}

function minionCall() {
    var newInput = $("#trans-text").val().trim();
    if (newInput == "") {
        $("#validation-text").text("Type something please");
        setTimeout(function () { $("#validation-text").empty(); }, 2000);
    }
    else {
        // Minion translations
        $("html").css({ "background-color": "black", "background-image": "url(assets/images/minionbg.jpg)" });
        $.ajax({
            url: "https://rapidapi.p.rapidapi.com/minion.json?text=" + newInput,
            method: 'POST',
            headers: {
                'cache-control': 'no-cache',
                'Content-Type': 'application/x-www-form-urlencoded',
                "X-RapidAPI-Host": "minion.https://rapidapi.p.rapidapi.com",
                'X-RapidAPI-Key': key,

            },
        }).then(function (translation) {
            console.log(translation);
            console.log(translation.contents);
            renderTranslation(translation);
              //wikipwdia
        var frase = "Minions_(film)"
        facts(frase);
        });
    }
}


function gunganCall() {
    var newInput = $("#trans-text").val().trim();
    if (newInput == "") {
        $("#validation-text").text("Type something please");
        setTimeout(function () { $("#validation-text").empty(); }, 2000);
    }
    else {
        // Gungan translations
        $("html").css({ "background-color": "black", "background-image": "url(assets/images/gunganbg.jpg)" });
        $.ajax({
            url: "https://gungan.p.rapidapi.com/gungan.json?text=" + newInput,
            method: 'GET',
            headers: {
                "X-RapidAPI-Host": "gungan.p.rapidapi.com",
                'X-RapidAPI-Key': key,
            },
        }).then(function (translation) {
            console.log(translation);
            console.log(translation.contents);
            renderTranslation(translation);
            //wikipwdia
        var frase = "Jar_Jar_Binks"
        facts(frase);
        });
    }
}


function ferbCall() {
    var newInput = $("#trans-text").val().trim();
    if (newInput == "") {
        $("#validation-text").text("Type something please");
        setTimeout(function () { $("#validation-text").empty(); }, 2000);
    }
    else {
        // FerbLatin translations
        $("html").css({ "background-color": "black", "background-image": "url(assets/images/ferbbg.jpg)" });
        $.ajax({
            url: "https://erblatin.p.rapidapi.com/ferblatin.json?text=" + newInput,
            method: 'GET',
            headers: {
                "X-RapidAPI-Host": "ferblatin.p.rapidapi.com",
                'X-RapidAPI-Key': key,
            },
        }).then(function (translation) {
            console.log(translation);
            console.log(translation.contents);
            renderTranslation(translation);
            //wikipwdia
        var frase = "Phineas_and_Ferb"
        facts(frase);
        });
    }
}

function morseCall() {
    var newInput = $("#trans-text").val().trim();
    if (newInput == "") {
        $("#validation-text").text("Type something please");
        setTimeout(function () { $("#validation-text").empty(); }, 2000);
    }
    else {
        // Morse code translations
        $("html").css({ "background-color": "black", "background-image": "url(assets/images/morsebg.jpg)" });
        $.ajax({
            url: "https:///morse.p.rapidapi.com/morse.json?text=" + newInput,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "X-RapidAPI-Host": "morse.p.rapidapi.com",
                'X-RapidAPI-Key': key,
                "X-FunTranslations-Api-Secret": keyFun,
            },
        }).then(function (translation) {
            console.log(translation);
            console.log(translation.contents);
            renderTranslation(translation);
             //wikipwdia
            var frase = "morse code"
        facts(frase);
        }).catch(err => {
            $("#error").text(err.responseJSON.error.message + " Or try another language");
        });
    }
}