// Configuración de la API - Detecta automáticamente el entorno
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:3000/api'  // Desarrollo
  : '/api';  // Producción (mismo dominio)

// Variables globales
let currentUser = null;
let authToken = null;
let products = [];
let currentEditingProduct = null;
let currentDeletingProduct = null;

// Elementos del DOM
const authSection = document.getElementById('authSection');
const appSection = document.getElementById('appSection');
const userInfo = document.getElementById('userInfo');
const userEmail = document.getElementById('userEmail');
const logoutBtn = document.getElementById('logoutBtn');

// Formularios
const loginForm = document.getElementById('loginFormElement');
const registerForm = document.getElementById('registerFormElement');
const productForm = document.getElementById('productForm');
const editProductForm = document.getElementById('editProductForm');

// Modales
const editModal = document.getElementById('editModal');
const deleteModal = document.getElementById('deleteModal');

// Listas y contenedores
const productsList = document.getElementById('productsList');
const loadingProducts = document.getElementById('loadingProducts');
const noProducts = document.getElementById('noProducts');

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
});

function initializeApp() {
    // Verificar si hay token guardado
    const savedToken = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('currentUser');
    
    if (savedToken && savedUser) {
        authToken = savedToken;
        currentUser = JSON.parse(savedUser);
        
        // Validar el token haciendo una petición de prueba
        validateTokenAndLoadApp();
    } else {
        showAuth();
    }
}

async function validateTokenAndLoadApp() {
    try {
        console.log('🔍 Cargando productos (sin autenticación)...');
        // Cargar productos sin autenticación
        const response = await fetch(`${API_BASE_URL}/products`);
        
        console.log('📡 Respuesta de productos:', response.status);
        
        if (response.ok) {
            console.log('✅ Productos cargados exitosamente');
            showApp();
            const data = await response.json();
            products = data;
            displayProducts(products);
        } else {
            console.log('⚠️ Error al cargar productos');
            showApp();
            showToast('Error al cargar productos', 'error');
            showNoProducts();
        }
    } catch (error) {
        console.error('🚨 Error loading products:', error);
        showApp();
        showToast('Error de conexión', 'error');
        showNoProducts();
    }
}

function clearSession() {
    authToken = null;
    currentUser = null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
}

function setupEventListeners() {
    // Tabs de autenticación
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tab = e.target.dataset.tab;
            switchAuthTab(tab);
        });
    });

    // Formularios de autenticación
    loginForm.addEventListener('submit', handleLogin);
    registerForm.addEventListener('submit', handleRegister);
    
    // Formulario de productos
    productForm.addEventListener('submit', handleCreateProduct);
    editProductForm.addEventListener('submit', handleUpdateProduct);
    
    // Botón de logout
    logoutBtn.addEventListener('click', handleLogout);
    
    // Modales
    setupModalEventListeners();
}

function setupModalEventListeners() {
    // Modal de edición
    document.getElementById('closeModal').addEventListener('click', closeEditModal);
    document.getElementById('cancelEdit').addEventListener('click', closeEditModal);
    
    // Modal de eliminación
    document.getElementById('closeDeleteModal').addEventListener('click', closeDeleteModal);
    document.getElementById('cancelDelete').addEventListener('click', closeDeleteModal);
    document.getElementById('confirmDelete').addEventListener('click', handleDeleteProduct);
    
    // Cerrar modales al hacer clic fuera
    editModal.addEventListener('click', (e) => {
        if (e.target === editModal) closeEditModal();
    });
    
    deleteModal.addEventListener('click', (e) => {
        if (e.target === deleteModal) closeDeleteModal();
    });
}

function switchAuthTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
    
    document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
    document.getElementById(`${tab}Form`).classList.add('active');
}

async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    console.log('🔐 Intentando login con:', email);
    
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        
        const data = await response.json();
        console.log('📡 Respuesta del login:', response.status, data);
        
        if (response.ok) {
            authToken = data.token;
            currentUser = { email };
            
            console.log('✅ Login exitoso, token recibido');
            
            // Guardar en localStorage
            localStorage.setItem('authToken', authToken);
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            
            showToast('¡Inicio de sesión exitoso!', 'success');
            showApp();
            loadProducts();
        } else {
            console.log('❌ Error en login:', data.error);
            showToast(data.error || 'Error al iniciar sesión', 'error');
        }
    } catch (error) {
        console.error('🚨 Error en login:', error);
        showToast('Error de conexión', 'error');
    }
}

async function handleRegister(e) {
    e.preventDefault();
    
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    
    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showToast('¡Registro exitoso! Ahora puedes iniciar sesión.', 'success');
            switchAuthTab('login');
            document.getElementById('loginEmail').value = email;
        } else {
            showToast(data.error || 'Error al registrarse', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Error de conexión', 'error');
    }
}

async function handleCreateProduct(e) {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', document.getElementById('productName').value);
    formData.append('price', document.getElementById('productPrice').value);
    formData.append('description', document.getElementById('productDescription').value);
    
    const imageFile = document.getElementById('productImage').files[0];
    if (imageFile) {
        formData.append('image', imageFile);
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/products`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
            body: formData,
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showToast('¡Producto creado exitosamente!', 'success');
            productForm.reset();
            loadProducts();
        } else {
            if (response.status === 401) {
                showToast('Sesión expirada. Por favor, inicia sesión nuevamente.', 'error');
                clearSession();
                showAuth();
                return;
            }
            showToast(data.error || 'Error al crear producto', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Error de conexión', 'error');
    }
}

async function handleUpdateProduct(e) {
    e.preventDefault();
    
    if (!currentEditingProduct) return;
    
    const formData = new FormData();
    formData.append('name', document.getElementById('editProductName').value);
    formData.append('price', document.getElementById('editProductPrice').value);
    formData.append('description', document.getElementById('editProductDescription').value);
    
    const imageFile = document.getElementById('editProductImage').files[0];
    if (imageFile) {
        formData.append('image', imageFile);
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/products/${currentEditingProduct.id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
            body: formData,
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showToast('¡Producto actualizado exitosamente!', 'success');
            closeEditModal();
            loadProducts();
        } else {
            if (response.status === 401) {
                showToast('Sesión expirada. Por favor, inicia sesión nuevamente.', 'error');
                clearSession();
                showAuth();
                return;
            }
            showToast(data.error || 'Error al actualizar producto', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Error de conexión', 'error');
    }
}

async function handleDeleteProduct() {
    if (!currentDeletingProduct) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/products/${currentDeletingProduct.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showToast('¡Producto eliminado exitosamente!', 'success');
            closeDeleteModal();
            loadProducts();
        } else {
            if (response.status === 401) {
                showToast('Sesión expirada. Por favor, inicia sesión nuevamente.', 'error');
                clearSession();
                showAuth();
                return;
            }
            showToast(data.error || 'Error al eliminar producto', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Error de conexión', 'error');
    }
}

async function loadProducts() {
    showLoading();
    
    try {
        // GET productos es público, no necesita autenticación
        const response = await fetch(`${API_BASE_URL}/products`);
        
        const data = await response.json();
        
        if (response.ok) {
            products = data;
            displayProducts(products);
        } else {
            showToast(data.error || 'Error al cargar productos', 'error');
            showNoProducts();
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Error de conexión', 'error');
        showNoProducts();
    }
}

function displayProducts(productsToShow) {
    hideLoading();
    
    if (productsToShow.length === 0) {
        showNoProducts();
        return;
    }
    
    hideNoProducts();
    
    productsList.innerHTML = productsToShow.map(product => `
        <div class="product-card">
            ${product.imageUrl ? 
                `<img src="${product.imageUrl}" alt="${product.name}" class="product-image">` : 
                `<div class="product-image" style="background: #f0f0f0; display: flex; align-items: center; justify-content: center; color: #999;">
                    <i class="fas fa-image" style="font-size: 3rem;"></i>
                </div>`
            }
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-price">$${parseFloat(product.price).toFixed(2)}</div>
                <p class="product-description">${product.description}</p>
                <div class="product-actions">
                    <button class="btn-edit" onclick="openEditModal('${product.id}')">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button class="btn-delete" onclick="openDeleteModal('${product.id}')">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function openEditModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    currentEditingProduct = product;
    
    // Llenar el formulario con los datos del producto
    document.getElementById('editProductId').value = product.id;
    document.getElementById('editProductName').value = product.name;
    document.getElementById('editProductPrice').value = product.price;
    document.getElementById('editProductDescription').value = product.description;
    document.getElementById('editProductImage').value = '';
    
    // Mostrar modal
    editModal.style.display = 'flex';
    setTimeout(() => editModal.classList.add('show'), 10);
}

function closeEditModal() {
    editModal.classList.remove('show');
    setTimeout(() => {
        editModal.style.display = 'none';
        currentEditingProduct = null;
        editProductForm.reset();
    }, 300);
}

function openDeleteModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    currentDeletingProduct = product;
    
    // Mostrar información del producto a eliminar
    document.getElementById('deleteProductName').textContent = product.name;
    
    // Mostrar modal
    deleteModal.style.display = 'flex';
    setTimeout(() => deleteModal.classList.add('show'), 10);
}

function closeDeleteModal() {
    deleteModal.classList.remove('show');
    setTimeout(() => {
        deleteModal.style.display = 'none';
        currentDeletingProduct = null;
    }, 300);
}

function handleLogout() {
    clearSession();
    showToast('Sesión cerrada exitosamente', 'success');
    showAuth();
}

function showApp() {
    authSection.style.display = 'none';
    appSection.style.display = 'block';
    userInfo.style.display = 'flex';
    userEmail.textContent = currentUser.email;
}

function showAuth() {
    authSection.style.display = 'block';
    appSection.style.display = 'none';
    userInfo.style.display = 'none';
    
    // Limpiar formularios
    loginForm.reset();
    registerForm.reset();
    productForm.reset();
}

function showLoading() {
    loadingProducts.style.display = 'block';
    productsList.style.display = 'none';
    noProducts.style.display = 'none';
}

function hideLoading() {
    loadingProducts.style.display = 'none';
    productsList.style.display = 'grid';
}

function showNoProducts() {
    hideLoading();
    productsList.style.display = 'none';
    noProducts.style.display = 'block';
}

function hideNoProducts() {
    noProducts.style.display = 'none';
}

function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toastContainer');
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icon = type === 'success' ? 'check-circle' : 
                 type === 'error' ? 'exclamation-circle' : 
                 'info-circle';
    
    toast.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
        <button class="toast-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    toastContainer.appendChild(toast);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (toast.parentElement) {
            toast.remove();
        }
    }, 5000);
}