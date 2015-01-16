var traverseDomAndCollectElements = function(matchFunc, startEl) {
  var resultSet = [];
  if (typeof startEl === "undefined") {
    startEl = document.body;
  }
    var allNodes = startEl.children;
    for (var i = 0; i < allNodes.length; i++){
      var lowerNodes = allNodes[i].children;
        if (matchFunc(allNodes[i])){
          resultSet.push(allNodes[i]);
        }
      for (var x = 0; x < lowerNodes.length; x++){
        if (matchFunc(lowerNodes[x])){
          resultSet.push(lowerNodes[x]);
        }
      }
    }

  // your code here
  // traverse the DOM tree and collect matching elements in resultSet
  // use matchFunc to identify matching elements
  return resultSet;
};


// detect and return the type of selector
// return one of these types: id, class, tag.class, tag
//
var selectorTypeMatcher = function(selector) {
  var splitSelector = selector.split("");
  if (splitSelector[0] == "#"){
    return "id";
  }
  else if (splitSelector[0] == "."){
    return "class";
  }
  else{
    var selectSplit = selector.split(".");
    if (selectSplit.length == 2){
      return "tag.class";
    }
    else if (selectSplit.length > 2){
      return "Invalid Class";
    }
    else{
      return "tag";
    }
  }

  // your code here
};

var matchFunctionMaker = function(selector) {
  var forTagNames = selector;
  var splitSelector = selector.split("");
  splitSelector.shift();
  splitSelector = splitSelector.join("");
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;
      if (selectorType === "id") {
        matchFunction = function(element){
            if (element.hasAttribute('id')){
              if (element.getAttribute('id').toString() == splitSelector){
                  
                return true;
              }
              else{
                return false;
              }
            }
        }
        // define matchFunction for id
      } else if (selectorType === "class") {
        // define matchFunction for class
        matchFunction = function(element){
          
          if (element.hasAttribute('class')){
            var classes = element.getAttribute('class').split(" ");
            for (var i = 0; i < classes.length; i++){
              if (classes[i] == splitSelector){
                
                return true;
              }
            }
            return false;
          }
        }
        
      } else if (selectorType === "tag.class") {
        // define matchFunction for tag.class
        var split_tag = forTagNames.split(".");
        matchFunction = function(element){
          if (element.hasAttribute('class')){
            var classes = element.getAttribute('class').split(" ");  
            for (var i = 0; i < classes.length; i++){
              if (classes[i] == split_tag[1] && element.tagName.toString().toLowerCase() == split_tag[0]){
                
                return true;
              }
            }
            return false;
          }
        }
        
      } else if (selectorType === "tag") {
        // define matchFunction for tag
        matchFunction = function(element){
          if (element.tagName.toString().toLowerCase() == forTagNames){
              
              return true;
            }
            else{
              return false;
            }
          
        }

      } 

        else {
          return false;
        }
  return matchFunction;
};

var $ = function(selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
