function likeArticle() {
    var likeButton = document.querySelector("button");
    var likeCount = likeButton.querySelector("p");
    var currentCount = parseInt(likeCount.innerHTML);
    likeCount.innerHTML = currentCount + 1;
}

function deleteArticle(button) {
  let confirmation = confirm("Are you sure?");
  if(confirmation){
    button.parentNode.parentNode.parentNode.remove();
  }
  return;
  }

  function setLanguage() {
    const languageSelect = document.querySelector('select[name="choices"]');
    const selectedLanguage = languageSelect.value;
    localStorage.setItem('language', selectedLanguage);
  
    const bodyElement = document.querySelector('body');
    if (selectedLanguage === 'Arabic') {
      bodyElement.classList.add('rtl');
    } else {
      bodyElement.classList.remove('rtl');
    }
  }
  
window.addEventListener('DOMContentLoaded', () => {
    const languageSelect = document.querySelector('select[name="choices"]');
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      languageSelect.value = savedLanguage;
    } else {
      localStorage.setItem('language', 'English');
    }
    languageSelect.addEventListener('change', setLanguage);
  
    const bodyElement = document.querySelector('body');
    if (savedLanguage === 'Arabic') {
      bodyElement.classList.add('rtl');
    } else {
      bodyElement.classList.remove('rtl');
    }
});

function validate() {
  let content = document.newForm.content.value;
  if(content.length < 10) {
    alert("Content should be at least 10 to submit")
    return false;
  }
  return true
}

function initForm() {
  var editor1 = new FroalaEditor('#froalaEditor1');
  var editor2 = new FroalaEditor('#froalaEditor2');
}
window.onload = initForm;