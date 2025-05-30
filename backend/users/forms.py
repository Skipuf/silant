import secrets
from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import User

class CustomUserCreationForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ('username', 'email', 'role')

    def save(self, commit=True):
        user = super().save(commit=False)

        # Генерируем безопасный пароль
        password = secrets.token_urlsafe(12)
        user.set_password(password)

        if commit:
            user.save()

        # Прикрепим пароль к экземпляру (для вывода в админке)
        user._plain_password = password
        return user
