
cfg.Light, cfg.Portrait, cfg.Share, cfg.MUI

app.LoadPlugin( "UIExtras" )
app.LoadPlugin( "Utils" )
app.LoadPlugin( "OcrScanner" )
app.LoadPlugin( 'Excel' )

const fifthteen_hundred = 1500

function OnStart() {
 
 utils = app.CreateUtils()
 uix = app.CreateUIExtras()
 color = utils.RandomHexColor(false)
ocr = app.CreateOCR()
 
  //Create recognition object and set callbacks.
 speech = app.CreateSpeechRec()
 speech.SetOnReady( speech_OnReady )
 speech.SetOnResult( speech_OnResult )
 speech.SetOnError( speech_OnError )
 
 lay = app.CreateLayout( "Linear", "FillXY" )

 txt = app.CreateText( "NoteBook", 1.0 )
 txt.SetFontFile( "Misc/LuckiestGuy-Regular.ttf" )
 txt.SetTextSize( 28 )
 txt.SetTextColor( "#FFFFFF" )
 txt.SetTextShadow( 5, 2, 2, "#000000" )
 txt.SetPadding( 0, 0.01, 0, 0.01 )
 txt.SetBackGradient(  utils.GetGradientColors(color)[0], color,  utils.GetGradientColors(color)[1])
 lay.AddChild( txt )
 
 
  
/*
"lighten4":"#bbdefb","lighten3":"#90caf9","lighten2":"#64b5f6","lighten1":"#42a5f5","blue":"#4285F4","darken1":"#1e88e5","darken2":"#1976d2","darken3":"#1565c0","darken4":"#0d47a1"},"grey":{"lighten4":"#f5f5f5","lighten3":"#eeeeee","lighten2":"#e0e0e0","lighten1":"#bdbdbd","grey":"#9e9e9e","darken1":"#757575","darken2":"#616161","darken3":"#424242","darken4":"#212121"

*/
//alert(utils.GetMethods())
color2 = utils.HexToLighterHex(color, 0.53)
//alert(color2)
color3 = utils.HexToLighterHex(utils.RandomHexColor(false), 0.74)
lay2 = app.CreateLayout( "Linear", "Horizontal,FillX,VCenter" )
lay2.SetBackGradient( utils.GetGradientColors(color2)[0], color2,  utils.GetGradientColors(color2)[1]/*"#f5f5f5","#838383","#9e9e9e"*/)
lay2.SetElevation( 25 )
//lay2.SetBackGradientRadial(0.5, 0.5, 100, "#ef9a9a","#b71c1c","#f44336" )
btn = app.CreateButton( "[fa-calendar] Pick Date", 0.36, -1, "FontAwesome, Gray,Custom" )
btn.SetTextSize( 13 )
btn.SetBackGradient(utils.GetGradientColors(color3)[0], color3,  utils.GetGradientColors(color3)[1]);// "#9e9e9e","#f5f5f5","#838383")
btn.SetTextColor( "#ffffff" )
btn.SetTextShadow( 7, 2, 2, "#000000" )
 btn.SetOnTouch( btn_OnTouch )
 
 
 tdate = app.CreateText( "   "+new Date().toDateString(), 0.64, -1, "Left,VCenter")
 tdate.SetFontFile( "Misc/LuckiestGuy-Regular.ttf" )
 tdate.SetTextColor( "#ffffff" )
 tdate.SetTextShadow( 7, 2, 2, "#000000" )
 lay2.AddChild( btn )
 lay.AddChild( lay2 )
 lay2.AddChild( tdate)
 
 /*var data = app.ReadFile( "data.json" )
 data = JSON.parse(data)
 dataString = ""
 for(g=0g<data.lengthg++){
 if(dataString.length != 0) dataString += ""
 	dataString += data[g].title.split(":").join("^c^") + ":" + data[g].body + ":" + data[g].image
 }*/
 dataString = ""// "[{}]"
 //alert(dataString)

 list = app.CreateList( dataString, 1.0, 0.75,"","" )
 //JSON.parse(app.ReadFile( "data.json" )
 //list.SetBackColor( "#393939" )
 //color2 = utils.HexToLighterHex(color2, 0.253)
 //list.SetBackGradient( utils.GetGradientColors(color2)[0], color2,  utils.GetGradientColors(color2)[1]/*"#f5f5f5","#838383","#9e9e9e"*/ )
 //list.SetTextColor1( "#888888" )
 list.SetTextSize1( 16)
 list.SetTextColor1( color )
 list.SetTextSize2( 13)
 list.SetTextColor2( "#000000" )
 list.SetTextShadow1( 3, 1,1, "#000000" )
 list.SetTextShadow2( 2,2,2,"#cdcdcd" )
 list.SetFontFile( "Misc/Iceland-Regular.ttf"/*"Misc/Merriweather-Light.ttf"*/ )
 list.SetOnTouch( list_OnTouch )
 lay.AddChild( list )
 app.AddLayout( lay )

 uix = app.CreateUIExtras()

 layFam = app.CreateLayout( "Linear", "FillXY, Bottom, Horizontal, TouchThrough" )
 //layFam.SetPosition( 0.7, 0.8, 1.0, 0.1 )
fab2 = uix.CreateFAButton( "[fa-gear]" )
 fab2.SetMargins( 0.02, 0.01, 0.02, 0.01 )
 fab2.SetButtonColors( color, color2)//  "#db4437", "#c33d32")
 fab2.SetOnTouch( fab2_OnTouch )
 layFam.AddChild( fab2 )
fam = uix.CreateFAMenu( "[fa-book]", "Up,LabelsLeft" )
 fam.SetMargins( 0.02, 0.01, 0.02, 0.01 )
 fam.SetLabelBackColor( "#FFFFFF" )
 fam.SetLabelTextColor( color )
 fam.SetOnOpened( fam_OnOpened )
 fam.SetOnClosed( fam_OnClosed )
 layFam.AddChild( fam )
 
 fabReply = uix.CreateFAButton( "[fa-pencil]", "Mini" )
 fabReply.SetButtonColors( "#db4437", "#c33d32" )
 fabReply.SetOnTouch( fab_OnTouch )
 fabReply.SetLabel( "Write" )
 fam.AddFAButton( fabReply )
 
 fabReplyAll = uix.CreateFAButton( "[fa-microphone]", "Mini" )
 fabReplyAll.SetButtonColors( "#db4437", "#c33d32" )
 fabReplyAll.SetOnTouch( ()=>{speech.Recognize()} )
 fabReplyAll.SetLabel( "Speak" )
 fam.AddFAButton( fabReplyAll )
 
 fabForward = uix.CreateFAButton( "[fa-send]", "Mini" )
 fabForward.SetButtonColors( "#fbbc05", "#efb306" )
 fabForward.SetOnTouch( ()=>{/*cam.Show() ocr.Scan( cam )*/var em = prompt("Enter the email address:","example@gmail.com");/*app.Alert( "Under Construction", "Information:", "", 112 )*/})
 fabForward.SetLabel( "Send to Email" )
 fam.AddFAButton( fabForward )
 /*
 layFab = app.CreateLayout( "Linear", "FillXY, Bottom, Right, TouchThrough" )
 fab = uix.CreateFAButton( "[fa-pencil]" )
 fab.SetMargins( 0.02, 0.01, 0.02, 0.01 )
 fab.SetButtonColors( color, utils.GetGradientColors(color)[0] )
 fab.SetOnTouch( fab_OnTouch )
 layFab.AddChild( fab )
*/
 app.AddLayout( layFam )
// alert(new Date().toTimeString())//toISOString())

 //app.ShowPopup( "Press the FAButton to add notes" )
 layFam.Hide()
 list.Hide()
 txt.Hide()
 list.SetHiTextColor1( color )
 list.SetHiTextColor2( color2 )
 btn.Hide();
 lay2.Hide();
 tdate.Hide();
//ocr.SetOnResult(OnOcrResult)
  //ocr.SetOnProgress(ocr_OnProgress)
//  ocr.SetScanRect(scanRect.left, scanRect.top, scanRect.right, scanRect.bottom)
SetNotesData()

 layFam.Animate( "RubberBand", ()=>{ lay2.Animate( "Jelly", ()=>{ txt.Animate( "NewsPaper", ()=>{btn.Animate( "NewsPaper", ()=>{tdate.Animate( "BounceRight", ()=>{list.Animate( "BounceLeft", null, fifthteen_hundred )}, fifthteen_hundred )}, fifthteen_hundred )}, fifthteen_hundred )}, fifthteen_hundred )}, fifthteen_hundred );
  
  destFile = "/storage/emulated/0/Download/sqlite/tts.wav"
  //Create Audio Recorder and set dest file.
	rec = app.CreateAudioRecorder()
	rec.SetFile( destFile )
//	ListDir();
	//ExcelData();
	//var rw = prompt("Copy the path:", app.GetDatabaseFolder())
}



function ListDir()
{
alert(app.GetDatabaseFolder());
    var delim = "\0";
    var list7= app.SysExec( 'ls -ap /data/user/0/com.smartphoneremote.androidscriptfree/databases/;exit', "sh,log" );
    list7= list7.split( "\n" ).join( delim );
dlg = app.CreateDialog( "ListDir" );

    lay7 = app.CreateLayout( "Linear", "VCenter,FillXY" );

    lst = app.CreateList( list7, 1, 1, "", delim );
    lay7.AddChild( lst );
    dlg.AddLayout( lay7 );
dlg.Show();
    //app.AddLayout( lay );
}

function ExcelData()
{
    var props = [
        {
            'Title': 'title',
            'Note': 'note',
            'Posted On': 'posted',
            'Date': 'sdate'
        }
    ]
    xls = app.CreateExcel( 'NoteBook1.xlsx.txt', props )
    xls.SetOnLoad( OnLoad )
    xls.SetOnSave( OnSave )
    xls.Load()
}

function OnLoad()
{
    sheet = xls.AddSheet( "Notes" )
    xls.Save()
}

function OnSave()
{
    app.ShowPopup( "Excel file is saved successfully." )
}
function btn_OnTouch()
{
 picker = uix.CreateDatePickerDialog( "Pick a Date" )
 picker.SetOnOk( picker_OnOk )
// picker.SetOnDateChanged(OnDateChanged)
 picker.Show()
}
padStart = function(q, c, s){

	if(s==null||s=="") { self = this;}else{self=s;}
	if(self.length==1&&q==2){return c + self;}else{return self}
}
String.prototype.padStart = padStart;//(2, '0')
function GetFecha()
{
	var date = new Date()
//	if(isDefined(cyear)){
 date.setFullYear( cyear, cmonth, cday)
// }else{
 //date.setFullYear( year, month, day)
 //}
const month = (date.getMonth() + 1).toString().padStart(2, '0')
const day = date.getDate().toString().padStart(2, '0')
const year = date.getFullYear()
return `${month}/${day}/${year}`
}
function SaveFecha()
{
	var date = new Date()
//	if(isDefined(cyear)){
// date.setFullYear( cyear, cmonth, cday)
// }else{
 //date.setFullYear( year, month, day)
 //}
const month = (date.getMonth() + 1).toString().padStart(2, '0')
const day = date.getDate().toString().padStart(2, '0')
const year = date.getFullYear()
return `${month}/${day}/${year}`
}

function picker_OnOk( year, month, day )
{
//app.ShowProgress( "Searching ...", "Solid")
 var date = new Date()
 date.setFullYear( year, month, day)
 cyear = year
 cmonth = month
 cday = day
 //alert(date)
 tdate.SetText(  date.toDateString())
 //app.ShowPopup( date.toDateString() )
// app.HideProgress()
 app.ShowPopup( "Searching notes on: " + date.toDateString() )
 //Get all the table rows.  
    db.ExecuteSql( "select * from Notes Where SDate = '" + GetFecha() +"'", [], OnResult ) 
}

function OnDateChanged( year, month, day )
{
 var date = new Date()
 date.setFullYear( year, month, day)
 cyear = year
 cmonth = month
 cday = day
 app.ShowPopup( "Searching notes on: " + date.toDateString() )
 //Get all the table rows.  
    db.ExecuteSql( "select * from Notes Where SDate = '" + GetFecha() +"'", [], OnResult ) 
}

function PlayRecording()
{
	//Create media player.
	player = app.CreateMediaPlayer()
	//Load a file (can be ogg or mp3).
	player.SetFile( destFile )
	player.Play()
}

function list_OnTouch(title, body, icon, index)
{
	//Speak the text at default pitch and speed.
	pitch = utils.RandomFloatRange(0.1, 1.9);
speed= utils.RandomFloatRange(0.1, 1.9);

		//var pitch = 1.0, speed = 1.0
	rec.Start()
	app.TextToSpeech( title + " " + body, pitch, speed,()=>{rec.Stop();PlayRecording()})
	//setTimeout(()=>{rec.Stop()}, 60000)
	app.ShowPopup( title + " " + body, "Top" )
	/*email = app.CreateEmail( "luillosoftinc@gmail.com", "Crica&Culo" )
	email.SetSMTP( "smtp.gmail.com", 465 )
	//email.SetSMTP( "smtp.mail.yahoo.com", 465 )
	email.SetOnStatus( email_OnStatus )
	email.Send( title, body, 
		"abueladiddy@gmail.com", "luillosoftinc@gmail.com", null )*/
}

//Handle status messages.
function email_OnStatus( status )
{
	app.HideProgress()
	app.ShowPopup( status )
}


//Called when speech engine is ready.
function speech_OnReady()
{
    app.ShowPopup( "Listening...", "Short" )
}

function formatDate(d){
return d//alert(d)
months = ["Jan", "Feb", "Mar", "Apr", "May","Jun","Jul","Aug"]
d = d.replace("T", " ").replace("Z","")
e = d.split(" ")[0].split("-")
f = d.split(" ")[1].split(":")
hour = f[0]
//alert(hour)
minute = f[1]
second = f[2]
if(parseInt(hour)<12) ampm = " AM"
if(parseInt(hour)>12) ampm = " PM", hour = hour - 12
hora = " " + hour + ":" + minute + ":" + second.split(".")[0] + ampm
year = e[0]
month = e[1]
day = e[2]
//return "" + months[parseInt(month)] + " " + day + ", " + year + hora
}
//Called with the recognition result(s).
function speech_OnResult( results )
{
//var itemTitle = "Note " + (list.GetLength() + 1)
 var d = new Date().toISOString()
 //var itemTitle = "#" + (list.GetLength() + 1 + ": " + formatDate(new Date().toLocaleString())) 
 var itemTitle = formatDate(new Date().toLocaleString())
       //An array of recognition results is returned
    //here, with the most probable at the front
    //of the array.
    
    //Show the top result.
    app.ShowPopup( results[0] )
    
 list.AddItem( itemTitle, results[0], "Img/icon.png")
  db.ExecuteSql( "INSERT INTO Notes (title, note, posted_on, sdate)" +   
        " VALUES (?,?,?,?)", [itemTitle, results[0], d, SaveFecha()], null, OnError )  

}

//Called if recognition fails.
function speech_OnError()
{
    app.ShowPopup( "Please speak more clearly!" )
    speech.Recognize()
}


function fab_OnTouch()
{
 dlg = app.CreateDialog( "New Note:" )

 dlgLay = app.CreateLayout( "Linear", "Vertical, FillXY" )
 dlgLay.SetPadding( 0.02, 0, 0.02, 0.02 )
 dlg.SetSize( 0.85, 0.85 )
 dlg.AddLayout( dlgLay )

 dlgTxt = app.CreateTextEdit( "", 0.8, 0.2, "Multiline" )
 dlgTxt.SetHint( "Enter note..." )
 dlgLay.AddChild( dlgTxt )

 dlgBtn = app.CreateButton( "Ok" )
 dlgBtn.SetOnTouch( dlgBtn_OnTouch )
 dlgLay.AddChild( dlgBtn )

 dlg.Show()
}

function fab2_OnTouch()
{
 dlg = app.CreateDialog( "NoteBook Settings:" )
dlg.SetSize( 0.85, 0.85 )
 dlgLay = app.CreateLayout( "Linear", "Vertical, FillXY, VCenter" )
 dlgLay.SetPadding( 0.02, 0, 0.02, 0.02 )
 dlg.AddLayout( dlgLay )

dlgSpinner = app.CreateSpinner( "-- Choose Theme --,Light,Dark" )
 //dlgTxt = app.CreateTextEdit( "", 0.8, 0.2, "Multiline" )
 //dlgTxt.SetHint( "Enter notes..." )
 dlgLay.AddChild( dlgSpinner )
 
 dlgSpinner2 = app.CreateSpinner( "-- Choose Language --,English,Spanish" )
 //dlgTxt = app.CreateTextEdit( "", 0.8, 0.2, "Multiline" )
 //dlgTxt.SetHint( "Enter notes..." )
 dlgLay.AddChild( dlgSpinner2 )

 dlgBtn2 = app.CreateButton( "Ok" )
 dlgBtn2.SetOnTouch( dlgBtn2_OnTouch )
 dlgLay.AddChild( dlgBtn2 )

 dlg.Show()
}

function dlgBtn2_OnTouch()
{
var th, th2
if(dlgSpinner.GetText()=="Light") th = 1
if(dlgSpinner.GetText()=="Dark") th = 2
if(dlgSpinner2.GetText()=="English") th2= 1
if(dlgSpinner2.GetText()=="Spanish") th2= 2

db.ExecuteSql( "Update Configuration SET theme = ? where id = 1", [th], null, OnError)
db.ExecuteSql( "Update Configuration SET language = ? where id = 1", [th2], null, OnError)

/* (title, note, posted_on)" +   
        " VALUES (?,?,?)", [itemTitle, dlgTxt.GetText().split("'").join("\'"), d], null, OnError )  */

dlg.Dismiss()
}

function dlgBtn_OnTouch()
{
var d = new Date().toISOString()
// var itemTitle = "#" + (list.GetLength() + 1 + ": " + formatDate(new Date().toLocaleString())) 

var itemTitle = formatDate(new Date().toLocaleString())
//var itemTitle = "#" + (list.GetLength() + 1 + ": " + formatDate(new Date().toLocaleString({timezone:'CARACAS/LA PAZ'}))) 
 //var itemTitle = "Note " + (list.GetLength() + 1)
 list.AddItem( itemTitle, dlgTxt.GetText().split("'").join("\'"), "Img/icon.png")
 //Add some data (with error handler).  
    db.ExecuteSql( "INSERT INTO Notes (title, note, posted_on,sdate)" +   
        " VALUES (?,?,?,?)", [itemTitle, dlgTxt.GetText().split("'").join("\'"), d,SaveFecha()], null, OnError )  

//var data = JSON.parse(app.ReadFile( "data.json" ))
app.WriteFile( "datax.json", JSON.stringify(list.GetList()))
 dlg.Dismiss()
}


function fam_OnOpened()
{
 layFam.SetBackColor( "#99FFFFFF" )
}

function fam_OnClosed()
{
 layFam.SetBackColor( "#00FFFFFF" )
}

function fab_OnMailReply()
{
 app.ShowPopup( "Reply" )
}

function fab_OnMailReplyAll()
{
 app.ShowPopup( "Reply All" )
}

function fab_OnMailForward()
{
 app.ShowPopup( "Forward" )
}function fam_OnOpened()
{
 layFam.SetBackColor( "#99FFFFFF" )
}

function fam_OnClosed()
{
 layFam.SetBackColor( "#00FFFFFF" )
}

function fab_OnMailReply()
{
 app.ShowPopup( "Reply" )
}

function fab_OnMailReplyAll()
{
 app.ShowPopup( "Reply All" )
}

function fab_OnMailForward()
{
 app.ShowPopup( "Forward" )
}

function SetNotesData()
{

if(!app.IsAPK()){
	//Create or open a database called "NoteBook".  
    db = app.OpenDatabase( "NoteBook.sqlite.db" )
    
    }else{
      db = app.OpenDatabase( "/data/user/0/com.smartphoneremote.androidscriptfree/databases/NoteBook.sqlite.db" )
    
   // db = app.OpenDatabase( "/data/user/0/com.luillosoftinc.notebook/databases/NoteBook.sqlite.db" )
    }
    
    
   // db = app.OpenDatabase("/data/user/0/com.smartphoneremote.androidscriptfree/databases/NoteBook.sqlite.db")
if(utils.Confirm("Drop Table Notes?")) db.ExecuteSql( "DROP TABLE Notes")
    //Create a table (if it does not exist already).  
    db.ExecuteSql( "CREATE TABLE IF NOT EXISTS Notes " +  
        "(id integer primary key autoincrement, title text, note text, posted_on timestamp, sdate text)" )  

//Get all the table rows.  
    db.ExecuteSql( "select * from Notes", [], OnResult ) 
}

//Callback to show errors.  
function OnError( msg )   
{  
    app.Alert( "Error: " + msg )  
    console.log( "Error: " + msg )  
}  

//Callback to show query results in debug.  
function OnResult( results )   {
list.SetList( "" )
    var s = ""  
    var len = results.rows.length  
    for(var i = 0;i < len; i++ )   
    {  
        var item = results.rows.item(i)
        if(s!="") s+= ","
        s +=  item.title.split(":").join("^c^").split(",").join("") + ":" + item.note.split(",").join("") + ":Img/icon.png"   
    }  
    list.SetList( s )
}