import moment from 'moment';

export const getDayName = (locale) => {
    var date = new Date();
    return date.toLocaleDateString(locale, { weekday: 'long' });
}

export const convertSecondsToDate = (seconds) => {
    return moment.utc(seconds * 1000).format('hh:mm A');
}

export const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const sortArrayByValue = (data, value) => {
    return data.sort((a, b) => a[value] - b[value]);
}