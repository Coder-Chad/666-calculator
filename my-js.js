window.onload = function() {
    // document.getElementById('textUsedForSearch').value = localStorage.getItem("theSetText");   // "paste" the input text used into it
    // let doTwoWord = 0;
    // doTwoWord = localStorage.getItem("boolDoTwoWord");
    if( localStorage.getItem("boolDoTwoWord") == "true" ) {
        console.log("in first if");
        do_two_word_calculation( localStorage.getItem("theSetText"), localStorage.getItem("searchCode"), localStorage.getItem("letter_A_Value"), localStorage.getItem("boolDoTwoWord") );
    }
    else {
        console.log("in second if");

        do_calculation( localStorage.getItem("theSetText"), localStorage.getItem("searchCode"), localStorage.getItem("letter_A_Value") );
    }
}

function isAlpha(ch) {
    return typeof ch === "string" && ch.length === 1
           && (ch >= "a" && ch <= "z" || ch >= "A" && ch <= "Z");
}

function isNumeric(ch) {
    return typeof ch === "number" && ch.length === 1
           && (ch >= "0" && ch <= "9");
}

function trim_string( currentWord  ) {

    let count1 = 0;
    let filterIndex = currentWord.length;
    let newWord = currentWord;
    let itsAnAlphaString = false;
    
    // get rid of any non alpha characters that are on the end of the currentWord
    while( !isAlpha( currentWord[filterIndex] ) ) {
        count1++;
        filterIndex--;
        if(count1 > currentWord.length) {  // handles no alpha characters in string since the assumption is that an alpha character will be encountered 
            count1 = 0;
            break;
        }
    }
    if(count1 > 0) {
        newWord = ( currentWord.substr(0, currentWord.length-(count1-1)) )
        itsAnAlphaString = true;
    }

    // get rid of any non alpha characters that are on the start of the currentWord
    count1 = 0;
    filterIndex = 0;
    while( !isAlpha( currentWord[filterIndex] )) {
        count1++;
        filterIndex++;
        if(count1 > currentWord.length) {  // handles no alpha characters in string since the assumption is that an alpha character will be encountered 
            count1 = 0;
            break;
        }
    }
    if(count1 > 0) {
        newWord = ( newWord.substr((count1), newWord.length ));
        itsAnAlphaString = true;
    }

    // get rid of any non alpha strings or even numeric strings
    filterIndex = currentWord.length;
    count1 = 0;
    if(!itsAnAlphaString) {
        while( !isNumeric(currentWord[filterIndex]) ) {
            filterIndex--;
            count1++;
            if(count1 > currentWord.length) {
                newWord = "";
                break;
            }
        }
    }
    if( count1 > 0 && count1 <= currentWord.length && !itsAnAlphaString) {
        newWord = "";
    }
        
    return newWord;
}

function do_two_word_calculation( setTextValue, theSearchCode, theLetterAValue, boolDoTwoWordPattern ) {

    var letterA = theLetterAValue;;
    var search_code = theSearchCode;
    var linesOfWordsArray = setTextValue.split("\n");
    var numberOfLines = linesOfWordsArray.length;
    var totalWords = 0;
    var currentLineNum = 0;
    var matches = 0;
    let outputReport = "CALCULATION REPORT USING \"TWO WORD\" PATTERN SEARCH\n";
    var lineNumIndex = 0;
    // var theWords = '';
    var oneLineOfWords = '';
    var index = 0;
    var alphabetLetterNumber = 0;
    var word_total = 0;
    // var numWordsCurrentLine = 0;

    // let trimmedWord = '';
    let theWordJoined = '';
    let lineWalkerIndex = 0;
    let word1 = '';
    let word2 = '';
    let boolWord1Set = false;
    let boolWord2Set = false;
    let boolMatchFound = false;
    let boolWordJoined = false;
    let indexSkip = 0;
    while(lineNumIndex < numberOfLines){  // work through each line of words

        oneLineOfWords = linesOfWordsArray[lineNumIndex].split(" ");    
        currentLineNum++;

        index = 0;

        // console.log("one line count is: " + oneLineOfWords.length);
        
        while( index <  oneLineOfWords.length) {  // the current line of words
            word_total = 0;
            char_num = 0;
            word1 = '';
            word2 = '';
            // console.log("var index: " + index);
            
            if(oneLineOfWords[ (index) ] != undefined && oneLineOfWords[ (index) ].length > 0) {
                word1 = trim_string(oneLineOfWords[ (index) ]);
            }
            // word1 = trim_string(word1);
            
            if(oneLineOfWords[ (index+1) ] != undefined && (oneLineOfWords[ (index+1) ].length > 0) ) {
    
                word2 = trim_string(oneLineOfWords[ (index+1) ]);


                theWordJoined = word1.concat(word2);
                // console.log("The word Joined: " + theWordJoined);
                
                boolWordJoined = true;

            }
            
            if( theWordJoined.length > 0 && boolWordJoined && theWordJoined != '') {
                while( char_num < theWordJoined.length ) { // analyze this word while building its total value
                    alphabetLetterNumber = 1;
                    while( alphabetLetterNumber <= 26 ) {
                        if( (alphabetLetterNumber+96) === theWordJoined.charCodeAt(char_num ) ) { // is it a lower case character match
                            word_total += (letterA * alphabetLetterNumber);
                        }
                        if( (alphabetLetterNumber+64) === theWordJoined.charCodeAt(char_num) )  { // is it a upper case character match
                            word_total += (letterA * alphabetLetterNumber);
                        }
                        alphabetLetterNumber++;

                    }
                    char_num++;
                }
            }

            if( word_total == search_code ) { // has a match been found
                
                if(currentLineNum === 1) {
                    // console.log("The word: " + theWordJoined + " and its length is: " + theWordJoined.length);
                }

                if(word1 === '') {
                }
                else if(word2 === '') {
                }
                else {
                    matches++;
                    outputReport = outputReport.concat( "\nMatch: " + matches + " on line: " + currentLineNum );
                    outputReport = outputReport.concat(" ---> " + word1 + " " + word2 );
                    
                }

            }

            if(word1 != '') {
                totalWords++;
            }

            index++;
            boolWordJoined = false;
        } 
        lineNumIndex++;
    }
    
    outputReport = outputReport.concat( "\n\nTotal Matches Found: " + matches + "\nSearch Code was: " + search_code + "\nLetter A Value was: " + letterA + "\nTotal Words Looked At: " + totalWords + "\nTotal Lines: " +  numberOfLines );
    document.getElementById('resultReport').value = outputReport;

    localStorage.clear();

}

function do_calculation( setTextValue, theSearchCode, theLetterAValue) {
 
    var letterA = theLetterAValue;;
    var search_code = theSearchCode;
    var linesOfWordsArray = setTextValue.split("\n");
    var numberOfLines = linesOfWordsArray.length;
    var totalWords = 0;
    var currentLineNum = 0;
    var matches = 0;
    let outputReport = "CALCULATION REPORT USING \"ONE WORD\" PATTERN SEARCH\n";
    var lineNumIndex = 0;
    // var theWords = '';
    var oneLineOfWords = '';
    var index = 0;
    var alphabetLetterNumber = 0;
    var word_total = 0;
    // var numWordsCurrentLine = 0;

    let trimmedWord = '';

    while(lineNumIndex < numberOfLines){  // work through each line of words

        oneLineOfWords = linesOfWordsArray[lineNumIndex].split(" ");    
        currentLineNum++;
        
        index = 0;
        while( index <  oneLineOfWords.length) {  // the current line of words
            if(oneLineOfWords[index] != '') {
                totalWords++; // count it as one word
            }
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

                // console.log("Match found");

                // if(matches === 1 && currentLineNum === 1) {
                //     outputReport = "CALCULATION REPORT USING ONE WORD PATTERN SEARCH\n";
                // }
                
                // find out if the current match word contains any non-alpha characters on its index start or index end
                if( !isAlpha(oneLineOfWords[index][0]) || !isAlpha(oneLineOfWords[index][trimmedWord.length-1]) ) {  
                    trimmedWord = trim_string(oneLineOfWords[index]);  // remove any filterOutCharacters
                }
                else {
                    trimmedWord = oneLineOfWords[index];  // done to make sure outputReport will work
                }
                
                outputReport = outputReport.concat( "\nMatch: " + matches + " on line: " + currentLineNum + " ---> " + trimmedWord );
            }
            index++;
        } 
        lineNumIndex++;
    }
    outputReport = outputReport.concat( "\n\nTotal Matches Found: " + matches + "\nSearch Code was: " + search_code + "\nLetter A Value was: " + letterA + "\nTotal Words Looked At: " + totalWords + "\nTotal Lines: " +  numberOfLines );    
    document.getElementById('resultReport').value = outputReport;
    localStorage.clear();
}

