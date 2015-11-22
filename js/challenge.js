$(document).ready(function(){
	var sentence = null;
	if (window.File && window.FileList && window.FileReader) {
		var filesElement = document.getElementById("files");
        filesElement.addEventListener("change", function(event) {
        	var files = event.target.files;
        	file = files[0];
        	if(file.type.match('plain'))
        	{
        		var reader = new FileReader();
	            reader.addEventListener("load", function(event) {
	            	var textFile = event.target;
	            	var lines = textFile.result.split('\n');
	            	sentence="";
	            	for(var line = 0; line<lines.length;line++){
	            		sentence += lines[line]+" ";
	            	}
	            });
	            reader.readAsText(file);
        	}else{
        		alert("File is not a .txt file. Retry.")
        	} 
		});
    }
	$('.challenge').on('click', function(){
		if(null!=sentence){
			var answer = calculate(sentence);
			if(""!=answer){
				$('.output em').text(answer);
				$('.output').show();
			}
		}else{
			alert("No File Selected");
		}   
	});
});

function calculate(originalString){
    var answer = "";
    if(""==originalString){
    	alert("File is not Valid.");
    }else{
    	var wordList = originalString.split(" ");
    	var maxCountFinal = 1;
    	for(var i = 0; i<wordList.length;i++){
    		var curWord = wordList[i].toLowerCase().split('').sort().join('').replace(/[^a-zA-Z]/g, '');
    		if(0==i){
    			answer = wordList[i].replace(/[^a-zA-Z]/g, '');
    		}
    		var repeatCount = 1;
    		var MaxCount = 1;
    		var MaxCountLetter = "";
    		for(var j=0;j<curWord.length;j++){
    			if(curWord[j]==curWord[j+1]){
    				repeatCount++;
    			}else{
    				if(repeatCount>MaxCount){
    					MaxCountLetter = curWord[j];
    					MaxCount = repeatCount;
    				}
                                repeatCount = 1;
    			}
    		}
    		if(MaxCount>maxCountFinal){
    			maxCountFinal=MaxCount;
    			answer=wordList[i];
    		}
    	}
    }
	return answer;
}
