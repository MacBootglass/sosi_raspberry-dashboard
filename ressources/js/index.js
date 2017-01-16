var clock;

$(document).ready(function() {
  setInterval(onNextPage, 5000);

  clock = $('.clock').FlipClock({
    clockFace: 'TwentyFourHourClock',
    showSeconds: false
  });
});
