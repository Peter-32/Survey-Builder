	////////////////////////////////////////////////////////////////////////////////////////////////////////
	//// Define Variables
	////////////////////////////////////////////////////////////////////////////////////////////////////////

// Ideally these wouldn't be global.
// questionNumber is passed in to some functions even though it is global.
var surveyQuestionsAnswers = [];
var questionNumber = 1;

	////////////////////////////////////////////////////////////////////////////////////////////////////////
	//// Initialize UI
	////////////////////////////////////////////////////////////////////////////////////////////////////////

//// Initially hide the question and answer HTML
form2.style.display = 'none';

	////////////////////////////////////////////////////////////////////////////////////////////////////////
	//// Defining Main Functions and Callback Functions
	////////////////////////////////////////////////////////////////////////////////////////////////////////

//// Purpose: Fills the surveyQuestionsAnswers array once the users clicks on "Execute the Survey".
//// This is an array of objects and will only be filled once.
var fillSurveyQuestionsAnswers = function() {
	var textAreaQuestion = form1.textAreaQuestion;
	var surveyQuestionsAnswersObject;
	var trimTextAreaQuestionValue = textAreaQuestion.value.trim();
	// New lines identify the questions & answers
	var rawSurveyQuestionsAnswers  = trimTextAreaQuestionValue.split(/\n/gi);
	// Each question has seven new line characters, except the last one which has six.  Rounding shouldn't be needed.
	var numberOfQuestions = ((rawSurveyQuestionsAnswers.length + 2)/7).toFixed(0);
	for (var i = 0; i < numberOfQuestions; i++) {
		surveyQuestionsAnswersObject = {
			choice: "", question: rawSurveyQuestionsAnswers[7*i+0], answers: [rawSurveyQuestionsAnswers[7*i+2],
			rawSurveyQuestionsAnswers[7*i+3],rawSurveyQuestionsAnswers[7*i+4],rawSurveyQuestionsAnswers[7*i+5]]}
			
		surveyQuestionsAnswers.push(surveyQuestionsAnswersObject);
	}
};

//// Update the questions and answers.
var updateQuestionsAnswers = function(questionNumber) {
	document.getElementById('question').innerHTML = surveyQuestionsAnswers[questionNumber-1].question;
	document.getElementById('answerChoiceAText').innerHTML = surveyQuestionsAnswers[questionNumber-1].answers[0];
	document.getElementById('answerChoiceBText').innerHTML = surveyQuestionsAnswers[questionNumber-1].answers[1];
	document.getElementById('answerChoiceCText').innerHTML = surveyQuestionsAnswers[questionNumber-1].answers[2];
	document.getElementById('answerChoiceDText').innerHTML = surveyQuestionsAnswers[questionNumber-1].answers[3];
};

//// Purpose: Assign the classes to elements once the user clicks on "Execute the Survey".
var setUpSurveyOptions = function() {
	var form1 = document.form1;
	var backgroundColor = form1.backgroundColor;
	var headerBackgroundColor = form1.headerBackgroundColor;
	var fontColor = form1.fontColor;
	var buttonColor = form1.buttonColor;
	var surveyTitle = form1.surveyTitle;
	var fontFamily = form1.fontFamily;
	var fontSize = form1.fontSize;
	
	// Text
	document.getElementById('surveyTitle').innerHTML=surveyTitle.value;
	document.body.style.fontFamily=fontFamily.value;
	document.body.style.fontSize=fontSize.value;
		
	// Colors
	document.body.style.backgroundColor=backgroundColor.value;
	document.body.style.color=fontColor.value;
	var headers = document.querySelectorAll("h2");
	for (var i = 0; i < headers.length; i++) {
		headers[i].style.backgroundColor=headerBackgroundColor.value;
	}
	var buttons = document.querySelectorAll(".button");
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].style.color="white";
		buttons[i].style.backgroundColor=buttonColor.value;
		buttons[i].style.fontSize=fontSize.value * 0.4
		buttons[i].style.fontFamily=fontFamily.value
	}	
};

//// Purpose: Get the labels near each radio button to check the radio button.
var turnOnRadioButton = function() {
	var radioButton;
	if (this.firstChild.nodeType == 1)
		radioButton = this.firstChild;
	else
		radioButton = this.firstChild.nextSibling;
	radioButton.checked="checked";
};

//// Purpose: Create event listeners 
var setEventListenersForRadioButtonLabels = function() {
	var radioElements = document.querySelectorAll(".answerChoice");
	for (var i = 0; i < radioElements.length; i++) {
		radioElements[i].addEventListener("click",turnOnRadioButton);
	}
};

//// Purpose: Define the values in the progress bar based on how many questions there are.
var progressBarUpdate = function(totalNumberOfQuestions, questionNumber) {
	var completionProgress = document.getElementById("completionProgress");
	//Update max if on the first question
	if (questionNumber=1)
		completionProgress.setAttribute("max", totalNumberOfQuestions);
	completionProgress.value++;
};

//// Purpose: Don't let the user proceed until choosing a radio box.  Return true if there is a value checked, false otherwise
var hasCheckedABox = function() {
	var radios = form2.answerChoicesRadio;
	for (var index = 0; index < radios.length; index++) {
		if (radios[index].checked) {
			//If checked then store the user's answer choice in property "choice"
			return true;
		}
	}
	return false;
};

// Purpose: Check if the user asked at least one question (a minimum of 6 new line characters used)
// Returns true if at least 6 new lines are present.
var userInputValidationQuestionsAnswers = function() {
	var textAreaQuestion = form1.textAreaQuestion;
	var trimTextAreaQuestionValue = textAreaQuestion.value.trim();
	// New lines identify the questions & answers
	if(trimTextAreaQuestionValue.search(/\n/gi) == -1)
		return false;
	var countNewLines  = trimTextAreaQuestionValue.match(/\n/gi).length;
	if ((countNewLines + 2) % 7 == 0 || countNewLines == 'undefined')
		return true;
	else
		return false;
};

// Purpose: Stores the choice made by the user and unchecks the radio button.
var storeAnswerChoiceAndUncheck = function(questionNumber) {
	var radios = form2.answerChoicesRadio;
	var currentQuestion = surveyQuestionsAnswers[questionNumber-1]
	for (var index = 0; index < radios.length; index++) {
		if (radios[index].checked) {
			//If checked then store the user's answer choice in property "choice"
			if (radios[index].nextSibling.nodeType == 1)
				currentQuestion.choice = radios[index].nextSibling.textContent;
			else
				currentQuestion.choice = radios[index].nextSibling.nextSibling.textContent;
			radios[index].checked = "";
		}
	}
};

// Purpose: Show the results of the survey
var showResults = function() {
	var h4Element;
	var text;
	
	// Change header where the question was previously.
	document.getElementById('question').innerHTML='Results:';
	// Remove the choices and the button
	document.getElementById('answerChoiceDiv').style.display = 'none';
	document.getElementById('continueBtnDiv').style.display = 'none';
	// Add the results
	for (var i = 0; i < surveyQuestionsAnswers.length; i++) {
		h4Element = document.createElement("h4");
		text = document.createTextNode(surveyQuestionsAnswers[i].question + "	" + 
									   surveyQuestionsAnswers[i].choice);
		h4Element.appendChild(text);
		document.body.appendChild(h4Element);
	}
	
};

	////////////////////////////////////////////////////////////////////////////////////////////////////////
	//// Main Event Listeners and Function Calls
	////////////////////////////////////////////////////////////////////////////////////////////////////////	

//// Start the survey once "Execute the Survey" is clicked on.  This will only be clicked once.
document.form1.ExecuteSurvey.addEventListener("click", function() {
	if (userInputValidationQuestionsAnswers()) {
		form2.style.display = 'block';
		form1.style.display = 'none';
		fillSurveyQuestionsAnswers();
		updateQuestionsAnswers(questionNumber); // always question number 1
		setUpSurveyOptions();
		setEventListenersForRadioButtonLabels();
	} else
		alert('Please check your syntax for the questions and answers and try again.');
	
});

// This takes you to the next question.
document.form2.Continue.addEventListener("click",function() {
	if (hasCheckedABox()) { // If true then proceed.
		// Store the answer and uncheck
		storeAnswerChoiceAndUncheck(questionNumber)
		// Passing in total number of questions to the progress bar to get the maximum value.
		progressBarUpdate(surveyQuestionsAnswers.length, questionNumber);
		// Next question
		questionNumber++;
		// Are we finished?
		if (questionNumber <= surveyQuestionsAnswers.length)
			// Update the questions
			updateQuestionsAnswers(questionNumber);	
		else
			showResults();
	} else 					//Otherwise the user is alerted.
		alert('Please choose an answer before preceding.');	
}); 