const numDivs = 36;
const maxHits = 10;

let hits = 1;
let firstHitTime = 0;

function round() {
  // DONE: надо бы убрать "target" прежде чем искать новый
  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  // DONE: помечать target текущим номером
  $(divSelector).text(hits);
  // DONE: тут надо определять при первом клике firstHitTime  
  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  // DONE: спрятать игровое поле сначала
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#win-message").removeClass("d-none");
  let numberOfMisses = $('.miss').length;
  let score = hits - numberOfMisses;
  $("#total-score").text(score);
}

function handleClick(event) {
  // DONE: убирать текст со старых таргетов. Кажется есть .text?
  if ($(event.target).hasClass("target")) {
    $(event.target).removeClass("target");// убираем класс target, прежде чем вызвать round
    $(event.target).text(""); // убираем текст со старых таргетов
    hits = hits + 1;
    round();
  }
  // DONE: как-то отмечать если мы промахнулись? См CSS класс .miss
  else {
    $(event.target).addClass("miss");
  }
}

function init() {
  // DONE: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  $('.game-field-wrapper').hide();
  $("#button-play").click(function() {
    firstHitTime = getTimestamp();
    $('.game-field-wrapper').show();
    $("#button-play").hide();
    round();
  })

  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });
}

$(document).ready(init);