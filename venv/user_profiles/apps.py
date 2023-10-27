from django.apps import AppConfig

class UserProfilesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'user_profiles'

    def ready(self):
        from . import signals  # Import your signal handling code here
