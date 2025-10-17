document.addEventListener('DOMContentLoaded', () => {
    // --------------------------------------------------------------------
    // 1. Menu Hambúrguer (Mobile Navigation Toggle)
    // --------------------------------------------------------------------
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });

    // Fechar menu ao clicar em um link (apenas em mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                navLinks.forEach(link => link.style.animation = ''); // Reset animation
            }
        });
    });

    // --------------------------------------------------------------------
    // 2. Scroll Spy (Highlight Active Nav Link)
    // --------------------------------------------------------------------
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('.nav-links li a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Ajuste o valor 150px para a altura da sua navbar + um pouco de buffer
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });

    // --------------------------------------------------------------------
    // 3. Efeito de digitação no slogan (Opcional, mas legal para a home)
    // --------------------------------------------------------------------
    const sloganElement = document.querySelector('.hero-content h1');
    const originalSlogan = sloganElement ? sloganElement.textContent : '';
    const typingSpeed = 70; // milissegundos por caractere
    const delayBeforeStart = 1000; // atraso antes de começar a digitar

    if (sloganElement) {
        sloganElement.textContent = ''; // Limpa o texto original
        setTimeout(() => {
            let i = 0;
            function typeWriter() {
                if (i < originalSlogan.length) {
                    sloganElement.textContent += originalSlogan.charAt(i);
                    i++;
                    setTimeout(typeWriter, typingSpeed);
                }
            }
            typeWriter();
        }, delayBeforeStart);
    }

    // --------------------------------------------------------------------
    // 4. FAQ Acordeão (Exibir/Esconder respostas)
    // --------------------------------------------------------------------
    const faqItems = document.querySelectorAll('.faq-item h4');

    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const answer = item.nextElementSibling; // O próximo elemento é o <p> da resposta
            item.parentNode.classList.toggle('active'); // Adiciona uma classe para estilização ativa
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
            } else {
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // --------------------------------------------------------------------
    // 5. Slider de Depoimentos (Básico, sem botões de navegação ainda)
    // --------------------------------------------------------------------
    const testimonialsContainer = document.querySelector('.testimonials-slider');
    if (testimonialsContainer) {
        let testimonialIndex = 0;
        const testimonials = document.querySelectorAll('.testimonial-card');

        function showTestimonial(index) {
            testimonials.forEach((card, i) => {
                card.style.display = 'none'; // Esconde todos
            });
            testimonials[index].style.display = 'block'; // Mostra o atual
        }

        // Se houver mais de um depoimento, inicie o slider
        if (testimonials.length > 1) {
            showTestimonial(testimonialIndex);

            setInterval(() => {
                testimonialIndex++;
                if (testimonialIndex >= testimonials.length) {
                    testimonialIndex = 0;
                }
                showTestimonial(testimonialIndex);
            }, 5000); // Muda a cada 5 segundos
        }
    }

    // --------------------------------------------------------------------
    // 6. Efeito de Scroll Reveal (Opcional: Animar elementos ao entrar na viewport)
    //    Para um efeito mais robusto, considere uma biblioteca como ScrollReveal.js
    // --------------------------------------------------------------------
    const scrollElements = document.querySelectorAll('.service-card, .about-content, .testimonial-card, .case-study-card, .faq-item, .contact-form, .contact-info');

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('scrolled');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) { // Ajuste o '1.25' para a sensibilidade
                displayScrollElement(el);
            }
        });
    };

    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    // Chama uma vez ao carregar para elementos já visíveis
    handleScrollAnimation();

});


