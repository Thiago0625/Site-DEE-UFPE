/**
 * Script principal para o site do Departamento de Engenharia
 * Este ficheiro contém todas as funcionalidades JavaScript do site
 */

// Esperar que o DOM esteja completamente carregado antes de executar o código
document.addEventListener('DOMContentLoaded', function() {
    
        // ===== MENU RESPONSIVO =====
        // Funcionalidade para o menu móvel (hamburger)
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    if (menuToggle && nav) {
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
    });
    }

    // Fechar o menu quando um item é clicado (para dispositivos móveis)
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Verificar se estamos em viewport móvel
            if (window.innerWidth <= 768 && nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
        });
    });
    
    // ===== ROLAGEM SUAVE =====
    // Implementar rolagem suave para links de âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Obter o alvo da âncora
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calcular a posição de rolagem considerando o cabeçalho fixo
                const headerOffset = 80; // Altura do cabeçalho
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                // Rolar suavemente até a posição
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

     // Suporte para submenu em dispositivos touch
    const submenus = document.querySelectorAll('.has-submenu');
    
    submenus.forEach(item => {
        item.addEventListener('click', function(e) {
            // Verifica se o clique foi no link principal e não em um item do submenu
            if (e.target.parentNode === item || e.target === item.querySelector('i')) {
                e.preventDefault();
                
                // Fecha todos os outros submenus
                submenus.forEach(other => {
                    if (other !== item && other.classList.contains('active')) {
                        other.classList.remove('active');
                        other.querySelector('.submenu').style.display = 'none';
                    }
                });
                
                // Alterna o estado do submenu atual
                item.classList.toggle('active');
                const submenu = item.querySelector('.submenu');
                submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
            }
        });
    });
    
    // Fecha submenus ao clicar fora
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.has-submenu')) {
            submenus.forEach(item => {
                item.classList.remove('active');
                const submenu = item.querySelector('.submenu');
                if (submenu) submenu.style.display = 'none';
            });
        }
    });

    // ===== GALERIA DE IMAGENS =====
    // Funcionalidade para a galeria de imagens com modal
    const galeriaItems = document.querySelectorAll('.galeria-item');
    const modal = document.querySelector('.galeria-modal');
    const modalImg = document.getElementById('img-modal');
    const modalCaption = document.querySelector('.modal-caption');
    const closeModal = document.querySelector('.close-modal');
    
    // Adicionar evento de clique a cada item da galeria
    if (galeriaItems.length > 0 && modal) {
        galeriaItems.forEach(item => {
            item.addEventListener('click', function() {
                const img = item.querySelector('img');
                if (img) {
                    modalImg.src = img.src; // Mostra a imagem clicada no modal
                    modalImg.alt = img.alt; // Acessibilidade
                    modalCaption.textContent = img.alt; // Mostra a descrição
                    modal.style.display = 'flex';
                }
            });
        });
        
        // Fechar o modal quando o botão de fechar é clicado
        if (closeModal) {
            closeModal.addEventListener('click', function() {
                modal.style.display = 'none';
            });
        }
        
        // Fechar o modal quando se clica fora da imagem
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
    
    // Função para abrir o modal da galeria
    function openModal(imgElement) {
        var modal = document.querySelector('.galeria-modal');
        var modalImg = document.getElementById('img-modal');
        var captionText = document.querySelector('.modal-caption');
        modal.style.display = "block";
        modalImg.src = imgElement.src;
        captionText.innerHTML = imgElement.alt;
    }

    // Fechar o modal ao clicar no X
    document.addEventListener('DOMContentLoaded', function() {
        var modal = document.querySelector('.galeria-modal');
        var closeBtn = document.querySelector('.close-modal');
        closeBtn.onclick = function() {
            modal.style.display = "none";
        };
        // Fechar ao clicar fora da imagem
        modal.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        };
    });

    // ===== EFEITOS DE SCROLL =====
    // Adicionar efeitos de animação ao rolar a página
    function checkScroll() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            // Se a secção estiver visível na viewport
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('visible');
            }
        });
    }
    
    // Verificar posição inicial ao carregar a página
    checkScroll();
    
    // Verificar posição ao rolar a página
    window.addEventListener('scroll', checkScroll);
    
    // ===== INICIALIZAÇÃO DE VÍDEOS =====
    // Função para inicializar vídeos
    function initVideos() {
        const videoItems = document.querySelectorAll('.video-item');
        
        videoItems.forEach(item => {
            // Em uma implementação real, aqui inicializaríamos os vídeos
            // Por exemplo, adicionando eventos de clique para reproduzir vídeos do YouTube
            // O valor de 'item' é usado aqui para adicionar eventos, então não há erro.
            console.log('Vídeo inicializado');
        });
    }
    
    // Inicializar vídeos
    initVideos();
    
    // ===== DETECÇÃO DE DISPOSITIVO =====
    // Detectar tipo de dispositivo para otimizações específicas
    function detectDevice() {
        const isMobile = window.innerWidth <= 768;
        const isTablet = window.innerWidth > 768 && window.innerWidth <= 992;
        const isDesktop = window.innerWidth > 992;
        
        // Adicionar classes ao body para estilização específica por dispositivo
        document.body.classList.toggle('is-mobile', isMobile);
        document.body.classList.toggle('is-tablet', isTablet);
        document.body.classList.toggle('is-desktop', isDesktop);
        
        // Ajustes específicos para dispositivos móveis
        if (isMobile) {
            console.log('Dispositivo móvel detectado');
            // Implementar ajustes específicos para móveis
        }
    }
    
    // Detectar dispositivo ao carregar
    detectDevice();
    
    // Atualizar ao redimensionar a janela
    window.addEventListener('resize', detectDevice);
    
    console.log('Script inicializado com sucesso!');
});


