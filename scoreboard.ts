interface User {
  id: number;
  name: string;
  point: number;
}

class Player {
  getPlayer() {
    const namePlayer = (
      document.querySelector("#name-player") as HTMLInputElement
    ).value;
    if (listLocal.length == 0) {
      const newPlayer: User = { id: 1, name: namePlayer, point: 0 };
      return newPlayer;
    } else {
      const maxId = Math.max(...listLocal.map((note: User) => note.id));
      const newPlayer: User = { id: maxId + 1, name: namePlayer, point: 0 };
      return newPlayer;
    }
  }
}
const newPlayer = new Player();

const listPLayers = localStorage.getItem("listPLayers");
const listLocal: User[] = listPLayers ? JSON.parse(listPLayers) : [];

const add = document.getElementById("add") as HTMLElement;
add.addEventListener("click", () => {
  let namePlayer = document.querySelector("#name-player") as HTMLInputElement;
  const newPerson = newPlayer.getPlayer();
  const isHollow = validate();
  if (isHollow === true) {
    alert("Vui lòng điền đầy đủ thông tin");
  } else {
    listLocal.push(newPerson);
    localStorage.setItem("listPLayers", JSON.stringify(listLocal));
    render(listLocal);
  }
  namePlayer.value = "";
});

//render
render(listLocal);
function render(data: User[]) {
  const mid = document.querySelector(".mid-container") as HTMLElement;
  let content = "";
  data.forEach((player: User) => {
    content += `
    <div class="mid">
    <div class="mid-left">
      <i class="bx bx-x" onclick ="deletePlayer(${player.id})"></i>
      <i class="bx bx-crown"></i>
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
  // in số lượng người chơi
  const player = document.querySelector("#player") as HTMLElement;
  let length = listLocal.length;
  player.innerHTML = "PLayer:" + " " + length;
  //in point điểm
  const printPoint = document.querySelector("#point-top") as HTMLElement;
  let point: null = null;
  data.forEach((player: any) => {
    point += player.point;
  });
  printPoint.innerHTML = "Point: " + point;
  //render màu nhà vô địch
  champion(listLocal);
  localStorage.setItem("listPLayers", JSON.stringify(listLocal));
}
function handleMinus(id: number) {
  listLocal.forEach((player: any) => {
    if (player.id === id) {
      if (player.point > 0 && player.point <= 10) {
        player.point--;
      }
    }
  });
  render(listLocal);
}
function handlePlus(id: number) {
  listLocal.forEach((player: any) => {
    if (player.id === id) {
      if (player.point >= 0 && player.point < 10) {
        player.point++;
      }
    }
  });
  render(listLocal);
}
function champion(data: User[]) {
  let max = data[0].point;
  let maxIndex = 0;
  data.forEach((player: User, index: number) => {
    if (player.point > max) {
      max = player.point;
      maxIndex = index;
    }
  });
  const crownIcons = document.querySelectorAll(".bx-crown");
  crownIcons.forEach((crown: any, index) => {
    if (maxIndex == index) {
      crown.style.backgroundColor = "yellow";
    }
  });
}

function deletePlayer(id: number) {
  listLocal.forEach((player: User, index: number) => {
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
  const namePlayer = (
    document.querySelector("#name-player") as HTMLInputElement
  ).value;
  let isHollow = false;
  if (namePlayer == "") {
    isHollow = true;
  }
  return isHollow;
}

function nonePLayer() {
  if (listLocal.length == 0) {
    const nonePLayers = document.querySelector("#noPlayer") as HTMLElement;
    nonePLayers.innerHTML = "Hiện chưa có người chơi nào !";
  }
}
