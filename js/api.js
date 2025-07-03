export async function getRandomPlayer(team) {
  try {
    let response = await fetch(
      `https://www.thesportsdb.com/api/v1/json/123/lookup_all_players.php?id=${team}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    const randomPlayerIndex = Math.floor(Math.random() * data.player.length);
    console.log(randomPlayerIndex);
    const randomPlayer = data.player[randomPlayerIndex];
    console.log(randomPlayer);
    return randomPlayer;
  } catch (error) {
    console.log("Error fetching player data: ", error);
  }
}
