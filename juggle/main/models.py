from django.db import models

# Create your models here.


class Entry(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    text = models.CharField(max_length=255, default='')
    number = models.IntegerField(default=0)

    def __str__(self):
        return f'{self.text}: {self.number}'
