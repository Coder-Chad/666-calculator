<?php
session_start();

echo "<!DOCTYPE HTML>";
echo "<html>";
echo "<head>";
    echo "<title>Beast Calulator</title>";
    echo "<meta charset='utf-8' />";
    echo "<meta name='keywords' content='666,Beast,Code,Calculator'>";
    echo "<meta name='description' content='A simple Web App that searches and calculates uses input text looking for 666 beast code matches.'>";
    echo "<meta name='subject' content='How to find what text or word matches the 666 Beast Code of Revelations>";
    echo "<meta name='copyright' content='Chad Vincent Estell'>";
    echo "<meta name='language' content='ES'>";
    echo "<meta name='revised' content='Wednesday, October 3rd, 2018, 2:00 pm'>";
    echo "<meta name='author' content='Chad Vincent Estell, thx3225@gmail.com'>";
    echo "<meta name='designer' content='Chad Vincent Estell'>";
    echo "<meta name='owner' content='Chad Vincent Estell'>";
    echo "<meta name='url' content='https://beast-calculator.netlify.com/'>";
    echo "<meta name='Classification' content='Personal'>";
    echo "<meta name='HandheldFriendly' content='False'>";
    echo "<meta name='original-source' content='https://github.com/Coder-Chad/cve-calc-beast-app.git'>";
    echo "<meta name='pagename' content='THE SO CALLED BEAST CALCULATOR'>";
    echo "<meta name='viewport' content='width=device-width, initial-scale=1' />";
    echo "<link rel='stylesheet' href='my_calcbeast.css' />";
echo "</head>";
echo "<body>";
$alertInfo = 'The So Called \"Beast\" Calculator Version 1.0.0\n\nThis is a custom alert box that explains how this app works.\n\nThe way it works is simple. It uses a \"find the beast formula\" that takes each letter of the alphabet and gives it a numeric value like this. A=6, B=12, C=18 and so on to the end of the alphabet. Using these values it looks at each word that you type or paste into the text box and adds up its value to see if it adds up to the \"beast\" code total of 666.\n\nThe beast code of 666 comes from the Christian Bible in the book or chapter titled Revelations that talks about figuring out what the beast is. If you paste in the english language which is more than 60,000 words you will find hundreds of 666 matches for some very \"ordinary\" words.\n\nNote: Using the A=6, B=12, C=18 and so on to the end of the alphabet \"formula\" the word \"computer\" adds up to 666 which is the beast code value from Revelations.\n\nAuthor: Chad Vincent Estell. Send any comments or suggestions to my email below.\n\nthx3225@gmail.com';
echo "<script>
function showLoader() {
    document.getElementById('loadingmsg').style.display = 'block';
    document.getElementById('loadingover').style.display = 'block';
}
function showAboutInfo() {
    alert('$alertInfo');
}
</script>";
echo "<div class='MyContainer' align='center'>";
echo "<div id='loadingmsg' style='display: none;'>Doing Calculation....</div>";
echo "<div id='loadingover' style='display: none;'></div>";
echo "<div>";
echo "<h3 class='changeText' onclick='showAboutInfo();'>THE SO CALLED \"BEAST\" CALCULATOR</h3>";
echo "<form action='calc-result-page.php'  name='mainForm' method='post' onsubmit='showLoader(); netlify'>";
echo "<textarea name='textArea' cols='120' rows='20' placeholder='Type or paste into this input box any text that you want analyzed.\n\nThen press the button at the bottom of the screen to do the calculation.\n\n\n\nNOTE: The default search code used is 666 and the default value for the letter A is 6.\n\nNOTE: If you click on the title above you can learn more about this app.\n\nNOTE: During testing I found that the calculation report loads faster using the firefox browser.'></textarea><br>";
echo "<input type='text' name='lookupCode' id='lookupCode' value='' placeholder='Type search code here'>";
echo "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='text' name='theLetter_A_Value' id='theLetter_A_Value' value='' placeholder='Type the letter A value here'>";
echo "<br><br><input name='calculator' type='submit' onclick='showLoader();' value='Press This Button To Do The Calculation'>";
echo "</form>";
echo "</div>";
echo "</div>";
echo "</body>";
echo "</html>";


