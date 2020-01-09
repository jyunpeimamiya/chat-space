$(function() {
  function addUser(user) {
    let html = `
      <div class="chat-group-form__field clearfix">
        <p class="chat-group-form__left" ></p>
        <div class="-chat-group-form__field--right"> </div>
          <div class="js-add-user" id="${chat-group-users}">追加</div>
          </div>
    `;
    $("#user-search-result").append(html);
  }

  function addNoUser() {
    let html = `
      <div class="chat-group-form__field clearfix">
        <p class="chat-group-form__left">ユーザーが見つかりません</p>
      </div>
    `;
    $("#user-search-result").append(html);
  }
  function addDeleteUser(name,id){
    let html =`
    <div class="chat-group-form__field clearfix" id="${id}">
      <p class="chat-group-form__left">${name}</p>
      <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn" data-user-id="${id}" data-user-name="${name}">削除</div>
    </div>`;
    $(".chat-group-users.js-add-user").append(html);
  }
  function addMember(userId){
    let html = `<input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" />`;
    $(`#${userId}`).append(html);
  }
  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      $("#user-search-result").empty();

      if (users.length !== 0){
        users.forEach(function(user) {
          addUser(user);
        });
      } else if (input.length == 0) {
        return false;
      } else{
        addNoUser();
      }
    })
    .fail(function() {
      alert("通信エラーです。ユーザーが表示できません。");
    });
  });
  $(document).on("click", ".chat-group-user__btn--add", function() {
    console.log
    const userName = $(this).attr("data-user-name");
    const userId = $(this).attr("data-user-id");
    $(this)
      .parent()
      .remove();
    addDeleteUser(userName, userId);
    addMember(userId);
  });
  $(document).on("click", ".chat-group-user__btn--remove", function() {
    $(this)
      .parent()
      .remove();
  });
});