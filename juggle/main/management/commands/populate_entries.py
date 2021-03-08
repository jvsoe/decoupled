from django.core.management.base import BaseCommand, CommandError
from model_bakery import baker

class Command(BaseCommand):
    help = 'Populates Entry with test-entries'

    def add_arguments(self, parser):
        # parser.add_argument('poll_ids', nargs='+', type=int)
        parser.add_argument('amount', type=int)

    def handle(self, *args, **options):
        amount =  options['amount']
        print(f'Creating {amount} test entries')
        entries = baker.make("apps.main.Entry", _quantity=amount)
        assert len(entries) == amount
        print(f'{len(entries)} test entries created')