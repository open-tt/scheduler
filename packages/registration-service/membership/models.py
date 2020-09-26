from django.db import models
import datetime


class MembershipConfig(models.Model):
    org_id = models.CharField(max_length=100)
    price_plan_id = models.CharField(max_length=255, blank=True)
    days_valid = models.IntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    title = models.CharField(max_length=255)
    description = models.TextField(max_length=255, blank=True)
    banner_message = models.CharField(max_length=255, blank=True)
    is_displayed_on_site = models.BooleanField(
        verbose_name="Is displayed for purchase", default=True)
    is_subscription = models.BooleanField(default=False)
    display_order = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.title}"


class Membership(models.Model):
    membership_config = models.ForeignKey(
        MembershipConfig, on_delete=models.DO_NOTHING, related_name='memberships', blank=False)
    user_id = models.CharField(max_length=100)
    initiation_date = models.DateField(blank=False)
    expiration_date = models.DateField(blank=False)
    payment_status = models.CharField(max_length=100)

    @property
    def is_active(self):
        return (self.expiration_date or datetime.date(2000, 1, 1)) >= datetime.date.today()

    def __str__(self):
        return f"user_id: {self.user_id}, membership: {self.membership_config.title}"


class AuxMembership(models.Model):
    membership = models.ForeignKey(
        Membership, on_delete=models.CASCADE, related_name='aux_members', blank=False)
    user_id = models.CharField(max_length=100)

    def __str__(self):
        return f"aux user id: {self.user_id}, main member id: {self.membership.user_id}, main membership: {self.membership.membership_config.title}"
