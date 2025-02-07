const timeFrameList = document.querySelector("nav ul");
console.log(timeFrameList);

const selectedTimeFrame = "daily";

const url = "data.json";
let timeTrackingData = null;
const previous = {
    daily: "Yesterday",
    weekly: "Last Week",
    monthly: "Last Month"
};

fetch(url).then((response) => {
    if (!response.ok) return console.log("Oops! something went wrong");

    return response.json();
}).then((data) => {
    timeTrackingData = data;
    console.log(timeTrackingData);

    timeFrameList.firstElementChild.classList.add("selected");
    updateDailyTimeFrame();
});

const updateDailyTimeFrame = () => {
    updateWork("daily", previous.daily);
    updatePlay("daily", previous.daily);
    updateStudy("daily", previous.daily);
    updateExercise("daily", previous.daily);
    updateSocial("daily", previous.daily);
    updateSelfCare("daily", previous.daily);
};

const UpdateWeeklyTimeFrame = () => {
    updateWork("weekly", previous.weekly);
    updatePlay("weekly", previous.weekly);
    updateStudy("weekly", previous.weekly);
    updateExercise("weekly", previous.weekly);
    updateSocial("weekly", previous.weekly);
    updateSelfCare("weekly", previous.weekly);
};

const UpdateMonthlyTimeFrame = () => {
    updateWork("monthly", previous.monthly);
    updatePlay("monthly", previous.monthly);
    updateStudy("monthly", previous.monthly);
    updateExercise("monthly", previous.monthly);
    updateSocial("monthly", previous.monthly);
    updateSelfCare("monthly", previous.monthly);
};


const updateWork = (timeFrame, lastPeriod) => {
    const data = getData(timeTrackingData, timeFrame, "Work");
    const {
        current,
        previous
    } = data;
    const workEl = document.querySelector(".text-wrapper.work");
    workEl.innerHTML = '';
    workEl.innerHTML += `<h2>Work</h2>
                    <div class="img-container">
                        <img src="./images/icon-ellipsis.svg" alt="ellipsis icon">
                    </div>
                    <p>${current + setUnit(current)}</p>
                    <p>${lastPeriod} - ${previous + setUnit(previous)}</p>`;
};

const updatePlay = (timeFrame, lastPeriod) => {
    const data = getData(timeTrackingData, timeFrame, "Play");
    const {
        current,
        previous
    } = data;
    const workEl = document.querySelector(".text-wrapper.play");
    workEl.innerHTML = '';
    workEl.innerHTML += `<h2>Play</h2>
                    <div class="img-container">
                        <img src="./images/icon-ellipsis.svg" alt="ellipsis icon">
                    </div>
                    <p>${current + setUnit(current)}</p>
                    <p>${lastPeriod} - ${previous + setUnit(previous)}</p>`;
};

const updateStudy = (timeFrame, lastPeriod) => {
    const data = getData(timeTrackingData, timeFrame, "Study");
    const {
        current,
        previous
    } = data;
    const workEl = document.querySelector(".text-wrapper.study");
    workEl.innerHTML = '';
    workEl.innerHTML += `<h2>Study</h2>
                    <div class="img-container">
                        <img src="./images/icon-ellipsis.svg" alt="ellipsis icon">
                    </div>
                    <p>${current + setUnit(current)}</p>
                    <p>${lastPeriod} - ${previous + setUnit(previous)}</p>`;
};

const updateExercise = (timeFrame, lastPeriod) => {
    const data = getData(timeTrackingData, timeFrame, "Exercise");
    const {
        current,
        previous
    } = data;
    const workEl = document.querySelector(".text-wrapper.exercise");
    workEl.innerHTML = '';
    workEl.innerHTML += `<h2>Exercise</h2>
                    <div class="img-container">
                        <img src="./images/icon-ellipsis.svg" alt="ellipsis icon">
                    </div>
                    <p>${current + setUnit(current)}</p>
                    <p>${lastPeriod} - ${previous + setUnit(previous)}</p>`;
};

const updateSocial = (timeFrame, lastPeriod) => {
    const data = getData(timeTrackingData, timeFrame, "Social");
    const {
        current,
        previous
    } = data;
    const workEl = document.querySelector(".text-wrapper.social");
    workEl.innerHTML = '';
    workEl.innerHTML += `<h2>Social</h2>
                    <div class="img-container">
                        <img src="./images/icon-ellipsis.svg" alt="ellipsis icon">
                    </div>
                    <p>${current + setUnit(current)}</p>
                    <p>${lastPeriod} - ${previous + setUnit(previous)}</p>`;
};

const updateSelfCare = (timeFrame, lastPeriod) => {
    const data = getData(timeTrackingData, timeFrame, "Self Care");
    const {
        current,
        previous
    } = data;
    const workEl = document.querySelector(".text-wrapper.self-care");
    workEl.innerHTML = '';
    workEl.innerHTML += `<h2>Self Care</h2>
                    <div class="img-container">
                        <img src="./images/icon-ellipsis.svg" alt="ellipsis icon">
                    </div>
                    <p>${current + setUnit(current)}</p>
                    <p>${lastPeriod} - ${previous + setUnit(previous)}</p>`;
};

const getData = (data, timeFrame, titleVal) => {
    for (const item of Object.values(data)) {
        const {
            timeframes,
            title
        } = item;
        if (title === titleVal && timeFrame === "daily") {
            const {
                daily,
                weekly,
                monthly
            } = timeframes;
            return daily;
        }
        if (title === titleVal && timeFrame === "weekly") {
            const {
                daily,
                weekly,
                monthly
            } = timeframes;
            return weekly;
        }
        if (title === titleVal && timeFrame === "monthly") {
            const {
                daily,
                weekly,
                monthly
            } = timeframes;
            return monthly;
        }
    }
};

const removeSelectedClass = () => {
    const timeFrameEl = document.getElementsByClassName("time-frame");
    for (const element of Object.values(timeFrameEl)) {
        element.classList.remove("selected");
    }
};

const setUnit = (val) => {
    if (Number(val) > 1) return "hrs";
    else return "hr";
};

timeFrameList.addEventListener("click", (event) => {
    const selected = event.target;
    if (selected.textContent === "Daily") {
        removeSelectedClass();
        selected.classList.add("selected");
        updateDailyTimeFrame();
    }
    if (selected.textContent === "Weekly") {
        removeSelectedClass();
        selected.classList.add("selected");
        UpdateWeeklyTimeFrame();
    }
    if (selected.textContent === "Monthly") {
        removeSelectedClass();
        selected.classList.add("selected");
        UpdateMonthlyTimeFrame();
    }
});
