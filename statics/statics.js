fetch('contents/data.json')
.then(response => {
  if(!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
})
.then(data => {
  
  const projectsContainer = document.getElementsByClassName('my-projects')[0];
  let projectsHtml = '';
  /* 
  PROJECT
  */

  // Fetch Data
  data.projects.forEach(project => {
    const technologiesHtml = project.technologies
      .map(tag => `<span class="tag">${tag}</span>`)
      .join('');

    projectsHtml += 
    `
      <div class="grid-container">
        <h3>${project.title}</h3>

        <div class="description">
          <h4>${project.backend.title}</h4>
          <p>${project.backend.duration}</p>
        </div>

        <div class="label">Technologies:</div>
        <div class="tags">${technologiesHtml}</div>

        <div class="label">Description:</div>
        <div class="value description-value">${project.description}</div>

        <div class="label">Github:</div>
        <div class="value github-value"><a href="${project.github}">${project.title}</a></div>
      </div>
    `
  })
  projectsContainer.innerHTML = projectsHtml;


  /* 
      EDU
  */
  const edusContainer = document.getElementsByClassName('educations')[0];
  let edusHtml = '';

  // Fetch Data
  data.education.forEach(item => {
    edusHtml += 
    `
    <div class="education-item">
      <h3>${item.title}</h3>
      <p class="institution">${item.institution} / ${item.year}</p>
      <p class="description">${item.description}</p>
    </div>
    `
  })
  edusContainer.innerHTML = edusHtml

  /* 
      SKILL
  */
  const skillsContainer = document.getElementsByClassName('cells')[0];
  let skillsHtml = '';
  // Fetch Data
  data.skills.forEach(item => {
    skillsHtml +=
    `
    <div class="cell">
      <img src="${item.image}" alt="${item.alt}">
      <span>${item.name}</span>
    </div>
    `
  })
  skillsContainer.innerHTML = skillsHtml

  /*
    FAQ
  */ 
  const dataContainer = document.getElementsByClassName('faq-list')[0];
  let faqsHtml = '';

  data.faqs.forEach(item => {
    faqsHtml += 
    `
    <div class="faq-item">
      <button class="faq-question">
        <i class="fas fa-chevron-down"></i> ${item.question}
      </button>
      <div class="faq-answer">
        <p>${item.answer}</p>
      </div>
    </div>
    `
  });
  dataContainer.innerHTML = faqsHtml

  // sự kiện đóng mở thẻ faq-item
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionButton = item.querySelector('.faq-question');
    const answerDiv = item.querySelector('.faq-answer');
    const icon = questionButton.querySelector('i');

    questionButton.addEventListener('click', () => {
      item.classList.toggle('active')
      answerDiv.classList.toggle('open')
      icon.classList.toggle('fa-chevron-down')
      icon.classList.toggle('fa-chevron-up')
    })
  })
})
.catch(error => {
  // Xử lý lỗi nếu có lỗi xảy ra trong quá trình fetch hoặc parse
  console.error('Có lỗi xảy ra:', error)
  const dataContainer = document.getElementsByClassName('faq-list')[0]
  dataContainer.innerHTML = '<p>Không thể tải dữ liệu.</p>'
});