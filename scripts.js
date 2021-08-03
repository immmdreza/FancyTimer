function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

function millisecondsParser(milliseconds) {
    milliseconds = Math.floor(milliseconds / 100);
    return String(milliseconds)
}

function minutesAndSecondsParser(minutesOrSeconds) {
    if(minutesOrSeconds < 60) {
        if(minutesOrSeconds < 10) {
            return "0" + String(minutesOrSeconds)
        }

        return String(minutesOrSeconds)
    }       
}

function parseTimerText(time) {
    if(time < 1000) {
        return "00:00:" + millisecondsParser(time)
    }
    else {
        var seconds = Math.floor(time / 1000);
        var milliseconds = time - seconds * 1000;

        if(seconds < 60) {
            return ( 
                "00:" + 
                minutesAndSecondsParser(seconds)  + ":" + 
                millisecondsParser(milliseconds)
            )
        }
        else {
            var minutes = Math.floor(seconds / 60);
            var rSeconds = seconds - minutes * 60;

            return ( 
                minutesAndSecondsParser(minutes)  + ':' +
                minutesAndSecondsParser(rSeconds) + ':' +
                millisecondsParser(milliseconds) 
            )
        }
    }
}


class Timer {
    constructor(timerElemId) {
        this.currentTime = 0;
        this.keepAlive = false;
        this.timerElemId = timerElemId;
    }

    timerElem() {
        var ele =  document.getElementById(this.timerElemId);
        return ele;
    }

    async start() {
        var my_ele = this.timerElem();
    
        this.keepAlive = true;
        while(this.keepAlive) {
    
            await sleep(100);
    
            if(!this.keepAlive) {
                break;
            }
    
            this.currentTime += 100;
            my_ele.innerText = parseTimerText(this.currentTime);
        }
    }

    stop() {
        if(!this.keepAlive) {
            return false;
        }
    
        this.keepAlive = false;
        return true;
    }

    reset() {
        var my_ele = this.timerElem()
        my_ele.innerText = "00:00:0";
    
        this.currentTime = 0;
        this.keepAlive = false;
    }
}


let timer = new Timer('timer');

async function startClicked(_) {
    var logger = document.getElementById("logger");

    if(timer.keepAlive) {
        logger.innerText = "Timer is already started!!";
        return;
    }

    if(timer.currentTime > 0) {
        logger.innerText = "Timer started again!";
    }
    else {
        logger.innerText = "Timer started.";
    }

    await timer.start();
}

function stopClicked(_) {
    var logger = document.getElementById("logger");

    if(timer.stop()) {
        logger.innerText = "Timer stopped.";
    }
    else {
        logger.innerText = "Timer not started!";
    }
}

function resetClicked(_) {
    timer.reset()

    var logger = document.getElementById("logger");

    logger.innerText = "Timer reset.";
}