const baseUrl = "https://wedev-api.sky.pro/api/leaderboard";

export const getLeaders = async () => {
  try {
    const response = await fetch(baseUrl);
    if (!response) throw new Error("Нет интернета");
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.warn(error);
  }
};
