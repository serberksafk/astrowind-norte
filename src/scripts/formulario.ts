interface FormFieldMessages {
  required: string;
  email?: string;
  tel?: string;
  size?: string;
  type?: string;
}

const MENSAJES: Record<string, FormFieldMessages> = {
  nombre: { required: 'Escribe tu nombre.' },
  correo: { required: 'Escribe tu correo.', email: 'Revisa el correo: parece incompleto.' },
  area: { required: 'Elige el área de desempeño.' },
  gama: { required: 'Elige una gama.' },
  tel: { required: 'Revisa el teléfono.', tel: 'Revisa el teléfono: usa solo números, espacios y + ( ) -.' },
  consent: { required: 'Acepta la política de privacidad para enviar.' },
};

const ARCHIVO_MAX_BYTES = 10 * 1024 * 1024;
const ARCHIVO_PERMITIDOS = ['pdf', 'dwg', 'dxf', 'png', 'jpg', 'jpeg', 'xlsx'];

function showError(id: string, message: string): void {
  const el = document.getElementById(id);
  if (!el) return;
  const span = el.querySelector('span');
  if (span) span.textContent = message;
  el.removeAttribute('hidden');
}

function clearError(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;
  const span = el.querySelector('span');
  if (span) span.textContent = '';
  el.setAttribute('hidden', '');
}

function markInvalid(field: HTMLElement): void {
  field.setAttribute('aria-invalid', 'true');
}

function markValid(field: HTMLElement): void {
  field.removeAttribute('aria-invalid');
}

function validateEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function validateTel(value: string): boolean {
  return /^[0-9\s+()-]+$/.test(value.trim());
}

function getExt(filename: string): string {
  const i = filename.lastIndexOf('.');
  return i >= 0 ? filename.slice(i + 1).toLowerCase() : '';
}

function initForm(): void {
  const form = document.getElementById('cotiza') as HTMLFormElement | null;
  if (!form) return;

  const successPanel = document.getElementById('form-ok');
  const fileNameEl = document.getElementById('archivo-nombre');
  const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement | null;

  const fileInput = form.querySelector<HTMLInputElement>('input[name="archivo"]');
  if (fileInput && fileNameEl) {
    fileInput.addEventListener('change', () => {
      clearError('archivo-e');
      const file = fileInput.files && fileInput.files[0];
      fileNameEl.textContent = file ? file.name : 'Ningún archivo seleccionado';
    });
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    let hasErrors = false;

    const fields = form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
      'input[name], select[name], textarea[name]'
    );
    fields.forEach((f) => {
      markValid(f);
      const errId = `${f.name}-e`;
      if (document.getElementById(errId)) clearError(errId);
    });

    const nombre = form.querySelector<HTMLInputElement>('input[name="nombre"]');
    if (nombre && !nombre.value.trim()) {
      showError('nombre-e', MENSAJES.nombre.required);
      markInvalid(nombre);
      hasErrors = true;
    }

    const correo = form.querySelector<HTMLInputElement>('input[name="correo"]');
    if (correo) {
      if (!correo.value.trim()) {
        showError('correo-e', MENSAJES.correo.required);
        markInvalid(correo);
        hasErrors = true;
      } else if (!validateEmail(correo.value)) {
        showError('correo-e', MENSAJES.correo.email || '');
        markInvalid(correo);
        hasErrors = true;
      }
    }

    const area = form.querySelector<HTMLSelectElement>('select[name="area"]');
    if (area && !area.value) {
      showError('area-e', MENSAJES.area.required);
      markInvalid(area);
      hasErrors = true;
    }

    const gama = form.querySelector<HTMLSelectElement>('select[name="gama"]');
    if (gama && !gama.value) {
      showError('gama-e', MENSAJES.gama.required);
      markInvalid(gama);
      hasErrors = true;
    }

    const tel = form.querySelector<HTMLInputElement>('input[name="tel"]');
    if (tel && tel.value.trim() && !validateTel(tel.value)) {
      showError('tel-e', MENSAJES.tel?.tel || '');
      markInvalid(tel);
      hasErrors = true;
    }

    if (fileInput && fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      const ext = getExt(file.name);
      if (!ARCHIVO_PERMITIDOS.includes(ext)) {
        showError('archivo-e', 'Tipo de archivo no permitido. Usa PDF, DWG, DXF, PNG, JPG o XLSX.');
        markInvalid(fileInput);
        hasErrors = true;
      } else if (file.size > ARCHIVO_MAX_BYTES) {
        showError(
          'archivo-e',
          'El archivo supera 10 MB. Adjunta uno más liviano o envíanoslo a ventas@atingenieria.com.'
        );
        markInvalid(fileInput);
        hasErrors = true;
      }
    }

    const consent = form.querySelector<HTMLInputElement>('input[name="consent"]');
    if (consent && !consent.checked) {
      showError('consent-e', MENSAJES.consent.required);
      markInvalid(consent);
      hasErrors = true;
    }

    if (hasErrors) {
      const firstInvalid = form.querySelector<HTMLElement>('[aria-invalid="true"]');
      firstInvalid?.focus();
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.dataset.originalText = submitBtn.textContent || 'Solicitar cotización';
      submitBtn.textContent = 'Enviando…';
    }

    const endpoint = (import.meta as unknown as { env: Record<string, string | undefined> }).env.PUBLIC_FORM_ENDPOINT;

    if (!endpoint) {
      window.setTimeout(() => {
        if (successPanel) {
          form.setAttribute('hidden', '');
          successPanel.removeAttribute('hidden');
          successPanel.setAttribute('tabindex', '-1');
          (successPanel as HTMLElement).focus();
          successPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 350);
      return;
    }

    try {
      const fd = new FormData(form);
      const res = await fetch(endpoint, { method: 'POST', body: fd });
      if (!res.ok) throw new Error('Network error');

      if (successPanel) {
        form.setAttribute('hidden', '');
        successPanel.removeAttribute('hidden');
        successPanel.setAttribute('tabindex', '-1');
        (successPanel as HTMLElement).focus();
        successPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } catch {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = submitBtn.dataset.originalText || 'Solicitar cotización';
      }
      showError(
        'form-e',
        'No pudimos enviar el formulario. Escríbenos a ventas@atingenieria.com o por WhatsApp al +56 9 3593 5595.'
      );
      const errEl = document.getElementById('form-e');
      errEl?.removeAttribute('hidden');
    }
  });

  form
    .querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
      'input[name], select[name], textarea[name]'
    )
    .forEach((field) => {
      const handler = () => {
        markValid(field);
        const errId = `${field.name}-e`;
        const errEl = document.getElementById(errId);
        if (errEl) clearError(errId);
      };
      field.addEventListener('input', handler);
      field.addEventListener('change', handler);
    });
}

function initCookiesButton(): void {
  document.querySelectorAll<HTMLButtonElement>('[data-open-ck]').forEach((btn) => {
    btn.addEventListener('click', () => {
      try {
        localStorage.removeItem('cookie-consent');
      } catch {
        // localStorage not available
      }
      const banner = document.getElementById('cookie-banner');
      if (banner) {
        banner.classList.remove('hidden');
      }
      const event = new CustomEvent('cookie:reset');
      window.dispatchEvent(event);
    });
  });
}

export function initFormulario(): void {
  initForm();
  initCookiesButton();
}

function start(): void {
  initFormulario();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start, { once: true });
} else {
  start();
}

document.addEventListener('astro:page-load', start);
