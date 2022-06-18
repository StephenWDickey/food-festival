// we must import bootstrap module
require("bootstrap");


// we must import img files
// we will adjust carousel array
const img1 = require("../../assets/img/food-table.jpg");
const img2 = require("../../assets/img/grill.jpg");
 
  // First image is hard coded in index.html
  // we need to keep carousel logic in this file
  // since it appears as hero on homepage
  const carouselSlides = [
    {
      title: "We travel all over the US",
      subtitle: "Check out our schedule!",
      // using variable for image
      img: img1,
      btnText: "View Schedule",
      btnUrl: "schedule.html"
    },
    {
      title: "Our food is seriously the bomb!",
      subtitle: "What are you waiting for?",
      // using variable for image
      img: img2,
      btnText: "Purchase Tickets",
      btnUrl: "tickets.html"
    },
  ]

  carouselSlides.forEach((slide, i) => {
    $('.carousel-inner').append(`
  <div class="carousel-item fullscreen-carousel" style="background-image: url('${slide.img}')">
    <div class="d-flex h-100 align-items-center justify-content-center carousel-caption">
        <div class="container">
          <div class="row align-items-center justify-content-center">
              <h2 class="display-4 mb-2">${slide.title}</h2>
          </div>
          <div class="row align-items-center justify-content-center"> 
            <h3>${slide.subtitle}</h3>
          </div>
          <div class=" mt-4 row align-items-center justify-content-center"> 
            <a class="btn btn-primary" href="${slide.btnUrl}">
                ${slide.btnText}
            </a>
          </div>
        </div>
    </div>
  </div>`)
  })
