function formattedTodayWithoutMoment(){
    var date = new Date();
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return `${day}/${monthIndex + 1}/${year}`;
}

const defaultDate = formattedTodayWithoutMoment();

export default {
    Date: defaultDate
}