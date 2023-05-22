async function getAllTimes() {

    const allTimeZones = await Intl.supportedValuesOf("timeZone");
    let tz = [];
    let date = new Date();

    console.log(allTimeZones);

    allTimeZones.forEach(
        (timeZone) => {
            let time = date.toLocaleString( "en-uk", {time: `${timeZone}` });
            //console.log(timeZone, time);
            tz.push(timeZone + "" + time);
        }
    )

    tz.forEach((t) =>{console.log(t)});
}

function getLocalTime()
{
    let today = new Date();
    let time = today.getHours() + ":" + today.getMinutes();
    return time;
}

//console.log(getLocalTime());

getAllTimes();

function DisplayLocalTime()
{

}


//Get local time
//Display local time
//Get list of times in different time zones
//Display list of times in different time zones
//Get time zone specified by user
//Display timezone specified by user




