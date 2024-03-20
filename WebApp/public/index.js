$(document).ready(function () {
  let nr;
  let backup1;
  let backup2;
  let camera;
  let jucatoriFront;
  let jucatoriBack;
  let cameraDeschisa = null;

  $('.edit').click(function () {
    //apas pe butonul de edit
    if (cameraDeschisa) {
      // Dacă există o cameră deschisă, închide-o
      cameraDeschisa.find('.cancel').click(); // Simulează clic pe butonul "Cancel" al camerei deschise
    }
    nr = this.id.slice(4); //obtin numarul camerei
    camera = $(this).closest('.camere'); //ma duc la div-ul parinte
    backup1 = camera.find('.jucator1').text(); //copiez numele jucatorilor curenti in prealabil
    backup2 = camera.find('.jucator2').text(); //copiez numele jucatorilor curenti in prealabil

    //ma duc la clasele textelor pentru a schimba interfata
    jucatoriFront = camera.find('.jucatorii-front');
    jucatoriBack = camera.find('.jucatorii-back');

    jucatoriFront.addClass('clicked');
    jucatoriBack.addClass('clicked');
    cameraDeschisa = camera;
  });

  $('.save').click(function () {
    //copiez ce s-a adaugat in input
    let jucator1Value = jucatoriBack.find('.jucator1-back').val();
    let jucator2Value = jucatoriBack.find('.jucator2-back').val();
    
    //Controlez intrarea datelor
    if (jucator1Value !== '' || jucator1Value !== ' ') {
      camera.find('.jucator1.cam' + nr).text(jucator1Value);
    }

    if (jucator2Value !== '' || jucator2Value !== ' ') {
      camera.find('.jucator2.cam' + nr).text(jucator2Value);
    }

    if (
      (jucator1Value !== '' || jucator1Value !== ' ') &&
      (jucator2Value === '' || jucator2Value === ' ')
    ) {
      camera.find('.jucator1.cam' + nr).text(jucator1Value);
      camera.find('.jucator2.cam' + nr).text(backup2);
    }

    if (
      (jucator2Value !== '' || jucator2Value !== ' ') &&
      (jucator1Value === '' || jucator1Value === ' ')
    ) {
      camera.find('.jucator2.cam' + nr).text(jucator2Value);
      camera.find('.jucator1.cam' + nr).text(backup1);
    }
    if ((jucator1Value === '' && jucator2Value === '') || (jucator1Value === ' ' && jucator2Value === ' ')) {
      alert('Cel puțin unul dintre câmpurile jucătorului trebuie completat!');
      return; // Opresc salvarea dacă validarea nu este îndeplinită
    }
    // if (
    //   (jucator2Value === '' || jucator2Value === ' ') &&
    //   (jucator1Value === '' || jucator1Value === ' ')
    // ) {
    //   camera.find('.jucator2.cam' + nr).text(backup2);
    //   camera.find('.jucator1.cam' + nr).text(backup1);
    // }

    setTimeout( () => {
      jucatoriBack.find('.jucator1-back').val('');
      jucatoriBack.find('.jucator2-back').val('');
    },1000);
    
    //revin la interfata normala
    jucatoriFront.removeClass('clicked');

    jucatoriBack.removeClass('clicked');
    cameraDeschisa = null;
  });

  $('.cancel').click(function () {
    //in caz ca se da cancel, numele jucatorilor sa ramana acelasi
    camera.find('.jucator2.cam' + nr).text(backup2);
    camera.find('.jucator1.cam' + nr).text(backup1);
    //resetez valoarea din input
    jucatoriBack.find('.jucator1-back').val('');
    jucatoriBack.find('.jucator2-back').val('');
    //revin la interfata
    jucatoriFront.removeClass('clicked');
    jucatoriBack.removeClass('clicked');
    cameraDeschisa = null;
  });
});
