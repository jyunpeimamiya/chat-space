$(function(){ 
  function buildHTML(message){
   if ( message.content && message.image ) {
     var html =
      `<div class="message" data-message-id=` + message.id+ `>` +
         `<div class="upper-message">` +
           `<div class="upper-message__user-name">` +
             message.user_name +
           `</div>` +
           `<div class="upper-message__date">` +
             message.created_at +
           `</div>` +
         `</div>` +
         `<div class="lower-message">` +
          `<p class="lower-message__content">` +
            message.content +
          `</p>` +
          `<img src="` + message.image + `" class="lower-message__image" >` +
          `</div>` +
       `</div>` 
    
   } else if (message.content) {
    var html = `<div class="message" data-message-id=` + message.id + `>` +
      `<div class="upper-message">` +
        `<div class="upper-message__user-name">` +
          message.user_name +
        `</div>` +
        `<div class="upper-message__date">` +
          message.created_at +
        `</div>` +
      `</div>` +
      `<div class="lower-message">` +
        `<p class="lower-message__content">` +
          message.content +
        `</p>` +
      `</div>` +
    `</div>`
  } else if (message.image) {
    var html = `<div class="message" data-message-id=` + message.id + `>` +
      `<div class="upper-message">` +
        `<div class="upper-message__user-name">` +
          message.user_name +
        `</div>` +
        `<div class="upper-message__date">` +
          message.created_at +
        `</div>` +
      `</div>` +
      `<div class="lower-message">` +
        `<img src="` + message.image + `" class="lower-message__image" >` +
      `</div>` +
    `</div>`
  };
  return html;
};

});
 
$('.new_message').on('submit', function(e){
 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action')
 $('.form__submit').removeAttr('data-disable-with');
 var reloadMessages = function() {
  last_message_id = $('.message:last').data("message-id");
 $.ajax({
   url: "api/messages",
   type: "get",
   data: formData,
   dataType: 'json',
   date: {id: last_message_id}
 })
  .done(function(messages){
    if (messages.length !== 0) {
    var insertHTML = '';
    $.each(messages, function(i,message) {
      insertHTML += buildHTML(message)
    });
    $('.messages').append(insertHTML);
    $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    $("#new_message")[0].reset();
    $(".form__submit").prop("disabled", false);
  }
  })
  .fail(function() {
    alert("メッセージ送信に失敗しました")
  });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
  });
