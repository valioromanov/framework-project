var app = angular.module("HangmanApp",[]);
app.controller("GameController",['$scope','$timeout',function($scope,$timeout){
    var words = ["rat","university","framework","angular","valentin","marina"];
    $scope.incorrectLettersChosen = [];
    $scope.correctLettersChosen = [];
    $scope.guesses = 6;
    $scope.displayWord = '';
    $scope.input = {
        letter: ''
    };
    $scope.wordInChosenList = false;
    $scope.restartGame = function(){
        newGame();
    }
    $scope.endGame = true;
    $scope.endGameText = "";
    var selectedWord = '';
    var selectRandomWord = function(){
        var index = Math.round(Math.random()*words.length);
        return words[index];
    }

    var newGame = function(){
        $scope.endGame = true;
        $scope.endGameText = "";
        $scope.incorrectLettersChosen = [];
        $scope.correctLettersChosen = [];
        $scope.guesses = 6;
        $scope.displayWord = '';
        $scope.input = {
            letter: ''
        };
        selectedWord = selectRandomWord();
        console.log(selectedWord);
        var tempDisplayWord = '';

        for(var i = 0; i < selectedWord.length; i++){
            tempDisplayWord += '*';
        }
        $scope.displayWord = tempDisplayWord;

    };

    $scope.letterChosen = function(){
        for(var i = 0; i < $scope.correctLettersChosen.length; i++){
            if($scope.correctLettersChosen[i].toLowerCase() == $scope.input.letter.toLowerCase()){
                $scope.input.letter = "";
                $scope.wordInChosenList = true;
                return;
            }
        }

        for(var i = 0; i < $scope.incorrectLettersChosen.length; i++){
            if($scope.incorrectLettersChosen[i].toLowerCase() == $scope.input.letter.toLowerCase()){
                $scope.input.letter = "";
                $scope.wordInChosenList = true;
                return;
            }
        }

        var correct = false;
        for(var i = 0; i < selectedWord.length; i++){
            if(selectedWord[i].toLowerCase() == $scope.input.letter.toLowerCase()){
                $scope.displayWord = $scope.displayWord.slice(0,i) + $scope.input.letter.toLowerCase() + $scope.displayWord.slice(i+1);
                correct = true;
                $scope.wordInChosenList = false;
            }
        }

        if(correct){
            $scope.correctLettersChosen.push($scope.input.letter.toUpperCase());
            $scope.wordInChosenList = false;
        } else {
            $scope.incorrectLettersChosen.push($scope.input.letter.toUpperCase());
            $scope.wordInChosenList = false;
            $scope.guesses--;
        }

        $scope.input.letter = "";
        if($scope.guesses == 0){
            $scope.endGame = false;
            $scope.endGameText = "You Lost!";
            $timeout(function(){
                newGame();
            },1000);
        } 

        if($scope.displayWord.indexOf("*")==-1){
            $scope.endGame = false;
            $scope.endGameText = "You won!";
            $timeout(function(){
                newGame();
            },1000);
        }
    }

    newGame();

}])