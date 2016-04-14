	////////////////////////////////////////////////////////////////////////////////////////////////////////
	//// Define Variables
	////////////////////////////////////////////////////////////////////////////////////////////////////////

// MOVE THESE INTO FUNCTIONS WHEN DONE!!  Except global variables that will be kept.
var surveyQuestionsAnswers = [];
var questionNumber;
// Below are likely the ones that will be functional variables
var form1 = document.form1;
var form2 = document.form2;
var surveyTitle = form1.surveyTitle;
var backgroundColor = form1.backgroundColor;
var headerBackgroundColor = form1.headerBackgroundColor;
var buttonColor = form1.fontColor;
var buttonColor = form1.buttonColor;
var textAreaQuestion = form1.textAreaQuestion;
var ExecuteSurvey = form1.ExecuteSurvey;
var question = document.getElementById('question');
var answerChoicesRadio = form1.answerChoicesRadio;
var Continue = form2.Continue;



	////////////////////////////////////////////////////////////////////////////////////////////////////////
	//// Initialize UI
	////////////////////////////////////////////////////////////////////////////////////////////////////////

//// Initially hide the question and answer HTML
form2.style.display = 'none';

	////////////////////////////////////////////////////////////////////////////////////////////////////////
	//// Defining Main Functions and Callback Functions
	////////////////////////////////////////////////////////////////////////////////////////////////////////

//// Purpose: Fills the surveyQuestionsAnswers array once the users clicks on "Execute the Survey".
//// This is an array of objects.
var fillSurveyQuestionsAnswers = function() {
	var surveyQuestionsAnswersObject;
	var trimTextAreaQuestionValue = textAreaQuestion.value.trim();
	// New lines identify the questions & answers
	var rawSurveyQuestionsAnswers  = trimTextAreaQuestionValue.split(/\n/gi);
	// Each question has seven new line characters, except the last one which has six.  Rounding shouldn't be needed.
	var numberOfQuestions = ((rawSurveyQuestionsAnswers.length + 1)/7).toFixed(0);
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

// Purpose: Assign the classes to elements once the user clicks on "Execute the Survey".
var setUpSurveyCSS = function() {
	var form1 = document.form1;
	var form2 = document.form2;
	var surveyTitle = form1.surveyTitle;
	var backgroundColor = form1.backgroundColor;
	var headerBackgroundColor = form1.headerBackgroundColor;
	var buttonColor = form1.buttonColor;
	var textAreaQuestion = form1.textAreaQuestion;
	
	var headers = document.querySelectorAll("h2");
	for (var i = 0; i < headers.length; i++) {
		headers[i].style.backgroundColor=headerBackgroundColor.value;
	}
	document.body.style.backgroundColor=backgroundColor.value;
};

// Purpose: Get the labels near each radio button to check the radio button.
var turnOnRadioButton = function() {
	
};

//// Purpose: Define the values in the progress bar based on how many questions there are.
var progressBarUpdate = function(totalNumberOfQuestions, questionNumber) {
	var completionProgress = document.getElementById("completionProgress");
	//Update max if on the first question
	if (questionNumber=1)
		completionProgress.setAttribute("max", totalNumberOfQuestions);
	completionProgress.value++;
};

// Purpose: Check if the user asked at least one question (a minimum of 6 new line characters used)
var userInputValidationMinimumQuestions = function() {
	
};

// Purpose: Show the results of the survey
var showResults = function() {

};

	////////////////////////////////////////////////////////////////////////////////////////////////////////
	//// Main Event Listeners and Function Calls
	////////////////////////////////////////////////////////////////////////////////////////////////////////	

// Start the survey once "Execute the Survey" is clicked on.
ExecuteSurvey.addEventListener("click", function() {
	form2.style.display = 'block';
	form1.style.display = 'none';
	fillSurveyQuestionsAnswers();
	updateQuestionsAnswers(1);
	setUpSurveyCSS();
});

Continue.addEventListener("click",function() {
	progressBarUpdate(surveyQuestionsAnswers.length, questionNumber);
	questionNumber++;
	if (surveyQuestionsAnswers.length <= questionNumber)
		updateQuestionsAnswers(questionNumber);	
	else
		showResults();
}); 








