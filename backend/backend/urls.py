from django.urls import include, path

from api import views
from rest_framework.urlpatterns import format_suffix_patterns
# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    # path('api/login', views.UserLogin.as_view()),
    # path('api/register', views.UserRegister.as_view()),
    # path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]

# urlpatterns += format_suffix_patterns(urlpatterns)