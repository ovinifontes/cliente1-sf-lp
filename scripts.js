document.addEventListener("DOMContentLoaded", () => {
  const ctas = document.querySelectorAll('a[href^="#"]');

  ctas.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href")?.slice(1);
      const target = targetId ? document.getElementById(targetId) : null;

      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
        target.addEventListener(
          "blur",
          () => target.removeAttribute("tabindex"),
          { once: true }
        );
      }
    });
  });

  // FAQ Accordion functionality
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
      const faqItem = this.closest('.faq-item');
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      
      // Close all other FAQ items
      document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) {
          item.classList.remove('active');
          const otherQuestion = item.querySelector('.faq-question');
          otherQuestion.setAttribute('aria-expanded', 'false');
        }
      });
      
      // Toggle current FAQ item
      if (isExpanded) {
        faqItem.classList.remove('active');
        this.setAttribute('aria-expanded', 'false');
      } else {
        faqItem.classList.add('active');
        this.setAttribute('aria-expanded', 'true');
      }
    });
  });
});
