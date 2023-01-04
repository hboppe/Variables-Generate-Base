const inputsColor = [...document.querySelectorAll("input[type=color]")];

const colors = [
  "#5f3dc4",
  "#7048e8",
  "#7950f2",
  "#845ef7",
  "#212529",
  "#495057",
  "#ced4da",
  "#f1f3f5",
  "#c92a2a",
  "#087f5b",
  "#f08c00",
  "#c6c7cd",
];

function renderColors(data) {
  data.forEach((style, index) => {
    inputsColor[index].value = style;
  });

  return data;
}


function checkLocalStorage(){

  const colorsLocalStorage = localStorage.getItem('stylesColors');
  const fontsLocalStorage = localStorage.getItem('stylesFontSizes');
  const inputFonts = document.getElementById('fontScale');

  if(colorsLocalStorage || fontsLocalStorage){
    const colorsArray = JSON.parse(colorsLocalStorage);

    renderColors(colorsArray);

    if(fontsLocalStorage !== '0'){
      inputFonts.value = JSON.parse(fontsLocalStorage.replaceAll(',', ', '));
    }
  }

  return colorsLocalStorage;
}



function getColorsVariables(){
  
  const allColors = [...document.querySelectorAll("input[type=color]")];

  let colorsString = '';
  
  allColors.map(color => {
    colorsString += `--color-${color.id}: ${color.value};`
  })

  return colorsString;
}

function getFontSizes(){
  const fontsSizes = document.getElementById('fontScale').value;

  const fontsArray = fontsSizes.split(',').map(number => +number.trim());

  const fontsInREM = fontsArray.map(number => number/16);

  let fontVariablesList = '';

  fontsInREM.forEach((font, index) => {
    fontVariablesList += `--font-size${++index}: ${font}rem;`;

  })

  return fontVariablesList;
}

function copyVariables(){
  const copyButton = document.getElementsByClassName('button-copy-colors')[0];

  copyButton.addEventListener('click', (e) => {
    e.preventDefault();

    const variables = `${getColorsVariables()}${getFontSizes()}`;

    navigator.clipboard.writeText(variables);

    e.target.innerText = 'Copied';
    setTimeout(() => {
      e.target.innerText = 'Copy Styles';
    }, 3000)
  })
}

function saveInfosInLocalStorage(){
  const saveButton = document.getElementsByClassName('button-save-colors')[0];

  saveButton.addEventListener('click', (e) => {
    e.preventDefault();

    const inputsColor = [...document.querySelectorAll("input[type=color]")];

    const stylesColors = inputsColor.map((color) => color.value);
    

    const inputsFontsSize = document.getElementById('fontScale').value;

    const fontsSize = inputsFontsSize.split(',').map(number => +number.trim()).toString();

    localStorage.setItem('stylesColors', JSON.stringify(stylesColors));
    localStorage.setItem('stylesFontSizes', JSON.stringify(fontsSize));
    e.target.innerText = 'Saved';

    setTimeout(() => {
      e.target.innerText = 'Save Styles';
    }, 3000)

  })
}

renderColors(colors)

checkLocalStorage()

copyVariables()

saveInfosInLocalStorage()