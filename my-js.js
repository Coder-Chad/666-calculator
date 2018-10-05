window.onload = function() {
    document.getElementById('textUsedForSearch').value = localStorage.getItem("theSetText");   // "paste" the input text used into it
    do_calculation( localStorage.getItem("theSetText"), localStorage.getItem("searchCode"), localStorage.getItem("letter_A_Value") );
}

function do_calculation( setTextValue, theSearchCode, theLetterAValue ) {
 
    var letterA = theLetterAValue;;
    var search_code = theSearchCode;
    var linesOfWordsArray = setTextValue.split("\n");
    var numberOfLines = linesOfWordsArray.length;
    var totalWords = 0;
    var currentLineNum = 0;
    var matches = 0;
    var outputReport = "";
    var the_index = 0;
    // var theWords = '';
    var oneLineOfWords = '';
    var index = 0;
    var alphabetLetterNumber = 0;
    var word_total = 0;
    // var numWordsCurrentLine = 0;

    while(the_index < numberOfLines){  // work through each line of words

        currentLineNum++;
        oneLineOfWords = linesOfWordsArray[the_index].split(" ");    
        index = 0;
        
        while( index <  oneLineOfWords.length) {  // the current line of words
            totalWords++; // count it as one word
            word_total = 0;
            char_num = 0;
            while( char_num < oneLineOfWords[index].length ) { // analyze this word while building its total value
                alphabetLetterNumber = 1;
                while( alphabetLetterNumber <= 26 ) {
                    if( (alphabetLetterNumber+96) === oneLineOfWords[index].charCodeAt(char_num ) ) { // is it a lower case character match
                        word_total += (letterA * alphabetLetterNumber);
                    }
                    if( (alphabetLetterNumber+64) === oneLineOfWords[index].charCodeAt(char_num) )  { // is it a upper case character match
                        word_total += (letterA * alphabetLetterNumber);
                    }
                    alphabetLetterNumber++;

                }
                char_num++;
            }

            if( word_total == search_code ) { // has a match been found
                matches++;
                console.log("Match found");
                if(matches === 1) {
                    outputReport = "CALCULATION REPORT\n";
                }
                outputReport = outputReport.concat( "\nMatch number: " + matches + " Found on line: " + currentLineNum + " The word is: " + oneLineOfWords[index] );
            }
            index++;
        }
        the_index++;
    }
    outputReport = outputReport.concat( "\n\nTotal Matches Found: " + matches + "\nSearch Code was: " + search_code + "\nLetter A Value was: " + letterA + "\nTotal Words Looked At: " + totalWords + "\nTotal Lines: " +  numberOfLines );    
    document.getElementById('resultReport').value = outputReport;
    localStorage.clear();
}
