const axios = require("axios");

const getActor = (name) => {
  const url = `https://api.api-ninjas.com/v1/celebrity?name=${name}`;
  return axios
    .get(url, {
      headers: { "X-Api-Key": process.env.ACTOR_API_KEY },
    })
    .then((res) => res.data[0]);
    // MICHAL: גם כאן צריך catch, אם אתה יודע מקום שגיאה ספציפי צריך לטפל בו אישית, לא לתת לcatch הכללי של הבקשה להיכשל
};

module.exports = getActor;
