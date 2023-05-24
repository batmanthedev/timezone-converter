window.onload = function()
{
    displayLocalTime();
    getAllTimes();
    getAllRegions();
}

let tz = [];
let regions = [];
var timeHandle;

async function getAllTimes() { //Gets a list of all regions and their times, displays regions in drop down list

    let temp = []
    const allTimeZones = await Intl.supportedValuesOf("timeZone");
    let date = new Date();

    allTimeZones.forEach(
        (timeZone) => {
            let time = date.toLocaleString("en-UK",{timeZone: `${timeZone}` });
            temp.push(timeZone + " " + time);
        }
    )
    tz = temp;
    setTimeout(getAllTimes, 1000);
}

async function getAllRegions()
{
    const allTimeZones = await Intl.supportedValuesOf("timeZone");
    let date = new Date();

    allTimeZones.forEach(
        (timeZone) => {
            let time = date.toLocaleString("en-UK",{timeZone: `${timeZone}` });
            regions.push(timeZone);
        }
    )

    displayRegions();
}

function displayLocalTime() //displays local time in UI
{
    let today = new Date();

    let h = today.getHours();
    let m = today.getMinutes();

    h = (h<10) ? "0" + h : h;
    m = (m<10) ? "0" + m : m;

    let time = h + ":" + m;

    const localClockEl = document.querySelector('.local-clock');
    localClockEl.textContent = time;

    setTimeout(displayLocalTime, 1000);
}

function displayRegions() //displays a list of all regions without the time. This is for the drop down.
{
    let el;

    const dropDownEl = document.querySelector('.regions-dd');
    regions.forEach((r) => {
        el = document.createElement("option");
        el.textContent = r;
        el.value = r;
        dropDownEl.appendChild(el);
    })
}

function getNewTime()
{
    clearTimeout(timeHandle);

    const dropDownEl = document.querySelector('.regions-dd');
    const newClockEl = document.querySelector('.new-clock');

    var region = dropDownEl.value;

    if(region == "default")
    {
        newClockEl.textContent = "";
        return "";
    }

    let time = tz[regions.findIndex(r => r == region)].split(" ")[2];

    const today = new Date();
    today.setHours(parseInt(time.split(':')[0]), parseInt(time.split(':')[1]),parseInt(time.split(':')[2]));
    displayNewTime(today);
}

function displayNewTime(newTime)
{
    let h = (newTime.getHours() < 10) ? "0" + newTime.getHours() : newTime.getHours();
    let m = (newTime.getMinutes() < 10) ? "0" + newTime.getMinutes() : newTime.getMinutes();
    let time = h + ":" + m;

    const newClockEl = document.querySelector('.new-clock');
    newClockEl.textContent = time;

   timeHandle = setTimeout(function(){displayNewTime(new Date(newTime.getTime() + 1000));}, 1000);
}
