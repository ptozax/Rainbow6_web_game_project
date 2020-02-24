(function () {
  var questions = [{
    question: '<div class="center1">  <h2 style="margin-left:5%">ชื่อของเจ้าหน้าที่คนนี้คือ?</h2>     <div><img src="img/finka.png" width=300px ></div>  </div>  ',
    choices: [
      "IQ ",
      "FINKA",
      "NOKK",
      "LION "],
    correctAnswer: 1
  },
  {
    question: '<div class="center1">  <h2 style="margin-left:5%">ความสามารถของเจ้าหน้าที่นี้คือ?</h2>     <div><img src="img/doc.png" width=300px ></div>  </div>  ',
    choices: ["นั่งเฉยๆ", "วิ่งดักยิงจุดเกิด", "ยิงปืนเพิ่ม HP ไห้เพื่อน", "วางเกราะไห้เพื่อนใช้"],
    correctAnswer: 2
  }, {
    question: '<div class="center1">  <h2 style="margin-left:5%">ความสามารถอุปกรณ์นี้คือ?</h2>     <div><img src="img/f_f.png" width=300px ></div>  </div>  ',
    choices: ["ยิงลูกระเบิด", "ติดตังในห้องตัวประกัน", "สร้างสัญญาณรบกวน", "ตรวจหากับอุปกรณ์ฝั่งตรงข้าม"],
    correctAnswer: 0
  }, {
    question: '<div class="center1">  <h2 style="margin-left:5%">ฉายาเจ้าหน้าที่คนนี้คือ?</h2>     <div><img src="img/tachanka.png" width=300px ></div>  </div>  ',
    choices: ["นักปาดคอ", "โล่ฆ่าเพื่อน", "นักขุดเพดาน", "ท่าน LORD"],
    correctAnswer: 3
  }, {
    question: '<div class="center1">  <h2 style="margin-left:5%">คิดว่าคนทำเกมนี้ชอบตัวนี้มั้ย?</h2>     <div><img src="img/carvelra.png" width=300px ></div>  </div>  ',
    choices: ["งั้นๆอ่ะ", "ชอบมาก", "โคตรเกลียด", "ตัวอะไรเนี่ย"],
    correctAnswer: 1
  }];

  $('.1page').hide();
  // $('.1page').show();
  //$('.ct1').hide();

  $('#btn').click(function () {

    $('.ct1').fadeOut();
    $('.1page').fadeIn();







  })



  var questionCounter = 0;
  var selections = [];
  var quiz = $('#quiz');


  displayNext();


  $('#next').on('click', function (e) {
    e.preventDefault();


    if (quiz.is(':animated')) {
      return false;
    }
    choose();


    if (isNaN(selections[questionCounter])) {
      alert('ตอบคำถามก่อนสิ!!!!');
    } else {
      questionCounter++;
      displayNext();
    }
  });


  $('#prev').on('click', function (e) {
    e.preventDefault();

    if (quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });


  $('#start').on('click', function (e) {
    e.preventDefault();

    if (quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });


  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });


  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });

    var header = $('<h2 style="padding-top:10px;">ข้อที่ ' + (index + 1) + ':</h2>');
    qElement.append(header);

    var question = $('<p>').append(questions[index].question);
    qElement.append(question);

    var radioButtons = createRadios(index);
    qElement.append(radioButtons);

    return qElement;
  }


  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }


  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }


  function displayNext() {
    quiz.fadeOut(function () {
      $('#question').remove();

      if (questionCounter < questions.length) {
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value=' + selections[questionCounter] + ']').prop('checked', true);
        }

        if (questionCounter === 1) {
          $('#prev').show();
        } else if (questionCounter === 0) {

          $('#prev').hide();
          $('#next').show();
        }
      } else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }


  function displayScore() {
    
    var score = $('<p>', { id: 'question' });

    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    
    var rank;

if (numCorrect ==0) {
  rank=" <br><div style=' text-align: center;'>เดายังไงไม่ถูกเลยเนี่ยXD</div>"
} 
else if(numCorrect >=1&&numCorrect<=2){

  rank="<br><div style=' text-align: center;'>ก็พอเป็นนะ (หรือเดาเอาเนี่ยห๊ะ!!!)</div>";


}
else if(numCorrect >=3&&numCorrect<=4){

  rank="<br><div style=' text-align: center;'>เอาเรื่องอยู่นะเนี่ย!!!</div>";


}
else if(numCorrect ==5){

  rank="<br><div style=' text-align: center;'>นี่มันระกับเซียน!!!</div>";


}


    score.append('คุณได้ ' + numCorrect + ' คะแนนจาก ' +
      questions.length + ' ข้อ '+rank);
    return score;
  }
})();