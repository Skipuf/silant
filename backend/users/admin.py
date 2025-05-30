from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User
from .forms import CustomUserCreationForm

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    add_form = CustomUserCreationForm
    add_fieldsets = (
        (None, {
            'fields': ('username', 'email', 'role'),
        }),
    )
    list_display = ('username', 'email', 'role', 'is_staff', 'is_active')
    ordering = ('username',)
    fieldsets = (
        (None, {'fields': ('username', 'email', 'password')}),
        ('Роль и доступ', {'fields': ('role', 'is_staff', 'is_active')}),
        ('Права', {'fields': ('groups', 'user_permissions')}),
    )

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)
        if not change and hasattr(obj, '_plain_password'):
            print(f"Пользователь создан: {obj.username}")
            print(f"Пароль: {obj._plain_password}")
