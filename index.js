
const MenuButton = document.querySelector('.menu-button');

MenuButton.addEventListener('click', (ev)=>{
    document.body.classList.toggle('stop-scroll');
    document.querySelectorAll('.menu-button__bar').forEach( bar => {
        bar.classList.toggle('change');
    })
    document.querySelector('.navigation-primary').classList.toggle('show');
});


const PrimaryHeader = document.querySelector('.header-primary');

let lastScroll = 0;

window.addEventListener("scroll", () => {
	const currentScroll = window.pageYOffset;
	if (currentScroll <= 0) {
		PrimaryHeader.classList.remove("scroll-up");
		return;
	}

	if (currentScroll > lastScroll && !PrimaryHeader.classList.contains("scroll-down")) {
		PrimaryHeader.classList.remove("scroll-up");
		PrimaryHeader.classList.add("scroll-down");
	} else if (
		currentScroll < lastScroll &&
		PrimaryHeader.classList.contains("scroll-down")
	) {
		PrimaryHeader.classList.remove("scroll-down");
		PrimaryHeader.classList.add("scroll-up");
	}
	lastScroll = currentScroll;
    
});
