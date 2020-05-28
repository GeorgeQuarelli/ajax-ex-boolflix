//al click sul pulsante fare partire una chiamata ajax a tmdb per recuperare i film che corrispondo alla query di ricerca inserita dall'utente.
//Ciclare i risultati e per ogni film restituito, stamparne in pagina:
//titolo,titolo originale,lingua,voto

$(document).ready(function(){

  //intercetto il tasto invio per la ricerca
  $('#search').keyup(function(event){
    if(event.which == 13) {
    ricercalista();
    reset();
    }
  });

  //intercetto il click sull'icona del cerca
  $('.icon').click(function() {
    ricercalista();
    reset();
});


  //creo una funzione che include chiamata ajax e compilazione handlebars
  function ricercalista() {
    //chiamata ajax film
      chiamata_ajax("https://api.themoviedb.org/3/search/movie" , "film")
    //chiamata ajax telefilm
      chiamata_ajax("https://api.themoviedb.org/3/search/tv" , "telefilm")
  }

    // funzione di generazione della chiamata ajax (film/telefilm)
        function chiamata_ajax(url, genere) {
          //creo una variabile per salvare l'input dell'utente
          //trim serve ad eliminare gli spazi prima e dopo all input utente
          var input_utente = $('input').val().trim();
          //chiamata ajax
          $.ajax({
            'url':url,
            'method':'GET',
            'data':{
                'api_key':'7724b744f1b5d1ce3f3563c8cf9b4ea2',
                'query': input_utente,
                'language': 'it_IT'
             },
             'success': function (data) {
               var infofilm = data.results;
               console.log(infofilm, genere);
               stampahtml(infofilm, genere);
             },
             'error': function () {
               alert('devi insterire un film');
             }
           });
        }


        // funzione di reset del box di ricerca e contenuto pagina
        function reset(){
          //resetto l'input dell'utente
          $('input').val('');

          //svuoto il contenitore dei risultati
          $('.film-container.container').empty();

        }

      //funzione per stampare le card dei film in pagina
         function stampahtml(info_film, genere) {
                 var schedafilm = $('#template').html();
                 var template_function = Handlebars.compile(schedafilm);
                 for (var i = 0; i < info_film.length; i++) {
                     var info= info_film[i];

                     var titolo,titolo_originale;
                      if (genere === "telefilm") {
                       titolo = info.name;
                       titolo_originale = info.original_name;
                     } else {
                         titolo = info.title;
                         titolo_originale = info.original_title;
                       }

                     var film = {
                         'titolo-film': titolo,
                         'titolo-original' : titolo_originale,
                         'lingua': flag(info.original_language),
                         'voto': stelle(info.vote_average),
                         'locandina':locandina(info.poster_path),
                         'trama': info.overview
                     }
                     var html_finale = template_function(film);
                     $('.film-container.container').append(html_finale);
                 }
                }

          function stelle(voto) {
          // converto il vodo da 10 a 5
          var nuovo_voto = Math.ceil(voto/2);
          var stelle = "";
          for (var i = 1; i <= 5; i++) {
              if(i <= nuovo_voto){
        			stelle += '<i class="fas fa-star"></i>';
            } else {
        			stelle += '<i class="far fa-star"></i>';
            }
          }
          return stelle;
          }

          function flag(lingua) {
            //seleziono le lingue che intendo convertire con l'immagine
            var lingue = ['it','en','fr','de','es']
            if (lingue.includes(lingua)) {
            return '<img src="img/flag_'+ lingua +'.png">'
            } else {
              return lingua;
            }
          }

          //funzione per generare la locandina se nel caso non trovasse
          //la locandina genera un img di errore
         function locandina(img) {
             if (img === null) {
                 return 'img/error.jpg'
             } return 'https://image.tmdb.org/t/p/w342' + img
         }
  });
