$(document).ready(function() {
  // al click del tasto cerca si apre l'input
  $(document).on('click', 'i', function(){
    $('input').show(250);
    $('i').hide();

  });

  // quando premo invio parte la ricerca
  $('input').keyup(function() {
    if (event.which === 13 || event.keyCode === 13) {
      var query = $('input').val();
      cancellaContenuto();
      ricerca('search/movie', query);
      ricerca('search/tv', query);
      $('input').hide();
      $('i').show(500);
    }
  });

  // la passaggio del mouse sulle copertine
  $(document).on('mouseenter', '.movies', function(){
    $(this).find('.text-movies').addClass('active');
  });

  // quando il mouse esce dalle copertine
 $(document).on('mouseleave', '.movies', function(){
   $(this).find('.text-movies').removeClass('active');
  });


  // ------------ FUNZIONI -------------------

  // funzione che trasforma il valore(Testo) della lingua in emoji (bandiere)
  function linguaBandiera(lingua){
    var lingua = lingua.original_language;
    if(lingua == 'it'){
      return '🇮🇹';
    }
    if(lingua == 'es'){
      return '🇪🇸';
    }
    if(lingua == 'fr'){
      return '🇫🇷';
    }
    if(lingua == 'en'){
      return '🇺🇸';
    }
  }

  // funzione che converte il voto e stampa delle stelline in base al voto del film
  function stellinevoti(numero) {
    var numero = numero.vote_average / 2;
    // con math ceil arrotondo il numero in eccesso
    var numeroarrotondato = Math.ceil(numero);
    if (numeroarrotondato == 1) {
      return '★☆☆☆☆';
    }
    if (numeroarrotondato == 2) {
      return '★★☆☆☆';
    }
    if (numeroarrotondato == 3) {
      return '★★★☆☆';
    }
    if (numeroarrotondato == 4) {
      return '★★★★☆';
    }
    if (numeroarrotondato == 5) {
      return '★★★★★';
    }
  };

  // funzione che seleziona la chiave corretta per il titolo/nome
  function scegliTitolo(oggetto) {
    var titolo;
    if (!oggetto.title) {
      titolo = oggetto.original_name;
    } else {
      titolo = oggetto.original_title;
    }
    return titolo;
  }

  // funzione per ricercare nel database un film o una serie tv
  function ricerca(linkFinale, query) {
  // con la ricerca faccio partire la chiamata AJAX
    $.ajax({
      url: "https://api.themoviedb.org/3/" + linkFinale,
      type: 'GET',
      data: {
        api_key: 'da6638a7fb98426de45fd1717f524c48',
        query: query,
      },
      success: function (data) {
        var datiRisultati = data.results;
        stampaRicerca(datiRisultati);
      },
      error: function (richiesta, stato, errore) {
        // qui devo stampare qualcosa
      }
  })
    $('input').val('');
  };

  // funzione che compila l'handlebar e stampa i risultati
  function stampaRicerca(datiRisultati) {

    var source = $("#movies-template").html();
    var template = Handlebars.compile(source);
    // se la ricerca non produce risultati viene appeso il template di errore Handlebars
    // if (datiRisultati.length == 0) {
    //   var context = {
    //     body: 'La tua ricerca non ha prodotto risultati'
    //   };
    //   var source = $("#error-template").html();
    //   var template = Handlebars.compile(source);
    //   var html = template(context);
    //   $(".content-movie").append(html);
    // }

    // genero contenuto per l handlebars
    datiRisultati.forEach(function(item) {

      var context = {
        poster: copertina(item),
          title: scegliTitolo(item),
          lingua: linguaBandiera(item),
          voto: stellinevoti(item),
          Overview: item.overview
        };

      var html = template(context);
      $(".content-movie").append(html);
    });
  };

  // funzione che rimuove il contenuto
  function cancellaContenuto() {
    $(".content-movie").html('');
  }

  // funzone che stampa la copertina del film/serie tv
  function copertina(oggetto) {
    var immagineCopertina = '';
    if (oggetto.poster_path) {
      immagineCopertina = 'https://image.tmdb.org/t/p/w342/' + oggetto.poster_path;
    } else {
      immagineCopertina = 'img/movie-poster-coming-soon.png';
    }
    return immagineCopertina
  }

});
