<?php
echo "<!DOCTYPE HTML>";
echo "<html>";
echo "<head>";
    echo "<title>Calculation Result</title>";
    echo "<meta charset='utf-8' />";
    echo "<meta name='viewport' content='width=device-width, initial-scale=1' />";
    echo "<link rel='stylesheet' href='my_calcbeast.css' />";
echo "</head>";
echo "<body>";
echo "<div class='MyContainer' align='center'>";
echo "<div>";

if( isset($_POST['textArea']) ) {
    $text = trim( htmlspecialchars($_POST['textArea']) );
    $textAr = explode("\n", $text);
    //$textAr = array_filter($textAr, 'trim'); // remove any extra \r characters left behind
    $numLinesUpperLimit = count($textAr);
    

    $search_code = (int)($_POST['lookupCode']);
    if($search_code === 0) {
        $search_code = 666;  // give it a default value of 666 if user does not specify a value
    }

    $letter_A_Value = (int)($_POST['theLetter_A_Value']);
    if($letter_A_Value == 0) {  // if its value is zero then set a defau$numLinesUpperLimitlt value of 6
        $letter_A_Value = 6;
    }
}
else {
    echo "<br>Text area is not set!<br>";
    echo "<form action='index.php' name='mainForm' method='post' netlify>";
    echo "<br><input name='submit' type='submit' action='index.php' value='Click This Button To Re-load'>";
    echo "</form>";
}

// THE MEAT OF THE APP OR THE ENGINE THAT DOES THE WORK OR CALCULATION
$word_total = 0;
$totalWords = 0;
$currentLineNum = 0;
$matches = 0;
$outputReport = "CALCULATION REPORT\n";
$the_index = 0;
while($the_index < $numLinesUpperLimit){
    $line = $textAr[$the_index];
    $currentLineNum++;
    $oneLineOfWords = explode(" ", $line);
    $numWordsCurrentLine = count($oneLineOfWords);
    $index = 0;
    while( $index < $numWordsCurrentLine ) {
        $word_total = 0;
        
        if (ctype_alpha( ((string)$oneLineOfWords[$index][0])) ) {
            $totalWords++; // count it as one word
        }
        for( $char_num = 0; $char_num < strlen($oneLineOfWords[$index]); $char_num++) {
            $char_match = false;
            $alphabetLetterNumber = 1;
            while( $alphabetLetterNumber <= 26 ) {
                if( ($alphabetLetterNumber+96) == ord($oneLineOfWords[$index][$char_num])) { // is it a lower case character match
                    $word_total += ($letter_A_Value * $alphabetLetterNumber);
                }
                if( ($alphabetLetterNumber+64) == ord($oneLineOfWords[$index][$char_num])) { // is it a upper case character match
                    $word_total += ($letter_A_Value * $alphabetLetterNumber);
                }
                $alphabetLetterNumber++;
            }
        }
        if( $word_total == $search_code  && $search_code > 0) {
            $matches++;
            
            $outputReport .= "\nMatch number: " . $matches . " Found on line: " . $currentLineNum . " The word is: " . $oneLineOfWords[$index]; 
        }
    
        $index++;
    }
    $the_index++;
}

// Build the report string
$outputReport .= "\n\nTotal matches found is: " . $matches .  
    "\nLetter A value is: " . $letter_A_Value . "\nSearch code value is: " . 
    $search_code . "\nTotal words analyzed is: " . $totalWords . 
    "\nTotal number of source text lines: " . $numLinesUpperLimit;
    "\n\nCalculation Report Complete. \n";

// Do the calculation report only if the user has specified some text 
if( $textAr[0] === '' ) {
    //fwrite($output_file, "No text was typed into or pasted inside the input text box.\n");
    echo "<br>No text was typed or pasted into the input text box.";
    echo "<form action='index.php' name='mainForm' method='post' netlify>";
    echo "<br><input name='submit' type='submit' action='index.php' value='Click This Button To Re-load'>";
    echo "</form>";
}
else {
    echo "<h3>CALCULATION REPORT</h3>";
    echo "<form action='index.php' name='mainForm' method='post' netlify>";
    echo "<textarea name='resultReport' cols='120'rows='10' id='resultReport' readonly='readonly'>$outputReport</textarea>";
    $textUsed = htmlspecialchars($_POST['textArea']);
    echo "<br><h3>THE TEXT YOU USED FOR THE CALCULATION</h3>";
    echo "<textarea name='textUsedForSearch' cols='120'rows='10' id='textUsedForSearch' readonly='readonly'>$textUsed</textarea>";
    echo "<br><input name='submit' type='submit' value='Click This Button To Reload Start Page'>";
    echo "</form>";
}
echo "</div>";
echo "</div>";
echo "</body>";
echo "</html>";
