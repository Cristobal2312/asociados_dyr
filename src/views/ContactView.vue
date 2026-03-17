<template>
  <div class="contacto">
    <div class="contact-container">
      <!-- Header Premium -->
      <div class="contact-header">
        <div class="header-badge">Ponte en contacto</div>
        <h1>Vamos a conectar</h1>
        <p>Queremos escuchar tus ideas. Completa el formulario y nos comunicaremos contigo lo antes posible.</p>
      </div>

      <div class="contact-wrapper">
        <!-- Form Section -->
        <form @submit.prevent="submitForm" class="contact-form" novalidate>
          <!-- Nombre -->
          <div class="form-group">
            <label for="nombre">
              <span class="label-icon">👤</span> Nombre completo
            </label>
            <input
              id="nombre"
              v-model="form.nombre"
              type="text"
              placeholder="Tu nombre"
              required
              @blur="validateField('nombre')"
              class="input-premium"
            />
            <span v-if="errors.nombre" class="error">{{ errors.nombre }}</span>
          </div>

          <!-- Email -->
          <div class="form-group">
            <label for="email">
              <span class="label-icon">✉️</span> Correo electrónico
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              placeholder="tu@email.com"
              required
              @blur="validateField('email')"
              class="input-premium"
            />
            <span v-if="errors.email" class="error">{{ errors.email }}</span>
          </div>

          <!-- Teléfono -->
          <div class="form-group">
            <label for="telefono">
              <span class="label-icon">📱</span> Teléfono
            </label>
            <input
              id="telefono"
              v-model="form.telefono"
              type="tel"
              placeholder="+54 9 11 1234-5678"
              class="input-premium"
            />
          </div>

          <!-- Asunto -->
          <div class="form-group">
            <label for="asunto">
              <span class="label-icon">🎯</span> Asunto
            </label>
            <select
              id="asunto"
              v-model="form.asunto"
              required
              @blur="validateField('asunto')"
              class="input-premium select-dark"
            >
              <option value="">Selecciona un asunto</option>
              <option value="consulta">Consulta sobre productos</option>
              <option value="cotizacion">Solicitud de cotización</option>
              <option value="soporte">Soporte técnico</option>
              <option value="otro">Otro</option>
            </select>
            <span v-if="errors.asunto" class="error">{{ errors.asunto }}</span>
          </div>

          <!-- Mensaje -->
          <div class="form-group form-group-full">
            <label for="mensaje">
              <span class="label-icon">💬</span> Mensaje
            </label>
            <textarea
              id="mensaje"
              v-model="form.mensaje"
              placeholder="Cuéntanos tu consulta en detalle..."
              rows="6"
              required
              @blur="validateField('mensaje')"
              class="input-premium"
            ></textarea>
            <span v-if="errors.mensaje" class="error">{{ errors.mensaje }}</span>
          </div>

          <!-- Submit -->
          <button type="submit" class="btn-submit" :disabled="loading">
            <span v-if="!loading">
              <span class="btn-icon">→</span> Enviar mensaje
            </span>
            <span v-else>
              <span class="spinner"></span> Enviando...
            </span>
          </button>

          <!-- Error feedback -->
          <transition name="fade">
            <div v-if="submitError" class="error-message">
              <span class="error-mark">✕</span>
              <div>
                <strong>Error</strong>
                <p>{{ submitError }}</p>
              </div>
            </div>
          </transition>
        </form>

        <!-- Info Section -->
        <div class="contact-info-section">
          <h2>Información de contacto</h2>
          <div class="contact-info">
            <div class="info-item">
              <div class="info-icon">📍</div>
              <div>
                <h3>Dirección</h3>
                <p>Ubicación a definir</p>
              </div>
            </div>
            <div class="info-item">
              <div class="info-icon">📞</div>
              <div>
                <h3>Teléfono</h3>
                <p><a href="tel:+541234567890">+56 9 3891 1440</a></p>
              </div>
            </div>
            <div class="info-item">
              <div class="info-icon">✉️</div>
              <div>
                <h3>Email</h3>
                <p><a href="mailto:cristobalnahuel2002@gmail.com">cristobalnahuel2002@gmail.com</a></p>
              </div>
            </div>
            <div class="info-item highlight">
              <div class="info-icon">⏰</div>
              <div>
                <h3>Horario</h3>
                <p>Lun - Vie: 9:00 - 18:00</p>
              </div>
            </div>
          </div>

          <!-- Extra info card -->
          <div class="extra-info">
            <h3>¿Por qué elegirnos?</h3>
            <ul>
              <li>✓ Respuesta rápida (24hs)</li>
              <li>✓ Asesoramiento personalizado</li>
              <li>✓ Cotizaciones sin compromiso</li>
              <li>✓ Productos de calidad garantizada</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Overlay -->
    <transition name="overlay">
      <div v-if="success" class="success-overlay">
        <div class="success-container">
          <div class="success-animation">
            <div class="checkmark">
              <div class="checkmark-circle"></div>
              <div class="checkmark-check"></div>
            </div>
          </div>
          
          <h2 class="success-title">¡Mensaje Enviado!</h2>
          <p class="success-subtitle">Gracias {{ form.nombre }}, hemos recibido tu mensaje</p>
          
          <div class="success-details">
            <p>Te contactaremos lo antes posible a:</p>
            <p class="detail-highlight">{{ form.email }}</p>
          </div>

          <button @click="closeSuccess" class="btn-close">Volver al formulario</button>
        </div>

        <!-- Confetti -->
        <div v-for="i in 20" :key="i" :class="['confetti', `conf-${i}`]"></div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'ContactView',
  data() {
    return {
      form: {
        nombre: '',
        email: '',
        telefono: '',
        asunto: '',
        mensaje: ''
      },
      errors: {},
      loading: false,
      success: false,
      submitError: ''
    }
  },
  methods: {
    validateField(field) {
      if (field === 'nombre') {
        if (!this.form.nombre.trim()) {
          this.errors.nombre = 'El nombre es requerido'
        } else {
          delete this.errors.nombre
        }
      }
      
      if (field === 'email') {
        if (!this.form.email.trim()) {
          this.errors.email = 'El email es requerido'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email)) {
          this.errors.email = 'Email inválido'
        } else {
          delete this.errors.email
        }
      }
      
      if (field === 'asunto') {
        if (!this.form.asunto) {
          this.errors.asunto = 'Selecciona un asunto'
        } else {
          delete this.errors.asunto
        }
      }
      
      if (field === 'mensaje') {
        if (!this.form.mensaje.trim()) {
          this.errors.mensaje = 'El mensaje es requerido'
        } else {
          delete this.errors.mensaje
        }
      }
    },
    validateForm() {
      this.errors = {}
      const fields = ['nombre', 'email', 'asunto', 'mensaje']
      fields.forEach(f => this.validateField(f))
      console.log('Errores después de validar:', this.errors)
      return Object.keys(this.errors).length === 0
    },
    async submitForm() {
      console.log('1. submitForm iniciado')
      console.log('2. Validando formulario...')
      
      if (!this.validateForm()) {
        console.log('❌ Validación falló')
        return
      }

      console.log('✓ Formulario válido')
      console.log('3. Datos a enviar:', this.form)

      this.loading = true
      this.success = false
      this.submitError = ''

      try {
        console.log('4. Enviando fetch a http://localhost:3001/api/contact')
        
        const response = await fetch('https://formspree.io/f/xlgdzbbo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(this.form)
        })

        console.log('5. Response status:', response.status)
        
        const data = await response.json()
        console.log('6. Response data:', data)

        if (!response.ok) {
          throw new Error(data.message || 'Error al enviar el mensaje')
        }

        console.log('✓ Mensaje enviado exitosamente!')
        this.success = true
        document.body.style.overflow = 'hidden'
      } catch (error) {
        console.error('❌ Error capturado:', error)
        this.submitError = error.message || 'No pudimos enviar el mensaje. Intenta nuevamente.'
        setTimeout(() => { this.submitError = '' }, 5000)
      } finally {
        this.loading = false
      }
    },
    closeSuccess() {
      this.success = false
      document.body.style.overflow = 'auto'
      this.resetForm()
    },
    resetForm() {
      this.form = { nombre: '', email: '', telefono: '', asunto: '', mensaje: '' }
      this.errors = {}
    }
  }
}
</script>

<style scoped>
.contacto {
  padding: 32px 16px;
  background: linear-gradient(135deg, var(--bg) 0%, var(--surface) 50%, var(--bg) 100%);
  min-height: calc(100vh - var(--navbar-height));
  box-sizing: border-box;
}

.contact-container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Premium Header */
.contact-header {
  text-align: center;
  margin-bottom: 40px;
  animation: slideDown 0.6s ease-out;
}
.header-badge {
  display: inline-block;
  background: linear-gradient(90deg, var(--accent), #7c4dff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  margin-bottom: 8px;
}
.contact-header h1 {
  margin: 0 0 12px;
  color: var(--text);
  font-size: 36px;
  font-weight: 900;
  letter-spacing: -0.5px;
}
.contact-header p {
  margin: 0;
  color: var(--muted);
  font-size: 16px;
  max-width: 600px;
  margin: 0 auto;
}

/* Two-column layout */
.contact-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
  align-items: start;
}

/* Form */
.contact-form {
  background: linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.005) 100%);
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 16px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  backdrop-filter: blur(10px);
  box-shadow: 0 20px 50px rgba(2,6,12,0.8);
  animation: slideUp 0.6s ease-out;
}

/* Form group */
.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.form-group label {
  color: var(--muted);
  font-size: 13px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 6px;
}
.label-icon {
  font-size: 16px;
}

.input-premium {
  padding: 11px 14px;
  border-radius: 10px;
  border: 1px solid rgba(0,0,0,0.1);
  background: rgba(0,0,0,0.02);
  color: var(--text);
  font-size: 14px;
  font-family: inherit;
  transition: all 0.2s ease;
}
[data-theme="dark"] .input-premium {
  border-color: rgba(0,224,255,0.08);
  background: rgba(255,255,255,0.01);
  color: #ffffff;
}
.input-premium:hover {
  border-color: rgba(0,224,255,0.15);
  background: rgba(255,255,255,0.02);
}
.input-premium:focus {
  outline: none;
  border-color: rgba(0,224,255,0.3);
  background: rgba(255,255,255,0.03);
  box-shadow: 0 0 0 3px rgba(0,224,255,0.05);
}

.input-premium::placeholder {
  color: var(--muted);
}

textarea.input-premium {
  resize: vertical;
  min-height: 140px;
}

/* SELECT ASUNTO – compatible con tema claro y oscuro */
.select-dark {
  background: var(--surface) !important;
  color: var(--text);
  border: 1px solid rgba(0,0,0,0.1);
}

/* Opciones */
.select-dark option {
  background: var(--surface);
  color: var(--text);
}

/* Tema oscuro */
[data-theme="dark"] .select-dark {
  background: #1a1a1a !important;
  color: rgba(255,255,255,0.85);
  border-color: rgba(0,224,255,0.15);
}

[data-theme="dark"] .select-dark option {
  background: #1a1a1a;
  color: rgba(255,255,255,0.85);
}


.form-group-full {
  grid-column: 1 / -1;
}

/* Error */
.error {
  color: #ff6b6b;
  font-size: 12px;
  margin-top: 2px;
}

/* Submit button */
.btn-submit {
  padding: 12px 24px;
  background: linear-gradient(90deg, #00c6ff 0%, #7c4dff 100%);
  color: #041024;
  border: none;
  border-radius: 10px;
  font-weight: 800;
  font-size: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;
  box-shadow: 0 12px 30px rgba(124,77,255,0.2);
}
.btn-submit:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 18px 40px rgba(124,77,255,0.3);
}
.btn-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
.btn-icon {
  font-size: 18px;
}
.spinner {
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid rgba(4,16,36,0.3);
  border-top: 2px solid #041024;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

/* Error feedback */
.error-message {
  padding: 14px 16px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  gap: 12px;
  align-items: flex-start;
  background: rgba(255,107,107,0.08);
  color: #ff6b6b;
  border: 1px solid rgba(255,107,107,0.2);
}
.error-mark {
  font-size: 18px;
  flex-shrink: 0;
}
.error-message div strong {
  display: block;
  margin-bottom: 4px;
}
.error-message div p {
  margin: 0;
  opacity: 0.9;
}

/* Contact info section */
.contact-info-section {
  animation: slideUp 0.6s ease-out 0.1s both;
}
.contact-info-section h2 {
  margin: 0 0 18px;
  color: var(--text);
  font-size: 20px;
  font-weight: 800;
}
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}
.info-item {
  background: linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0.005));
  border: 1px solid rgba(0,224,255,0.08);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  gap: 12px;
  transition: all 0.2s ease;
}
.info-item:hover {
  border-color: rgba(0,224,255,0.2);
  background: rgba(255,255,255,0.03);
  transform: translateX(4px);
}
.info-item.highlight {
  border-color: rgba(0,224,255,0.15);
  background: linear-gradient(135deg, rgba(0,224,255,0.08), rgba(124,77,255,0.04));
}
.info-icon {
  font-size: 24px;
  flex-shrink: 0;
}
.info-item h3 {
  margin: 0 0 2px;
  color: var(--text);
  font-size: 14px;
  font-weight: 700;
}
.info-item p {
  margin: 0;
  color: var(--muted);
  font-size: 13px;
}
.info-item a {
  color: #00c6ff;
  text-decoration: none;
  transition: color 0.12s ease;
}
.info-item a:hover {
  color: #ffffff;
}

/* Extra info */
.extra-info {
  background: linear-gradient(135deg, rgba(0,224,255,0.05), rgba(124,77,255,0.05));
  border: 1px solid rgba(0,224,255,0.1);
  border-radius: 12px;
  padding: 16px;
}
.extra-info h3 {
  margin: 0 0 12px;
  color: var(--text);
  font-size: 14px;
  font-weight: 800;
}
.extra-info ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.extra-info li {
  color: var(--text);
  font-size: 13px;
}


/* SUCCESS OVERLAY */
.success-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(10,10,10,0.95) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(4px);
}

.success-container {
  text-align: center;
  animation: scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.success-animation {
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
}

.checkmark {
  width: 100px;
  height: 100px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkmark-circle {
  width: 100%;
  height: 100%;
  border: 4px solid #22c55e;
  border-radius: 50%;
  animation: checkmarkBorder 0.6s ease-out forwards;
}

.checkmark-check {
  position: absolute;
  width: 60px;
  height: 30px;
  border-left: 4px solid #22c55e;
  border-bottom: 4px solid #22c55e;
  transform: rotate(-45deg);
  animation: checkmarkCheck 0.6s ease-out 0.2s forwards;
  opacity: 0;
}

.success-title {
  margin: 0 0 8px;
  color: #ffffff;
  font-size: 40px;
  font-weight: 900;
  animation: slideUp 0.6s ease-out 0.3s both;
}

.success-subtitle {
  margin: 0 0 20px;
  color: rgba(255,255,255,0.8);
  font-size: 18px;
  animation: slideUp 0.6s ease-out 0.4s both;
}

.success-details {
  background: rgba(34,197,94,0.1);
  border: 1px solid rgba(34,197,94,0.2);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 24px;
  animation: slideUp 0.6s ease-out 0.5s both;
}

.success-details p {
  margin: 0;
  color: rgba(255,255,255,0.8);
  font-size: 14px;
}

.detail-highlight {
  color: #22c55e !important;
  font-weight: 700;
  margin-top: 8px;
  font-size: 16px;
}

.btn-close {
  padding: 12px 32px;
  background: linear-gradient(90deg, #00c6ff, #7c4dff);
  color: #041024;
  border: none;
  border-radius: 10px;
  font-weight: 800;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 12px 30px rgba(124,77,255,0.3);
  animation: slideUp 0.6s ease-out 0.6s both;
}
.btn-close:hover {
  transform: translateY(-3px);
  box-shadow: 0 18px 40px rgba(124,77,255,0.4);
}



.conf-1 { left: 10%; animation-delay: 0s; background: #00c6ff; }
.conf-2 { left: 15%; animation-delay: 0.1s; background: #7c4dff; }
.conf-3 { left: 20%; animation-delay: 0.2s; background: #22c55e; }
.conf-4 { left: 25%; animation-delay: 0.3s; background: #00c6ff; }
.conf-5 { left: 30%; animation-delay: 0.4s; background: #7c4dff; }
.conf-6 { left: 35%; animation-delay: 0.5s; background: #22c55e; }
.conf-7 { left: 40%; animation-delay: 0.6s; background: #00c6ff; }
.conf-8 { left: 45%; animation-delay: 0.7s; background: #7c4dff; }
.conf-9 { left: 50%; animation-delay: 0.8s; background: #22c55e; }
.conf-10 { left: 55%; animation-delay: 0.9s; background: #00c6ff; }
.conf-11 { left: 60%; animation-delay: 1s; background: #7c4dff; }
.conf-12 { left: 65%; animation-delay: 1.1s; background: #22c55e; }
.conf-13 { left: 70%; animation-delay: 1.2s; background: #00c6ff; }
.conf-14 { left: 75%; animation-delay: 1.3s; background: #7c4dff; }
.conf-15 { left: 80%; animation-delay: 1.4s; background: #22c55e; }
.conf-16 { left: 85%; animation-delay: 1.5s; background: #00c6ff; }
.conf-17 { left: 90%; animation-delay: 1.6s; background: #7c4dff; }
.conf-18 { left: 10%; animation-delay: 1.7s; background: #22c55e; }
.conf-19 { left: 50%; animation-delay: 1.8s; background: #00c6ff; }
.conf-20 { left: 80%; animation-delay: 1.9s; background: #7c4dff; }

/* Animations */
@keyframes slideDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.5); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes checkmarkBorder {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes checkmarkCheck {
  from { opacity: 0; transform: rotate(-45deg) translate(-10px, 10px); }
  to { opacity: 1; transform: rotate(-45deg) translate(0, 0); }
}

@keyframes confettiFall {
  to {
    transform: translateY(100vh) rotate(360deg);
    opacity: 0;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.3s ease;
}
.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 900px) {
  .contact-wrapper {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .contact-header h1 { font-size: 30px; }
  .success-title { font-size: 32px; }
}
@media (max-width: 600px) {
  .contacto { padding: 20px 12px; }
  .contact-form { padding: 18px; gap: 14px; }
  .contact-header h1 { font-size: 26px; }
  .contact-header p { font-size: 14px; }
  .success-title { font-size: 28px; }
  .success-subtitle { font-size: 16px; }
}
</style>
