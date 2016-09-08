var Question = { 
	text: "", 
	answerInformation: null, 
	displayed: false 
}

var Answer = { 
	a: "", 
	b: "", 
	c: "", 
	d: "", 
	correct: "" 
}

/* Answer objects that hold answers for each question, and the correct answer */
var answer1 = Object.create(Answer); 
answer1.a = "(-2)"; 
answer1.b = "(-1)"; 
answer1.c = "(+1)"; 
answer1.d = "(+2)"; 
answer1.correct = answer1.a;

var answer2 = Object.create(Answer); 
answer2.a = "(+3)"; 
answer2.b = "(0)"; 
answer2.c = "(-2)"; 
answer2.d = "(+1)"; 
answer2.correct = answer2.d;

var answer3 = Object.create(Answer); 
answer3.a = "A Hole in Two"; 
answer3.b = "An Eagle"; 
answer3.c = "A Bogey"; 
answer3.d = "A Par"; 
answer3.correct = answer3.b;

var answer4 = Object.create(Answer); 
answer4.a = "Pitching Wedge"; 
answer4.b = "6 Iron"; 
answer4.c = "5 Wood"; 
answer4.d = "Driver"; 
answer4.correct = answer4.d;

var answer5 = Object.create(Answer); 
answer5.a = "2"; 
answer5.b = "1"; 
answer5.c = "4"; 
answer5.d = "3"; 
answer5.correct = answer5.c;

/* Question objects that hold the text for each question, and sets the answer variable to correspond with it */
var question1 = Object.create(Question); 
question1.text = "Which of the following would be the winning score?"; 
question1.answerInformation = answer1;

var question2 = Object.create(Question); 
question2.text = "You currently have a score of +2, and then you birdie a hole. What is your score now?"; 
question2.answerInformation = answer2;

var question3 = Object.create(Question); 
question3.text = "You are on a par 4 hole. You make the ball in the cup on your second shot. What is this known as?"; 
question3.answerInformation = answer3;

var question4 = Object.create(Question); 
question4.text = "Typically, the longest club in a players bag is which of the following?"; 
question4.answerInformation = answer4;

var question5 = Object.create(Question); 
question5.text = "On your second shot, you hit the ball into the water. You must take a drop. When you hit your next shot, which shot number will you be hitting?"; 
question5.answerInformation = answer5;

/* Array for list of questions 1-5 */
var questionList = [question1, question2, question3, question4, question5];

function DisplayQuestion(ques){
	if (questionList[ques] != null){ 
		$("#startPage").hide();
		$("#questionText").text(questionList[ques].text); 
		$("#answerA").text(questionList[ques].answerInformation.a); 
		$("#answerB").text(questionList[ques].answerInformation.b); 
		$("#answerC").text(questionList[ques].answerInformation.c); 
		$("#answerD").text(questionList[ques].answerInformation.d);

		$("#inputA").val(questionList[ques].answerInformation.a);
		$("#inputB").val(questionList[ques].answerInformation.b);
		$("#inputC").val(questionList[ques].answerInformation.c);
		$("#inputD").val(questionList[ques].answerInformation.d);
		questionList[ques].displayed = true;
		$("#questionHeader").show();
		$("#questionPage").show();
	} else {
		$('#questionPage').hide();
		$('#finalPage').hide(); 
		$('#startPage').show();
	}
}

function ValidateAnswer(question, answer){
	var x = question - 1;
	var y = questionList[x];
	if (y.answerInformation.correct === answer) {
		alert("Correct!");

		/* invokes correctAnswerTally function */
		correctAnswerTally();
	}
	else {
		alert("Incorrect. The correct answer is " + y.answerInformation.correct);
	}

	/* Invoke question count tally function */
        questionCountTally();
}

function AppReset(){ 

	$('#finalPage').hide();
	$('#questionPage').show();
	$('#questionHeader').show();
	$('#questionLine').show();

	/* Set HTML text back to original values */
	$("#totalCorrect").text("0");
	$("#questionCount").text("1");

	/* Resets the values of the form radio answers of the quiz, when quiz starts over */
	document.getElementById('questionAnswers').reset();

	/* Reset global variables to start over */
	currentQuestion = +($("#questionCount").text());
	correctAnswerCount = +($("#totalCorrect").text());
}

/* Setting question count variable, convert to number from string as well */
        var currentQuestion = +($("#questionCount").text());

/* Setting correct answer count variable, convert to number from string as well */
        var correctAnswerCount = +($("#totalCorrect").text());	

/* Declaring questionCount running total function */
		function questionCountTally () {
       		currentQuestion += 1;
      		$("#questionCount").text(currentQuestion);
		}

		/* Declaring correctAnswer running total function */
		function correctAnswerTally () {
       		correctAnswerCount += 1;
     		 $("#totalCorrect").text(correctAnswerCount);
		}

$(document).ready(function(){ 
	
/*	Could use this instead of .mouseup
	$('#startButton').on('click', function(){
		DisplayQuestion(question1);
	});
*/
	
	/* When the Start button is clicked, the first question is shown */
	$("#startButton").mouseup(function() {

		AppReset();

		/* Calls function to display the first question, which is 0 in the array questionList */
		DisplayQuestion(0);

	});

    $("#questionAnswers").submit(function(event) {

		event.preventDefault();

		/* Set variable to the value of the user's answer, based on selected radio button */
		var userAnswerValue = $("input[name=answersOne]:checked", "#questionAnswers").val();

		/* Validate the user's answer based on the current question, calling ValidateAnswer function */
		ValidateAnswer(currentQuestion, userAnswerValue);

		/* Loops through as long as i <= the array length, which is 5 questions */
		for (i = 0; i <= questionList.length; i++){ 
	 		if(i == 4){
	 			$("#questionLine").hide();
	 			$("#questionPage").hide();
	 			$("#finalPage").show();
	 			break;
	 		}
	 		else if(questionList[i].displayed){  
	 			questionList[i].displayed = false;
	 			DisplayQuestion(i + 1);	
	 			/* Resets radio button answers of questions to unchecked */ 			
	 			$("input[name = answersOne]").prop("checked", false); 
	 			break;
	 		 	}
    	};
	});

    /* Same as the startButton function above, that starts the quiz */
	$("#newGameButton").mouseup(function(){
		AppReset();
		DisplayQuestion(0);
	});
});