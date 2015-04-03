$(function() {
$( "#language-toggle" ).click(function(){
  $( ".text-on" ).switchClass( "text-on", "text-off", 10 );
  $( ".text-off" ).switchClass( "text-off", "text-on", 10 );
});
});