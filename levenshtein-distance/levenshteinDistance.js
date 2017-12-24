

function levenshtein(ccName, subscriberName){
    if(!ccName || !subscriberName ) return -1; 

    var difference = [];
    
    var i;
    for(i = 0; i <= subscriberName.length; i++){
      difference[i] = [i];
    }
  
    var j;
    for(j = 0; j <= ccName.length; j++){
      difference[0][j] = j;
    }
  
    for(i = 1; i <= subscriberName.length; i++){
      for(j = 1; j <=ccName.length; j++){
        if(subscriberName.charAt(i-1) ==ccName.charAt(j-1)){
          difference[i][j] = difference[i-1][j-1];
        } else {
          difference[i][j] = Math.min(difference[i-1][j-1] + 1, 
                                  Math.min(difference[i][j-1] + 1, 
                                    difference[i-1][j] + 1));
        }
      }
    }

  var levDis = difference[subscriberName.length][ccName.length]
  var bigger = Math.max(ccName.length, subscriberName.length)
  var value = (bigger - levDis) / bigger
  
    return value.toLocaleString("en", {style: "percent"});
  };



console.log(levenshtein(process.argv[2], process.argv[3]));