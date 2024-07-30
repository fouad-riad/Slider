window.addEventListener("load", function () {
  var sliderTag = document.getElementById("slider");
  var timerId;
  var timerId2;

  timerId = setInterval(slider, 6000);

  sliderTag.onclick = gestisciClick;

  function gestisciClick() {
    clearInterval(timerId);
    slider("click");
    timerId = setInterval(slider, 6000);
  }

  function riattaccaListener() {
    sliderTag.onclick = gestisciClick;
  }

  //Sia se slider viene chiamata per via dello scorrimento automatico
  //che da quello derivante dal click devi temporaneamente scollegare
  //il gestore di evento al click (in modo da impedire 2 scorrimenti
  //ravvicinati) e devi anche riprogrammare quando riattaccare il
  //gestore di evento al click (tramite la setTimeout)

  function slider() {
    sliderTag.onclick = null;
    //blocca una eventuale precedente chiamata "programmata"
    //alla funzione riattaccaListener che renderebbe
    //ante-tempo cliccabile lo slider
    clearTimeout(timerId2);
    //Rendi lo slider di nuovo scorribile tramite il click
    //2 secondi dopo il corrente scorrimento
    //è fondamentale che questo tempo sia maggiore o perlomeno
    //uguale al tempo per fare la transition dell'immagine
    //(in questo caso è uguale)
    timerId2 = setTimeout(riattaccaListener, 2000);

    /* document.querySelector(".visibile").style.left = "-100%";
      document.querySelector(".prossima").style.left = 0; */
    /*  I 3 step da implementare al click
    
      1) Togliere la classe visibile all'immagine che attualmente ha
      la class visibile

      2)Rimpiazzare l'immagine che ha la classe prossima con la classe 
      visibile 

      3)All'immagine successiva (o meglio al fratello destro) dell'immagine 
      che ha appena acquisito la classe visibile bisogna dargli la classe 
      .prossima */

    //1)
    document.querySelector(".visibile").classList.remove("visibile");

    //2)
    document.querySelector(".prossima").classList.add("visibile");
    document.querySelector(".prossima").classList.remove("prossima");

    //3)

    var fratelloImgDiventataVisibile =
      document.querySelector(".visibile + img");

    if (fratelloImgDiventataVisibile == null) {
      document.querySelector("#slider img").classList.add("prossima");
    } else {
      fratelloImgDiventataVisibile.classList.add("prossima");
    }
    //document.querySelector(".visibile + img").classList.add("prossima");

    /*   var imgVisibile = document.querySelector(".visibile");
      var fratello = imgVisibile.nextElementSibling;
      fratello.classList.add("prossima"); */
  }

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      clearInterval(timerId);
    } else {
      timerId = setInterval(slider, 3000);
    }
  });
});
