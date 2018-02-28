let comics = [];
let characters = [];
let moved = false;
let moving = false;
let selected;
let key = "9c110348918222888d0b88166048ade5";

function load(){
    $.ajax("https://gateway.marvel.com:443/v1/public/comics?apikey=9c110348918222888d0b88166048ade5",{
        complete: function(data){
            console.log(data);
            comics = data.responseJSON.data.results;
            for(let i = 0; i < comics.length; i++){
                if(comics[i].description == null){
                    comics[i].description = "Descripción no disponible";
                }
                $("#comics").append("<div id='m1' value='1' class='comic'><p class='name' ><a href='#'>" + comics[i].title + "</a></p></div><div class='details'><p class='subtitle2'>" + comics[i].title + "</p><p class='sinopsis'>" + comics[i].description + "</p><button class='boton' tabindex='0'> Votar</button></div>");
                var aux =  $(".comic").get(i);
               $(aux).css("background-image", "url('" + comics[i].thumbnail.path + "." + comics[i].thumbnail.extension + "')");
            }
            initListeners();
        },
        error: function(status){
            console.log(status);
        }
    });
    $.ajax("https://gateway.marvel.com:443/v1/public/characters?apikey=9c110348918222888d0b88166048ade5",{
        complete: function(data){
            console.log(data);
            characters = data.responseJSON.data.results;
            for(let i = 0; i < characters.length; i++){
                if(characters[i].description == ""){
                    characters[i].description = "Descripción no disponible";
                }
                $("#characters").append("<div id='m1' value='1' class='character'><p class='name' ><a href='#'>" + characters[i].name + "</a></p></div><div class='details'><p class='subtitle2'>" + characters[i].name + "</p><p class='sinopsis'>" + characters[i].description + "</p><button class='boton' tabindex='0'> Votar</button></div>");
                var aux =  $(".character").get(i);
               $(aux).css("background-image", "url('" + characters[i].thumbnail.path + "." + characters[i].thumbnail.extension + "')");
            }
        },
        error: function(status){
            console.log(status);
        }
    });                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
}

$(document).ready(function(){
    interval = setInterval(function(){
        switch($("#spinnerDiv > p").text()){
            case "Cargando...": 
                $("#spinnerDiv > p").text("Cargando.");
            break;
            case "Cargando.":
                $("#spinnerDiv > p").text("Cargando..");
            break;
            case "Cargando..":
                $("#spinnerDiv > p").text("Cargando...");
            break;
            default:
            break;
        }
    }, 333);
    load();
});


function initListeners(){
    clearInterval(interval);
    $("#characters").hide();
    $("#mainContainer").show();
    $(".boton").click(function(){
        selected = $(this).parent().prev().find("a").text();
        $("#formDiv").show();
    });
    $("#b").click(function(e){
        if($("#comics").is(":visible")){
            $("#comics").hide();
            $("#characters").show();
            $(".details").hide();
        }
        else{
            $("#characters").hide();
            $("#comics").show();
            $(".details").hide();
        }
    });
    $("#submitForm").click(function(e){
        e.preventDefault();
        submitForm();
        return false;
    });    
    $("#cancelForm").click(function(){
        $("#formDiv").hide();
    });
    $("#formDiv").hide();
    $(".details").hide();
    $(".comic, .character").click(function(e) {
        if(moving == false){
            moving = true;
            if(moved == true){
                resetPositions(this);
                moved = false;
                $(this).css('z-index', 2);
                $(this).next().css('z-index', 1);
                $(".comic").find("a").attr('tabindex', 1);
                $(this).next().toggle( "fold", 1000 );
                $(this).find("a").attr("aria-label", $(this).next().find("p").text());
            }
            else{
                $("p:visible").focus();
                $(this).css('position', "inherit");
                $(".comic, .character").find("a").attr('tabindex', -1);
                $(".comic, .details, .character").css('z-index', 0);
                $(this).css('z-index', 2);
                $(this).next().css('z-index', 1);
                $(this).find("a").attr('tabindex', 1);
                $(this).next().toggle( "fold", 1000 );
                $(this).find("a").attr("aria-label", "Pulse enter para seleccionar otra pelicula");
                $(this).position({
                    my: "left top",
                    at: "left+8% top+8%",
                    of: $(this).next(),
                    using: function(pos) {
                        $(this).animate(pos, "slow");
                    }
                });
                moved = true;
            }
            moving = false;
        }
    });
    $("#spinnerDiv").hide();
}

function resetPositions(e){
    $(e).css({
        "position": "flex",
        "top":"auto",
        "left":"auto"
    });
    $(e).next().find("button").position({
        my: "center center",
        at: "center-5% bottom-12%",
        of: $(e).next(),
    });
}


function submitForm(){
    if($("#comics").is(":visible")){
        let votes_ = [];
        if(localStorage.getItem("votes1") == null){
            votes_ = [];
        }
        else{
            votes_ = JSON.parse(localStorage.getItem("votes1"));
        }
        let vote = {
            name: $("#nameInput").val(),
            email: $("#emailInput").val(),
            comic: selected
        };
        votes_.push(vote);
        localStorage.setItem("votes1", JSON.stringify(votes_));
    }
    if($("#characters").is(":visible")){
        let votes_ = [];
        if(localStorage.getItem("votes2") == null){
            votes_ = [];
        }
        else{
            votes_ = JSON.parse(localStorage.getItem("votes2"));
        }
        let vote = {
            name: $("#nameInput").val(),
            email: $("#emailInput").val(),
            comic: selected
        };
        votes_.push(vote);
        localStorage.setItem("votes2", JSON.stringify(votes_));
    }
    $(location).attr('href', 'results.html');
}