export const converToDateApi = (dateApi) => {
  if (typeof dateApi === "string") {
    if (
      dateApi.search(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/g) !== -1
    ) {
      // verify if is yyyy-mm-dd
      const modernType = `${dateApi.split("-")[1]}-${dateApi.split("-")[2]}-${
        dateApi.split("-")[0]
      }`; // mm-dd-yyyy
      return modernType;
    }
    return dateApi;
  }
  return dateApi;
};

export const formatDate = (date) => {
  if (date) {
    // let objectDate = new Date(converToDateApi(date));
    // let objectDate = new Date(date.replace(/-/g, "/").replace(/T.+/, ""));
    // let json = JSON.stringify(date);
    // let parsedDate = JSON.parse(json);
    // console.log(parsedDate);
    let objectDate = new Date(date);
    // console.log(objectDate);
    // let getDateTime = new Intl.DateTimeFormat('en-US').format(date)
    // let getDateTime = new Intl.DateTimeFormat('en-US').format(date)
    // const mediumTime = new Intl.DateTimeFormat("en", {
    //   // timeStyle: "medium",
    //   // timeZone: "UTC",
    //   hour: "numeric",
    //   // minute: "2-digit",
    //   // second: "2-digit",
    //   dateStyle: "short",
    // });
    // console.log(mediumTime.format(objectDate));
    // console.log(mediumTime);
    // console.log(objectDate.slice(0, 10));
    let getDate = new Date(date).toLocaleDateString("en-US", {
      timeZone: "America/Los_Angeles",
      year: "numeric",
      month: "2-digit",
      minutes: "2-digit",
      day: "2-digit",
    });
    console.log(getDate);

    let getTime = objectDate
      .toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
      .slice(0, 8);
    console.log(getTime);
    // console.log(time.slice(0, 8));
    // currentDate.getDate();
    // 2021-02-18T08:28:32.115
    let day = objectDate.getDay();
    let month = objectDate.getMonth();
    let year = objectDate.getUTCFullYear();
    if (day < 10) {
      day = "0" + day;
    }
    if (month < 10) {
      month = `0${month}`;
    }
    let minutes = objectDate.getMinutes();
    let hours = objectDate.getHours();
    let seconds = objectDate.getSeconds();
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    let formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return formattedDate;
  }
  return date;
};
