module.exports = {

    prefix: ".",

    embedColor: "#2b2d31",

    successColor: "#57F287",

    errorColor: "#ED4245",

    warningColor: "#FEE75C",

    token: process.env.TOKEN,

    mongoURI: process.env.MONGO_URI,

    leaderboardUpdateInterval: 60000,

    weeklyResetDays: 7,

    leaderboardLimit: 10,


    voiceChannels: {

        joinToCreate: "1524179518229839912",

        random: "1526402275218686054",

        public: "1524178779939803268",

        private: "1524178808692019423",

        unmute: "1524179582662738071"

    }

};
