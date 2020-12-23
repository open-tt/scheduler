from django.contrib import admin
from .models import MembershipConfig, Membership, AuxMembership


class MembershipConfigAdmin(admin.ModelAdmin):
    pass


class MembershipAdmin(admin.ModelAdmin):
    pass


class AuxMembershipAdmin(admin.ModelAdmin):
    pass


admin.site.register(MembershipConfig, MembershipConfigAdmin)
admin.site.register(Membership, MembershipAdmin)
admin.site.register(AuxMembership, AuxMembershipAdmin)
