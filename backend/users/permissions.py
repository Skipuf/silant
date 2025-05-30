from rest_framework.permissions import BasePermission

class RolePermission(BasePermission):
    allowed_roles = []  # список допустимых ролей

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role in self.allowed_roles

class IsManager(RolePermission):
    allowed_roles = ['manager']

class IsClient(RolePermission):
    allowed_roles = ['client']

class IsService(RolePermission):
    allowed_roles = ['service']

class IsClientOrService(RolePermission):
    allowed_roles = ['client', 'service']

class IsManagerOrService(RolePermission):
    allowed_roles = ['manager', 'service']

class IsManagerOrClient(RolePermission):
    allowed_roles = ['manager', 'client']

class IsManagerOrClientOrService(RolePermission):
    allowed_roles = ['manager', 'client', 'service']