from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from rest_framework import serializers

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model  = User
        fields = ['id', 'username', 'email', 'role']


class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model  = User
        fields = ['username', 'email', 'role']

    def create(self, validated_data):
        password = User.objects.make_random_password()

        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=password,
            role=validated_data['role']
        )

        send_mail(
            subject='Ваш аккаунт в «Силант»',
            message=f'Здравствуйте, {user.username}!\n\n'
                    f'Ваш доступ:\n'
                    f'username: {user.username}\n'
                    f'password: {password}',
            from_email='noreply@example.com',
            recipient_list=[user.email],
            fail_silently=False,
        )
        return user
