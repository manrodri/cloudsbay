#!/usr/bin/env python3

from aws_cdk import core

from sever_based.s3_stack import S3Stack
from sever_based.cdn_stack import CDNStack
from sever_based.dns_stack import DnsStack

env = {
    "account": '423754860743',
    "region": 'eu-west-1'
}

app = core.App()

bucket = S3Stack(app,
                 "s3Stack",
                 env=core.Environment(account=env.get('account'), region=env.get('region')))
cdn = CDNStack(app,
               'cndStack',
               s3bucket=core.Fn.import_value('ecommerce-bucket'),
               env=core.Environment(account=env.get('account'), region=env.get('region')),
               )
route53 = DnsStack(app,
                   'route53',
                   cdnid=cdn.cdn_id,
                   env=core.Environment(account=env.get('account'), region=env.get('region')),
                   )

app.synth()
