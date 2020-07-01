$(document).ready(function() {

  $('button').click(function() {

      stampaMovie();

  });

// ------------ FUNZIONI -------------------

// funzione per stampare la ricerca dei film
function stampaMovie() {
  var filmRicercato = $('input').val();
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
      // console.log(datiRisultati);
      for (key in datiRisultati){
      var titoloFilm = datiRisultati[key].title;
      var titoloOriginaleFilm = datiRisultati[key].original_title;
      var linguaFilm = datiRisultati[key].original_language;
      var votoFilm = datiRisultati[key].vote_average;
      console.log(votoFilm);
      var source = $("#entry-template").html();
      var template = Handlebars.compile(source);
      var context = {
        title: titoloFilm,
        originalTitle: titoloOriginaleFilm,
        lingua: linguaFilm,
        voto: votoFilm

      };

      var html = template(context);
      $('.container').append(html);
      }


    },
    error:(function() {
      alert('Attenzione Errore');
    })
  })

};

});
