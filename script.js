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
    
        let imagenHeader = {
            "Noxus": "./img/headers/noxus.jpg",
            "Demacia": "./img/headers/demacia.jpg",
            "Ixtal": "./img/headers/ixtal.jpg",
            "Islas de las Sombras": "./img/headers/islas-de-las-sombras.jpg",
            "Jonia": "./img/headers/jonia.jpg",
            "Piltover": "./img/headers/piltover.jpg",
            "Zaun": "./img/headers/zaun.jpg",
            "Freljord": "./img/headers/freljord.jpg",
            "Shurima": "./img/headers/shurima.jpg",
            "Targon": "./img/headers/targon.jpg",
            "Aguas Estancadas": "./img/headers/aguas-estancadas.jpg",
            "El Vacío": "./img/headers/el-vacio.jpg",
            "Ciudad de Bandle": "./img/headers/ciudad-de-bandle.jpg",
            "Runaterra": "./img/headers/runaterra.png"
        };

        let logoHeader = {
            "Noxus": "./img/headers/logo/noxus-logo.png",
            "Demacia": "./img/headers/logo/demacia-logo.png",
            "Ixtal": "./img/headers/logo/ixtal-logo.png",
            "Islas de las Sombras": "./img/headers/logo/islas-de-las-sombras-logo.png",
            "Jonia": "./img/headers/logo/jonia-logo.png",
            "Piltover": "./img/headers/logo/piltover-logo.png",
            "Zaun": "./img/headers/logo/zaun-logo.png",
            "Freljord": "./img/headers/logo/freljord-logo.png",
            "Shurima": "./img/headers/logo/shurima-logo.png",
            "Targon": "./img/headers/logo/targon-logo.png",
            "Aguas Estancadas": "./img/headers/logo/aguas-estancadas-logo.png",
            "El Vacío": "./img/headers/logo/el-vacio-logo.png",
            "Ciudad de Bandle": "./img/headers/logo/ciudad-de-bandle-logo.png",
            "Runaterra": "./img/headers/logo/runaterra-logo.png"
        };
        if (imagenHeader[regionSeleccionada]) {
            $("header").slideUp(500, function() {
                $(this).css("background-image", `url(${imagenHeader[regionSeleccionada]})`).slideDown(500);
                $(this).css("background-size", "cover");
                $(this).css("background-position", "center");
            });              
            $(".header-logo").attr("src", logoHeader[regionSeleccionada]);
        }
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
                    $(".big-screen").css("z-index", "0");
                    let index = $(this).data("index");
                    let videoUrl = campeones[index].enlace + "&autoplay=1" + "&mute=1";
                    $("#video-frame").attr("src", videoUrl);
                    $("#video-overlay").fadeIn();
                }
            });
            
        }
        $(document).keydown(function (e) {
            if (e.key === "Escape") {
                $(".big-screen").css("z-index", "100");
                $("#video-overlay").fadeOut();
                $("#video-frame").attr("src", "");
            }
        });
        
        $(document).mousedown(function (e) {    
            $(".big-screen").css("z-index", "100");
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