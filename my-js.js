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

function trim_string( currentWord  ) {
    
    let filterIndex = currentWord.length;
    // let filterOutCharacters = "<>,:.()#?!;{}-[]|=";
    let newWord = currentWord;
    let count1 = 0;
    
    // get rid of any non alpha characters that are on the end of the currentWord
    while( !isAlpha( currentWord[filterIndex] ) ) {
        count1++;
        filterIndex--;
    }
    if(count1 > 0) {
        newWord = ( currentWord.substr(0, currentWord.length-(count1-1)) )
    }

    // get rid of any non alpha characters that are on the start of the currentWord
    count1 = 0;
    filterIndex = 0;
    while( !isAlpha( currentWord[filterIndex] )) {
        count1++;
        filterIndex++;
    }
    if(count1 > 0) {
        newWord = ( newWord.substr((count1), newWord.length ));
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
    var outputReport = "";
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

        console.log("one line count is: " + oneLineOfWords.length);
        
        while( index <  oneLineOfWords.length) {  // the current line of words
            // if(theWordJoined != '') {
            //     totalWords++; // count it as one word
            // }
            word_total = 0;
            char_num = 0;
            word1 = '';
            word2 = '';
        
            
            if(oneLineOfWords[ (index) ] != undefined && oneLineOfWords[ (index) ].length > 0) {
                word1 = trim_string(oneLineOfWords[ (index) ]);
                // if( isAlpha( word1[0] ) === true ) {
                //     totalWords++;
                //     // totalWords += indexSkip;
                // }
                if( (isAlpha( word1[0] ) === true) && (isAlpha( word1[(word1.length-1)]) ) === true ) {
                    totalWords++;
                }

                
                // console.log( "Is Alpha value: " + isAlpha(word1[0]) );
            }
            // word1 = trim_string(word1);
            
            if(oneLineOfWords[ (index+1) ] != undefined && (oneLineOfWords[ (index+1) ].length > 0) ) {
    
                word2 = trim_string(oneLineOfWords[ (index+1) ]);

                if( (isAlpha( word2[0] ) === true) && (isAlpha( (word2[(word2.length-1)]) ) === true) ) {
                    totalWords++;
                }

    
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

            // // It is not a word if the variable word_total has not moved beyond a 0 value
            // if(word_total > 0 || boolWordJoined) {
            //     totalWords++;
            // }


            if( word_total == search_code ) { // has a match been found
                matches++;       
                // indexSkip = 2;
                // boolMatchFound = true;
                console.log("Match found");
                if(matches === 1) {
                    outputReport = "CALCULATION REPORT\n";
                }
                
                outputReport = outputReport.concat( "\nMatch: " + matches + " on line: " + currentLineNum + " ---> " + word1 +  " " + word2 );
                // }
                index += 2;   
                // totalWords -= 1; 
            }
            else {
                // word1 = '';
                // word2 = '';

                // indexSkip = 0;
                index++;
            }
            
            boolWordJoined = false;
            // lineWalkerIndex++;
            // boolWord1Set = false;
            // boolWord2Set = false;
            // boolMatchFound = false;

        } 
        lineNumIndex++;
    }
    outputReport = outputReport.concat( "\n\nTotal Matches Found: " + matches + "\nSearch Code was: " + search_code + "\nLetter A Value was: " + letterA + "\nTotal Words Looked At: " + ((totalWords-numberOfLines)+1) + "\nTotal Lines: " +  numberOfLines );
    document.getElementById('resultReport').value = outputReport;
    localStorage.clear();

}

function do_calculation( setTextValue, theSearchCode, theLetterAValue) {
 
    // alert("do calc call " + boolDoTwoWordPattern);
    

    var letterA = theLetterAValue;;
    var search_code = theSearchCode;
    var linesOfWordsArray = setTextValue.split("\n");
    var numberOfLines = linesOfWordsArray.length;
    var totalWords = 0;
    var currentLineNum = 0;
    var matches = 0;
    var outputReport = "";
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

                console.log("Match found");
                if(matches === 1) {
                    outputReport = "CALCULATION REPORT\n";
                }
                
                // find out if the current match word contains any non-alpha characters on its start or end
                if( !isAlpha(oneLineOfWords[index][0]) || !isAlpha(oneLineOfWords[index][trimmedWord.length]) ) {  
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

