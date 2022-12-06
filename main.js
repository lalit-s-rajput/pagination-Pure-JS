document.addEventListener("DOMContentLoaded", () => {
  let btnToBePlacedContainer = document.querySelector(".placed-btn-container");
  let noOfItems = 10;
  let lastClickedIndex = 0;
  // @ViewChildren('pageClickRef') pageClickDir: QueryList<ElementRef> | undefined;
  let pageClickRefArr = [];
  let dataLength = 230;
  //   @Input() set dataLength(data: any) {
  //       this._dataLength = data;
  //       this.setData();
  //   }
  // @Output() pageNumber = new EventEmitter<number>();
  let startPageIndex = 0;
  let noOfPages = 0;
  let itemsToBeShown = 0;
  let disableFurtherNext = false;
  let disableNextRow = false;
  let currentEndPageIndex = 0;

  function setData() {
    noOfPages = Math.ceil(dataLength / noOfItems);
    itemsToBeShown = noOfPages < 10 ? noOfPages : 10;
    currentEndPageIndex = noOfPages < 10 ? noOfPages - 1 : itemsToBeShown - 1;
    if (currentEndPageIndex >= noOfPages - 1) {
      currentEndPageIndex = noOfPages - 1;
      disableNextButton(true);// disableFurtherNext = true;
      disableNextRow = true;
    }
    if(!startPageIndex){
      disablePrevButton(true);
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
    console.log("next");
    currentEndPageIndex++;
    startPageIndex = currentEndPageIndex - (noOfItems - 1);
    if (currentEndPageIndex > noOfPages - 1) {
      // currentEndPageIndex = noOfPages - 1;
      disableNextButton(true);// disableFurtherNext = true;
      disableNextRow = true;
      createButtons(startPageIndex,currentEndPageIndex);
      return;
    }
    if(startPageIndex){
      disablePrevButton(false);
    }
    createButtons(startPageIndex,currentEndPageIndex);
  });

  let prevButton = document.querySelector(".prev-btn");
  prevButton.addEventListener("click", () => {
    console.log("back");
    startPageIndex--;
    disableNextButton(false);
    if(!startPageIndex){
      disablePrevButton(true);
    }
    // disablePrevButton(true);//disableFurtherNext = false;
    disableNextRow = false;
    currentEndPageIndex = startPageIndex + (noOfItems - 1);
    createButtons(startPageIndex,currentEndPageIndex);
    // noOfPages = new Array(Math.ceil(this._dataLength / this.noOfItems));
  });

  function disableNextButton (flag) {
    document.querySelector('.next-btn').disabled = flag;
  }

  function disablePrevButton (flag) {
    document.querySelector('.prev-btn').disabled = flag;
  }
});
