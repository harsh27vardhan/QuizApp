import { quizQuestions } from "./questions.js";

const startContainer = document.querySelector(".start-window");
const endContainer = document.querySelector(".end-window");
const start = document.getElementById("start");
const difficulty = document.getElementById("difficulty");
const numOfQues = document.getElementById("numOfQues");

const gameContainer = document.querySelector(".quiz-app");
const timerValue = document.querySelector(".quiz-timer-value");
const progressBar = document.querySelector(".quiz-progress");
const question = document.querySelector(".quiz-question");
const options = document.querySelector(".quiz-options");

const currentQuestion = document.querySelectorAll(".quiz-questions-current");
const totalQuestion = document.querySelector(".quiz-questions-total");

const optionsContainer =  document.querySelector(".quiz-options")

const timeLeft = document.querySelector(".time-left-value");

const analysis2 = document.createElement("div");





start.addEventListener("click",startApp);
function startApp(){
    startContainer.style.display = "none";
    gameContainer.style.display = "flex";
    endContainer.innerHTML = "";
    analysis2.innerHTML = "";
    
    endContainer.style.display = "none";
    // timer = parseInt(difficulty.value);
    // console.log(timer);

    
    let timer = Number(difficulty.value);
    // let timer = parseInt(difficulty.value);
    // console.log(timer);
    let currentTimer = timer;
    let currentQuestionIndex = -1;
    let totalQuestionsCount = 0;
    let questions = randomQuestions(Number(numOfQues.value));
    let correctAnswerNo = 0;

    let interval = 0;
    function timingChange(){
        timeLeft.innerText = currentTimer;
        progressBar.style.width = `${(100/(timer))*(currentTimer)}%`;
        currentTimer--;
        if(currentTimer<0){
            updateQuestion();
            currentTimer = timer;
        }
    }
    console.log(quizQuestions);
    function randomQuestions(numberOSQuestions){
        let newQuestions = [];
        for(let i=0;i<numberOSQuestions;i++){
            const randomIndex = Math.floor(Math.random()*quizQuestions.length);
            newQuestions.push(quizQuestions[randomIndex]);
        }
        return newQuestions;
    }
    totalQuestionsCount = questions.length;
    totalQuestion.innerText = totalQuestionsCount;


    function checkOption(e,optionStatement){
        currentTimer = 1;
        const ques = document.createElement("div");
        ques.classList.add("ques");
        ques.innerText = questions[currentQuestionIndex].question;

        if(questions[currentQuestionIndex].answer === optionStatement){
            e.currentTarget.classList.add("correct");
            console.log(e.currentTarget);
            correctAnswerNo++;
            const ans = document.createElement("div");
            ans.classList.add("correct");
            ans.classList.add("quiz-option");
            ans.innerText = optionStatement;
            const ansDiv = document.createElement("div");
            ansDiv.classList.add("ansDiv")
            ansDiv.append(ques,ans);
    
            analysis2.append(ansDiv);
        }
        else{
            e.currentTarget.classList.add("incorrect");
            console.log(e.currentTarget);

            const ans = document.createElement("div");
            ans.classList.add("correct");
            ans.classList.add("quiz-option");
            ans.innerText = questions[currentQuestionIndex].answer;
            const ans1 = document.createElement("div");
            ans1.classList.add("incorrect");
            ans1.classList.add("quiz-option");
            ans1.innerText = optionStatement;
            const ansDiv = document.createElement("div");
            ansDiv.classList.add("ansDiv")
            ansDiv.append(ques,ans,ans1);
    
            analysis2.append(ansDiv);
        }


        const allOptions = document.querySelectorAll(".quiz-option");
        allOptions.forEach((element)=>{
            // if(e.currentTarget!==element.innerText && element.innerText !== optionStatement){
            //     element.disabled = true;
            // }
            if(questions[currentQuestionIndex].answer===element.innerText){
                element.classList.add("correct");
            }
            else if(element.innerText !== optionStatement){
                // element.removeEventListener("click",checkOption);
                element.disabled = true;
            }
            // else if(questions[currentQuestionIndex].answer !== optionStatement){
            //     element.disbled = true;
            // }
        })
        setTimeout(updateQuestion,1000);
    }



    function updateOptions(){
        optionsContainer.innerHTML = "";
        questions[currentQuestionIndex].options.forEach(element => {
            const optionButton = document.createElement("button");
            optionButton.classList.add("quiz-option");
            const optionText = document.createElement("div");
            optionText.classList.add("quiz-option-text");
            optionText.innerText = element;
            const optionImage = document.createElement("img");
            optionImage.classList.add("quiz-option-image");
            optionButton.append(optionText,optionImage);
            console.log(optionButton);
            optionsContainer.append(optionButton);

            optionButton.addEventListener("click",(event)=>checkOption(event,element));
        });
    }

    function updateQuestion(){
        currentQuestionIndex++;
        // currentQuestion.innerText = currentQuestionIndex;
        currentTimer = timer
        console.log(currentQuestionIndex);
        if(currentQuestionIndex === totalQuestionsCount){
            clearInterval(interval);
            endTest();
        }
        else{
            question.innerText = `${currentQuestionIndex+1}. ${questions[currentQuestionIndex].question}`;
            currentQuestion[1].innerText = currentQuestionIndex+1;
            updateOptions();
        }
        
    }


    updateQuestion();
    interval =  setInterval(timingChange,1000);
    // interval = setInterval(updateQuestion,3000);

    function endTest(){
        gameContainer.style.display = "none";
        endContainer.style.display = "flex";

        analysis2.classList.add("analysis2");
       
        endContainer.innerHTML = "";
        const theEnd = document.createElement("h1");
        theEnd.innerText = "THE END";
        endContainer.append(theEnd);
        endContainer.append(analysis2);

        const resetBtn = document.createElement("button");
        resetBtn.classList.add("reset-btn");
        resetBtn.innerText = "Reset";
        endContainer.append(resetBtn);

        resetBtn.addEventListener("click",startApp);
    }
    
    // let interval = setInterval(decrementTime,1);
    
    // function decrementTime(){
    //     currentTimer--;
    //     timeLeft.innerText = currentTimer;
    //     if(currentTimer==0){
    //         updateQuestion();
    //     }
    // }
}
