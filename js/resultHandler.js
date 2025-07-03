import { getRandomPlayer } from "./api.js";

function getResultContent(rights) {
  if (rights === 10) {
    return {
      heading: "🏆 ALLA RÄTT! Du är en mattelegend på planen!!! 🏆",
      text: "Grymt jobbat! Du är värd en guldboll! ⚽🌟",
      showPlayer: true,
    };
  } else if (rights >= 8) {
    return {
      heading: `🔥Imponerande! ${rights} rätt av 10!🔥`,
      text: "Du dribblar genom talen som en mästare!\nFörsök igen och se om du kan få alla rätt.",
      showPlayer: true,
    };
  } else if (rights >= 6) {
    return {
      heading: `🌟 Bra kämpat! ${rights} rätt av 10! 🌟`,
      text: " Du börjar få upp farten -\nfortsätt träna så blir du snart en mattemästare! 💪🔢",
      showPlayer: false,
    };
  } else if (rights >= 3) {
    return {
      heading: `Du fick ${rights} rätt av 10.`,
      text: "Det här var en bra uppvärmning!\nKom igen, kör ett varv till - du har det i dig! 🚀",
      showPlayer: false,
    };
  } else {
    return {
      heading: `Du fick ${rights} rätt av 10.`,
      text: `Det är inte alltid lätt, men nya tal väntar.\nNu kör vi en ny runda! 🌈💪`,
      showPlayer: false,
    };
  }
}

export async function showResult(rights, teamID, modalEl) {
  const content = getResultContent(rights);
  modalEl.querySelector(".result-heading").textContent = content.heading;
  modalEl.querySelector(".result-text").textContent = content.text;

  const container = modalEl.querySelector(".result-text");
  if (content.showPlayer && teamID) {
    const player = await getRandomPlayer(teamID);
    if (player) {
      const img = document.createElement("img");
      img.classList.add("result-image");
      img.setAttribute("src", player.strRender);
      const imgText = document.createElement("p");
      imgText.innerHTML = `<span class="player-name">${player.strPlayer}</span> ~ ${player.strPosition} i ${player.strTeam}`;
      container.append(img, imgText);
    }
  }
  setTimeout(() => modalEl.classList.remove("modal-hidden"), 2000);
}
