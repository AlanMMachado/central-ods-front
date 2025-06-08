document.addEventListener("DOMContentLoaded", () => {
  // Adicionar sidebar a todas as páginas
  const body = document.body

  // Criar container para a aplicação
  const appContainer = document.createElement("div")
  appContainer.className = "app-container"

  // Mover todo o conteúdo atual para dentro do container
  const originalContent = document.body.innerHTML
  body.innerHTML = ""
  body.appendChild(appContainer)

  // Criar sidebar
  const sidebar = document.createElement("div")
  sidebar.className = "sidebar"
  sidebar.innerHTML = `
    <div class="sidebar-header">
      <h2>EventODS</h2>
    </div>
    <ul class="sidebar-nav">
      <li><a href="homepage.html">Início</a></li>
      <li><a href="dashboardOds.html">ODS</a></li>
      <li><a href="cadastrarEvento.html">Criar Evento</a></li>
      <li><a href="perfilUsuario.html">Meu Perfil</a></li>
      <li><a href="integrantes.html">Integrantes</a></li>
    </ul>
    <div class="sidebar-footer">
      <button id="logout-btn" class="btn">Sair</button>
    </div>
  `

  // Criar botão toggle para mobile
  const toggleBtn = document.createElement("button")
  toggleBtn.className = "sidebar-toggle"
  toggleBtn.innerHTML = "☰"
  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active")
    mainContent.classList.toggle("sidebar-active")
  })

  // Criar container para o conteúdo principal
  const mainContent = document.createElement("div")
  mainContent.className = "main-content"
  mainContent.innerHTML = originalContent

  // Adicionar elementos ao DOM
  appContainer.appendChild(sidebar)
  appContainer.appendChild(mainContent)
  body.appendChild(toggleBtn)

  // Destacar o item de menu ativo com base na URL atual
  const currentPage = window.location.pathname.split("/").pop()
  const navLinks = document.querySelectorAll(".sidebar-nav a")

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href")
    if (linkPage === currentPage) {
      link.classList.add("active")
    }
  })

  // Adicionar funcionalidade de logout
  document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.removeItem("usuarioLogado")
    window.location.href = "telaInicial.html"
  })

  // Verificar se o usuário está logado (exceto na tela inicial e de login/cadastro)
  if (!["telaInicial.html", "loginUsuario.html", "cadastrarUsuario.html"].includes(currentPage)) {
    const usuario = localStorage.getItem("usuarioLogado")
    if (!usuario) {
      alert("Você precisa estar logado para acessar esta página.")
      window.location.href = "loginUsuario.html"
    }
  }
})
