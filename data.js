
// data.js
const eventConfig = {
    eventStartTime: "10:00 AM", // Event starts
    talkDuration: 60,          // minutes
    transitionTime: 10,        // minutes between talks
    lunchBreakDuration: 60     // minutes
};

const rawTalks = [
    {
        title: "Introduction to AI in Software Engineering",
        speakers: ["Dr. Jane Doe"],
        category: ["AI", "Software Engineering"],
        duration: 60,
        description: "An overview of how artificial intelligence is transforming software development lifecycles."
    },
    {
        title: "Microservices Architecture Patterns",
        speakers: ["John Smith", "Alice Wonderland"],
        category: ["Architecture", "Cloud"],
        duration: 60,
        description: "Exploring common patterns and best practices for building scalable microservices."
    },
    {
        title: "Frontend Performance Optimization",
        speakers: ["Bob Johnson"],
        category: ["Frontend", "Web Development"],
        duration: 60,
        description: "Tips and tricks to make your web applications blazing fast."
    },
    {
        title: "The Future of Quantum Computing",
        speakers: ["Dr. Emily White"],
        category: ["Quantum Computing", "Future Tech"],
        duration: 60,
        description: "A deep dive into the promises and challenges of quantum computing."
    },
    {
        title: "DevOps Best Practices with Kubernetes",
        speakers: ["Charlie Brown"],
        category: ["DevOps", "Cloud", "Kubernetes"],
        duration: 60,
        description: "Streamlining your development and operations workflow using Kubernetes."
    },
    {
        title: "Cybersecurity in a Connected World",
        speakers: ["Dr. Sarah Lee"],
        category: ["Security"],
        duration: 60,
        description: "Understanding the evolving threat landscape and how to protect your systems."
    }
];

// This will be calculated and added to the final talks array
const lunchBreak = {
    title: "Lunch Break",
    speakers: [],
    category: ["Break"],
    duration: eventConfig.lunchBreakDuration,
    description: "Enjoy a delicious lunch and network with fellow attendees!",
    isBreak: true // Custom flag for breaks
};

// Main function to generate the schedule
function generateSchedule(config, talks) {
    let currentTime = parseTime(config.eventStartTime);
    const schedule = [];
    let talkIndex = 0;

    for (let i = 0; i < talks.length + 1; i++) { // +1 for the lunch break
        if (i === Math.floor(talks.length / 2)) { // Insert lunch break roughly in the middle
            schedule.push({
                ...lunchBreak,
                startTime: formatTime(currentTime),
                endTime: formatTime(addMinutes(currentTime, lunchBreak.duration))
            });
            currentTime = addMinutes(currentTime, lunchBreak.duration);
            // No transition after lunch before next talk
        }

        if (talkIndex < talks.length) {
            const talk = talks[talkIndex];
            const startTime = formatTime(currentTime);
            currentTime = addMinutes(currentTime, talk.duration);
            const endTime = formatTime(currentTime);

            schedule.push({
                ...talk,
                startTime,
                endTime
            });

            if (talkIndex < talks.length - 1 || i === Math.floor(talks.length / 2) - 1) { // Add transition after talk, unless it's the last talk or before lunch
                currentTime = addMinutes(currentTime, config.transitionTime);
            }
            talkIndex++;
        }
    }
    return schedule;
}

// Helper functions for time calculations
function parseTime(timeStr) {
    const [time, period] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
}

function formatTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert 24hr to 12hr format
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minutes} ${period}`;
}

function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
}

// Export for use in the build script and directly in the HTML
const fullSchedule = generateSchedule(eventConfig, rawTalks);
