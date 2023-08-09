"use strict";
class Player {
    getPlayer() {
        const namePlayer = document.querySelector("#name-player").value;
        if (listLocal.length == 0) {
            const newPlayer = { id: 1, name: namePlayer, point: 0 };
            return newPlayer;
        }
        else {
            const maxId = Math.max(...listLocal.map((note) => note.id));
            const newPlayer = { id: maxId + 1, name: namePlayer, point: 0 };
            return newPlayer;
        }
    }
}
const newPlayer = new Player();
const listPLayers = localStorage.getItem("listPLayers");
const listLocal = listPLayers ? JSON.parse(listPLayers) : [];
const add = document.getElementById("add");
add.addEventListener("click", () => {
    let namePlayer = document.querySelector("#name-player");
    const newPerson = newPlayer.getPlayer();
    const isHollow = validate();
    if (isHollow === true) {
        alert("Vui lòng điền đầy đủ thông tin");
    }
    else {
        listLocal.push(newPerson);
        localStorage.setItem("listPLayers", JSON.stringify(listLocal));
        render(listLocal);
    }
    namePlayer.value = "";
});
//render
function render(data) {
    const mid = document.querySelector(".mid-container");
    let content = "";
    data.forEach((player) => {
        content += `
    <div class="mid">
    <div class="mid-left">
      <i class="bx bx-x" onclick ="deletePlayer(${player.id})"></i>
      <i class="bx bx-crown" id="${player.id}"></i>
      <p>${player.name}</p>
    </div>
    <div class="mid-right">
      <button id="minus" onclick="handleMinus(${player.id})">-</button>
      <input type="text" id="point" value="${player.point}" disabled />
      <button id="plus"  onclick="handlePlus(${player.id})">+</button>
    </div>
  </div>`;
    });
    mid.innerHTML = content;
    const maxPoint = Math.max(...listLocal.map((item) => item.point));
    const maxPointsArray = listLocal.filter((item) => item.point === maxPoint);
    for (let i = 0; i < maxPointsArray.length; i++) {
        const nameElement = document.getElementById(`${maxPointsArray[i].id}`);
        nameElement.style.color = "yellow";
    }
    // in số lượng người chơi
    const player = document.querySelector("#player");
    let length = listLocal.length;
    player.innerHTML = "PLayer:" + " " + length;
    //in point điểm
    const printPoint = document.querySelector("#point-top");
    let point = null;
    data.forEach((player) => {
        point += player.point;
    });
    printPoint.innerHTML = "Point: " + point;
    //render màu nhà vô địch
    localStorage.setItem("listPLayers", JSON.stringify(listLocal));
}
function handleMinus(id) {
    listLocal.forEach((player) => {
        if (player.id === id) {
            if (player.point > 0 && player.point <= 10) {
                player.point--;
            }
        }
    });
    render(listLocal);
}
function handlePlus(id) {
    listLocal.forEach((player) => {
        if (player.id === id) {
            if (player.point >= 0 && player.point < 10) {
                player.point++;
            }
        }
    });
    render(listLocal);
}
// function champion(data: User[]) {
//   let max = data[0].point;
//   let maxIndex = 0;
//   data.forEach((player: User, index: number) => {
//     if (player.point > max) {
//       max = player.point;
//       maxIndex = index;
//     }
//   });
//   const crownIcons = document.querySelectorAll(".bx-crown");
//   crownIcons.forEach((crown: any, index) => {
//     if (maxIndex == index) {
//       crown.style.backgroundColor = "yellow";
//     }
//   });
// }
function deletePlayer(id) {
    listLocal.forEach((player, index) => {
        if (player.id == id) {
            listLocal.splice(index, 1);
        }
        if (listLocal.length == 0) {
            nonePLayer();
        }
    });
    localStorage.setItem("listPLayers", JSON.stringify(listLocal));
    render(listLocal);
}
function validate() {
    const namePlayer = document.querySelector("#name-player").value;
    let isHollow = false;
    if (namePlayer == "") {
        isHollow = true;
    }
    return isHollow;
}
function nonePLayer() {
    if (listLocal.length == 0) {
        const nonePLayers = document.querySelector("#noPlayer");
        nonePLayers.innerHTML = "Hiện chưa có người chơi nào !";
    }
}
render(listLocal);
