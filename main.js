document.addEventListener("DOMContentLoaded", () => {
  let btnToBePlacedContainer = document.querySelector(".placed-btn-container");
  let noOfItems = 10;
  let dataLength = 230;
  let startPageIndex = 0;
  let noOfPages = 0;
  let itemsToBeShown = 0;
  let currentEndPageIndex = 0;

  function setData() {
    noOfPages = Math.ceil(dataLength / noOfItems);
    itemsToBeShown = noOfPages < 10 ? noOfPages : 10;
    currentEndPageIndex = noOfPages < 10 ? noOfPages - 1 : itemsToBeShown - 1;
    if (currentEndPageIndex >= noOfPages - 1) {
      currentEndPageIndex = noOfPages - 1;
      disableNextButton(true);
      disableNextRow = true;
    }
    if(!startPageIndex){
      disablePrevButton(true);
      disablePrevRowButton(true);
    }
    createButtons(startPageIndex,currentEndPageIndex);
  }
  function createButtons(startIndex,endIndex){
    btnToBePlacedContainer.innerHTML = '';
    for (let i = startIndex; i <= endIndex; i++) {
        let btnElement = document.createElement("button");
        btnElement.classList.add("pag-btn");
        let textElement = document.createElement("p");
        textElement.innerHTML = `${i}`;
        btnElement.append(textElement);
        btnToBePlacedContainer.append(btnElement);
      }
  }
  setData();
  let nextButton = document.querySelector(".next-btn");
  nextButton.addEventListener("click", () => {
    currentEndPageIndex++;
    startPageIndex = currentEndPageIndex - (noOfItems - 1);
    if (currentEndPageIndex > noOfPages - 1) {
      disableNextButton(true);
      disableNextRowButton(true);
      disableNextRow = true;
      createButtons(startPageIndex,currentEndPageIndex);
      return;
    }
    if(startPageIndex){
      disablePrevButton(false);
      disablePrevRowButton(false);
    }
    createButtons(startPageIndex,currentEndPageIndex);
  });

  let prevButton = document.querySelector(".prev-btn");
  prevButton.addEventListener("click", () => {
    startPageIndex--;
    disableNextButton(false);
    disableNextRowButton(false);
    if(!startPageIndex){
      disablePrevButton(true);
      disablePrevRowButton(true);
    }
    disableNextRow = false;
    currentEndPageIndex = startPageIndex + (noOfItems - 1);
    createButtons(startPageIndex,currentEndPageIndex);
  });

  let nextRow = document.querySelector('.next-row-btn');
  nextRow.addEventListener('click',()=>{
    console.log('next row');
    startPageIndex = currentEndPageIndex + 1;
    currentEndPageIndex = currentEndPageIndex + noOfItems;
    if (currentEndPageIndex > noOfPages - 1) {
      currentEndPageIndex = noOfPages;
      disableNextRowButton(true);
      disableNextButton(true);
      startPageIndex = currentEndPageIndex - (noOfItems - 1);
      createButtons(startPageIndex,currentEndPageIndex);
      return;
    }
    if(startPageIndex){
      disablePrevRowButton(false);
      disablePrevButton(false);
    }
    createButtons(startPageIndex,currentEndPageIndex);
  });

  let prevRow = document.querySelector('.prev-row-btn');
  prevRow.addEventListener('click',()=>{
    disableNextButton(false);
    disableNextRowButton(false);
    currentEndPageIndex = startPageIndex-1;
    startPageIndex = currentEndPageIndex - (noOfItems-1);
    if (startPageIndex <= 0) {
      startPageIndex = 0;
      currentEndPageIndex = startPageIndex + (noOfItems-1);
      disablePrevRowButton(true);
      disablePrevButton(true);
      createButtons(startPageIndex,currentEndPageIndex);
      return;
    }
    if(startPageIndex){
      disablePrevRowButton(false);
      disablePrevButton(false);
    }
    createButtons(startPageIndex,currentEndPageIndex);
  });

  function disableNextButton (flag) {
    document.querySelector('.next-btn').disabled = flag;
  }

  function disablePrevButton (flag) {
    document.querySelector('.prev-btn').disabled = flag;
  }

  function disableNextRowButton (flag) {
    document.querySelector('.next-row-btn').disabled = flag;
  }

  function disablePrevRowButton (flag) {
    document.querySelector('.prev-row-btn').disabled = flag;
  }
});
