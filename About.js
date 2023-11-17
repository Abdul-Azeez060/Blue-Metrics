// let sections = document.querySelectorAll(".about-content-section");
// sections.forEach((ele) => {
//    ele.classList.add("hidden");
//    console.dir(ele.classList);
// });


// // console.dir(section.classList);

// document.addEventListener("scroll",function(event){
//     sections.forEach((ele) => {
//         ele.classList.remove("hidden");
//      });
// })
document.addEventListener("DOMContentLoaded", function () {
    // Function to check if an element is in the viewport
    function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }
  
    // Function to add the 'reveal' class to elements in the viewport
    function revealOnScroll() {
      const sections = document.querySelectorAll(".about-content-section");
  
      sections.forEach((section) => {
        if (isInViewport(section)) {
          section.classList.add("reveal");
        }
      });
    }
  
    // Initial check in case some elements are already in the viewport
    revealOnScroll();
  
    // Event listener for scroll events
    window.addEventListener("scroll", revealOnScroll);
  });
  