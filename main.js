////////////////////////////////////
/// vars and requires
////////////////////////////////////
var fs = require('fs');
var sys = require('sys');
var exec = require('child_process').exec;
var dir = '/';

list = document.getElementById('list');
/////////////////////////////////
// get config from localstorage
///////////////
var maqstr = '';
var extstr = '';
var exestr = '';
if (localStorage.maqstr != null) maqstr = localStorage.maqstr;
if (localStorage.extstr != null) extstr = localStorage.extstr;
if (localStorage.exestr != null) exestr = localStorage.exestr;
var maq = maqstr.split(';');
var ext = extstr.split(';');
var exe = exestr.split(';');

var dirstr='';
if (localStorage.dir != null) dir = localStorage.dir;
if (localStorage.dirstr != null) dirstr = localStorage.dirstr;
dirstr=dirstr.replace(/\\/g,'/');
dirs=dirstr.split(';');
////////////////////////////////////
/// startup
////////////////////////////////////
list.innerHTML='carregando...';

fs.readdir(dir, files_result);

ldirs=document.getElementById('dirs');
ldirs.innerHTML=ldirs.innerHTML+dir;
for (i=0;i<dirs.length;i++) {
	ledir=dirs[i];
	ledirnameArr=dirs[i].split('/');
	ledirname=ledirnameArr[ledirnameArr.length-1];
    ldirs.innerHTML=ldirs.innerHTML+"<a class='button' href='javascript:void(0)' onclick='changedir(\""+ledir+"\")'>"+ledirname+"</a>";
}
////////////////////////////////////
/// callbacks
////////////////////////////////////
function files_result (err, files) {
	if (err) { //throw err;
		files=[]; };
	list.innerHTML='';
	//console.log("files: " + files);
	len = files.length;
	for (i=0;i < len;i++) {		
		if (ext.indexOf(files[i].substr(files[i].length-3)) > -1)		
			list.innerHTML=list.innerHTML+
			"<a class='buttond' href='javascript:void(0)' onclick='launch(\""+files[i]+"\")'>"+files[i]+"</a>\n";
	};
}

function puts(error, stdout, stderr) { console.log(stdout) }

////////////////////////////////////
/// proper functions
////////////////////////////////////
function launch(filename){
	hlog=document.getElementById('hlog');
    hlog.innerHTML=hlog.innerHTML+'<br>launching '+filename;
	emu_exec = 'echo';
	emu_exec = exe[ext.indexOf(filename.substr(filename.length-3))];
	hlog.innerHTML=hlog.innerHTML+'<br>execline: '+emu_exec+" \""+dir+"/"+filename+"\"";
	exec(emu_exec+" \""+dir+"/"+filename+"\"", puts);
}

function changedir(ledir){
	localStorage.dir=ledir;
	location.reload();
}
