const themeBtn = document.getElementById('theme');
const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");


const storageTheme = (value) => {
    localStorage.setItem('todoapp_theme', value);
}
  
const retrieveTheme = () => {
    const theme = localStorage.getItem('todoapp_theme') ;
    if (theme) { 
      document.documentElement.className = theme; 
    } else {
      if (darkThemeMq.matches) {
        document.documentElement.className = 'dark';
      } else {
        document.documentElement.className = 'light';
      }
    } 
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



// change theme when system preference change
// darkThemeMq.addEventListener('change', e => {
//   if (e.matches) {
//     document.documentElement.className = 'dark';
//   } else {
//     document.documentElement.className = 'light';
//   }
// });