(function(){

  function sortPublish(a, b) {
    return new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime();
  }

  var config = {
    "youtube" : "UC7h8eMsspsYvUFm9j7U932g",
    "url" : "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.youtube.com%2Ffeeds%2Fvideos.xml%3Fchannel_id%3DUC7h8eMsspsYvUFm9j7U932g&api_key=9ohqkyjauovauuxkbzg0tl6fboaizgkwd0j7cqby&order_by=pubDate&count=3",
    "list" : "PLSWOIa6H704Ft0NfODhpOp_h7CSuOJQhA",
    "api_key" : "AIzaSyALicOFaXZslcRWh0d9GzfqUKA6sBRZfL8"
  };

  $.getJSON('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=30&playlistId=PLSWOIa6H704Ft0NfODhpOp_h7CSuOJQhA&key=AIzaSyALicOFaXZslcRWh0d9GzfqUKA6sBRZfL8', function(data,status,xhr){
		$.each(data.items.sort(sortPublish), function(i, data){
    	id = data.snippet.resourceId.videoId;
      title = data.snippet.title;
      pubDate = data.snippet.publishedAt;
      thumbnail = data.snippet.thumbnails.maxres.url;
      url = 'https://www.youtube.com/watch?v='+id;
      video = {
      	"id" : id,
        "title" : title,
        "pubDate" : pubDate,
        "thumbnail": thumbnail,
        "url" : url
      }
      renderVideo(video);

    });
  });

  var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // $.ajax({
  //   url: config.url,
  //   success: function(data) {
  //     $.each(data.items, function(i, video){
  //       renderVideo(video);
  //     });
  //   }
  // });

  function renderVideo(video) {
    var pubDate = new Date(video.pubDate);
    console.log(video.thumbnail);
    var container =
      '<div class="block-item col-sm-4 col-xs-6">'+
        '<div class="news-top-box"></div>'+
        '<a href="'+ video.url +'" target="_blank">'+
          '<div style="background-image:linear-gradient(to bottom, rgba(0,0,0,.40), rgba(0,0,0,.30)), url(\''+ video.thumbnail+' \'); width: 100%; height: 292px; max-height: 292px; display: inline-flex; justify-content: center; align-items: center; background-size: cover;">'+
            '<img style="width: 52px;" src="./src/img/yt-icon.svg"/>'+
          '</div>'+
          '<h5 class="text-primary text-uppercase small"><span class="iconic iconic-video iconic-sm" title="flag" aria-hidden="true"></span> VIDEO</h5>'+
          '<h4 style="margin-bottom: 0px;">'+ video.title +'</h4>'+
          '<br/>'+
          '<p class="publication-date text-uppercase small">'+ monthNames[pubDate.getMonth()] +', '+ pubDate.getFullYear() +'</p>'+
        '</a>'+
        '<hr class="featurette-divider visible-xs">'+
      '</div>';

    $('#videoContainer').append(container);

  }

})();
