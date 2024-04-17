cfg.Light, cfg.Holo, cfg.Share, cfg.Portrait, cfg.MUI;

app.LoadPlugin( "UIExtras" );
app.LoadPlugin( "Utils" );
var songs = ["Snd/Adam Szabo - Knock Me Out (Nader Alipour Remake).mid", "Snd/Edwan - Permich - Tropical.mid","Snd/Goldhands - Jasmina (Featuring LollieVox).mid","Snd/Nucleon - Shogun.mid","Snd/Permich - Arabic.mid"];
function OnStart()
{
app.CopyFile( "Img/note.png", "/storage/emulated/0/Download/sqlite/note.png" );
app.CopyFile( "Img/NoteBook.png", "/storage/emulated/0/Download/sqlite/My Notes.png" );

utils = app.CreateUtils();
	SetNotesData();
//app.MakeFolder( app.GetAppPath()+"/Fonts" );
//app.MakeFolder( app.GetAppPath()+"/Misc" );
//app.CopyFile( app.GetInternalFolder()+"/Fonts/Montserrat-ExtraLight.ttf", app.GetAppPath()+"/Fonts/1.ttf" );
//app.CopyFile( app.GetInternalFolder()+"/Fonts/Montserrat-ExtraLight.ttf", app.GetAppPath()+"/Misc/1.ttf" );
 lay = app.CreateLayout( "Linear", "FillXY" );
 lay.Hide();

 txt = app.CreateText( app.GetAppName(), 1.0 );
 txt.SetFontFile( "/storage/emulated/0/Fonts/2.ttf" );
 txt.SetTextSize( 28 );
 txt.SetTextColor( "#FFFFFF" );
 txt.SetTextShadow( 5, 0, 0, "#000000" );
 txt.SetPadding( 0, 0.01, 0, 0.01 );
 txt.SetBackGradient("#ffcdd2", "#e53935", "#ef9a9a" );
 lay.AddChild( txt );
 txt.SetFontFile( "/sdcard/Fonts/2.ttf" );

//#b0bec5","lighten2":"#90a4ae","lighten1":"#78909c","blueGrey":"#607d8b","darken1":"#546e7a","darken2":"#455a64","darken3":"#37474f","darken4":"#263238"},"gray":{"li
 list = app.CreateList( "", 1.0, 0.80 );
 list.SetOnTouch( list_OnTouch );
 list.SetBackGradient( "#efefef","#FFFFFF", "#cdcdcd", "tl-br");//right-left");
 list.SetTextColor1( "#e53935" );
 list.SetTextShadow( 5, 0, 0, "#333333" );
 list.SetTextColor2( "#000000" );
 list.Hide();
 lay.AddChild( list );
 app.AddLayout( lay );

 uix = app.CreateUIExtras();

 layFab = app.CreateLayout( "Linear", "FillXY, Bottom, Right, TouchThrough" );
 layFab.Hide();
 layF = app.CreateLayout( "Linear", "Horizontal, HCenter" );
 layFab.AddChild( layF );
 fab2 = uix.CreateFAButton( "[fa-search]" );
 fab2.SetMargins( 0.02, 0.01, 0.02, 0.01 );
 fab2.SetButtonColors(  "#db4437", "#c33d32");;
 fab2.SetOnTouch( fab2_OnTouch );
 layF.AddChild( fab2 );
 
 
 fab = uix.CreateFAButton( "[fa-pencil]" );
 fab.SetMargins( 0.02, 0.01, 0.02, 0.01 );
 fab.SetButtonColors( "#db4437", "#c33d32" );
 fab.SetOnTouch( fab_OnTouch );
 layF.AddChild( fab );
 
 

 app.AddLayout( layFab );
 lay.Animate( "RubberBand", null, 750 );
 layFab.Animate( "Newspaper", null, 850 );
 list.Animate( "FallRotate", null, 950 );
 
 //Create media player.
	player = app.CreateMediaPlayer();
	c = utils.RandomIntegerRange(0, songs.length-1);
	player.SetFile( songs[c]);//"Snd/Adam Szabo - Knock Me Out (Nader Alipour Remake).mid" )
	//player.SetFile( "Snd/Nucleon - Shogun.mid" )
	player.SetOnReady( ()=>{player.Play(  )})

 
   //music = app.CreateMusic()
  //music.CreatePlayer( "Snd/Nucleon - Shogun.mid", "AutoPlay")
//music.Play();

 //app.ShowPopup( "Press the FAButton to add notes" );
}

function list_OnTouch(title, body, icon, index)
{
	//Speak the text at default pitch and speed.
	var pitch = 1.0, speed = 1.0;
	app.TextToSpeech( title + " " + body, pitch, speed )
}


function fab_OnTouch()
{
 dlg = app.CreateDialog( "Note Title:" );

 dlgLay = app.CreateLayout( "Linear", "Vertical, FillXY" );
 dlgLay.SetPadding( 0.02, 0, 0.02, 0.02 );
 dlg.AddLayout( dlgLay );

 dlgTxt = app.CreateTextEdit( "Enter the note title:", 0.8, 0.2, "Multiline" );
 dlgTxt.SetHint( "Enter notes..." );
 dlgLay.AddChild( dlgTxt );

 dlgBtn = app.CreateButton( "Ok" );
 dlgBtn.SetOnTouch( title_OnTouch );
 dlgLay.AddChild( dlgBtn );

 dlg.Show();
}

function fab2_OnTouch()
{

}
function title_OnTouch()
{

dlg.Dismiss();
 dlg2 = app.CreateDialog( "Note Contents:" );

 dlgLay2 = app.CreateLayout( "Linear", "Vertical, FillXY" );
 dlgLay2.SetPadding( 0.02, 0, 0.02, 0.02 );
 dlg2.AddLayout( dlgLay2 );

 dlgTxt2 = app.CreateTextEdit( "Enter note contents", 0.8, 0.2, "Multiline" );
 dlgTxt2.SetHint( "Enter notes..." );
 dlgLay2.AddChild( dlgTxt2 );

 dlgBtn2 = app.CreateButton( "Ok" );
 dlgBtn2.SetOnTouch( dlgBtn_OnTouch );
 dlgLay2.AddChild( dlgBtn2);

 dlg2.Show();
}

function dlgBtn_OnTouch()
{
 var itemTitle = "Note " + (list.GetLength() + 1);
 var d = new Date().toISOString();
 
 //list.AddItem( itemTitle, dlgTxt.GetText() );
// list.AddItem( dlgTxt.GetText(), d, "Img/NoteBook.png");
 list.AddItem( dlgTxt.GetText(), dlgTxt2.GetText(), "Img/note.png");
 
 //Add some data (with error handler).  
    db.ExecuteSql( "INSERT INTO Notes (title, note, posted_on)" +   
        " VALUES (?,?,?)", [dlgTxt.GetText(),dlgTxt2.GetText(), d], null, OnError )  


 dlg2.Dismiss();
}

function SetNotesData()
{
if(!app.IsAPK()){
	//Create or open a database called "NoteBook".  
    db = app.OpenDatabase( "/storage/emulated/0/Download/sqlite/NoteBook.sqlite.db" );
    
    }else{
    db = app.OpenDatabase( app.GetAppPath()+"/NoteBook.sqlite.db" );
    }
    //db.ExecuteSql( "DROP TABLE Notes");
    //Create a table (if it does not exist already).  
    db.ExecuteSql( "CREATE TABLE IF NOT EXISTS Notes " +  
        "(id integer primary key autoincrement, title text, note text, posted_on timestamp)" )  

//Get all the table rows.  
    db.ExecuteSql( "select * from Notes;", [], OnResult ) 
}

//Callback to show errors.  
function OnError( msg )   
{  
    app.Alert( "Error: " + msg )  
    console.log( "Error: " + msg )  
}  

//Callback to show query results in debug.  
function OnResult( results )   
{  
    var s = "";  
    var len = results.rows.length;  
    for(var i = 0; i < len; i++ )   
    {  
        var item = results.rows.item(i)  
        s += item.posted_on.split(":").join("^c^").replace("T"," ").split(".")[0]+ "," + item.title + ":" + item.note + ":Img/note.png" + ",";   
    }  
    list.SetList( s );
}  