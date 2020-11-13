var execSync = require('child_process').execSync;
var Gpio = require('onoff').Gpio;
var sleep = require('sleep');
var fs = require('fs');

var LED1 = new Gpio(18, 'out');
var LED2 = new Gpio(23, 'out');
var LED3 = new Gpio(24, 'out');
var LED4 = new Gpio(12, 'out');
var LED5 = new Gpio(26, 'out');
var pushButton1 = new Gpio(6, 'in', 'rising', {debounceTimeout: 10});
var pushButton2 = new Gpio(22, 'in', 'rising', {debounceTimeout: 10});
var pushButton3 = new Gpio(27, 'in', 'rising', {debounceTimeout: 10});
var pushButton4 = new Gpio(17, 'in', 'rising', {debounceTimeout: 10});
var pushButton5 = new Gpio(4, 'in', 'rising', {debounceTimeout: 10});

LED1.writeSync(1);
LED2.writeSync(1);
LED3.writeSync(1);
LED4.writeSync(1);
LED5.writeSync(1);
sleep.sleep(2);
execSync('bash /home/pi/getConfigFile.sh');
LED1.writeSync(0);
LED2.writeSync(0);
LED3.writeSync(0);
LED4.writeSync(0);
LED5.writeSync(0);

var loginRfid = "";
var check = 0;
var tasterSequenz = [];
var loginTime = "";
var logoutTime = "";
var loginTimeSeconds = 0;
var rundgangID = "";
var rundgangZeitLimit = "";
var rundgangZeitLimitSeconds = "";
var rundgangTastersequenz = "";
var idTokens = "";


while (true) {
  var rfid = execSync('python /home/pi/MFRC522-python/Read.py').toString().replace(/\n/g, '');
  var tokens = execSync('cat /home/pi/tokens/tokens.csv').toString().replace(/\n/g, '').split(",");
  var currentTime = new Date().getTime()/1000;
  //console.log(tokens);
  //console.log(execSync('free -m').toString());
  // console.log(pushButton1);
  // login rfid
  if (tokens.includes(rfid) && rfid != -1 && check == 0) {
    var filename = execSync('ls -t /home/pi/rundgangConfig | head -1').toString();
    var configFileContentString = execSync('cat /home/pi/rundgangConfig/' + filename).toString();
    var configFileContent = configFileContentString.replace(/\n/g, '').split(',');
    rundgangID = configFileContent[0];
    rundgangZeitLimit = configFileContent[1];
    rundgangZeitLimitSeconds = rundgangZeitLimit*60;
    rundgangTastersequenz = configFileContent[2];
    idTokens = (tokens.indexOf(rfid)-1).toString();
    idTokens = tokens[idTokens];
    //console.log(idTokens);
    //console.log(rundgangTastersequenz);

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    loginTime = date+'_'+time;
    loginTimeSeconds = new Date().getTime()/1000;
    console.log("login");
    //console.log(loginTimeSeconds);
    //console.log("LoginTime: " + loginTime);
    loginRfid = rfid;
    LED1.writeSync(1);
    LED2.writeSync(1);
    LED3.writeSync(1);
    LED4.writeSync(1);
    LED5.writeSync(1);
    sleep.sleep(1)
    LED1.writeSync(0);
    LED2.writeSync(0);
    LED3.writeSync(0);
    LED4.writeSync(0);
    LED5.writeSync(0);
    check++;
  } // logout rfid
  else if (rfid == loginRfid && check == 1) {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    logoutTime = date+'_'+time;

    console.log("logout");
    console.log("LogoutTime: " + logoutTime);
    console.log("Die Tastersquenz war: ");
    console.log(tasterSequenz);

    if (tasterSequenz.length == "0") {
      tasterSequenz = 0;
    }
    //console.log('node /home/pi/led/createCSV.js '+tasterSequenz+' '+loginTime+' '+logoutTime);
    //console.log(idTokens);
    execSync('node /home/pi/led/createCSV.js '+tasterSequenz+' '+loginTime+' '+logoutTime+' '+rundgangID+' '+idTokens);

    for (var i = 0; i < 5; i++) {
      LED1.writeSync(1);
      LED2.writeSync(1);
      LED3.writeSync(1);
      LED4.writeSync(1);
      LED5.writeSync(1);
      sleep.msleep(200)
      LED1.writeSync(0);
      LED2.writeSync(0);
      LED3.writeSync(0);
      LED4.writeSync(0);
      LED5.writeSync(0);
      sleep.msleep(200)
    }
    check = 0;
    loginRfid = "";
    tasterSequenz = [];
  }else if ((currentTime) > (loginTimeSeconds+rundgangZeitLimitSeconds) && check == 1) {
    console.log("Zeit ist abgelaufen");
    check = 0;
    if (tasterSequenz.length == "0") {
      tasterSequenz = 0;
    }
    execSync('node /home/pi/led/createCSV.js '+tasterSequenz+' '+loginTime+' '+"null_null"+' '+rundgangID+' '+idTokens);
    tasterSequenz = [];
    for (var i = 0; i < 5; i++) {
      LED1.writeSync(1);
      LED2.writeSync(1);
      LED3.writeSync(1);
      LED4.writeSync(1);
      LED5.writeSync(1);
      sleep.msleep(200)
      LED1.writeSync(0);
      LED2.writeSync(0);
      LED3.writeSync(0);
      LED4.writeSync(0);
      LED5.writeSync(0);
      sleep.msleep(200)
    }
  }else if (pushButton1.readSync() == 1 && check == 1) {
    console.log("Button 1");
    tasterSequenz.push("1");
    if (LED1.readSync() == 0) {
      LED1.writeSync(1);
      sleep.msleep(500);
      LED1.writeSync(0);
    }
  }else if (pushButton2.readSync() == 1 && check == 1) {
    console.log("Button 2");
    tasterSequenz.push("2");
    if (LED2.readSync() == 0) {
      LED2.writeSync(1);
      sleep.msleep(500);
      LED2.writeSync(0);
    }
  }else if (pushButton3.readSync() == 1 && check == 1) {
    console.log("Button 3");
    tasterSequenz.push("3");
    if (LED3.readSync() == 0) {
      LED3.writeSync(1);
      sleep.msleep(500);
      LED3.writeSync(0);
    }
  }else if (pushButton4.readSync() == 1 && check == 1) {
    console.log("Button 4");
    tasterSequenz.push("4");
    if (LED4.readSync() == 0) {
      LED4.writeSync(1);
      sleep.msleep(500);
      LED4.writeSync(0);
    }
  }else if (pushButton5.readSync() == 1 && check == 1) {
    console.log("Button 5");
    tasterSequenz.push("5");
    if (LED5.readSync() == 0) {
      LED5.writeSync(1);
      sleep.msleep(500);
      LED5.writeSync(0);
    }
  }
}
