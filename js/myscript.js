$(document).ready(function() {
  // al click del tasto cerca
  $(document).on('click', 'button', function(){
   ricercaFilm();
   ricercaSerieTv();

 });
  // quando premo invio parte la ricerca
  $('input').keyup(function() {
    if (event.which === 13 || event.keyCode === 13) {
      ricercaFilm();
      ricercaSerieTv();
    }
  });


// ------------ FUNZIONI -------------------

// Funzione per la ricerca dei film
function ricercaFilm() {
  var errore = $('.errore').remove();
  var filmRicercato = $('input').val();
  var movies = $('.movies').remove();
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
      stampaFilm(datiRisultati);
    },
    error:(function() {
      var messaggioErrore = 'inserisci qualcosa da cercare';
      nessunRisultato(messaggioErrore);
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
    var posterFilm = film[i].poster_path;
    var context = {
      poster: 'https://image.tmdb.org/t/p/w300' + posterFilm,
      genere: 'Film',
        title: titoloFilm,
        originalTitle: titoloOriginaleFilm,
        lingua: linguaBandiera(linguaFilm),
        voto: stellinevoti(votoFilm)
      };
    var source = $("#movies-template").html();
    var template = Handlebars.compile(source);
    var html = template(context);
    $('main .container .d-flex').append(html);
  };

  };

// Funzione per mostrare un messaggio in caso di nessun risultato
function nessunRisultato(messaggio) {
  var source = $("#error-template").html();
  var template = Handlebars.compile(source);
  var context = {
    body: messaggio
  };
  var html = template(context);
  $('main .container .d-flex').append(html);
};

// funziona che nasconde il titolo originale se lo stesso e' uguale al titolo
function confrontaTitolo(titoloOriginale, titolo) {
  var appoggio = false;
	if ( titoloOriginale === titolo ) {
    return appoggio = true;
  }
  else {
    return appoggio = false;
  }
};

// funzione che trasforma il valore(Testo) della lingua in emoji (bandiere)
function linguaBandiera(lingua){
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

// funzione che trasforma un numero decimale in un numero intero
function trasformaNumero(num){
  var num = num / 2;
  // con math ceil arrotondo il numero in eccesso
  var numeroarrotondato = Math.ceil(num);
  return numeroarrotondato;
};

// funzione che converte il voto e stampa delle stelline in base al voto del film
function stellinevoti(numero) {
  var numero = numero / 2;
  // con math ceil arrotondo il numero in eccesso
  var numeroarrotondato = Math.ceil(numero);
  if (numeroarrotondato == 1) {
    return '⭐';
  }
  if (numeroarrotondato == 2) {
    return '⭐⭐';}
  if (numeroarrotondato == 3) {
    return '⭐⭐⭐';
  }
  if (numeroarrotondato == 4) {
    return '⭐⭐⭐⭐';
  }
  if (numeroarrotondato == 5) {
    return '⭐⭐⭐⭐⭐';
  }

};

// funzione per la ricerca delle serie tv
function ricercaSerieTv() {
  var serietvRicercata = $('input').val();
  $.ajax({
    url: 'https://api.themoviedb.org/3/search/tv',
    type: 'GET',
    data: {
      api_key : 'da6638a7fb98426de45fd1717f524c48',
      query : serietvRicercata,
      language: 'it-IT'
    },
    success: function (data) {
      var datiRisultati = data.results;
      stampaSerieTv(datiRisultati);

    },
    error:(function() {

    })
  });
};

// funzione per stampare la ricerca delle serie tv
function stampaSerieTv(serieTv) {
  for (var i = 0; i < serieTv.length; i++) {
    var titoloserieTv = serieTv[i].name;
    var titoloOriginaleserieTv = serieTv[i].original_name;
    var linguaserieTv = serieTv[i].original_language;
    var votoserieTv = serieTv[i].vote_average;
    var posterSerieTv = serieTv[i].poster_path;
    var context = {
        poster: 'https://image.tmdb.org/t/p/w300' + posterSerieTv,
        genere: 'Serie Tv',
        title: titoloserieTv,
        originalTitle: titoloOriginaleserieTv,
        lingua: linguaBandiera(linguaserieTv),
        voto: stellinevoti(votoserieTv)
      };
    var source = $("#movies-template").html();
    var template = Handlebars.compile(source);
    var html = template(context);
    $('main .container .d-flex').append(html);
  };
}





});
