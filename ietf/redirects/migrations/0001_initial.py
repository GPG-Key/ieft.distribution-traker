# Generated by Django 2.2.28 on 2023-03-20 19:22

from typing import List, Tuple
from django.db import migrations, models
import django.db.models.deletion
import ietf.utils.models


class Migration(migrations.Migration):

    initial = True

    dependencies: List[Tuple[str, str]] = [
    ]

    operations = [
        migrations.CreateModel(
            name='Redirect',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cgi', models.CharField(blank=True, max_length=50, unique=True)),
                ('url', models.CharField(max_length=255)),
                ('rest', models.CharField(blank=True, max_length=100)),
                ('remove', models.CharField(blank=True, max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Suffix',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rest', models.CharField(blank=True, max_length=100)),
                ('remove', models.CharField(blank=True, max_length=50)),
            ],
            options={
                'verbose_name_plural': 'Suffixes',
            },
        ),
        migrations.CreateModel(
            name='Command',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('command', models.CharField(max_length=50)),
                ('url', models.CharField(blank=True, max_length=50)),
                ('script', ietf.utils.models.ForeignKey(editable=False, on_delete=django.db.models.deletion.CASCADE, related_name='commands', to='redirects.Redirect')),
                ('suffix', ietf.utils.models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='redirects.Suffix')),
            ],
            options={
                'unique_together': {('script', 'command')},
            },
        ),
    ]
