export const getLeaders = async () => {
  try {
    const response = await fetch("https://wedev-api.sky.pro/api/v2/leaderboard");
    if (!response) throw new Error("Нет интернета");
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.warn(error);
  }
};
