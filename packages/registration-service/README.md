

# TODO:
### How to use this section:
* P1 = Priority 1 : Changes to satisfy functional requirements or engineering anti-patterns that could have broad negative effect latter on.
* P2 = Priority 2 : Think about solutions for later iterations
* NM = Non Prioritized: Small non-blocking items. Do when convenient.
* When done, ~~strikethrough~~ the item.


### P1
- Fix startup error on `$ python manage.py runserver`:

        view's MembershipConfigViewSet raised exception during schema generation; use `getattr(self, 'swagger_fake_view', False)` to detect and short-circuit this
        Traceback (most recent call last):
          File "/Users/dibu2018/src/club-manager/packages/registration-service/test_virtualenvs/lib/python3.7/site-packages/drf_yasg/inspectors/base.py", line 50, in call_view_method
            return view_method()
          File "/Users/dibu2018/src/club-manager/packages/registration-service/membership/views.py", line 25, in get_queryset
            org_id = self.kwargs['org_id']
        KeyError: 'org_id'


- Make IDs integers
- Make Price Amounts integers (amount on cents)

### P2
- Introduce regression/integration tests, they will save us a lot of aggregated debugging time latter on. The idea here is to test at least all endpoints happy path and add faulty test whenever a bug is caught and fixed.
- Revisit aux member creation logic. `POST /orgs/{org_id}/memberships`

### NP
- org id already in path doesnt need to be on body (make readonly perhaps, if this doesn't work) `POST /orgs/{org_id}/membership-configs/` 
