document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. DATA DEL PROGRAMA (Renderizado Dinámico) ---
    // Esto mantiene el HTML ultra limpio y permite agregar unidades fácil.
    const unidades = [
        { titulo: "Unidad 1: Naturaleza de la química y sistemas", desc: "Objeto de estudio y método. Medición. Sistema internacional. Error, exactitud y precisión. Estados de agregación. Cambios de estado. Densidad, sustancias, mezclas y composición centesimal." },
        { titulo: "Unidad 2: Estructura atómica", desc: "Teoría atómica, número atómico, masa, isótopos estables y radiactivos. Descomposición radiactiva. Tabla periódica, moléculas, iones y fórmulas químicas." },
        { titulo: "Unidad 3: Relaciones de masa", desc: "Masa atómica, masa molecular, Número de Avogadro, masa molar. Composición porcentual y fórmula empírica." },
        { titulo: "Unidad 4: Gases", desc: "Leyes de los gases ideales y reales. Ecuación general. Ley de Dalton. Teoría cinética molecular y estequiometría de gases." },
        { titulo: "Unidad 5: Configuración electrónica", desc: "Teoría cuántica, Modelo de Bohr, números cuánticos, orbitales. Variaciones periódicas: radio atómico, iónico, energía de ionización y afinidad electrónica." },
        { titulo: "Unidad 6: Enlace químico", desc: "Puntos de Lewis, enlace iónico y covalente. Electronegatividad, resonancia, geometría molecular (TRePEV), polaridad molecular e interacciones intermoleculares." },
        { titulo: "Unidad 7: Compuestos químicos", desc: "Estados de oxidación. Nomenclatura inorgánica. Compuestos orgánicos (hidrocarburos, oxigenados, nitrogenados). Isomería y nociones biológicas." },
        { titulo: "Unidad 8: Soluciones", desc: "Concentración: fracción molar, % m/m, % V/V, molaridad, molalidad, ppm, eq/L. Propiedades coligativas, electrolitos, dilución y mezclas." },
        { titulo: "Unidad 9: Estequiometría", desc: "Reacciones, balanceo (incluido ion electrón). Reactivo limitante, pureza y rendimiento de reacción." },
        { titulo: "Unidad 10: Cinética y Equilibrio", desc: "Rapidez de reacción, energía de activación, catálisis. Constante de equilibrio, Principio de Le Châtelier." },
        { titulo: "Unidad 11: Ácidos y bases", desc: "Arrhenius, Brönsted-Lowry. pH, ácidos/bases fuertes y débiles. Soluciones amortiguadoras (buffer) e indicadores." },
        { titulo: "Unidad 12: Carbono y biomoléculas", desc: "Hidrocarburos, grupos funcionales. Quiralidad. Hidratos de carbono, lípidos, ácidos nucleicos, aminoácidos y polímeros." }
    ];

    const accordionContainer = document.querySelector('.accordion');

    // Inyectar HTML del Acordeón
    unidades.forEach((unidad, index) => {
        const item = document.createElement('div');
        item.classList.add('accordion-item');
        item.innerHTML = `
            <div class="accordion-header">
                <span>${unidad.titulo}</span>
                <i class="fa-solid fa-chevron-down"></i>
            </div>
            <div class="accordion-content">
                <p>${unidad.desc}</p>
            </div>
        `;
        accordionContainer.appendChild(item);
    });

    // --- 2. LÓGICA DEL ACORDEÓN ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const currentItem = this.parentElement;
            const content = currentItem.querySelector('.accordion-content');
            
            // Cerrar otros (opcional, si quieres que solo haya uno abierto a la vez)
            document.querySelectorAll('.accordion-item').forEach(item => {
                if (item !== currentItem) {
                    item.classList.remove('active');
                    item.querySelector('.accordion-content').style.maxHeight = null;
                }
            });

            // Toggle actual
            if (currentItem.classList.contains('active')) {
                currentItem.classList.remove('active');
                content.style.maxHeight = null;
            } else {
                currentItem.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 40 + "px"; // +40 por el padding
            }
        });
    });

    // --- 3. SCROLL SPY PARA LA NAVEGACIÓN ---
    const sections = document.querySelectorAll('.section-block');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) { // 150px de margen superior
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });
});



// --- 4. CONTROL DE MODO OSCURO / CLARO (Persistente) ---
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

// Comprobar si el usuario ya tenía una preferencia guardada antes
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
    themeIcon.classList.replace('fa-moon', 'fa-sun'); // Cambia el ícono a Sol
} else {
    document.body.removeAttribute('data-theme'); // Por defecto usa Claro
}

// Escuchador de click para el botón de cambio
themeToggleBtn.addEventListener('click', () => {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    
    if (isDark) {
        // Pasar a Modo Claro
        document.body.removeAttribute('data-theme');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    } else {
        // Pasar a Modo Oscuro
        document.body.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    }
});