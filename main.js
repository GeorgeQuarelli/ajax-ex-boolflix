//al click sul pulsante fare partire una chiamata ajax a tmdb per recuperare i film che corrispondo alla query di ricerca inserita dall'utente.
//Ciclare i risultati e per ogni film restituito, stamparne in pagina:
//titolo,titolo originale,lingua,voto
$(document).ready(function(){
  //intercetto il click sull'icona del cerca
  $('.icon').click(function() {
  //creo una variabile per salvare l'input dell'utente
  var input_utente = $('input').val();
    $.ajax({
      'url':'https://api.themoviedb.org/3/search/movie',
      'method':'GET',
      'data':{
          'api_key':'7724b744f1b5d1ce3f3563c8cf9b4ea2',
          'query': input_utente
       },
       'success': function (data) {
         console.log(data);
       },
       'error': function () {
         alert('si è verificato un errore');
       }

     });
   });
  });
