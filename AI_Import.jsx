// ############################################################################
// # 
// #	Recursive Text Importer for Adobe Illustrator v1.0
// #	(C) Copyright 2009 by Marcelo Liao
// #	marceloliao@hotmail.com
// #	
// ############################################################################


main();

function Array_IndexOf (arr, elem)
{
  if (elem.indexOf("\u0003") != -1)
  {
    elem = elem.replace("\u0003", "<br>", "g");
  }

  if (elem.indexOf("\r") != -1)
  {
    elem = elem.replace("\r", "<br>", "g");
  }

  
  var len = arr.length;
  var from = Number(arguments[2]) || 0;
  from = (from < 0) ? Math.ceil(from) : Math.floor(from);
  if (from < 0) 
  {
    from += len;
  }

  for (; from < len; from++) 
  {
    if (from in arr && arr[from] === elem) 
    {
      return from;
    }
  }

  return -1;
}


function Array_RemoveAtIndex(arr, idx)
{
  if (idx !== -1) 
  {
    arr.splice(idx, 1);
  }
}


/**
*  Arrays holding the translations (keys and values)
* -------------------------------------------------------------
*/

  var tKeys 	= [];
  var tValues	= [];
  var numReplaced = 0;

/**
*  TextConvert Main function
* -------------------------------------------------------------
*/

function main() 
{
  if ($.os.search(/windows/i) != -1)
    fileLineFeed = "windows";
  else
    fileLineFeed = "macintosh";
	 	
  if (app.documents.length === 0) 
  {
    alert("Please open a file", "TextConvert.Export Error", true);
    return;
  }

  if (app.documents.length > 1) 
  {
    var runMultiple = confirm("TextConvert.Import has detected Multiple Files.\nDo you wish to run TextConvert.Import on all opened files?", true, "TextConvert.Import");

    if (runMultiple === true) 
    {
      docs = app.documents;					
    } 
    else 
    {
      docs = [app.activeDocument];
    }
  }
  else
  {
    runMultiple	= false;
    docs = [app.activeDocument];
  }

  for (var i = 0; i < docs.length; i++)
  {
    goFetchTranslations(docs[i].path + '/AI-TextConvert-' + docs[i].name + '.txt');

    if (tKeys.length > 0)
    {
      app.activeDocument = docs[i];

      goTextImport(app.activeDocument, '_0');

      numReplaced++;
    }
  }

  alert("All content replaced!");
}


function goFetchTranslations(filePath)
{
  
  tKeys	= [];
  tValues = [];
  
  var fileIn = new File(filePath);
  
  if (!fileIn.exists)
  {
    
    return;
  }
  
  fileIn.open("r", "TEXT", "????");
 
  
  var tagOpen = false;		// Are we in tag?
  var tKey = '';		// translation key
  var tVal = '';		// translation value

  while (!fileIn.eof) 
  {
    var line = fileIn.readln();
    
    if (line.indexOf('[BEGIN ') !== -1)
    {
      
      tKey = line.substr(7, line.length - 14);
      														
      
      tVal = '';

      
      tagOpen = true;
    }

    
    else if (line.indexOf('[END ') !== -1)
    {
      
      if (tKey == line.substr(5, line.length - 10))
      {
        
	tKeys.push(tKey);
	tValues.push(tVal);

	
	tKey = '';
	tVal = '';

	
	tagOpen = false;

        
      } 
      else 
      {
        if (tagOpen) 
        {
	  tVal += line + '\r';
        }
      }
    }

    
    else if (tagOpen) 
    {
      tVal += line + '\r';
    }
  }
  
  fileIn.close();
}

/**
* TextImport Core Function
* -------------------------------------------------------------
*/
  
function goTextImport(el, path) 
{
  
  var layers = el.layers;

  
  for (var i = 0; i < layers.length; i++)
  {
    var currentLayer = layers[i];
    
    //if (currentLayer.visible)
    //{
      var subItems = new Array();
      subItems = currentLayer.pageItems;      
      for (var j = 0; j < subItems.length; j++)
      {
        
        if (subItems[j].typename != "GroupItem")
        {
          
          if (subItems[j].typename == "TextFrame")
          {
            var pos = Array_IndexOf(tKeys, path + ' ' + subItems[j].contents);
            
            if (pos !== -1)
            {
              
              subItems[j].contents = tValues[pos];
              if (subItems[j].contents.indexOf("<br>") != -1)
                subItems[j].contents = subItems[j].contents.replace("<br>", "\u0003", "g");
	      
	      Array_RemoveAtIndex(tKeys, pos);
	      Array_RemoveAtIndex(tValues, pos);
            }
          }
        }
        else
        {
          
          if (subItems[j].typename == "GroupItem")
          {
            goTextImport3(subItems[j], "_0_0")
          }
        }
      }
    //}
  }
}


function goTextImport3(sG, path)
{
  subGroupItems = sG.pageItems;
  
  for (var k = subGroupItems.length-1; k >=0 ; k--)
  {
    
    if (subGroupItems[k].typename != "GroupItem" )
    {
      
      if ((subGroupItems[k].typename == "TextFrame"))
      {
        var pos = Array_IndexOf(tKeys, path + ' ' + subGroupItems[k].contents);
        
        if (pos !== -1)
        {
          
          subGroupItems[k].contents = tValues[pos];
          if (subGroupItems[k].contents.indexOf("<br>") != -1)
            subGroupItems[k].contents = subGroupItems[k].contents.replace("<br>", "\u0003", "g");
	  
	  Array_RemoveAtIndex(tKeys, pos);
	  Array_RemoveAtIndex(tValues, pos);
        }      
      }
    }
  }
  
  
  var totalSubGroupLength;
  totalSubGroupLength = subGroupItems.length;

  for (var k = subGroupItems.length-1; k >=0 ; k--)
  {
    subGroupItems = sG.pageItems;
    if (subGroupItems[k].typename == "GroupItem")
    {
      path = path + "_0";
      goTextImport3(subGroupItems[k], path)
    }
  }
}