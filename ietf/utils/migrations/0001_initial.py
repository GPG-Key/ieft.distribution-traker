# Generated by Django 2.2.28 on 2023-03-20 19:22

from typing import List, Tuple
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies: List[Tuple[str, str]] = [
    ]

    operations = [
        migrations.CreateModel(
            name='DumpInfo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField()),
                ('host', models.CharField(max_length=128)),
                ('tz', models.CharField(default='UTC', max_length=32)),
            ],
        ),
        migrations.CreateModel(
            name='VersionInfo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time', models.DateTimeField(auto_now=True)),
                ('command', models.CharField(max_length=32)),
                ('switch', models.CharField(max_length=16)),
                ('version', models.CharField(max_length=64)),
                ('used', models.BooleanField(default=True)),
            ],
            options={
                'verbose_name_plural': 'VersionInfo',
            },
        ),
    ]
