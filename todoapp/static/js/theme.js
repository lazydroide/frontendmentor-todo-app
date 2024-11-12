const themeBtn = document.getElementById('theme');


const storageTheme = (value) => {
    localStorage.setItem('todoapp_theme', value);
}
  
const retrieveTheme = () => {
    const theme = localStorage.getItem('todoapp_theme');
    document.documentElement.className = theme;
}


themeBtn.addEventListener('click', () => {
    if (document.documentElement.className === 'dark') {
      document.documentElement.className = 'light';
      storageTheme('light');  
    } else {
      document.documentElement.className = 'dark';
      storageTheme('dark'); 
    }  
  
    // [ ] dark or nothing?
});

document.onload = retrieveTheme();