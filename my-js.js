window.onload = function() {
    // document.getElementById('textUsedForSearch').value = localStorage.getItem("theSetText");   // "paste" the input text used into it
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

    let filterOutCharacters = "<>,:.()#?!;{}-[]|=";
    let filterIndex = 0;
    let newWord = '';


    while(the_index < numberOfLines){  // work through each line of words

        oneLineOfWords = linesOfWordsArray[the_index].split(" ");    
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
                
                filterIndex = 0;
                while(filterIndex < filterOutCharacters.length) {
                    if( oneLineOfWords[index].endsWith(filterOutCharacters[filterIndex]) ) {
                        newWord = oneLineOfWords[index].substr(0, oneLineOfWords[index].length-1)
                    }
                    filterIndex++;
                }

                // Filter out any of these characters that may be attached to ethe       while(filterIndex < filterOutCharacters.length) {
                // if(oneLineOfWords[index].endsWith(filterOutCharacters[filterIndex])) {
                //         newWord = oneLineOfWords[index].substr(0, oneLineOfWords[index].length-2)
                //     }
                //     filterIndex++;
                    
                // }

                //      These are the characters being filtered out: < > : , . ( ) # ? ! ; / ' ' { } - " " [ ] | \ = 
                // while(filterIndex < filterOutCharacters.length) {
                //     if(oneLineOfWords[index].endsWith(filterOutCharacters[filte       while(filterIndex < filterOutCharacters.length) {
                // if(oneLineOfWords[index].endsWith(filterOutCharacters[filterIndex])) {
                //     newWord = oneLineOfWords[index].substr(0, oneLineOfWords[index].length-2)
                // }
                //     filterIndex++;
                    
                //}
                //         newWord = oneLineOfWords[index].substr(0, oneLineOfWords[index].length-2)
                //     }
                //     filterIndex++;
                    
                // }
                // console.log(oneLineOfWords[index]);
                // console.log(newWord);

                // if(matches === 1) {
                //     console.log(filterOutCharacters);
                // }
                

                // Update or Add to the outputReport string
                // outputReport = outputReport.concat( "\nMatch: " + matches + " on line: " + currentLineNum + " ---> " + oneLineOfWords[index] );
                outputReport = outputReport.concat( "\nMatch: " + matches + " on line: " + currentLineNum + " ---> " + newWord );
            }
            index++;
        } 
        the_index++;
    }
    outputReport = outputReport.concat( "\n\nTotal Matches Found: " + matches + "\nSearch Code was: " + search_code + "\nLetter A Value was: " + letterA + "\nTotal Words Looked At: " + totalWords + "\nTotal Lines: " +  numberOfLines );    
    document.getElementById('resultReport').value = outputReport;
    localStorage.clear();
}
