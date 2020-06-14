$(function () {
  function setSizes() {
    setTimeout(function () {
      // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
      let vh = window.innerHeight * 0.01;
      // Then we set the value in the --vh custom property to the root of the document
      document.documentElement.style.setProperty("--vh", vh + "px");
      //document.body.style.setProperty("--vh", vh + "px");
    }, 50);
  }

  setSizes();

  $(window).resize(function () {
    setSizes();
  });

  $(".timeline").each(function (index, element) {
    var that = $(this),
      steps = that.find("li"),
      stepsCount = steps.length,
      count = $(".timeline-control__count"),
      title = that.data("title"),
      step = "<li data-title='" + title + "'></li>";

    count.text(stepsCount);

    for (let i = 0; i < steps.length; i++) {
      $(steps[i]).attr("data-title", title);
    }

    $(".timeline-control__view .checkbox__input").click(function (e) {
      e.target.checked
        ? that.attr("data-view", "line")
        : that.attr("data-view", "point");
    });

    $(".timeline-control__position .checkbox__input").click(function (e) {
      e.target.checked
        ? that.attr("data-text-position", "up")
        : that.attr("data-text-position", "down");
    });

    $(".timeline-control__btn").click(function (e) {
      var steps = that.find("li");

      if ($(this).hasClass("timeline-control__btn--icrement")) {
        that.append(step);
        count.text(that.find("li").length);
      } else if ($(this).hasClass("timeline-control__btn--decrement")) {
        if (
          !$(steps[that.find("li").length - 1]).hasClass("timeline__progress")
        ) {
          steps[that.find("li").length - 1].remove();
          count.text(that.find("li").length);
        }
      }
    });
  });
});
