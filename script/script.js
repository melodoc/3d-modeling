window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    //Timer
    const countTimer = deadline => {
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        const getTimeRemaining = () => {
            const dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                hours = Math.floor(timeRemaining / 60 / 60), //если поставить % 24 -- у hours отвалятся часы
                minutes = Math.floor((timeRemaining / 60) % 60),
                seconds = Math.floor(timeRemaining % 60);
            return { timeRemaining, hours, minutes, seconds };
        };

        const modifyZeroDate = inputDate => {
            if (inputDate >= 0 && inputDate < 10) {
                return '0' + inputDate;
            }
            return inputDate;
        };


        const updateClock = () => {

            const timer = getTimeRemaining();

            timerHours.textContent = modifyZeroDate(timer.hours);
            timerMinutes.textContent = modifyZeroDate(timer.minutes);
            timerSeconds.textContent = modifyZeroDate(timer.seconds);

            if (timer.timeRemaining > 0) {
                setTimeout(updateClock, 1000);
            } else {
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }
        };

        updateClock();
    };

    countTimer('12 july 2020');

    //Menu

    const toggleMenu = () => {

        const menu = document.querySelector('menu');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        document.body.addEventListener('click', () => {
            const target = event.target;

            const closestBtnMenu = target.closest('.menu'),
                closestMenu = target.closest('menu'),
                closestCloseBtn = target.closest('.close-btn'),
                closestMenuItems = target.closest('.active-menu ul>li');

            if (closestBtnMenu || closestMenu || closestCloseBtn || closestMenuItems) {
                handlerMenu();
            }
        });
    };

    toggleMenu();

    // popUp

    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupContent = document.querySelector('.popup-content');

        let popupContentInterval,
            count = 150;

        const animationSpeed = 10;

        const popupContentAnimate = () => {
            popupContentInterval = requestAnimationFrame(popupContentAnimate);
            count -= animationSpeed;

            if (count === 0) {
                cancelAnimationFrame(popupContentInterval);
            }
            popupContent.style.marginTop = count + 'px';
        };


        popupBtn.forEach(elem => {
            elem.addEventListener('click', () => {
                const width = document.documentElement.clientWidth;
                popup.style.display = 'block';

                if (width >= 768) {
                    popupContentAnimate();
                }
            });
        });


        popup.addEventListener('click', event => {
            let target = event.target;

            if (target.classList.contains('popup-close')) {
                popup.style.display = 'none';
                count = 150;
            } else {
                target = target.closest('.popup-content');
                if (!target) {
                    popup.style.display = 'none';
                }
            }
        });
    };

    togglePopUp();

    //Tabs

    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = index => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', event => {
            let target = event.target;
            target = target.closest('.service-header-tab');

            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });
    };

    tabs();

    //Slider

    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            btn = document.querySelectorAll('.portfolio-btn'),
            dots = document.querySelector('.portfolio-dots'),
            slider = document.querySelector('.portfolio-content');

        let currentSlide = 0,
            dot,
            interval;

        const insertDot = () => {
            dot = document.createElement('li');
            dot.classList.add('dot');
            for (let i = 0; i < slide.length; i++) {
                dot = dot.cloneNode();
                dots.append(dot);
            }

            dot = document.querySelectorAll('.dot');
            dot[0].classList.add('dot-active');
        };

        insertDot();

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', event => {
            event.preventDefault();

            const target = event.target;

            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');


            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }

            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }

            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');

        });

        slider.addEventListener('mouseover', event => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                stopSlide();
            }
        });


        slider.addEventListener('mouseout', event => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                startSlide();
            }
        });

        startSlide(1500);
    };

    slider();
});
