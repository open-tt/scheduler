from django.urls import include, path
from . import views
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.conf.urls import url

from rest_framework.routers import DefaultRouter

schema_view = get_schema_view(
    openapi.Info(
        title="Memberships API",
        default_version='v1',
        description="Test description",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@snippets.local"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'^orgs/(?P<org_id>.+)/membership-configs',
                views.MembershipConfigViewSet, basename='membership-config')
router.register(r'^orgs/(?P<org_id>.+)/memberships',
                views.MembershipViewSet, basename='membership')

urlpatterns = [
    url(r'^swagger(\.json|\.yaml)$',
        schema_view.without_ui(cache_timeout=0), name='schema-json'),
    url(r'^swagger/$', schema_view.with_ui('swagger',
                                           cache_timeout=0), name='schema-swagger-ui'),
    url(r'^redoc/$', schema_view.with_ui('redoc',
                                         cache_timeout=0), name='schema-redoc'),
    # path('orgs/<str:org_pk>/membership-configs/',
    #      views.MembershipConfigList.as_view()),
    path('', include(router.urls)),
    # path('membership-configs/<int:pk>', views.MembershipConfigDetail.as_view()),
    # path('memberships/', views.MembershipList.as_view()),
    # path('memberships/<int:pk>', views.MembershipDetail.as_view()),
    # path('memberships/<int:pk>/is-active', views.MembershipIsActive.as_view()),
    # url(r'^orgs/(?P<org_id>.+)/membership-configs/$',
    # views.MembershipConfigList.as_view()),
]
