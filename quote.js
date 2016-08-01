$(document).ready(function(){
    // global variables
    var quoteURL = 'https://en.wikiquote.org//w/api.php?action=parse&format=json&page=Fight_Club_(film)&prop=text&section=2&callback=?';
    var quote = "";
    // button listener
    $('#get-quote').on("click", function(){

        // get function - Gathers query from fight_club(film) page of wikiQuote
        // json argument variable is the object passed from API query
        $.getJSON(quoteURL, function(json){
            // run function to clean parsed text
            var cleanQuoteString = arrayCleaning(json.parse.text['*']);
            
            // run function to select random quote
            quote = randomQuote(cleanQuoteString);
            
            // display rawQuoteString as retrieved from parsed text
            $('#quote-content').html(quote);
            
            twitterURL(quote);
        }); // close getJSON
    }); // close onClick function

    // to load on page generation
    $.getJSON(quoteURL, function(json){
        // run function to clean parsed text
        var cleanQuoteString = arrayCleaning(json.parse.text['*']);
        
        // run function to select random quote
        quote = randomQuote(cleanQuoteString);

        // display rawQuoteString as retrieved from parsed text
        $('#quote-content').html(quote);
        
        twitterURL(quote);
    }); // close preload quote generation
    
    /* Functions */

    // Write function to clean up JSON and make array of quotes
    function arrayCleaning(rawQuoteString){

        // *** function variables ***
        // clean html tags
        var strippedString = rawQuoteString.replace(/(<([^>]+)>)/ig,"");
        // separate string into arrays
        var stringArray = strippedString.split('\n');

        // clean "" array values
        for (var i = 0; i < stringArray.length; i++){
            if (stringArray[i] == ""){
                stringArray.splice(i,1);
                i--;
            }
        }
        // remove what was originally the header string containing "Tyler Durden [edit]"
        stringArray.splice(0,1);
        return stringArray;                    
    };

    // Randomize array
    function randomQuote(strArr){
        var rand = Math.floor((Math.random() * strArr.length));
        return strArr[rand].toString();
    };
    
    // Truncate for twitter URL
    function twitterURL(str){
        // variable for URL friendly addon
        var author = "%20%23" + encodeURI("TylerDurden @pacificfrost https://goo.gl/5OT5uz");
        
        // check if quote is too big, if so, truncate, add author
        if (quote.length <= 84){
            str = "%27" + encodeURI(quote) + "%27" + author;
        } else {
            str = "%27" + encodeURI(quote.slice(0,84)) + "...%27" + author;
        }
        $('#tweet').attr("href", "http://twitter.com/home/?status=" + str)
        return undefined;
    };
    
});