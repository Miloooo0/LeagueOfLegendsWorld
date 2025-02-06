$(document).ready(function () {
    let regiones = ["Runaterra", "Noxus", "Demacia", "Ixtal", "Islas de las Sombras", "Jonia", "Piltover", "Zaun", "Freljord", "Shurima", "Targon", "Aguas Estancadas", "El Vacío", "Ciudad de Bandle"];
    let campeones = [];
    
    function generarNav() {
        let nav = $("nav");
        nav.empty();
        regiones.forEach(region => {
            let boton = $('<button class="region-button">' + region + '</button>');
            boton.click(function () {
                $(".region-button").removeClass("active");
                $(this).addClass("active");
                resaltarCampeones(region);
            });
            nav.append(boton);
        });
    }
    
    function resaltarCampeones(regionSeleccionada) {
        $(".champion-container").removeClass("suZona");
        campeones.forEach(function(champion, index) {
            if (champion.zona === regionSeleccionada) {
                $(".champion-container").eq(index).addClass("suZona");
            }
        });
    }
    
    generarNav();
    
    $.ajax({
        type: "GET",
        url: "campeones.json",
        dataType: "json",
        success: function (data) {
            if (Array.isArray(data.campeones)) {
                campeones = data.campeones; 
                showChampions(data.campeones);
            } else {
                alert("Formato de datos incorrecto.");
            }
        }
    });
    
    function showChampions(champions) {
        let container = $(".container");
        container.empty();
        champions.forEach(function(champion, index) {
            let championElement = $('<div class="champion-container" data-index="' + index + '">' +
                '<div class="loading-spinner"></div>' +
                '<img src="' + champion.imagen + '" alt="' + champion.nombre + '">' +
                '<div class="champion-name">' + champion.nombre + '</div>' +
                '</div>');
                
                let img = championElement.find("img");
                img.on("load", function () {
                    championElement.find(".loading-spinner").remove();
                    $(this).css("opacity", "1");
                });
                container.append(championElement);
            });
            
            $(".champion-container").click(function () {
                if ($(this).hasClass("suZona")) {
                    let index = $(this).data("index");
                    let videoUrl = campeones[index].enlace + "&autoplay=1" + "&mute=1";
                    $("#video-frame").attr("src", videoUrl);
                    $("#video-overlay").fadeIn();
                }
            });
            
        }
        $(document).keydown(function (e) {
            if (e.key === "Escape") {
                $("#video-overlay").fadeOut();
                $("#video-frame").attr("src", "");
            }
        });
        
        $(document).mousedown(function (e) {    
            $("#video-overlay").fadeOut();
            $("#video-frame").attr("src", "");
        });
        
        $(".menu-toggle").click(function () {
            $(".dropdown-menu").slideToggle();
        });
        
        $("#search-bar").on("keyup", function() {
            let searchText = $(this).val().toLowerCase();
            $(".champion-container").each(function() {
                let name = $(this).find(".champion-name").text().toLowerCase();
                $(this).toggle(name.includes(searchText));
            });
        });
    });