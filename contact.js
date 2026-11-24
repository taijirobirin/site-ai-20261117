const form = document.querySelector('form');
const nameField = document.getElementById('name');
const emailField = document.getElementById('email');
const subjectField = document.getElementById('subject');
const messageField = document.getElementById('message');
const consentField = document.getElementById('consent');
const confirmation = document.getElementById('confirmation');

function setError(field, message) {
  document.getElementById(`${field.id}-error`).textContent = message;
  if (message) {
    field.setAttribute('aria-invalid', 'true');
  } else {
    field.removeAttribute('aria-invalid');
  }
}

form.addEventListener('input', (event) => {
  confirmation.hidden = true;
  const field = event.target;
  if (field.hasAttribute('aria-invalid')) {
    setError(field, '');
  }
});

form.addEventListener('change', () => {
  confirmation.hidden = true;
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  confirmation.hidden = true;

  const errors = [
    [nameField, nameField.value.trim() ? '' : 'お名前を入力してください。'],
    [emailField, !emailField.value.trim()
      ? 'メールアドレスを入力してください。'
      : emailField.validity.typeMismatch
        ? 'メールアドレスを正しい形式で入力してください（例：name@example.com）。'
        : ''],
    [messageField, !messageField.value.trim()
      ? 'お問い合わせの内容を入力してください。'
      : messageField.value.length < 10
        ? 'お問い合わせの内容は10文字以上で入力してください。'
        : messageField.value.length > 500
          ? 'お問い合わせの内容は500文字以内で入力してください。'
          : ''],
    [consentField, consentField.checked ? '' : 'お問い合わせ内容の送信に同意してください。']
  ];

  errors.forEach(([field, message]) => setError(field, message));
  const firstError = errors.find(([, message]) => message);
  if (firstError) {
    firstError[0].focus();
    return;
  }

  document.getElementById('confirm-name').textContent = nameField.value;
  document.getElementById('confirm-email').textContent = emailField.value;
  document.getElementById('confirm-subject').textContent = subjectField.selectedOptions[0].textContent;
  document.getElementById('confirm-message').textContent = messageField.value;
  document.getElementById('confirm-consent').textContent = '同意する';
  confirmation.hidden = false;
});
