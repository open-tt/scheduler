from rest_framework import serializers
from .models import MembershipConfig, Membership, AuxMembership


class MembershipConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = MembershipConfig
        fields = ['id', 'org_id', 'price_plan_id', 'days_valid', 'price', 'title', 'description',
                  'banner_message', 'is_displayed_on_site', 'is_subscription', 'display_order']


class MembershipSerializer(serializers.ModelSerializer):
    aux_members = serializers.StringRelatedField(many=True)

    class Meta:
        model = Membership
        fields = ['id', 'membership_config_id', 'user_id',
                  'initiation_date', 'expiration_date', 'payment_status', 'is_active', 'aux_members']


class AuxMembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuxMembership
        fields = ['id', 'membership_id', 'user_id']
#         fields = '__all__'
