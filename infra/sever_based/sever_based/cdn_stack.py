from aws_cdk import (
    aws_s3 as s3,
    aws_cloudfront as cdn,
    aws_ssm as ssm,
    core
)


class CDNStack(core.Stack):
    def __init__(self, scope: core.Construct, id: str, s3bucket, **kwargs):
        super().__init__(scope, id, **kwargs)

        prj_name = self.node.try_get_context('project_name')
        env_name = self.node.try_get_context('env')

        bucketName = s3.Bucket.from_bucket_name(self, 's3bucket', s3bucket)

        self.cdn_id = cdn.CloudFrontWebDistribution(
            self,
            'webhosting-cdn',
            origin_configs=[
                cdn.SourceConfiguration(
                    behaviors=[cdn.Behavior(is_default_behavior=True)],
                    s3_origin_source=cdn.S3OriginConfig(
                        s3_bucket_source=bucketName,
                    )

                )
            ]
        )

        ## ssm params
        ssm.StringParameter(self, 'cdn-id',
                            parameter_name=f'/{env_name}/cdn-id',
                            string_value=self.cdn_id.distribution_id)
        ssm.StringParameter(self, 'cdn-url',
                            parameter_name=f'/{env_name}/cdn-url',
                            string_value=f'https://{self.cdn_id.distribution_domain_name}')
