function closeWindows() {
	console.log("test");
    ipc.send('close');
}

function maximizeWindows() {
    ipc.send('maximize');
}

function minimizeWindows() {
    ipc.send('minimize');
}
