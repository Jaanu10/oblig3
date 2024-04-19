//Bruker jQuery sin event-handler
$(function (){
    filmVelger();
})

//Funksjonen fetcher film data
function filmVelger() {
    $.get("/filmVelger", function (filmliste) {
        formaterFilmliste(filmliste)
    })
}

//Lager en nedtrekksliste-meny for å velge film
function formaterFilmliste(filmer){
    let filmliste = "<select class='form-select' name='film' id='film'>"+
        "<option selected disabled placeholder='Velg Film'>Velg film</option>"
    for (const film of filmer){
        filmliste +="<option value='"+film+"'>"+film+"</option>";
    }
    filmliste +="</select>"
    $("#filmliste").html(filmliste);
}


//Funksjon for kjøp av billetter
function kjopbillett() {
    if (validering()) {
        const billett = {
            film: $("#film").val(),
            antall: $("#antall").val(),
            fornavn: $("#fornavn").val(),
            etternavn: $("#etternavn").val(),
            telefonnr: $("#telefonnr").val(),
            epost: $("#epost").val(),
        }

        //Sender billettene til serveren
        $.post("/lagre", billett, function () {
            visBilletter();
        })

        //Tømmer inputfeltene etter billettkjøp
        $("#film").val("");
        $("#antall").val("");
        $("#fornavn").val("");
        $("#etternavn").val("");
        $("#telefonnr").val("");
        $("#epost").val("");
    }
}

//Viser kjøpte billetter
function visBilletter(){
    $.get("/hentBilletter",function(billetter){
        formaterData(billetter);

    })
}


// Funksjon som formaterer og viser billettene
function formaterData(billetter) {
    console.log(billetter);
    let ut = "<table class='table table-striped'><tr>" +
        "<th>Film</th><th>Antall</th><th>Fornavn</th><th>Etternavn</th><th>Telefonnr</th><th>Epost</th><th>Handling</th>" +
        "</tr>";
    for (const billett of billetter) {
        ut += "<tr><td>" + billett.film + "</td><td>" + billett.antall + "</td><td>" + billett.fornavn + "</td><td>" + billett.etternavn + "</td><td>" +
            billett.telefonnr + "</td><td>" + billett.epost + "</td><td><button class='btn btn-danger' onclick='slettEnkeltBillett(" + billett.id + ")'>Slett</button></td>"
    }
    ut += "</table>";
    $("#billettvisning").html(ut);
}


// Sletter enkeltbilletter
function slettEnkeltBillett(id) {
    $.get(`/slettBillett/${id}`, function() {
        visBilletter();
    });
}

//Sletter alle billettene
function slettbilletter(){
    $.get("/slettAlle",function(){
        visBilletter();
    })
    $("#billettvisning").html("Slett billetter");
}

//Validerer input fra klient
function validering() {
    let film = $("#filmliste").val()
    let fornavn = $("#fornavn").val()
    let etternavn = $("#etternavn").val()
    let telefonnr = $("#telefonnr").val()
    let epost = $("#epost").val()
    let antall = $("#antall").val()

    //Tømmer inputmeldingene
    $("#film-error").text(" ")
    $("#antall-error").text(" ")
    $("#fornavn-error").text(" ")
    $("#etternavn-error").text(" ")
    $("#telefonnr-error").text(" ")
    $("#email-error").text(" ")

    //Dersom film ikke velges vises error-meldingen.
    if (!filmliste) {
        $("#film-error").html("Vennligst velg en film")
        return false;
    }

    //Hvis antall ikke fylles inn vises error-melding.
    if (antall <= 0 || !Number.isInteger(parseInt(antall))) {
        document.getElementById("antall-error").innerHTML = "Skriv inn gyldig antall";
        return false;
    }

    //Hvis fornavn ikke fylles inn vises error-melding
    if (!fornavn) {
        document.getElementById("fornavn-error").innerHTML = "Skriv inn gyldig fornavn";
        return false;
    }

    //Hvis etternavn ikke fylles inn vises error-melding
    if (!etternavn) {
        document.getElementById("etternavn-error").innerHTML = "Skriv inn gyldig etternavn";
        return false;
    }

    //Regex for å validere tlfnr, hvis det ikke matcher vises error-melding
    let tlfRegex = /^\d{7,15}$/;
    if (telefonnr === "" || !tlfRegex.test(telefonnr)) {
        document.getElementById("telefonnr-error").innerHTML = "Skriv inn gyldig telefonnummer";
        return false;
    }

    //Regex for å validere epost, hvis det ikke matcher vises error-melding
    let emailRegex = /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/;
    if (epost === " " || !emailRegex.test(epost)) {
        document.getElementById("email-error").innerHTML = "Skriv inn gyldig epost";
        return false;
    }

    return true;

}

