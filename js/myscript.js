$(document).ready(function() {
  // al click del tasto cerca
  $(document).on('click', 'button', function(){
   ricercaFilm();

 });
  // quando premo invio parte la ricerca
  $('input').keyup(function() {
    if (event.which === 13 || event.keyCode === 13) {
      ricercaFilm();
    }
  });


// ------------ FUNZIONI -------------------

// Funzione per la ricerca dei film
function ricercaFilm() {
  var filmRicercato = $('input').val();
  var entry = $('.entry').remove();
  $.ajax({
    url: 'https://api.themoviedb.org/3/search/movie',
    type: 'GET',
    data: {
      api_key : 'da6638a7fb98426de45fd1717f524c48',
      query : filmRicercato,
      language: 'it-IT'
    },
    success: function (data) {
      var datiRisultati = data.results;
      if (datiRisultati.length == 0) {
          nessunRisultato();
      }
      else {
        stampaFilm(datiRisultati);
      }
    },
    error:(function() {
      alert('Attenzione Errore');
    })
  });
};


// Funzione per stampare la ricerca dei film
function stampaFilm(film) {
  for (var i = 0; i < film.length; i++) {
    var titoloFilm = film[i].title;
    var titoloOriginaleFilm = film[i].original_title;
    var linguaFilm = film[i].original_language;
    var votoFilm = film[i].vote_average;
    var context = {
        title: titoloFilm,
        originalTitle: titoloOriginaleFilm,
        lingua: linguaFilm,
        voto: votoFilm
      };
    confrontaTitolo(titoloFilm, titoloOriginaleFilm);
    var source = $("#entry-template").html();
    var template = Handlebars.compile(source);
    var html = template(context);
    $('main .container').append(html);
  };

  };


// Funzione per mostrare un messaggio in caso di nessun risultato
function nessunRisultato() {
  var source = $("#error-template").html();
  var template = Handlebars.compile(source);
  var context = {
    body: 'nessun risultato'
  };
  var html = template(context);
  $('main .container').append(html);
};

// funziona che nasconde il titolo originale se lo stesso e' uguale al titolo
function confrontaTitolo(titolo1, titolo2) {
	if ( titolo1 === titolo2 ) {
    $('.titoloOriginale').addClass('d-none');

  }
};

});
