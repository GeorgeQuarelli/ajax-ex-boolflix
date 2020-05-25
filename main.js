//al click sul pulsante fare partire una chiamata ajax a tmdb per recuperare i film che corrispondo alla query di ricerca inserita dall'utente.
//Ciclare i risultati e per ogni film restituito, stamparne in pagina:
//titolo,titolo originale,lingua,voto

$(document).ready(function(){

  //intercetto il tasto invio per la ricerca
  $('#search').keyup(function(event){
    if(event.which == 13) {
    ricerca();
    }
  });

  //intercetto il click sull'icona del cerca
  $('.icon').click(function() {
    ricerca();
});

  //creo una funzione che include chiamata ajax e compilazione handlebars
  function ricerca() {
    //creo una variabile per salvare l'input dell'utente
    //trim serve ad eliminare gli spazi prima e dopo all input utente
    var input_utente = $('input').val().trim();

    //resetto l'input dell'utente
    $('input').val('');

    //svuoto il contenitore dei risultati
    $('.film-container.container').empty();

    //chiamata ajax dell'api
          $.ajax({
            'url':'https://api.themoviedb.org/3/search/movie',
            'method':'GET',
            'data':{
                'api_key':'7724b744f1b5d1ce3f3563c8cf9b4ea2',
                'query': input_utente,
                'language': 'it'

             },
             'success': function (data) {
               var infofilm = data.results;
               console.log(infofilm);
               stampahtml(infofilm);
             },
             'error': function () {
               alert('devi insterire un film');
             }
           });
      }

      //funzione per stampare le card dei film in pagina
         function stampahtml(info_film) {
                 var schedafilm = $('#template').html();
                 var template_function = Handlebars.compile(schedafilm);

                 for (var i = 0; i < info_film.length; i++) {
                     var info= info_film[i];
                     var film = {
                         'titolo-film': info.title,
                         'titolo-original' : info.original_title,
                         'lingua': info.original_language,
                         'voto': info.vote_average,
                     }
                     var html_finale = template_function(film);
                     $('.film-container.container').append(html_finale);
                 }
                }

  });
